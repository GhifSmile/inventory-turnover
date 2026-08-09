// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
// import { PlantComparisonData } from "@/services/inventoryTurnover";
// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import { useCallback } from "react";

// interface Props {
//   data: PlantComparisonData[];
//   year: number
// }

// export default function ComparisonBarChart({ data, year}: Props) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const pathname = usePathname();

//   // --- LOGIKA INTERAKTIF PERBAIKAN ---
//   const handleBarClick = useCallback((item: any) => {
//     // Di Recharts, saat onClick di taruh di <Bar />, datanya ada di item.payload
//     if (item && item.plant) {
//       const clickedPlant = item.plant;
//       const params = new URLSearchParams(searchParams.toString());
      
//       if (params.get("plant") === clickedPlant) {
//         params.delete("plant");
//       } else {
//         params.set("plant", clickedPlant);
//       }

//       router.push(`${pathname}?${params.toString()}`, { scroll: false });
//     }
//   }, [router, searchParams, pathname]);

//   const tooltipOrder = ["Overall Turnover", "Fish Turnover", "Shrimp Turnover"];
//   const sortedData = [...data].sort((a, b) => {
//       const diffA = Math.abs(a.overallTurnover - (year < 2026? 3.25: 3.4));
//       const diffB = Math.abs(b.overallTurnover - (year < 2026? 3.25: 3.4));
//       return diffB - diffA;
//     });
//   const legendOrder = ["Overall Turnover", "Fish Turnover", "Shrimp Turnover"]

//   return (
//     <Card className="shadow-sm rounded-xl overflow-visible border-none h-full flex flex-col">
//       <CardHeader>
//         <CardTitle className="text-lg font-bold text-black">Plant Group Comparison Inventory Turnover</CardTitle>
//       </CardHeader>
//       <CardContent className="flex-1 w-full min-h-[350px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={sortedData}
//             margin={{ top: 20, right: 30, left: -10, bottom: 25 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
//             <XAxis 
//               dataKey="plant" 
//               tickLine={false} 
//               axisLine={false} 
//               fontSize={10}
//               dy={5}
//             />
//             <YAxis 
//               tickFormatter={(value) => `${value}`} 
//               tickLine={false} 
//               axisLine={false} 
//               domain={[0, 6]} 
//               fontSize={10}
//             />

//             <Tooltip 
//               cursor={{fill: '#f8fafc'}}
//               contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
//               itemSorter={(item) => tooltipOrder.indexOf(item.name as string)}
//               formatter={(value: number | string | undefined, labelName: any) => {
//                 if (typeof value === 'undefined') return ["0.0", labelName];
//                 const formattedValue = Number(value).toFixed(1);
//                 return [`${formattedValue}`, labelName];
//               }}
//             />           
            
//             <Legend 
//               verticalAlign="bottom" 
//               align="center"
//               itemSorter={(item) => legendOrder.indexOf(item.value as string)}
//               iconType="rect"
//               iconSize={10}          
//               formatter={(value) => <span className="text-slate-700">{value}</span>}
//               wrapperStyle={{ 
//                 fontSize: '12px', 
//                 paddingTop: '20px',
//                 position: 'relative',
//                 width: '100%'
//               }} 
//             />       
            
//             {/* PINDAHKAN onClick KE DALAM SETIAP BAR DAN TAMBAHKAN CURSOR POINTER */}
//             <Bar 
//               name="Overall Inventory Turnover" 
//               dataKey="overallTurnover" 
//               fill="#4bc0f2" 
//               radius={[2, 2, 0, 0]} 
//               onClick={handleBarClick}
//               className="cursor-pointer"
//             />
//             <Bar 
//               name="Fish Inventory Turnover" 
//               dataKey="fishTurnover" 
//               fill="#f2a977" 
//               radius={[2, 2, 0, 0]} 
//               onClick={handleBarClick}
//               className="cursor-pointer"
//             />
//             <Bar 
//               name="Shrimp Inventory Turnover" 
//               dataKey="shrimpTurnover" 
//               fill="#ca7bfc" 
//               radius={[2, 2, 0, 0]} 
//               onClick={handleBarClick}
//               className="cursor-pointer"
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }

// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ReferenceLine,
//   ResponsiveContainer,
// } from "recharts";
// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import { useCallback, useMemo, useState, useRef, useEffect } from "react";
// import { Download, ChevronDown, Check, X } from "lucide-react";
// import { toPng } from "html-to-image";

// interface Props {
//   comparisonByMonth: Record<string, any[]>;
//   baselineMonth: string;
//   displayMonths: string[];
//   year: number;
// }

// const MAX_MONTHS = 3;
// const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// const FULL_MONTH_NAMES: Record<string, string> = {
//   "Jan": "January", "Feb": "February", "Mar": "March", "Apr": "April",
//   "May": "May", "Jun": "June", "Jul": "July", "Aug": "August",
//   "Sep": "September", "Oct": "October", "Nov": "November", "Dec": "December"
// };

// export const COMPARISON_MONTH_COLORS = ["#4bc0f2", "#842aed", "#f04487"];

// export default function ComparisonBarChart({ comparisonByMonth, baselineMonth, displayMonths, year }: Props) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const chartRef = useRef<HTMLDivElement>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const prevBaselineRef = useRef<string>(baselineMonth);

//   const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
//   const [isDownloading, setIsDownloading] = useState(false);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsMonthDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (prevBaselineRef.current !== baselineMonth) {
//       prevBaselineRef.current = baselineMonth;
//       const params = new URLSearchParams(window.location.search);
//       if (params.has("compare")) {
//         params.delete("compare");
//         router.replace(`${pathname}?${params.toString()}`, { scroll: false });
//       }
//     }
//   }, [baselineMonth, router, pathname]);

//   const selectedMonths = displayMonths;
//   const compareMonths = useMemo(() => selectedMonths.filter((m) => m !== baselineMonth), [selectedMonths, baselineMonth]);
//   const availableMonths = useMemo(() => MONTHS.filter((m) => !selectedMonths.includes(m)), [selectedMonths]);
//   const canAddMore = selectedMonths.length < MAX_MONTHS;

//   const sortedMonthsForChart = useMemo(() => {
//     return [...selectedMonths].sort((a, b) => MONTHS.indexOf(a) - MONTHS.indexOf(b));
//   }, [selectedMonths]);

//   const updateCompareParam = useCallback((months: string[]) => {
//     const params = new URLSearchParams(window.location.search);
//     if (months.length > 0) {
//       params.set("compare", months.join(","));
//     } else {
//       params.delete("compare");
//     }
//     router.replace(`${pathname}?${params.toString()}`, { scroll: false });
//   }, [router, pathname]);

//   const handleAddMonth = (month: string) => {
//     if (selectedMonths.includes(month) || selectedMonths.length >= MAX_MONTHS) return;
//     updateCompareParam([...compareMonths, month]);
//   };

//   const handleRemoveMonth = (month: string) => {
//     if (month === baselineMonth) return;
//     updateCompareParam(compareMonths.filter((m) => m !== month));
//   };

//   const chartData = useMemo(() => {
//     const combinationSet = new Set<string>();
//     for (const month of selectedMonths) {
//       (comparisonByMonth[month] ?? []).forEach((row) => {
//         if (row.plant && row.business_unit) {
//           combinationSet.add(`${row.plant}:${row.business_unit}`);
//         }
//       });
//     }

//     const combinations = Array.from(combinationSet).map((str) => {
//       const [plant, business_unit] = str.split(":");
//       return { plant, business_unit };
//     }).sort((a, b) => {
//       const plantCompare = a.plant.localeCompare(b.plant);
//       if (plantCompare !== 0) return plantCompare;
//       return a.business_unit.localeCompare(b.business_unit);
//     });

//     return combinations.map(({ plant, business_unit }) => {
//       const suffix = business_unit.toLowerCase() === "fish" ? "FF" : "SF";
//       const displayLabel = `${plant} ${suffix}`;
//       const entry: Record<string, any> = { displayLabel, plant, business_unit };

//       for (const month of selectedMonths) {
//         const row = (comparisonByMonth[month] ?? []).find(
//           (r) => r.plant === plant && r.business_unit === business_unit
//         );
//         entry[month] = row && row.inventory_turnover !== undefined && row.inventory_turnover !== null ? Number(row.inventory_turnover) : null;
//       }
//       return entry;
//     });
//   }, [comparisonByMonth, selectedMonths]);

//   const baselineValue = useMemo(() => (year < 2026 ? 1.0 : 2.45), [year]);

//   const yAxisMax = useMemo(() => {
//     let maxVal = baselineValue;
//     chartData.forEach((row) => {
//       selectedMonths.forEach((month) => {
//         const val = row[month];
//         if (typeof val === "number" && val > maxVal) maxVal = val;
//       });
//     });
//     return Math.ceil(maxVal * 1.15);
//   }, [chartData, selectedMonths, baselineValue]);

//   const handleBarClick = useCallback((item: any) => {
//     if (item && item.displayLabel) {
//       const clickedPlantLabel = item.displayLabel;
//       const params = new URLSearchParams(searchParams.toString());
//       if (params.get("plant") === clickedPlantLabel) {
//         params.delete("plant");
//       } else {
//         params.set("plant", clickedPlantLabel);
//       }
//       router.push(`${pathname}?${params.toString()}`, { scroll: false });
//     }
//   }, [router, searchParams, pathname]);

//   const handleDownload = useCallback(async () => {
//     if (!chartRef.current) return;
//     try {
//       setIsDownloading(true);
//       const buttons = chartRef.current.querySelectorAll("[data-no-print]");
//       buttons.forEach((btn) => ((btn as HTMLElement).style.display = "none"));
//       const dataUrl = await toPng(chartRef.current, { pixelRatio: 2 });
//       buttons.forEach((btn) => ((btn as HTMLElement).style.display = ""));
//       const link = document.createElement("a");
//       link.href = dataUrl;
//       link.download = `comparison-chart-${new Date().toISOString().split("T")[0]}.png`;
//       link.click();
//     } catch (error) {
//       console.error("Download failed:", error);
//     } finally {
//       setIsDownloading(false);
//     }
//   }, []);

//   const chartReactivityKey = `chart-${baselineMonth}-${sortedMonthsForChart.join("-")}`;

//   return (
//     <>
//       <style>{`@media print { [data-no-print] { display: none !important; } }`}</style>
//       <Card ref={chartRef} className="shadow-sm rounded-xl overflow-visible border-none h-full flex flex-col bg-white">
//         <CardHeader className="flex flex-row items-center justify-between gap-2 px-4 sm:px-6">
//           <div className="flex flex-col gap-0.5 min-w-0">
//             <CardTitle className="text-sm sm:text-lg font-bold text-black line-clamp-1">Plant Comparison Out of Stock</CardTitle>
//             <p className="text-xs text-slate-400 truncate">
//               Baseline <span className="font-bold text-[#4174ff]">• {FULL_MONTH_NAMES[baselineMonth] || baselineMonth}</span>
//             </p>
//           </div>
//           <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0" data-no-print>
//             <div className="relative" ref={dropdownRef}>
//               <button onClick={() => setIsMonthDropdownOpen((v) => !v)} className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all duration-200 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer">
//                 <span className="hidden sm:inline">Compare: {selectedMonths.map(m => FULL_MONTH_NAMES[m] || m).join(", ")}</span>
//                 <span className="sm:hidden">Compare: {selectedMonths.length}</span>
//                 <ChevronDown size={14} className={`transition-transform duration-200 flex-shrink-0 ${isMonthDropdownOpen ? 'rotate-180' : ''}`} />
//               </button>
//               {isMonthDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden">
//                   <div className="px-3 py-2 border-b border-slate-100">
//                     <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Selected ({selectedMonths.length}/{MAX_MONTHS})</p>
//                     <div className="flex flex-wrap gap-1.5">
//                       {selectedMonths.map((m) => (
//                         <span key={m} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-pink-50 text-[11px] font-medium text-[#e94987]">
//                           {FULL_MONTH_NAMES[m] || m}
//                           {m !== baselineMonth && (
//                             <button onClick={() => handleRemoveMonth(m)} className="hover:text-pink-700 cursor-pointer"><X size={12} /></button>
//                           )}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="max-h-56 overflow-y-auto">
//                     {!canAddMore ? <p className="px-4 py-3 text-xs text-slate-400">Maximum {MAX_MONTHS} months reached.</p> :
//                       availableMonths.map((month) => (
//                         <button key={month} onClick={() => handleAddMonth(month)} className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition-colors text-sm text-slate-700">
//                           <span>{FULL_MONTH_NAMES[month] || month}</span>
//                         </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//             <button onClick={handleDownload} disabled={isDownloading} className="p-1.5 sm:p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50">
//               <Download size={16} />
//             </button>
//           </div>
//         </CardHeader>
//         <CardContent className="flex-1 w-full min-h-[350px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart key={chartReactivityKey} data={chartData} margin={{ top: 20, right: 30, left: -10, bottom: 25 }}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
//               <XAxis dataKey="displayLabel" tickLine={false} axisLine={false} fontSize={11} dy={5} />
//               <YAxis tickFormatter={(value) => `${value}`} tickLine={false} axisLine={false} fontSize={11} domain={[0, yAxisMax]} />
//               <Tooltip
//                 cursor={{ fill: "#f8fafc" }}
//                 contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
//                 itemSorter={(item) => MONTHS.indexOf(String(item.name))}
//                 formatter={(value: number | string | undefined, name: any) => {
//                   if (value === null || value === undefined) return null;
//                   return [`${Number(value).toFixed(2)}%`, name];
//                 }}
//               />
//               <Legend verticalAlign="bottom" align="center" iconType="circle" iconSize={10} formatter={(value) => <span className="text-slate-700">{value}</span>} wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} />
//               <ReferenceLine y={baselineValue} stroke="#f04487" strokeDasharray="6 4" strokeWidth={1.5} />
//               {sortedMonthsForChart.map((month) => {
//                 const colorIdx = selectedMonths.indexOf(month);
//                 const hasData = chartData.some((entry) => entry[month] !== null && entry[month] !== undefined);
//                 return (
//                   <Bar
//                     key={month}
//                     name={month}
//                     dataKey={month}
//                     hide={!hasData}
//                     fill={COMPARISON_MONTH_COLORS[colorIdx !== -1 ? colorIdx : 0]}
//                     radius={[3, 3, 0, 0]}
//                     onClick={handleBarClick}
//                     className="cursor-pointer"
//                   />
//                 );
//               })}
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </>
//   );
// }

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  LabelList
} from "recharts";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import { Download, ChevronDown, Check, X } from "lucide-react";
import { toPng } from "html-to-image";

interface Props {
  comparisonByMonth: Record<string, any[]>;
  baselineMonth: string;
  displayMonths: string[];
  year: number;
}

const MAX_MONTHS = 3;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const FULL_MONTH_NAMES: Record<string, string> = {
  "Jan": "January", "Feb": "February", "Mar": "March", "Apr": "April",
  "May": "May", "Jun": "June", "Jul": "July", "Aug": "August",
  "Sep": "September", "Oct": "October", "Nov": "November", "Dec": "December"
};

export const COMPARISON_MONTH_COLORS = ["#4bc0f2", "#842aed", "#f04487"];

export default function ComparisonBarChart({ comparisonByMonth, baselineMonth, displayMonths, year }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const chartRef = useRef<HTMLDivElement>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const prevBaselineRef = useRef<string>(baselineMonth);

  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMonthDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (prevBaselineRef.current !== baselineMonth) {
      prevBaselineRef.current = baselineMonth;

      const params = new URLSearchParams(window.location.search);
      if (params.has("compare")) {
        params.delete("compare");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }
  }, [baselineMonth, router, pathname]);

  const selectedMonths = displayMonths;

  const compareMonths = useMemo(() => selectedMonths.filter((m) => m !== baselineMonth), [selectedMonths, baselineMonth]);
  const availableMonths = useMemo(() => MONTHS.filter((m) => !selectedMonths.includes(m)), [selectedMonths]);
  const canAddMore = selectedMonths.length < MAX_MONTHS;

  const sortedMonthsForChart = useMemo(() => {
    return [...selectedMonths].sort((a, b) => MONTHS.indexOf(a) - MONTHS.indexOf(b));
  }, [selectedMonths]);

  const updateCompareParam = useCallback((months: string[]) => {
    const params = new URLSearchParams(window.location.search);
    if (months.length > 0) {
      params.set("compare", months.join(","));
    } else {
      params.delete("compare");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname]);

  const handleAddMonth = (month: string) => {
    if (selectedMonths.includes(month) || selectedMonths.length >= MAX_MONTHS) return;
    updateCompareParam([...compareMonths, month]);
  };

  const handleRemoveMonth = (month: string) => {
    if (month === baselineMonth) return;
    updateCompareParam(compareMonths.filter((m) => m !== month));
  };

  const chartData = useMemo(() => {
    const combinationSet = new Set<string>();
    for (const month of selectedMonths) {
      (comparisonByMonth[month] ?? []).forEach((row) => {
        if (row.plant && row.business_unit) {
          combinationSet.add(`${row.plant}:${row.business_unit}`);
        }
      });
    }

    const combinations = Array.from(combinationSet).map((str) => {
      const [plant, business_unit] = str.split(":");
      return { plant, business_unit };
    }).sort((a, b) => {
      const plantCompare = a.plant.localeCompare(b.plant);
      if (plantCompare !== 0) return plantCompare;
      return a.business_unit.localeCompare(b.business_unit);
    });

    return combinations.map(({ plant, business_unit }) => {
      const suffix = business_unit.toLowerCase() === "fish" ? "FF" : "SF";
      const displayLabel = `${plant} ${suffix}`;
      
      const entry: Record<string, any> = { displayLabel, plant, business_unit };

      for (const month of selectedMonths) {
        const row = (comparisonByMonth[month] ?? []).find(
          (r) => r.plant === plant && r.business_unit === business_unit
        );
        entry[month] = row && row.inventory_turnover !== undefined && row.inventory_turnover !== null ? Number(row.inventory_turnover) : null;
      }
      return entry;
    });
  }, [comparisonByMonth, selectedMonths]);

  // Penyesuaian Target
  const targetLower = useMemo(() => (year < 2026 ? 2.5 : 3.0), [year]);
  const targetUpper = useMemo(() => (year < 2026 ? 4.0 : 3.8), [year]);

  const yAxisMax = useMemo(() => {
    let maxVal = targetUpper; // Menggunakan targetUpper sebagai dasar penentuan batas atas
    chartData.forEach((row) => {
      selectedMonths.forEach((month) => {
        const val = row[month];
        if (typeof val === "number" && val > maxVal) maxVal = val;
      });
    });
    return Math.ceil(maxVal * 1.15);
  }, [chartData, selectedMonths, targetUpper]);

  const handleBarClick = useCallback((item: any) => {
    if (item && item.displayLabel) {
      const clickedPlantLabel = item.displayLabel;
      const params = new URLSearchParams(searchParams.toString());
      if (params.get("plant") === clickedPlantLabel) {
        params.delete("plant");
      } else {
        params.set("plant", clickedPlantLabel);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [router, searchParams, pathname]);

  const handleDownload = useCallback(async () => {
    if (!chartRef.current) return;
    try {
      setIsDownloading(true);
      const buttons = chartRef.current.querySelectorAll("[data-no-print]");
      buttons.forEach((btn) => ((btn as HTMLElement).style.display = "none"));
      
      const dataUrl = await toPng(chartRef.current, { pixelRatio: 2 });
      buttons.forEach((btn) => ((btn as HTMLElement).style.display = ""));
      
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `comparison-chart-${new Date().toISOString().split("T")[0]}.png`;
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
      const buttons = chartRef.current?.querySelectorAll("[data-no-print]");
      buttons?.forEach((btn) => ((btn as HTMLElement).style.display = ""));
    } finally {
      setIsDownloading(false);
    }
  }, []);

  const chartReactivityKey = `chart-${baselineMonth}-${sortedMonthsForChart.join("-")}`;

  return (
    <>
      <style>{`@media print { [data-no-print] { display: none !important; } }`}</style>
      <Card ref={chartRef} className="shadow-sm rounded-xl overflow-visible border-none h-full flex flex-col bg-white">
        <CardHeader className="flex flex-row items-center justify-between gap-2 px-4 sm:px-6">
          <div className="flex flex-col gap-0.5 min-w-0">
            <CardTitle className="text-sm sm:text-lg font-bold text-black line-clamp-1">
              Plant Comparison Inventory Turnover
            </CardTitle>
            <p className="text-xs text-slate-400 truncate">
              Baseline{" "}
              <span className="font-bold text-[#4174ff]">• {FULL_MONTH_NAMES[baselineMonth] || baselineMonth}</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0" data-no-print>
             {/* Dropdown dan Download Button tetap sama */}
             <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsMonthDropdownOpen((v) => !v)} className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all duration-200 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer">
                <span className="hidden sm:inline">Compare: {selectedMonths.map(m => FULL_MONTH_NAMES[m] || m).join(", ")}</span>
                <span className="sm:hidden">Compare: {selectedMonths.length}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 flex-shrink-0 ${isMonthDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMonthDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Selected ({selectedMonths.length}/{MAX_MONTHS})</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMonths.map((m) => (
                        <span key={m} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-pink-50 text-[11px] font-medium text-[#e94987]">
                          {FULL_MONTH_NAMES[m] || m}
                          {m !== baselineMonth && (
                            <button onClick={() => handleRemoveMonth(m)} className="hover:text-pink-700 cursor-pointer"><X size={12} /></button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="max-h-56 overflow-y-auto">
                    {!canAddMore ? <p className="px-4 py-3 text-xs text-slate-400">Maximum {MAX_MONTHS} months reached.</p> :
                      availableMonths.map((month) => (
                        <button key={month} onClick={() => handleAddMonth(month)} className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition-colors text-sm text-slate-700">
                          <span>{FULL_MONTH_NAMES[month] || month}</span>
                        </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={handleDownload} disabled={isDownloading} className="p-1.5 sm:p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50">
              <Download size={16} />
            </button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 w-full min-h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart key={chartReactivityKey} data={chartData} margin={{ top: 20, right: 30, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
              <XAxis dataKey="displayLabel" tickLine={false} axisLine={false} fontSize={11} dy={5} />
              <YAxis tickFormatter={(value) => `${value}`} tickLine={false} axisLine={false} fontSize={11} domain={[0, yAxisMax]} />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                itemSorter={(item) => MONTHS.indexOf(String(item.name))}
                formatter={(value: number | string | undefined, name: any) => {
                  if (value === null || value === undefined) return null;
                  return [Number(value).toFixed(2), name];
                }}
              />
              <Legend verticalAlign="bottom" align="center" iconType="circle" iconSize={10} formatter={(value) => <span className="text-slate-700">{value}</span>} wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} />
              
              {/* Dua Reference Line */}
              <ReferenceLine y={targetLower} stroke="#f04487" strokeDasharray="3 3" label={{ value: 'Lower', position: 'insideTopRight', fontSize: 10, fill: '#f04487' }} />
              <ReferenceLine y={targetUpper} stroke="#f04487" strokeDasharray="3 3" label={{ value: 'Upper', position: 'insideTopRight', fontSize: 10, fill: '#f04487' }} />
              
              {sortedMonthsForChart.map((month) => {
                const colorIdx = selectedMonths.indexOf(month);
                const hasData = chartData.some((entry) => entry[month] !== null && entry[month] !== undefined);
                return (
                  <Bar
                    key={month}
                    name={month}
                    dataKey={month}
                    hide={!hasData}
                    fill={COMPARISON_MONTH_COLORS[colorIdx !== -1 ? colorIdx : 0]}
                    radius={[3, 3, 0, 0]}
                    onClick={handleBarClick}
                    className="cursor-pointer"
                  >
                      <LabelList
                        dataKey={month}
                        position="top"
                        fill="#1f2937"
                        fontSize={10}
                        fontWeight={600}
                        formatter={(value) => (value == null ? "" : Number(value).toFixed(2).toString())}
                      />
                  </Bar>
                );
              })}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
}