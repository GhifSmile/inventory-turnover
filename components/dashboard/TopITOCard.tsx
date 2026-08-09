"use client";

import { CardContent, Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ITOByPakanResult } from "@/services/inventoryTurnover";

interface Props {
  data: ITOByPakanResult[];
}

export default function TopITOCard({ data }: Props) {
  const top10 = [...data]
    .sort((a, b) => (b.inventory_turnover ?? -1) - (a.inventory_turnover ?? -1))
    .slice(0, 10);

  return (
    <Card
      className="shadow-sm rounded-xl overflow-hidden border-none h-full flex flex-col bg-white"
    >
      {/* HEADER: judul + subtitle di kiri */}
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div className="flex-1">
          <h3 className="text-sm font-bold text-black mb-1">
            Top 10 SKU Inventory Turnover
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Highest inventory turnover SKUs by category
          </p>
        </div>
      </CardHeader>

      <CardContent className="relative flex-1 min-h-0 px-3 pb-2 flex flex-col">
        {/* HEADER UTAMA (DIPISAH): Dijamin tidak akan bocor karena data tidak pernah melewati area ini */}
        <div className="w-full bg-white border-b border-slate-200 shrink-0">
          <table className="w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-[35%]" />
              <col className="w-[35%]" />
              <col className="w-[30%]" />
            </colgroup>
            <thead>
              <tr>
                <th className="px-2 py-2 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-white">
                  Business Unit
                </th>
                <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-white">
                  SKU
                </th>
                <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-white">
                  Turnover
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* CONTAINER SCROLL DATA: Hanya berisi isi data (tbody) */}
        <div className="max-h-[380px] overflow-y-auto lg:absolute lg:top-[38px] lg:bottom-2 lg:left-3 lg:right-3 lg:max-h-none">
          <table className="w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-[35%]" />
              <col className="w-[35%]" />
              <col className="w-[30%]" />
            </colgroup>
            <tbody>
              {top10.length > 0 ? (
                top10.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-b border-slate-50 last:border-b-0 hover:bg-slate-50/60 transition-colors"
                    >
                      {/* Business Unit dengan badge angka bulat */}
                      <td className="px-2 py-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-pink-100 text-[11px] font-bold text-[#e94987]">
                            {index + 1}
                          </span>
                          <span className="truncate text-[13px] font-semibold text-slate-800">
                            {item.business_unit.charAt(0).toUpperCase() + item.business_unit.slice(1)}
                          </span>
                        </div>
                      </td>

                      {/* SKU / Kode Pakan - rata tengah, proporsional */}
                      <td className="px-2 py-2.5 text-[10px] font-medium text-slate-900 truncate text-left">
                        {item.kode_pakan}
                      </td>

                      {/* Persentase, warna tetap #4bc0f2 */}
                      <td className="px-2 py-2.5 text-center">
                        <span
                          className="text-[13px] font-bold tabular-nums"
                          style={{ color: "#f04487" }}
                        >
                          {item.inventory_turnover === null ? "-" : `${item.inventory_turnover.toFixed(2)}`}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3} className="px-3 py-8 text-center">
                    <div className="text-xs text-slate-400">No data available</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}