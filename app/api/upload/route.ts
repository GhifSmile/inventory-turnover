import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) {
      return NextResponse.json({ error: "Sheet tidak ditemukan" }, { status: 400 });
    }

    const valueSets: any[] = [];
    const deleteKeys: any[] = [];

    let isFileValid = true;
    let firstErrorRow = 0;

    const clean = (val: any) => {
      if (val === null || val === undefined) return null;
      // Jika sel adalah formula, ambil hasil (result)-nya saja
      if (typeof val === "object") {
        if (val.result !== undefined && val.result !== null) return val.result;
        if (val.error !== undefined) return null; 
        return val; 
      }
      return val;
    };

    const parseSafeNumber = (val: any): number => {
      const num = Number(val);
      // Jika hasil konversi adalah NaN atau tidak terhingga, kembalikan 0
      return isNaN(num) || !isFinite(num) ? 0 : num;
    };

    const sanitizeStr = (val: any) => {
      if (val === null || val === undefined) return "";
      return String(val).trim().replace(/\s+/g, " ");
    };

    // --- TAHAP 1: VALIDASI & KUMPULKAN DATA ---
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && isFileValid) {
        const rawValues = [
          clean(row.getCell(1).value), // year
          clean(row.getCell(2).value), // month
          row.getCell(3).value,        // plant
          row.getCell(4).value,        // plant_code
          row.getCell(5).value,        // business_unit
          row.getCell(6).value,        // mtyp
          row.getCell(7).value,        // material_code
          row.getCell(8).value,        // material_desc          
          row.getCell(9).value,        // kind_of_product
          row.getCell(10).value,       // uom           
          clean(row.getCell(11).value), // saldo_awal
          clean(row.getCell(12).value), // penerimaan
          clean(row.getCell(13).value), // pemakaian
          clean(row.getCell(14).value) // saldo_akhir
        ];

        const isRowComplete = rawValues.every(
          (val) => val !== null && val !== undefined && val !== ""
        );

        if (!isRowComplete) {
          isFileValid = false;
          firstErrorRow = rowNumber;
          return;
        }

        const rowYear = Number(rawValues[0]);
        const rowMonth = Number(rawValues[1]);

        const plant = sanitizeStr(rawValues[2]).toUpperCase();
        const plant_code = sanitizeStr(rawValues[3]).toUpperCase();    
        const businessUnit = sanitizeStr(rawValues[4]).toLowerCase();
        const mtyp = sanitizeStr(rawValues[5]).toUpperCase();
        const material_code = sanitizeStr(rawValues[6]).toUpperCase();
        const material_desc = sanitizeStr(rawValues[7]);
        const kind_of_product = sanitizeStr(rawValues[8]);
        const uom = sanitizeStr(rawValues[9]).toUpperCase();

        const saldoAwal = parseSafeNumber(rawValues[10]);
        const penerimaan = parseSafeNumber(rawValues[11]);
        const pemakaian = parseSafeNumber(rawValues[12]);
        const saldoAkhir = parseSafeNumber(rawValues[13]);

        const avg_saldo = Math.round((saldoAwal + saldoAkhir) / 2);
        const turnover = avg_saldo === 0? 0: Math.round((pemakaian / avg_saldo));

        const daysInMonth = new Date(rowYear, rowMonth, 0).getDate();
        const days_of_inventory = turnover === 0 ? 0 : Math.round(daysInMonth / turnover);


        // INSERT payload
        valueSets.push(sql`(
          ${rowYear}::int,
          ${rowMonth}::int,
          ${plant}::varchar,
          ${plant_code}::varchar,
          ${businessUnit}::varchar,
          ${mtyp}::varchar,
          ${material_code}::varchar,
          ${material_desc}::varchar,
          ${kind_of_product}::varchar,
          ${uom}::varchar,
          ${saldoAwal}::numeric, 
          ${penerimaan}::numeric,
          ${pemakaian}::numeric,
          ${saldoAkhir}::numeric,
          ${avg_saldo}::numeric,
          ${turnover}::int,
          ${days_of_inventory}::int,
          NOW()
        )`);

        // DELETE key
        deleteKeys.push(sql`(
          ${rowYear}::int,
          ${rowMonth}::int,
          ${plant}::varchar,
          ${businessUnit}::varchar,
          ${material_code}::varchar
        )`);
      }
    });

    // --- TAHAP 2: VALIDASI FILE ---
    if (!isFileValid) {
      return NextResponse.json(
        {
          error: `Upload dibatalkan. Baris ke-${firstErrorRow} tidak lengkap.`,
        },
        { status: 400 }
      );
    }

    if (valueSets.length === 0) {
      return NextResponse.json(
        { error: "File kosong atau tidak ada data." },
        { status: 400 }
      );
    }

    // --- TAHAP 3: TRANSACTION (DELETE + INSERT) ---
    await db.transaction(async (tx) => {

      await tx.execute(sql`
        DELETE FROM inventory_turnover
        WHERE (year, month, plant, business_unit, material_code)
        IN (${sql.join(deleteKeys, sql`, `)})
      `);

      await tx.execute(sql`
        INSERT INTO inventory_turnover
        (
          year,
          month,
          plant,
          plant_code,
          business_unit,
          mtyp,
          material_code,
          material_desc,
          kind_of_product,
          uom,
          saldo_awal,
          penerimaan,
          pemakaian,
          saldo_akhir,
          avg_saldo,
          turnover,
          days_of_inventory,
          created_at
        )
        VALUES ${sql.join(valueSets, sql`, `)}
      `);

    });

    return NextResponse.json({
      message: `Berhasil! Seluruh data (${valueSets.length} baris) telah diupload.`,
    });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan data ke database." },
      { status: 500 }
    );
  }
}
