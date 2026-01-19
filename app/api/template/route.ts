import { NextResponse } from "next/server";
import ExcelJS from "exceljs";

export async function GET() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Inventory Turnover");

  // Tambahkan numFmt pada kolom yang bersifat angka
  worksheet.columns = [
    { header: "year", key: "year", width: 10, style: { numFmt: '0' } },
    { header: "month", key: "month", width: 10, style: { numFmt: '0' } },
    { header: "plant", key: "plant", width: 15 },
    { header: "plant_code", key: "plant_code", width: 15 },
    { header: "business_unit", key: "business_unit", width: 20 },
    { header: "mtyp", key: "mtyp", width: 15 },
    { header: "material_code", key: "material_code", width: 25 },
    { header: "material_desc", key: "material_desc", width: 50 },   
    { header: "kind_of_product", key: "kind_of_product", width: 30 },    
    { header: "uom", key: "uom", width: 15 },     
    { header: "saldo_awal", key: "saldo_awal", width: 20, style: { numFmt: '#,##0' } },
    { header: "penerimaan", key: "penerimaan", width: 20, style: { numFmt: '#,##0' } },
    { header: "pemakaian", key: "pemakaian", width: 20, style: { numFmt: '#,##0' } },
    { header: "saldo_akhir", key: "saldo_akhir", width: 20, style: { numFmt: '#,##0' } },    
  ];

  const headerRow = worksheet.getRow(1);

  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF6691DC' }, 
    };

    cell.font = {
      bold: true,
      color: { argb: 'FF000000' },
      size: 11
    };

    const borderColor = { argb: 'FFE1EBFC' }; 

    cell.border = {
      top: { style: 'thin', color: borderColor },
      left: { style: 'thin', color: borderColor },
      bottom: { style: 'thin', color: borderColor },
      right: { style: 'thin', color: borderColor }
    };

    cell.alignment = { 
      vertical: 'middle', 
      horizontal: 'left', 
    };
  });

  headerRow.height = 20;

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=Inventory_Turnover-[Plant]_[Year][Month][Week].xlsx",
    },
  });
}