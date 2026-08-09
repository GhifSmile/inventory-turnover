// "use client"

// import { CardContent } from "@/components/ui/card";
// import { Factory } from "lucide-react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import { PlantComparisonData } from "@/services/inventoryTurnover";

// interface Props {
//   data: PlantComparisonData[];
//   year: number;
// }

// export default function PlantAchievementCard({ data, year }: Props) {

//   // const minTarget = 2.5;
//   // const maxTarget = 4;

//   // Hitung pencapaian berdasarkan fishTurnover dan shrimpTurnover
//   // const achievedCount = data.reduce((acc, p) => {
//   //   let count = 0;
//   //   if (p.fishTurnover >= minTarget && p.fishTurnover <= maxTarget) count++;
//   //   if (p.shrimpTurnover >= minTarget && p.shrimpTurnover <= maxTarget) count++;
//   //   return acc + count;
//   // }, 0);

//   const plantThresholds = {
//     'LPG fish': {
//       critical: 4.5,
//       stockoutriskmin: 3.8,
//       stockoutriskmax: 4.5,
//       optimalmin: 3.3,
//       optimalmax: 3.8,
//       capitalriskmin: 2.5,
//       capitalriskmax: 3.3,
//       important: 2.5,
//     },
//     'MDN fish': {
//       critical: 4.5,
//       stockoutriskmin: 3.8,
//       stockoutriskmax: 4.5,
//       optimalmin: 3.3,
//       optimalmax: 3.8,
//       capitalriskmin: 2.5,
//       capitalriskmax: 3.3,
//       important: 2.5,
//     },  
//     'SPJ fish': {
//       critical: 4.3,
//       stockoutriskmin: 3.8,
//       stockoutriskmax: 4.3,
//       optimalmin: 3.0,
//       optimalmax: 3.8,
//       capitalriskmin: 2.1,
//       capitalriskmax: 3.0,
//       important: 2.1,
//     },    
//     'MDN shrimp': {
//       critical: 4.3,
//       stockoutriskmin: 3.8,
//       stockoutriskmax: 4.3,
//       optimalmin: 3.0,
//       optimalmax: 3.8,
//       capitalriskmin: 2.1,
//       capitalriskmax: 3.0,
//       important: 2.1,
//     },     
//     'LPG shrimp': {
//       critical: 5.0,
//       stockoutriskmin: 3.8,
//       stockoutriskmax: 4.9,
//       optimalmin: 2.72,
//       optimalmax: 3.8,
//       capitalriskmin: 2.0,
//       capitalriskmax: 2.72,
//       important: 2.0,
//     }, 
//     'CKP fish': {
//       critical: 5.5,
//       stockoutriskmin: 3.8,
//       stockoutriskmax: 5.4,
//       optimalmin: 2.5,
//       optimalmax: 3.8,
//       capitalriskmin: 1.8,
//       capitalriskmax: 2.4,
//       important: 1.8,
//     },  
//     'SBY shrimp': {
//       critical: 5.5,
//       stockoutriskmin: 3.8,
//       stockoutriskmax: 5.4,
//       optimalmin: 2.5,
//       optimalmax: 3.8,
//       capitalriskmin: 1.8,
//       capitalriskmax: 2.4,
//       important: 1.8,
//     },                                                                                
//   }  

//   type ThresholdData = typeof plantThresholds;

//   const achievedCount = data.reduce((acc, p) => {
//     let count = 0;

//     if (year >= 2026) {
//       const getOptimalRange = (plant: string, type: string) => {
//         const key = `${plant} ${type}`;
//         const fallbackKey = `${plant} ${type === 'fish' ? 'shrimp' : 'fish'}`;

//         const thresholds = plantThresholds as Record<string, any>;
//         const threshold = thresholds[key] || thresholds[fallbackKey];

//         return threshold 
//           ? { min: threshold.optimalmin, max: threshold.optimalmax } 
//           : { min: null, max: null };
//       };

//       const fishRange = getOptimalRange(p.plant, 'fish');
//       const shrimpRange = getOptimalRange(p.plant, 'shrimp');

//       if (fishRange.min !== null && p.fishTurnover >= fishRange.min && p.fishTurnover <= fishRange.max) {
//         count++;
//       }
//       if (shrimpRange.min !== null && p.shrimpTurnover >= shrimpRange.min && p.shrimpTurnover <= shrimpRange.max) {
//         count++;
//       }

//     } else {
//       const minTarget = 2.5;
//       const maxTarget = 4;

//       if (p.fishTurnover >= minTarget && p.fishTurnover <= maxTarget) count++;
//       if (p.shrimpTurnover >= minTarget && p.shrimpTurnover <= maxTarget) count++;
//     }

//     return acc + count;
//   }, 0);  

//   const TOTAL_PLANTS = 7;
  
//   const chartData = [
//     { name: "Achieved", value: achievedCount },
//     { name: "Remaining", value: Math.max(0, TOTAL_PLANTS - achievedCount) },
//   ];

//   // Menggunakan warna hex yang diminta untuk donut bagian achieved
//   const COLORS = ["#ca7bfc", "#f1f5f9"];

//   return (

//     // <div 
//     //   className="rounded-xl shadow-sm w-full h-full overflow-hidden border border-slate-200" 
//     //   style={{ background: 'linear-gradient(135deg, #0dec111a 0%, #ffffff 100%)' }} // Opacity ~10% (#1a)
//     // >

//     <div 
//       className="bg-white rounded-xl shadow-sm w-full h-full overflow-hidden"
//     >
//       <CardContent className="h-full pt-4 pb-4 px-5 flex items-center justify-between bg-transparent">
        
//         {/* Sisi Kiri: Icon, Title, dan Angka */}
//         <div className="flex flex-col space-y-1"> 
          
//           {/* Icon Factory: Tanpa BG, mepet kiri sejajar Title */}
//           <div className="bg-transparent mb-3">
//             <Factory className="w-8 h-8 text-[#ca7bfc]" /> 
//           </div>

//           <div>
//             <h3 className="text-[12px] font-bold text-black tracking-widest leading-none mb-5">
//               Plant Achievement
//             </h3>
            
//             <div className="flex items-baseline gap-1">
//               <span className="text-6xl font-black text-slate-800 tracking-tighter leading-none">
//                 {achievedCount}
//               </span>
//               <span className="text-3xl font-bold text-slate-200">/</span>
//               <span className="text-3xl font-bold text-slate-400">
//                 {TOTAL_PLANTS}
//               </span>
//             </div>
            
//             <p className="text-[10px] font-light text-slate-400 uppercase tracking-wider mt-0.5">
//               Plants on Target
//             </p>
//           </div>
//         </div>

//         {/* Sisi Kanan: Donut Chart */}
//         <div className="w-24 h-24 flex-shrink-0">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={chartData}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={28} // Diperbesar sedikit agar proporsional dengan angka 6xl
//                 outerRadius={40}
//                 paddingAngle={0}
//                 dataKey="value"
//                 startAngle={90}
//                 endAngle={-270}
//                 stroke="none"
//               >
//                 {chartData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//       </CardContent>
//     </div>
//   );
// }

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COMPARISON_MONTH_COLORS } from "@/components/dashboard/BarChartComparison";

interface Props {
  comparisonByMonth: Record<string, any[]>;
  year: number;
  displayMonths?: string[];
}

const TOTAL_PLANTS = 7;

export default function PlantAchievementCard({ comparisonByMonth, year, displayMonths }: Props) {
  
  const getLimits = (plant: string, businessUnit: string) => {
    const key = `${plant.toUpperCase()} ${businessUnit.toLowerCase() === 'fish' ? 'FF' : 'SF'}`;
    
    if (year < 2026) {
      return [1.9, 2.5, 4.0, 5.0, 6.0];
    }

    if ((key.includes('LPG') && key.includes('FF')) || (key.includes('MDN') && key.includes('FF'))) return [2.5, 3.3, 3.8, 4.5, 5.5];
    if ((key.includes('MDN') && key.includes('SF')) || (key.includes('SPJ') && key.includes('FF'))) return [2.1, 3.0, 3.8, 4.3, 5.0];
    if (key.includes('LPG') && key.includes('SF')) return [2.0, 2.72, 3.8, 5.0, 6.0];
    if ((key.includes('CKP') && key.includes('FF')) || (key.includes('SBY') && key.includes('SF'))) return [1.8, 2.5, 3.8, 5.5, 6.5];
    
    return [2.1, 3.0, 3.8, 4.3, 5.0];
  };

  const visibleMonths = displayMonths && displayMonths.length > 0 ? displayMonths : [];

  const getAchievedData = (month: string): { count: number; plants: string[] } | null => {
    const rows = comparisonByMonth[month];
    if (!rows || rows.length === 0) return null;

    let count = 0;
    const achievedPlants: string[] = [];
    
    rows.forEach((p) => {
      if (p.inventory_turnover !== null && p.inventory_turnover !== undefined) {
        const limits = getLimits(p.plant, p.business_unit);
        const isAchieved = p.inventory_turnover >= limits[1] && p.inventory_turnover <= limits[2];

        if (isAchieved) {
          count++;
          let buLabel = p.business_unit?.toLowerCase() === 'fish' ? 'FF' : 'SF';
          achievedPlants.push(`${p.plant} ${buLabel}`);
        }
      }
    });
    
    achievedPlants.sort((a, b) => a.localeCompare(b));
    return { count, plants: achievedPlants };
  };

  return (
    <Card className="shadow-sm rounded-xl overflow-hidden border-none h-full flex flex-col bg-white">
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div className="flex-1">
          <CardTitle className="text-sm font-bold text-black mb-1">
            Plant Achievement
          </CardTitle>
          <p className="text-xs text-slate-500 font-medium">
            Plants meeting the target per month
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col overflow-y-auto space-y-3 px-3 pb-3">
        {visibleMonths.length > 0 ? (
          visibleMonths.map((month, index) => {
            const achievedData = getAchievedData(month);
            const hasData = achievedData !== null;
            const achievedCount = hasData ? achievedData.count : 0;
            const achievedPlants = hasData ? achievedData.plants : [];
            
            // Logika warna: Gunakan abu-abu jika tidak ada data
            const monthColor = hasData 
              ? COMPARISON_MONTH_COLORS[index % COMPARISON_MONTH_COLORS.length] 
              : "#cbd5e1"; // slate-300
            
            const achievementPercentage = hasData ? (achievedCount / TOTAL_PLANTS) * 100 : 0;

            return (
              <div
                key={index}
                className="p-4 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: monthColor }}
                    />
                    <span className="text-xs font-semibold text-slate-700">{month}</span>
                  </div>
                  <div className="text-right">
                    {hasData ? (
                      <>
                        <span className="text-base font-bold text-slate-900">{achievedCount}</span>
                        <span className="text-xs text-slate-500 ml-0.5">/{TOTAL_PLANTS}</span>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400 italic">No data</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs mb-2 px-2 py-1 bg-white rounded border border-slate-200">
                  <span className="text-slate-600">
                    {year >= 2026 ? "Target: Optimal Range" : "Target: 2.40 - 4.00"}
                  </span>
                  <span className="font-semibold text-slate-700">
                    {hasData ? `${Math.round(achievementPercentage)}%` : "-"}
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-300 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${achievementPercentage}%`,
                      backgroundColor: monthColor,
                    }}
                  />
                </div>

                {hasData && achievedPlants.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {achievedPlants.map((plantName, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] font-medium px-1.5 py-0.5 bg-white border border-slate-200 text-slate-600 rounded"
                      >
                        {plantName}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xs text-slate-400 italic">No months selected</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}