// import Navigation from "@/components/dashboard/Navigation";
// import FilterGroup from "@/components/dashboard/filterGroup";
// import UploadButton from "@/components/dashboard/UploadButton";
// import DownloadButton from "@/components/dashboard/downloadButton";

// import { ITOService} from "@/services/inventoryTurnover";

// export default async function PerformanceDetailPage({
//   searchParams,
// }: {
//   searchParams: Promise<any>;
// }) {
//   const params = await searchParams;
//   const options = await ITOService.getFilterOptions();

//   const selectedYear = params.year
//     ? Number(params.year.split(",")[0])
//     : options.year[0];

//   const selectedPlants = params.plant 
//     ? String(params.plant).split(",").filter((v) => v !== "") 
//     : [];     
    
//   const selectedBU = params.business_unit 
//     ? String(params.business_unit).split(",").filter((v) => v !== "") 
//     : [];     

//   const filters = {
//     year: selectedYear,
//     plants: selectedPlants,
//     business_unit: selectedBU
//   };

//   const performanceData = await ITOService.getMonthlyPerformance(filters);

//   console.log(performanceData)

//   return (
//     <main className="min-h-screen bg-slate-50">
//       {/* HEADER SECTION */}
//       <header className="bg-gradient-to-br from-[#4bc0f2] to-[#6691dc] pt-4 pb-6 px-6 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto">
          
//           <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4 text-center lg:text-left">
            
//             <div className="flex flex-col items-center lg:items-start gap-0">

//               <div className="relative h-24 md:h-32 w-auto overflow-hidden flex-shrink-0">
//                 <img 
//                   src="/inventory_turnover.png"
//                   alt="Logo" 
//                   className="h-full w-auto object-contain object-left opacity-20"
//                 />
//               </div>

//               <div>
//                 <h1 className="text-2xl font-black tracking-tighter uppercase">
//                   Monitoring Inventory Turnover
//                 </h1>
//                 <p className="text-xs md:text-sm italic opacity-80 mt-1 text-orange-100">
//                   Striving to achieve the best planning process
//                 </p>
//               </div>
//             </div>
            
//             <div className="w-full lg:w-auto flex justify-center">
//               <Navigation />
//             </div>
//           </div>

//           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mt-4 pt-4 border-t border-white/20">

//             <div className="flex flex-wrap justify-center lg:justify-start gap-2 order-2 lg:order-1">
//                <FilterGroup options={options} showMonth={false}/>
//             </div>
             
//             <div className="flex flex-wrap justify-center lg:justify-end gap-3 order-1 lg:order-2">
//               <DownloadButton />
//               <UploadButton />
//             </div>
                
//           </div>
          
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
//           <div className="overflow-x-auto text-slate-700">
//             {/* table-fixed digunakan agar lebar kolom yang kita set dipatuhi 100% */}
//             <table className="w-full text-left text-[11px] border-collapse table-fixed">
//               <thead>
//                 <tr className="bg-gradient-to-r from-[#f2a977] to-[#dd8c8d] text-white uppercase tracking-wider font-bold">
//                   {/* Lebar diset tetap (80 + 100 + 60 = 240px total sticky) */}
//                   <th className="w-[80px] px-4 py-3 sticky left-0 z-20 bg-[#f2a977]">Plant Group</th>
//                   <th className="w-[100px] px-4 py-3 sticky left-[80px] z-20 bg-[#f2a977]">Segment</th>
//                   <th className="w-[60px] px-4 py-3 text-center sticky left-[180px] z-20 bg-[#f2a977]">Year</th>
                  
//                   {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
//                     <th key={m} className="w-[65px] px-2 py-3 border-r border-white/10 text-center">{m}</th>
//                   ))}
                  
//                   <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">YTD Avg</th>
//                   <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">VS Target</th>
//                   <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">Status</th>
//                   <th className="w-[200px] px-4 py-3 text-left">Action Needed</th>
//                 </tr>
//               </thead>
              
//               <tbody className="divide-y divide-slate-100">
//                 {performanceData.length > 0 ? (
//                   performanceData.map((row, idx) => {

//                     // let target = row.year >= 2026 ? 3.5 : 3;

//                     const plantThresholds = {
//                       'LPG fish': {
//                         critical: 4.5,
//                         stockoutriskmin: 3.8,
//                         stockoutriskmax: 4.5,
//                         optimalmin: 3.3,
//                         optimalmax: 3.8,
//                         capitalriskmin: 2.5,
//                         capitalriskmax: 3.3,
//                         important: 2.5,
//                       },
//                       'MDN fish': {
//                         critical: 4.5,
//                         stockoutriskmin: 3.8,
//                         stockoutriskmax: 4.5,
//                         optimalmin: 3.3,
//                         optimalmax: 3.8,
//                         capitalriskmin: 2.5,
//                         capitalriskmax: 3.3,
//                         important: 2.5,
//                       },  
//                       'SPJ fish': {
//                         critical: 4.3,
//                         stockoutriskmin: 3.8,
//                         stockoutriskmax: 4.3,
//                         optimalmin: 3.0,
//                         optimalmax: 3.8,
//                         capitalriskmin: 2.1,
//                         capitalriskmax: 3.0,
//                         important: 2.1,
//                       },    
//                       'MDN shrimp': {
//                         critical: 4.3,
//                         stockoutriskmin: 3.8,
//                         stockoutriskmax: 4.3,
//                         optimalmin: 3.0,
//                         optimalmax: 3.8,
//                         capitalriskmin: 2.1,
//                         capitalriskmax: 3.0,
//                         important: 2.1,
//                       },     
//                       'LPG shrimp': {
//                         critical: 5.0,
//                         stockoutriskmin: 3.8,
//                         stockoutriskmax: 4.9,
//                         optimalmin: 2.72,
//                         optimalmax: 3.8,
//                         capitalriskmin: 2.0,
//                         capitalriskmax: 2.72,
//                         important: 2.0,
//                       }, 
//                       'CKP fish': {
//                         critical: 5.5,
//                         stockoutriskmin: 3.8,
//                         stockoutriskmax: 5.4,
//                         optimalmin: 2.5,
//                         optimalmax: 3.8,
//                         capitalriskmin: 1.8,
//                         capitalriskmax: 2.5,
//                         important: 1.8,
//                       },  
//                       'SBY shrimp': {
//                         critical: 5.5,
//                         stockoutriskmin: 3.8,
//                         stockoutriskmax: 5.4,
//                         optimalmin: 2.5,
//                         optimalmax: 3.8,
//                         capitalriskmin: 1.8,
//                         capitalriskmax: 2.4,
//                         important: 1.8,
//                       },                                                                                
//                     }

//                     const key = `${row.plant} ${row.businessUnit}`;
//                     const thresholds = plantThresholds[key as keyof typeof plantThresholds];
//                     const ytd = row.inventory_turnover_ytd;

//                     let vsT: string | number = "-";
//                     let statusEmoji = "";
//                     let actionText = "";
//                     let colorClass = "";

//                     if(ytd !== null){
//                       if (row.year >= 2026) {
//                         if (!thresholds) {
//                             statusEmoji = "⚪";
//                             actionText = "Threshold Not Found";
//                             colorClass = "text-slate-400";
//                             vsT = "-";
//                         } else {
//                             if (ytd >= thresholds.optimalmin && ytd <= thresholds.optimalmax) {
//                                 statusEmoji = "🟢";
//                                 actionText = "Optimal Stock";
//                                 colorClass = "text-green-600";
//                                 vsT = "-";
//                             } else {
//                                 vsT = ytd < thresholds.optimalmin ? ytd - thresholds.optimalmin : ytd - thresholds.optimalmax;
                            
//                                 if (ytd > thresholds.critical) {
//                                     statusEmoji = "🔴";
//                                     actionText = "Critical Warning: Insufficient Stock";
//                                     colorClass = "text-red-500";
//                                 } else if (ytd > thresholds.stockoutriskmin && ytd <= thresholds.stockoutriskmax) {
//                                     statusEmoji = "🟡";
//                                     actionText = "Stockout Risk";
//                                     colorClass = "text-yellow-600";
//                                 } else if (ytd >= thresholds.capitalriskmin && ytd < thresholds.capitalriskmax) {
//                                     statusEmoji = "🟡";
//                                     actionText = "Capital Risk (Overstock)";
//                                     colorClass = "text-yellow-600";
//                                 } else {
//                                     statusEmoji = "🔴";
//                                     actionText = "Important to Note (Capital Lock)";
//                                     colorClass = "text-red-500";
//                                 }
//                             }
//                         }
//                     } else {
//                         if (ytd >= 2.5 && ytd <= 4) {
//                             statusEmoji = "🟢";
//                             actionText = "Optimal Stock";
//                             colorClass = "text-green-600";
//                             vsT = "-";
//                         } else {
//                             vsT = ytd < 2.5? ytd - 2.5 : ytd - 4;
                        
//                             if (ytd >= 5.1) {
//                                 statusEmoji = "🔴";
//                                 actionText = "Critical Warning: Insufficient Stock";
//                                 colorClass = "text-red-500";
//                             } else if (ytd >= 4.1 && ytd <= 5) {
//                                 statusEmoji = "🟡";
//                                 actionText = "Stockout Risk";
//                                 colorClass = "text-yellow-600";
//                             } else if (ytd >= 2 && ytd <= 2.4) {
//                                 statusEmoji = "🟡";
//                                 actionText = "Capital Risk (Overstock)";
//                                 colorClass = "text-yellow-600";
//                             } else {
//                                 statusEmoji = "🔴";
//                                 actionText = "Important to Note (Capital Lock)";
//                                 colorClass = "text-red-500";
//                             }
//                         }

//                     } else {
//                       statusEmoji = "⚪";
//                       actionText = "No data available";
//                       colorClass = "text-slate-400";                  
//                     }

//                     }

//                     return (
//                       <tr key={idx} className="hover:bg-slate-50 transition-colors odd:bg-white even:bg-slate-50 group">

//                         <td className="px-4 py-3 font-bold text-slate-800 sticky left-0 z-10 
//                           bg-white group-even:bg-slate-50 group-hover:bg-slate-100 truncate">
//                           {row.plant}
//                         </td>
                        
//                         <td className="px-4 py-3 font-bold uppercase sticky left-[80px] z-10 
//                           bg-white group-even:bg-slate-50 group-hover:bg-slate-100 truncate">
//                           {row.businessUnit}
//                         </td>
                        
//                         <td className="px-4 py-3 font-bold text-center sticky left-[180px] z-10 
//                           bg-white group-even:bg-slate-50 group-hover:bg-slate-100 border-r border-slate-200/50">
//                           {row.year}
//                         </td>

//                         {row.monthlyData.map((m, i) => (
//                           <td key={i} className={`px-2 py-3 text-center border-r border-slate-100 ${m.value === 0 ? 'text-slate-300' : 'text-slate-700 font-medium'}`}>
//                             {m.value > 0 ? `${(m.value).toFixed(1)}` : "-"}
//                           </td>
//                         ))}

//                         <td className="px-4 py-3 text-center font-bold border-r border-slate-100 whitespace-nowrap">
//                           {(row.inventory_turnover_ytd).toFixed(2)}
//                         </td>
//                         <td className={`px-4 py-3 text-center font-bold border-r border-slate-100 whitespace-nowrap ${typeof vsT === 'number' ? colorClass : 'text-slate-400'}`}>
//                           {typeof vsT === 'number' 
//                             ? (vsT > 0 ? `+${vsT.toFixed(2)}` : vsT.toFixed(2)) 
//                             : vsT}
//                         </td>
//                         <td className="px-4 py-3 text-center text-lg leading-none border-r border-slate-100">
//                           {statusEmoji}
//                         </td>
//                         <td className={`px-4 py-3 italic break-words leading-tight ${vsT === '-' ? 'text-green-600' : 'font-medium ' + colorClass}`}>
//                           {actionText}
//                         </td>
//                       </tr>
//                     );
//                   })
//                 ) : (
//                   <tr>
//                     <td colSpan={20} className="py-20 text-center text-slate-400 italic bg-white">
//                       No data found for the selected filter.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//     </main>
//   );
// }

// import Navigation from "@/components/dashboard/Navigation";
// import FilterGroup from "@/components/dashboard/filterGroup";
// import UploadButton from "@/components/dashboard/UploadButton";
// import DownloadButton from "@/components/dashboard/downloadButton";

// import { ITOService } from "@/services/inventoryTurnover";

// export default async function PerformanceDetailPage({
//   searchParams,
// }: {
//   searchParams: Promise<any>;
// }) {
//   const params = await searchParams;
//   const options = await ITOService.getFilterOptions();

//   const selectedYear = params.year
//     ? Number(params.year.split(",")[0])
//     : options.year[0];

//   const selectedPlants = params.plant 
//     ? String(params.plant).split(",").filter((v) => v !== "") 
//     : [];    
    
//   const selectedBU = params.business_unit 
//     ? String(params.business_unit).split(",").filter((v) => v !== "") 
//     : [];    

//   const filters = {
//     year: selectedYear,
//     plants: selectedPlants,
//     business_unit: selectedBU
//   };

//   const performanceData = await ITOService.getMonthlyPerformance(filters);

//   const performanceDOIData = await ITOService.getDOIMonthlyPerformance(filters);

//   console.log(performanceDOIData)

//   return (
//     <main className="min-h-screen bg-slate-50">
//       <header className="bg-gradient-to-br from-[#4bc0f2] to-[#6691dc] pt-4 pb-6 px-6 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4 text-center lg:text-left">
//             <div className="flex flex-col items-center lg:items-start gap-0">
//               <div className="relative h-24 md:h-32 w-auto overflow-hidden flex-shrink-0">
//                 <img 
//                   src="/inventory_turnover.png"
//                   alt="Logo" 
//                   className="h-full w-auto object-contain object-left opacity-20"
//                 />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-black tracking-tighter uppercase">
//                   Monitoring Inventory Turnover
//                 </h1>
//                 <p className="text-xs md:text-sm italic opacity-80 mt-1 text-orange-100">
//                   Striving to achieve the best planning process
//                 </p>
//               </div>
//             </div>
//             <div className="w-full lg:w-auto flex justify-center">
//               <Navigation />
//             </div>
//           </div>
//           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mt-4 pt-4 border-t border-white/20">
//             <div className="flex flex-wrap justify-center lg:justify-start gap-2 order-2 lg:order-1">
//                <FilterGroup options={options} showMonth={false}/>
//             </div>
//             <div className="flex flex-wrap justify-center lg:justify-end gap-3 order-1 lg:order-2">
//               <DownloadButton />
//               <UploadButton />
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
//           <div className="overflow-x-auto text-slate-700">
//             <table className="w-full text-left text-[11px] border-collapse table-fixed">
//               <thead>
//                 <tr className="bg-[#dd8c8d] text-white uppercase tracking-wider font-bold">
//                   <th className="w-[80px] px-4 py-3 sticky left-0 z-20 bg-[#dd8c8d]">Plant Group</th>
//                   <th className="w-[100px] px-4 py-3 sticky left-[80px] z-20 bg-[#dd8c8d]">Segment</th>
//                   <th className="w-[60px] px-4 py-3 text-center sticky left-[180px] z-20 bg-[#dd8c8d]">Year</th>
                  
//                   {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
//                     <th key={m} className="w-[65px] px-2 py-3 border-r border-white/10 text-center">{m}</th>
//                   ))}
                  
//                   <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">YTD Avg</th>
//                   <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">VS Target</th>
//                   <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">Status</th>
//                   <th className="w-[200px] px-4 py-3 text-left">Action Needed</th>
//                 </tr>
//               </thead>
              
//               <tbody className="divide-y divide-slate-100">
//                 {performanceData.length > 0 ? (
//                   performanceData.map((row, idx) => {
//                     const plantThresholds = {
//                       'LPG fish': { 
//                         critical: 4.5, 
//                         stockoutriskmin: 3.8, 
//                         stockoutriskmax: 4.5, 
//                         optimalmin: 3.3, 
//                         optimalmax: 3.8, 
//                         capitalriskmin: 2.5, 
//                         capitalriskmax: 3.3 
//                       },
//                       'MDN fish': { 
//                         critical: 4.5, 
//                         stockoutriskmin: 3.8, 
//                         stockoutriskmax: 4.5, 
//                         optimalmin: 3.3, 
//                         optimalmax: 3.8, 
//                         capitalriskmin: 2.5, 
//                         capitalriskmax: 3.3 
//                       },  
//                       'SPJ fish': { 
//                         critical: 4.3, 
//                         stockoutriskmin: 3.8, 
//                         stockoutriskmax: 4.3, 
//                         optimalmin: 3.0, 
//                         optimalmax: 3.8, 
//                         capitalriskmin: 2.1, 
//                         capitalriskmax: 3.0 
//                       },    
//                       'MDN shrimp': { 
//                         critical: 4.3, 
//                         stockoutriskmin: 3.8, 
//                         stockoutriskmax: 4.3, 
//                         optimalmin: 3.0, 
//                         optimalmax: 3.8, 
//                         capitalriskmin: 2.1, 
//                         capitalriskmax: 3.0 
//                       },    
//                       'LPG shrimp': { 
//                         critical: 5.0, 
//                         stockoutriskmin: 3.8, 
//                         stockoutriskmax: 5.0, 
//                         optimalmin: 2.72, 
//                         optimalmax: 3.8, 
//                         capitalriskmin: 2.0, 
//                         capitalriskmax: 2.72 
//                       }, 
//                       'CKP fish': { 
//                         critical: 5.5, 
//                         stockoutriskmin: 3.8, 
//                         stockoutriskmax: 5.5, 
//                         optimalmin: 2.5, 
//                         optimalmax: 3.8, 
//                         capitalriskmin: 1.8, 
//                         capitalriskmax: 2.5 
//                       },  
//                       'SBY shrimp': { 
//                         critical: 5.5, 
//                         stockoutriskmin: 3.8, 
//                         stockoutriskmax: 5.5, 
//                         optimalmin: 2.5, 
//                         optimalmax: 3.8, 
//                         capitalriskmin: 1.8, 
//                         capitalriskmax: 2.5 
//                       },                                           
//                     };
                    
//                     const key = `${row.plant} ${row.businessUnit}`;
//                     const thresholds = plantThresholds[key as keyof typeof plantThresholds];
//                     const ytd = row.inventory_turnover_ytd;

//                     let vsT: string | number = "-";
//                     let statusEmoji = "";
//                     let actionText = "";
//                     let colorClass = "text-slate-700";

//                     if(ytd !== null){
//                       if (row.year >= 2026) {
//                         if (!thresholds) {
//                             statusEmoji = "⚪";
//                             actionText = "Threshold Not Found";
//                             colorClass = "text-slate-400";
//                         } else {
//                             if (ytd >= thresholds.optimalmin && ytd <= thresholds.optimalmax) {
//                                 statusEmoji = "🟢";
//                                 actionText = "Optimal Stock";
//                                 colorClass = "text-green-600";
//                             } else {
//                                 vsT = ytd < thresholds.optimalmin ? ytd - thresholds.optimalmin : ytd - thresholds.optimalmax;
//                                 if (ytd > thresholds.critical) {
//                                     statusEmoji = "🔴";
//                                     actionText = "Critical Warning: Insufficient Stock";
//                                     colorClass = "text-red-500";
//                                 } else if (ytd > thresholds.stockoutriskmin && ytd <= thresholds.stockoutriskmax) {
//                                     statusEmoji = "🟡";
//                                     actionText = "Stockout Risk";
//                                     colorClass = "text-yellow-600";
//                                 } else if (ytd >= thresholds.capitalriskmin && ytd < thresholds.capitalriskmax) {
//                                     statusEmoji = "🟡";
//                                     actionText = "Capital Risk (Overstock)";
//                                     colorClass = "text-yellow-600";
//                                 } else {
//                                     statusEmoji = "🔴";
//                                     actionText = "Important to Note (Capital Lock)";
//                                     colorClass = "text-red-500";
//                                 }
//                             }
//                         }
//                       } else {
//                         if (ytd >= 2.5 && ytd <= 4) {
//                             statusEmoji = "🟢";
//                             actionText = "Optimal Stock";
//                             colorClass = "text-green-600";
//                         } else {
//                             vsT = ytd < 2.5 ? ytd - 2.5 : ytd - 4;
//                             if (ytd >= 5.1) {
//                                 statusEmoji = "🔴";
//                                 actionText = "Critical Warning: Insufficient Stock";
//                                 colorClass = "text-red-500";
//                             } else if (ytd >= 4.1 && ytd <= 5) {
//                                 statusEmoji = "🟡";
//                                 actionText = "Stockout Risk";
//                                 colorClass = "text-yellow-600";
//                             } else if (ytd >= 2 && ytd <= 2.4) {
//                                 statusEmoji = "🟡";
//                                 actionText = "Capital Risk (Overstock)";
//                                 colorClass = "text-yellow-600";
//                             } else {
//                                 statusEmoji = "🔴";
//                                 actionText = "Important to Note (Capital Lock)";
//                                 colorClass = "text-red-500";
//                             }
//                         }
//                       }
//                     } else {
//                       statusEmoji = "⚪";
//                       actionText = "No data available";
//                       colorClass = "text-slate-400";
//                     }

//                     return (
//                       <tr key={idx} className="hover:bg-slate-50 transition-colors odd:bg-white even:bg-slate-50 group">
//                         <td className="px-4 py-3 font-bold text-slate-800 sticky left-0 z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 truncate">
//                           {row.plant}
//                         </td>
//                         <td className="px-4 py-3 font-bold sticky left-[80px] z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 truncate">
//                           {row.businessUnit.charAt(0).toUpperCase() + row.businessUnit.slice(1)}
//                         </td>
//                         <td className="px-4 py-3 font-bold text-center sticky left-[180px] z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 border-r border-slate-200/50">
//                           {row.year}
//                         </td>

//                         {row.monthlyData.map((m, i) => {
//                           // Tentukan warna berdasarkan threshold jika thresholds tersedia
//                           let mColor = "text-slate-700";
                          
//                           if (m.value === null || m.value === 0) {
//                             mColor = "text-slate-300";
//                           } else if (thresholds) {
//                             if (m.value >= thresholds.optimalmin && m.value <= thresholds.optimalmax) {
//                               mColor = "text-green-600 font-bold";
//                             } else if (m.value > thresholds.critical || m.value < thresholds.capitalriskmin) {
//                               mColor = "text-red-500 font-bold";
//                             } else {
//                               mColor = "text-yellow-600 font-bold";
//                             }
//                           }
                        
//                           return (
//                             <td 
//                               key={i} 
//                               className={`px-2 py-3 text-center border-r border-slate-100 ${mColor}`}
//                             >
//                               {m.value !== null && m.value !== undefined && m.value > 0 
//                                 ? (m.value).toFixed(2) 
//                                 : "-"
//                               }
//                             </td>
//                           );
//                         })}

//                         <td className="px-4 py-3 text-center font-bold border-r border-slate-100 whitespace-nowrap">
//                           {row.inventory_turnover_ytd !== null && row.inventory_turnover_ytd !== undefined 
//                             ? (row.inventory_turnover_ytd).toFixed(2) 
//                             : "-"}
//                         </td>
//                         <td className={`px-4 py-3 text-center font-bold border-r border-slate-100 whitespace-nowrap ${typeof vsT === 'number' ? colorClass : 'text-slate-300'}`}>
//                           {typeof vsT === 'number' ? (vsT > 0 ? `+${vsT.toFixed(2)}` : vsT.toFixed(2)) : "-"}
//                         </td>
//                         <td className="px-4 py-3 text-center text-lg leading-none border-r border-slate-100">
//                           {statusEmoji}
//                         </td>
//                         <td className={`px-4 py-3 italic break-words leading-tight font-medium ${colorClass}`}>
//                           {actionText}
//                         </td>
//                       </tr>
//                     );
//                   })
//                 ) : (
//                   <tr>
//                     <td colSpan={20} className="py-20 text-center text-slate-400 italic bg-white">
//                       No data found for the selected filter.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// import Navigation from "@/components/dashboard/Navigation";
// import FilterGroup from "@/components/dashboard/filterGroup";
// import UploadButton from "@/components/dashboard/UploadButton";
// import DownloadButton from "@/components/dashboard/downloadButton";

// import { ITOService } from "@/services/inventoryTurnover";

// export default async function PerformanceDetailPage({
//   searchParams,
// }: {
//   searchParams: Promise<any>;
// }) {
//   const params = await searchParams;
//   const options = await ITOService.getFilterOptions();

//   const selectedYear = params.year
//     ? Number(params.year.split(",")[0])
//     : options.year[0];

//   const selectedPlants = params.plant 
//     ? String(params.plant).split(",").filter((v) => v !== "") 
//     : [];    
    
//   const selectedBU = params.business_unit 
//     ? String(params.business_unit).split(",").filter((v) => v !== "") 
//     : [];    

//   const filters = {
//     year: selectedYear,
//     plants: selectedPlants,
//     business_unit: selectedBU
//   };

//   const performanceData = await ITOService.getMonthlyPerformance(filters);

//   const performanceDOIData = await ITOService.getDOIMonthlyPerformance(filters);

//   console.log(performanceDOIData)

//   return (
//     <main className="min-h-screen bg-slate-50">
//       <header className="bg-gradient-to-br from-[#4bc0f2] to-[#6691dc] pt-4 pb-6 px-6 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4 text-center lg:text-left">
//             <div className="flex flex-col items-center lg:items-start gap-0">
//               <div className="relative h-24 md:h-32 w-auto overflow-hidden flex-shrink-0">
//                 <img 
//                   src="/inventory_turnover.png"
//                   alt="Logo" 
//                   className="h-full w-auto object-contain object-left opacity-20"
//                 />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-black tracking-tighter uppercase">
//                   Monitoring Inventory Turnover
//                 </h1>
//                 <p className="text-xs md:text-sm italic opacity-80 mt-1 text-orange-100">
//                   Striving to achieve the best planning process
//                 </p>
//               </div>
//             </div>
//             <div className="w-full lg:w-auto flex justify-center">
//               <Navigation />
//             </div>
//           </div>
//           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mt-4 pt-4 border-t border-white/20">
//             <div className="flex flex-wrap justify-center lg:justify-start gap-2 order-2 lg:order-1">
//                <FilterGroup options={options} showMonth={false}/>
//             </div>
//             <div className="flex flex-wrap justify-center lg:justify-end gap-3 order-1 lg:order-2">
//               <DownloadButton />
//               <UploadButton />
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-12">
        
//         {/* ======================= TABLE 1: ITO ======================= */}
//         <div>
//           <h2 className="text-2xl font-bold text-center text-slate-800 mb-4 tracking-wide">
//             Inventory Turnover Performance
//           </h2>
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
//             <div className="overflow-x-auto text-slate-700">
//               <table className="w-full text-left text-[11px] border-collapse table-fixed">
//                 <thead>
//                   <tr className="bg-[#dd8c8d] text-white uppercase tracking-wider font-bold">
//                     <th className="w-[80px] px-4 py-3 sticky left-0 z-20 bg-[#dd8c8d]">Plant</th>
//                     <th className="w-[100px] px-4 py-3 sticky left-[80px] z-20 bg-[#dd8c8d]">Segment</th>
//                     <th className="w-[60px] px-4 py-3 text-center sticky left-[180px] z-20 bg-[#dd8c8d]">Year</th>
                    
//                     {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
//                       <th key={m} className="w-[65px] px-2 py-3 border-r border-white/10 text-center">{m}</th>
//                     ))}
                    
//                     <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">YTD Avg</th>
//                     <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">VS Target</th>
//                     <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">Status</th>
//                     <th className="w-[200px] px-4 py-3 text-left">Action Needed</th>
//                   </tr>
//                 </thead>
                
//                 <tbody className="divide-y divide-slate-100">
//                   {performanceData.length > 0 ? (
//                     performanceData.map((row, idx) => {
//                       const plantThresholds = {
//                         'LPG fish': { 
//                           critical: 4.5, 
//                           stockoutriskmin: 3.8, 
//                           stockoutriskmax: 4.5, 
//                           optimalmin: 3.3, 
//                           optimalmax: 3.8, 
//                           capitalriskmin: 2.5, 
//                           capitalriskmax: 3.3 },
//                         'MDN fish': { 
//                           critical: 4.5, 
//                           stockoutriskmin: 3.8, 
//                           stockoutriskmax: 4.5, 
//                           optimalmin: 3.3, 
//                           optimalmax: 3.8, 
//                           capitalriskmin: 2.5, 
//                           capitalriskmax: 3.3 },  
//                         'SPJ fish': { 
//                           critical: 4.3, 
//                           stockoutriskmin: 3.8, 
//                           stockoutriskmax: 4.3, 
//                           optimalmin: 3.0, 
//                           optimalmax: 3.8, 
//                           capitalriskmin: 2.1, 
//                           capitalriskmax: 3.0 },    
//                         'MDN shrimp': { 
//                           critical: 4.3, 
//                           stockoutriskmin: 3.8, 
//                           stockoutriskmax: 4.3, 
//                           optimalmin: 3.0, 
//                           optimalmax: 3.8, 
//                           capitalriskmin: 2.1, 
//                           capitalriskmax: 3.0 },    
//                         'LPG shrimp': { 
//                           critical: 5.0, 
//                           stockoutriskmin: 3.8, 
//                           stockoutriskmax: 5.0, 
//                           optimalmin: 2.72, 
//                           optimalmax: 3.8, 
//                           capitalriskmin: 2.0, 
//                           capitalriskmax: 2.72 }, 
//                         'CKP fish': { 
//                           critical: 5.5, 
//                           stockoutriskmin: 3.8, 
//                           stockoutriskmax: 5.5, 
//                           optimalmin: 2.5, 
//                           optimalmax: 3.8, 
//                           capitalriskmin: 1.8, 
//                           capitalriskmax: 2.5 },  
//                         'SBY shrimp': { 
//                           critical: 5.5, 
//                           stockoutriskmin: 3.8, 
//                           stockoutriskmax: 5.5, 
//                           optimalmin: 2.5, 
//                           optimalmax: 3.8, 
//                           capitalriskmin: 1.8, 
//                           capitalriskmax: 2.5 },                                          
//                       };
                      
//                       const key = `${row.plant} ${row.businessUnit}`;
//                       const thresholds = plantThresholds[key as keyof typeof plantThresholds];
//                       const ytd = row.inventory_turnover_ytd;

//                       let vsT: string | number = "-";
//                       let statusEmoji = "";
//                       let actionText = "";
//                       let colorClass = "text-slate-700";

//                       if(ytd !== null){
//                         if (row.year >= 2026) {
//                           if (!thresholds) {
//                               statusEmoji = "⚪";
//                               actionText = "Threshold Not Found";
//                               colorClass = "text-slate-400";
//                           } else {
//                               if (ytd >= thresholds.optimalmin && ytd <= thresholds.optimalmax) {
//                                   statusEmoji = "🟢";
//                                   actionText = "Optimal Stock";
//                                   colorClass = "text-green-600";
//                               } else {
//                                   vsT = ytd < thresholds.optimalmin ? ytd - thresholds.optimalmin : ytd - thresholds.optimalmax;
//                                   if (ytd > thresholds.critical) {
//                                       statusEmoji = "🔴";
//                                       actionText = "Critical Warning: Insufficient Stock";
//                                       colorClass = "text-red-500";
//                                   } else if (ytd > thresholds.stockoutriskmin && ytd <= thresholds.stockoutriskmax) {
//                                       statusEmoji = "🟡";
//                                       actionText = "Stockout Risk";
//                                       colorClass = "text-yellow-600";
//                                   } else if (ytd >= thresholds.capitalriskmin && ytd < thresholds.capitalriskmax) {
//                                       statusEmoji = "🟡";
//                                       actionText = "Capital Risk (Overstock)";
//                                       colorClass = "text-yellow-600";
//                                   } else {
//                                       statusEmoji = "🔴";
//                                       actionText = "Important to Note (Capital Lock)";
//                                       colorClass = "text-red-500";
//                                   }
//                               }
//                           }
//                         } else {
//                           if (ytd >= 2.5 && ytd <= 4) {
//                               statusEmoji = "🟢";
//                               actionText = "Optimal Stock";
//                               colorClass = "text-green-600";
//                           } else {
//                               vsT = ytd < 2.5 ? ytd - 2.5 : ytd - 4;
//                               if (ytd >= 5.1) {
//                                   statusEmoji = "🔴";
//                                   actionText = "Critical Warning: Insufficient Stock";
//                                   colorClass = "text-red-500";
//                               } else if (ytd >= 4.1 && ytd <= 5) {
//                                   statusEmoji = "🟡";
//                                   actionText = "Stockout Risk";
//                                   colorClass = "text-yellow-600";
//                               } else if (ytd >= 2 && ytd <= 2.4) {
//                                   statusEmoji = "🟡";
//                                   actionText = "Capital Risk (Overstock)";
//                                   colorClass = "text-yellow-600";
//                               } else {
//                                   statusEmoji = "🔴";
//                                   actionText = "Important to Note (Capital Lock)";
//                                   colorClass = "text-red-500";
//                               }
//                           }
//                         }
//                       } else {
//                         statusEmoji = "⚪";
//                         actionText = "No data available";
//                         colorClass = "text-slate-400";
//                       }

//                       return (
//                         <tr key={idx} className="hover:bg-slate-50 transition-colors odd:bg-white even:bg-slate-50 group">
//                           <td className="px-4 py-3 font-bold text-slate-800 sticky left-0 z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 truncate">
//                             {row.plant}
//                           </td>
//                           <td className="px-4 py-3 font-bold sticky left-[80px] z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 truncate">
//                             {row.businessUnit.charAt(0).toUpperCase() + row.businessUnit.slice(1)}
//                           </td>
//                           <td className="px-4 py-3 font-bold text-center sticky left-[180px] z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 border-r border-slate-200/50">
//                             {row.year}
//                           </td>

//                           {row.monthlyData.map((m: any, i: number) => {
//                             let mColor = "text-slate-700";
                            
//                             if (m.value === null || m.value === 0) {
//                               mColor = "text-slate-300";
//                             } else if (thresholds) {
//                               if (m.value >= thresholds.optimalmin && m.value <= thresholds.optimalmax) {
//                                 mColor = "text-green-600 font-bold";
//                               } else if (m.value > thresholds.critical || m.value < thresholds.capitalriskmin) {
//                                 mColor = "text-red-500 font-bold";
//                               } else {
//                                 mColor = "text-yellow-600 font-bold";
//                               }
//                             }
                          
//                             return (
//                               <td 
//                                 key={i} 
//                                 className={`px-2 py-3 text-center border-r border-slate-100 ${mColor}`}
//                               >
//                                 {m.value !== null && m.value !== undefined && m.value > 0 
//                                   ? (m.value).toFixed(2) 
//                                   : "-"
//                                 }
//                               </td>
//                             );
//                           })}

//                           <td className="px-4 py-3 text-center font-bold border-r border-slate-100 whitespace-nowrap">
//                             {row.inventory_turnover_ytd !== null && row.inventory_turnover_ytd !== undefined 
//                               ? (row.inventory_turnover_ytd).toFixed(2) 
//                               : "-"}
//                           </td>
//                           <td className={`px-4 py-3 text-center font-bold border-r border-slate-100 whitespace-nowrap ${typeof vsT === 'number' ? colorClass : 'text-slate-300'}`}>
//                             {typeof vsT === 'number' ? (vsT > 0 ? `+${vsT.toFixed(2)}` : vsT.toFixed(2)) : "-"}
//                           </td>
//                           <td className="px-4 py-3 text-center text-lg leading-none border-r border-slate-100">
//                             {statusEmoji}
//                           </td>
//                           <td className={`px-4 py-3 italic break-words leading-tight font-medium ${colorClass}`}>
//                             {actionText}
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td colSpan={20} className="py-20 text-center text-slate-400 italic bg-white">
//                         No data found for the selected filter.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* ======================= TABLE 2: DOI ======================= */}
//         <div>
//           <h2 className="text-2xl font-bold text-center text-slate-800 mb-4 tracking-wide">
//             Days of Inventory Performance
//           </h2>
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
//             <div className="overflow-x-auto text-slate-700">
//               <table className="w-full text-left text-[11px] border-collapse table-fixed">
//                 <thead>
//                   <tr className="bg-[#f04487] text-white uppercase tracking-wider font-bold">
//                     <th className="w-[80px] px-4 py-3 sticky left-0 z-20 bg-[#f04487]">Plant</th>
//                     <th className="w-[100px] px-4 py-3 sticky left-[80px] z-20 bg-[#f04487]">Segment</th>
//                     <th className="w-[60px] px-4 py-3 text-center sticky left-[180px] z-20 bg-[#f04487]">Year</th>
                    
//                     {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
//                       <th key={m} className="w-[65px] px-2 py-3 border-r border-white/10 text-center">{m}</th>
//                     ))}
                    
//                     <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">YTD Avg</th>
//                     <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">VS Target</th>
//                     <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">Status</th>
//                     <th className="w-[200px] px-4 py-3 text-left">Action Needed</th>
//                   </tr>
//                 </thead>
                
//                 <tbody className="divide-y divide-slate-100">
//                   {performanceDOIData.length > 0 ? (
//                     performanceDOIData.map((row, idx) => {
//                       // Template Threshold untuk DOI (Silakan diubah nilainya sesuai kebutuhan)
//                       const doiThresholds = {
//                         'LPG fish': { 
//                           critical: 6.5, 
//                           stockoutriskmin: 6.5, 
//                           stockoutriskmax: 8, 
//                           optimalmin: 8, 
//                           optimalmax: 9, 
//                           capitalriskmin: 9, 
//                           capitalriskmax: 12 },
//                         'MDN fish': { 
//                           critical: 6.5, 
//                           stockoutriskmin: 6.5, 
//                           stockoutriskmax: 8, 
//                           optimalmin: 8, 
//                           optimalmax: 9, 
//                           capitalriskmin: 9, 
//                           capitalriskmax: 12 },  
//                         'SPJ fish': { 
//                           critical: 7, 
//                           stockoutriskmin: 7, 
//                           stockoutriskmax: 8, 
//                           optimalmin: 8, 
//                           optimalmax: 10, 
//                           capitalriskmin: 10, 
//                           capitalriskmax: 14 },    
//                         'MDN shrimp': { 
//                           critical: 7, 
//                           stockoutriskmin: 7, 
//                           stockoutriskmax: 8, 
//                           optimalmin: 8, 
//                           optimalmax: 10, 
//                           capitalriskmin: 10, 
//                           capitalriskmax: 14 },    
//                         'LPG shrimp': { 
//                           critical: 6, 
//                           stockoutriskmin: 6, 
//                           stockoutriskmax: 8, 
//                           optimalmin: 8, 
//                           optimalmax: 11, 
//                           capitalriskmin: 11, 
//                           capitalriskmax: 15 }, 
//                         'CKP fish': { 
//                           critical: 5.5, 
//                           stockoutriskmin: 5.5, 
//                           stockoutriskmax: 8, 
//                           optimalmin: 8, 
//                           optimalmax: 12, 
//                           capitalriskmin: 12, 
//                           capitalriskmax: 16.5},  
//                         'SBY shrimp': { 
//                           critical: 5.5, 
//                           stockoutriskmin: 5.5, 
//                           stockoutriskmax: 8, 
//                           optimalmin: 8, 
//                           optimalmax: 12, 
//                           capitalriskmin: 12, 
//                           capitalriskmax: 16.5 },                                          
//                       };
                      
//                       const key = `${row.plant} ${row.businessUnit}`;
//                       const thresholds = doiThresholds[key as keyof typeof doiThresholds];
                      
//                       // NOTE: Sesuaikan 'doi_ytd' jika nama properti yang dikembalikan API berbeda
//                       const ytd = row.days_of_inventory_ytd

//                       let vsT: string | number = "-";
//                       let statusEmoji = "";
//                       let actionText = "";
//                       let colorClass = "text-slate-700";

//                       if(ytd !== null){
//                         if (row.year >= 2026) {
//                           if (!thresholds) {
//                               statusEmoji = "⚪";
//                               actionText = "Threshold Not Found";
//                               colorClass = "text-slate-400";
//                           } else {
//                               if (ytd >= thresholds.optimalmin && ytd <= thresholds.optimalmax) {
//                                   statusEmoji = "🟢";
//                                   actionText = "Optimal Stock";
//                                   colorClass = "text-green-600";
//                               } else {
//                                   vsT = ytd < thresholds.optimalmin ? ytd - thresholds.optimalmin : ytd - thresholds.optimalmax;
//                                   if (ytd > thresholds.critical) {
//                                       statusEmoji = "🔴";
//                                       actionText = "Critical Warning: Insufficient Stock";
//                                       colorClass = "text-red-500";
//                                   } else if (ytd > thresholds.stockoutriskmin && ytd <= thresholds.stockoutriskmax) {
//                                       statusEmoji = "🟡";
//                                       actionText = "Stockout Risk";
//                                       colorClass = "text-yellow-600";
//                                   } else if (ytd >= thresholds.capitalriskmin && ytd < thresholds.capitalriskmax) {
//                                       statusEmoji = "🟡";
//                                       actionText = "Capital Risk (Overstock)";
//                                       colorClass = "text-yellow-600";
//                                   } else {
//                                       statusEmoji = "🔴";
//                                       actionText = "Important to Note (Capital Lock)";
//                                       colorClass = "text-red-500";
//                                   }
//                               }
//                           }
//                         } else {
//                           // Template fallback tahun < 2026 (Silakan disesuaikan)
//                           if (ytd >= 2.5 && ytd <= 4) {
//                               statusEmoji = "🟢";
//                               actionText = "Optimal Stock";
//                               colorClass = "text-green-600";
//                           } else {
//                               vsT = ytd < 2.5 ? ytd - 2.5 : ytd - 4;
//                               if (ytd >= 5.1) {
//                                   statusEmoji = "🔴";
//                                   actionText = "Critical Warning: Insufficient Stock";
//                                   colorClass = "text-red-500";
//                               } else if (ytd >= 4.1 && ytd <= 5) {
//                                   statusEmoji = "🟡";
//                                   actionText = "Stockout Risk";
//                                   colorClass = "text-yellow-600";
//                               } else if (ytd >= 2 && ytd <= 2.4) {
//                                   statusEmoji = "🟡";
//                                   actionText = "Capital Risk (Overstock)";
//                                   colorClass = "text-yellow-600";
//                               } else {
//                                   statusEmoji = "🔴";
//                                   actionText = "Important to Note (Capital Lock)";
//                                   colorClass = "text-red-500";
//                               }
//                           }
//                         }
//                       } else {
//                         statusEmoji = "⚪";
//                         actionText = "No data available";
//                         colorClass = "text-slate-400";
//                       }

//                       return (
//                         <tr key={idx} className="hover:bg-slate-50 transition-colors odd:bg-white even:bg-slate-50 group">
//                           <td className="px-4 py-3 font-bold text-slate-800 sticky left-0 z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 truncate">
//                             {row.plant}
//                           </td>
//                           <td className="px-4 py-3 font-bold sticky left-[80px] z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 truncate">
//                             {row.businessUnit.charAt(0).toUpperCase() + row.businessUnit.slice(1)}
//                           </td>
//                           <td className="px-4 py-3 font-bold text-center sticky left-[180px] z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 border-r border-slate-200/50">
//                             {row.year}
//                           </td>

//                           {row.monthlyData.map((m: any, i: number) => {
//                             let mColor = "text-slate-700";
                            
//                             if (m.value === null || m.value === 0) {
//                               mColor = "text-slate-300";
//                             } else if (thresholds) {
//                               if (m.value >= thresholds.optimalmin && m.value <= thresholds.optimalmax) {
//                                 mColor = "text-green-600 font-bold";
//                               } else if (m.value > thresholds.critical || m.value < thresholds.capitalriskmin) {
//                                 mColor = "text-red-500 font-bold";
//                               } else {
//                                 mColor = "text-yellow-600 font-bold";
//                               }
//                             }
                          
//                             return (
//                               <td 
//                                 key={i} 
//                                 className={`px-2 py-3 text-center border-r border-slate-100 ${mColor}`}
//                               >
//                                 {m.value !== null && m.value !== undefined && m.value > 0 
//                                   ? (m.value).toFixed(2) 
//                                   : "-"
//                                 }
//                               </td>
//                             );
//                           })}

//                           <td className="px-4 py-3 text-center font-bold border-r border-slate-100 whitespace-nowrap">
//                             {ytd !== null && ytd !== undefined 
//                               ? (ytd).toFixed(2) 
//                               : "-"}
//                           </td>
//                           <td className={`px-4 py-3 text-center font-bold border-r border-slate-100 whitespace-nowrap ${typeof vsT === 'number' ? colorClass : 'text-slate-300'}`}>
//                             {typeof vsT === 'number' ? (vsT > 0 ? `+${vsT.toFixed(2)}` : vsT.toFixed(2)) : "-"}
//                           </td>
//                           <td className="px-4 py-3 text-center text-lg leading-none border-r border-slate-100">
//                             {statusEmoji}
//                           </td>
//                           <td className={`px-4 py-3 italic break-words leading-tight font-medium ${colorClass}`}>
//                             {actionText}
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td colSpan={20} className="py-20 text-center text-slate-400 italic bg-white">
//                         No data found for the selected filter.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//       </div>
//     </main>
//   );
// }

// import Navigation from "@/components/dashboard/Navigation";
// import FilterGroup from "@/components/dashboard/filterGroup";
// import UploadButton from "@/components/dashboard/UploadButton";
// import DownloadButton from "@/components/dashboard/downloadButton";

// import { ITOService } from "@/services/inventoryTurnover";

// export default async function PerformanceDetailPage({
//   searchParams,
// }: {
//   searchParams: Promise<any>;
// }) {
//   const params = await searchParams;
//   const options = await ITOService.getFilterOptions();

//   const selectedYear = params.year
//     ? Number(params.year.split(",")[0])
//     : options.year[0];

//   const selectedPlants = params.plant 
//     ? String(params.plant).split(",").filter((v) => v !== "") 
//     : [];    
    
//   const selectedBU = params.business_unit 
//     ? String(params.business_unit).split(",").filter((v) => v !== "") 
//     : [];    

//   const filters = {
//     year: selectedYear,
//     plants: selectedPlants,
//     business_unit: selectedBU
//   };

//   const performanceData = await ITOService.getMonthlyPerformance(filters);

//   const performanceDOIData = await ITOService.getDOIMonthlyPerformance(filters);

//   // console.log(performanceDOIData)

//   return (
//     <main className="min-h-screen bg-slate-50">
//       <header className="bg-gradient-to-br from-[#4bc0f2] to-[#6691dc] pt-4 pb-6 px-6 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4 text-center lg:text-left">
//             <div className="flex flex-col items-center lg:items-start gap-0">
//               <div className="relative h-24 md:h-32 w-auto overflow-hidden flex-shrink-0">
//                 <img 
//                   src="/inventory_turnover.png"
//                   alt="Logo" 
//                   className="h-full w-auto object-contain object-left opacity-20"
//                 />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-black tracking-tighter uppercase">
//                   Monitoring Inventory Turnover
//                 </h1>
//                 <p className="text-xs md:text-sm italic opacity-80 mt-1 text-orange-100">
//                   Striving to achieve the best planning process
//                 </p>
//               </div>
//             </div>
//             <div className="w-full lg:w-auto flex justify-center">
//               <Navigation />
//             </div>
//           </div>
//           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mt-4 pt-4 border-t border-white/20">
//             <div className="flex flex-wrap justify-center lg:justify-start gap-2 order-2 lg:order-1">
//                <FilterGroup options={options} showMonth={false}/>
//             </div>
//             <div className="flex flex-wrap justify-center lg:justify-end gap-3 order-1 lg:order-2">
//               <DownloadButton />
//               <UploadButton />
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-12">
        
//         {/* ======================= TABLE 1: ITO ======================= */}
//         <div>
//           <h2 className="text-2xl font-bold text-center text-slate-800 mb-4 tracking-wide">
//             Inventory Turnover Performance
//           </h2>
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
//             <div className="overflow-x-auto text-slate-700">
//               <table className="w-full text-left text-[11px] border-collapse table-fixed">
//                 <thead>
//                   <tr className="bg-[#dd8c8d] text-white uppercase tracking-wider font-bold">
//                     <th className="w-[80px] px-4 py-3 sticky left-0 z-20 bg-[#dd8c8d]">Plant</th>
//                     <th className="w-[100px] px-4 py-3 sticky left-[80px] z-20 bg-[#dd8c8d]">Segment</th>
//                     <th className="w-[60px] px-4 py-3 text-center sticky left-[180px] z-20 bg-[#dd8c8d]">Year</th>
                    
//                     {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
//                       <th key={m} className="w-[65px] px-2 py-3 border-r border-white/10 text-center">{m}</th>
//                     ))}
                    
//                     <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">YTD Avg</th>
//                     <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">VS Target</th>
//                     <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">Status</th>
//                     <th className="w-[200px] px-4 py-3 text-left">Action Needed</th>
//                   </tr>
//                 </thead>
                
//                 <tbody suppressHydrationWarning className="divide-y divide-slate-100">
//                   {performanceData.length > 0 ? (
//                     performanceData.map((row, idx) => {
//                       const plantThresholds = {
//                         'LPG fish': { 
//                           critical: 4.5, 
//                           stockoutriskmin: 3.8, 
//                           stockoutriskmax: 4.5, 
//                           optimalmin: 3.3, 
//                           optimalmax: 3.8, 
//                           capitalriskmin: 2.5, 
//                           capitalriskmax: 3.3 },
//                         'MDN fish': { 
//                           critical: 4.5, 
//                           stockoutriskmin: 3.8, 
//                           stockoutriskmax: 4.5, 
//                           optimalmin: 3.3, 
//                           optimalmax: 3.8, 
//                           capitalriskmin: 2.5, 
//                           capitalriskmax: 3.3 },  
//                         'SPJ fish': { 
//                           critical: 4.3, 
//                           stockoutriskmin: 3.8, 
//                           stockoutriskmax: 4.3, 
//                           optimalmin: 3.0, 
//                           optimalmax: 3.8, 
//                           capitalriskmin: 2.1, 
//                           capitalriskmax: 3.0 },    
//                         'MDN shrimp': { 
//                           critical: 4.3, 
//                           stockoutriskmin: 3.8, 
//                           stockoutriskmax: 4.3, 
//                           optimalmin: 3.0, 
//                           optimalmax: 3.8, 
//                           capitalriskmin: 2.1, 
//                           capitalriskmax: 3.0 },    
//                         'LPG shrimp': { 
//                           critical: 5.0, 
//                           stockoutriskmin: 3.8, 
//                           stockoutriskmax: 5.0, 
//                           optimalmin: 2.72, 
//                           optimalmax: 3.8, 
//                           capitalriskmin: 2.0, 
//                           capitalriskmax: 2.72 }, 
//                         'CKP fish': { 
//                           critical: 5.5, 
//                           stockoutriskmin: 3.8, 
//                           stockoutriskmax: 5.5, 
//                           optimalmin: 2.5, 
//                           optimalmax: 3.8, 
//                           capitalriskmin: 1.8, 
//                           capitalriskmax: 2.5 },  
//                         'SBY shrimp': { 
//                           critical: 5.5, 
//                           stockoutriskmin: 3.8, 
//                           stockoutriskmax: 5.5, 
//                           optimalmin: 2.5, 
//                           optimalmax: 3.8, 
//                           capitalriskmin: 1.8, 
//                           capitalriskmax: 2.5 },                                          
//                       };
                      
//                       const key = `${row.plant} ${row.businessUnit}`;
//                       const thresholds = plantThresholds[key as keyof typeof plantThresholds];
//                       const ytd = row.inventory_turnover_ytd;

//                       let vsT: string | number = "-";
//                       let statusEmoji = "";
//                       let actionText = "";
//                       let colorClass = "text-slate-700";

//                       if(ytd !== null){
//                         if (row.year >= 2026) {
//                           if (!thresholds) {
//                               statusEmoji = "⚪";
//                               actionText = "Threshold Not Found";
//                               colorClass = "text-slate-400";
//                           } else {
//                               if (ytd >= thresholds.optimalmin && ytd <= thresholds.optimalmax) {
//                                   statusEmoji = "🟢";
//                                   actionText = "Optimal Stock";
//                                   colorClass = "text-green-600";
//                               } else {
//                                   vsT = ytd < thresholds.optimalmin ? ytd - thresholds.optimalmin : ytd - thresholds.optimalmax;
//                                   if (ytd > thresholds.critical) {
//                                       statusEmoji = "🔴";
//                                       actionText = "Critical Warning: Insufficient Stock";
//                                       colorClass = "text-red-500";
//                                   } else if (ytd > thresholds.stockoutriskmin && ytd <= thresholds.stockoutriskmax) {
//                                       statusEmoji = "🟡";
//                                       actionText = "Stockout Risk";
//                                       colorClass = "text-yellow-600";
//                                   } else if (ytd >= thresholds.capitalriskmin && ytd < thresholds.capitalriskmax) {
//                                       statusEmoji = "🟡";
//                                       actionText = "Capital Risk (Overstock)";
//                                       colorClass = "text-yellow-600";
//                                   } else {
//                                       statusEmoji = "🔴";
//                                       actionText = "Important to Note (Capital Lock)";
//                                       colorClass = "text-red-500";
//                                   }
//                               }
//                           }
//                         } else {
//                           if (ytd >= 2.5 && ytd <= 4) {
//                               statusEmoji = "🟢";
//                               actionText = "Optimal Stock";
//                               colorClass = "text-green-600";
//                           } else {
//                               vsT = ytd < 2.5 ? ytd - 2.5 : ytd - 4;
//                               if (ytd >= 5.1) {
//                                   statusEmoji = "🔴";
//                                   actionText = "Critical Warning: Insufficient Stock";
//                                   colorClass = "text-red-500";
//                               } else if (ytd >= 4.1 && ytd <= 5) {
//                                   statusEmoji = "🟡";
//                                   actionText = "Stockout Risk";
//                                   colorClass = "text-yellow-600";
//                               } else if (ytd >= 2 && ytd <= 2.4) {
//                                   statusEmoji = "🟡";
//                                   actionText = "Capital Risk (Overstock)";
//                                   colorClass = "text-yellow-600";
//                               } else {
//                                   statusEmoji = "🔴";
//                                   actionText = "Important to Note (Capital Lock)";
//                                   colorClass = "text-red-500";
//                               }
//                           }
//                         }
//                       } else {
//                         statusEmoji = "⚪";
//                         actionText = "No data available";
//                         colorClass = "text-slate-400";
//                       }

//                       return (
//                         <tr key={idx} className="hover:bg-slate-50 transition-colors odd:bg-white even:bg-slate-50 group">
//                           <td className="px-4 py-3 font-bold text-slate-800 sticky left-0 z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 truncate">
//                             {row.plant}
//                           </td>
//                           <td className="px-4 py-3 font-bold sticky left-[80px] z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 truncate">
//                             {row.businessUnit.charAt(0).toUpperCase() + row.businessUnit.slice(1)}
//                           </td>
//                           <td className="px-4 py-3 font-bold text-center sticky left-[180px] z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 border-r border-slate-200/50">
//                             {row.year}
//                           </td>

//                           {row.monthlyData.map((m: any, i: number) => {
//                             let mColor = "text-slate-700";
                            
//                             if (m.value === null || m.value === 0) {
//                               mColor = "text-slate-300";
//                             } else if (thresholds) {
//                               if (m.value >= thresholds.optimalmin && m.value <= thresholds.optimalmax) {
//                                 mColor = "text-green-600 font-bold";
//                               } else if (m.value > thresholds.stockoutriskmax || m.value < thresholds.capitalriskmin) {
//                                 mColor = "text-red-500 font-bold";
//                               } else {
//                                 mColor = "text-yellow-600 font-bold";
//                               }
//                             }
                          
//                             return (
//                               <td 
//                                 key={i} 
//                                 className={`px-2 py-3 text-center border-r border-slate-100 ${mColor}`}
//                               >
//                                 {m.value !== null && m.value !== undefined && m.value > 0 
//                                   ? (m.value).toFixed(2) 
//                                   : "-"
//                                 }
//                               </td>
//                             );
//                           })}

//                           <td className="px-4 py-3 text-center font-bold border-r border-slate-100 whitespace-nowrap">
//                             {row.inventory_turnover_ytd !== null && row.inventory_turnover_ytd !== undefined 
//                               ? (row.inventory_turnover_ytd).toFixed(2) 
//                               : "-"}
//                           </td>
//                           <td className={`px-4 py-3 text-center font-bold border-r border-slate-100 whitespace-nowrap ${typeof vsT === 'number' ? colorClass : 'text-slate-300'}`}>
//                             {typeof vsT === 'number' ? (vsT > 0 ? `+${vsT.toFixed(2)}` : vsT.toFixed(2)) : "-"}
//                           </td>
//                           <td className="px-4 py-3 text-center text-lg leading-none border-r border-slate-100">
//                             {statusEmoji}
//                           </td>
//                           <td className={`px-4 py-3 italic break-words leading-tight font-medium ${colorClass}`}>
//                             {actionText}
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       {/* Diubah menjadi 19 agar persis dengan jumlah TH */}
//                       <td colSpan={19} className="py-20 text-center text-slate-400 italic bg-white">
//                         No data found for the selected filter.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* ======================= TABLE 2: DOI ======================= */}
//         <div>
//           <h2 className="text-2xl font-bold text-center text-slate-800 mb-4 tracking-wide">
//             Days of Inventory Performance
//           </h2>
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
//             <div className="overflow-x-auto text-slate-700">
//               <table className="w-full text-left text-[11px] border-collapse table-fixed">
//                 <thead>
//                   <tr className="bg-[#f04487] text-white uppercase tracking-wider font-bold">
//                     <th className="w-[80px] px-4 py-3 sticky left-0 z-20 bg-[#f04487]">Plant</th>
//                     <th className="w-[100px] px-4 py-3 sticky left-[80px] z-20 bg-[#f04487]">Segment</th>
//                     <th className="w-[60px] px-4 py-3 text-center sticky left-[180px] z-20 bg-[#f04487]">Year</th>
                    
//                     {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
//                       <th key={m} className="w-[65px] px-2 py-3 border-r border-white/10 text-center">{m}</th>
//                     ))}
                    
//                     <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">YTD Avg</th>
//                     <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">VS Target</th>
//                     <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">Status</th>
//                     <th className="w-[200px] px-4 py-3 text-left">Action Needed</th>
//                   </tr>
//                 </thead>
                
//                 <tbody suppressHydrationWarning className="divide-y divide-slate-100">
//                   {performanceDOIData.length > 0 ? (
//                     performanceDOIData.map((row, idx) => {
//                       const doiThresholds = {
//                         'LPG fish': { 
//                           critical: 6.5, 
//                           stockoutriskmin: 6.5, 
//                           stockoutriskmax: 8, 
//                           optimalmin: 8, 
//                           optimalmax: 9, 
//                           capitalriskmin: 9, 
//                           capitalriskmax: 12 },
//                         'MDN fish': { 
//                           critical: 6.5, 
//                           stockoutriskmin: 6.5, 
//                           stockoutriskmax: 8, 
//                           optimalmin: 8, 
//                           optimalmax: 9, 
//                           capitalriskmin: 9, 
//                           capitalriskmax: 12 },  
//                         'SPJ fish': { 
//                           critical: 7, 
//                           stockoutriskmin: 7, 
//                           stockoutriskmax: 8, 
//                           optimalmin: 8, 
//                           optimalmax: 10, 
//                           capitalriskmin: 10, 
//                           capitalriskmax: 14 },    
//                         'MDN shrimp': { 
//                           critical: 7, 
//                           stockoutriskmin: 7, 
//                           stockoutriskmax: 8, 
//                           optimalmin: 8, 
//                           optimalmax: 10, 
//                           capitalriskmin: 10, 
//                           capitalriskmax: 14 },    
//                         'LPG shrimp': { 
//                           critical: 6, 
//                           stockoutriskmin: 6, 
//                           stockoutriskmax: 8, 
//                           optimalmin: 8, 
//                           optimalmax: 11, 
//                           capitalriskmin: 11, 
//                           capitalriskmax: 15 }, 
//                         'CKP fish': { 
//                           critical: 5.5, 
//                           stockoutriskmin: 5.5, 
//                           stockoutriskmax: 8, 
//                           optimalmin: 8, 
//                           optimalmax: 12, 
//                           capitalriskmin: 12, 
//                           capitalriskmax: 16.5},  
//                         'SBY shrimp': { 
//                           critical: 5.5, 
//                           stockoutriskmin: 5.5, 
//                           stockoutriskmax: 8, 
//                           optimalmin: 8, 
//                           optimalmax: 12, 
//                           capitalriskmin: 12, 
//                           capitalriskmax: 16.5 },                                          
//                       };
                      
//                       const key = `${row.plant} ${row.businessUnit}`;
//                       const thresholds = doiThresholds[key as keyof typeof doiThresholds];
                      
//                       const ytd = row.days_of_inventory_ytd

//                       let vsT: string | number = "-";
//                       let statusEmoji = "";
//                       let actionText = "";
//                       let colorClass = "text-slate-700";

//                       if(ytd !== null){
//                         if (row.year >= 2026) {
//                           if (!thresholds) {
//                               statusEmoji = "⚪";
//                               actionText = "Threshold Not Found";
//                               colorClass = "text-slate-400";
//                           } else {
//                               if (ytd >= thresholds.optimalmin && ytd <= thresholds.optimalmax) {
//                                   statusEmoji = "🟢";
//                                   actionText = "Optimal Stock";
//                                   colorClass = "text-green-600";
//                               } else {
//                                   vsT = ytd < thresholds.optimalmin ? ytd - thresholds.optimalmin : ytd - thresholds.optimalmax;
                                  
//                                   // LOGIKA DOI DIBALIK: Lebih kecil berarti Insufficient Stock, Lebih besar berarti Capital Lock
//                                   if (ytd < thresholds.stockoutriskmin) {
//                                       statusEmoji = "🔴";
//                                       actionText = "Critical Warning: Insufficient Stock";
//                                       colorClass = "text-red-500";
//                                   } else if (ytd >= thresholds.stockoutriskmin && ytd < thresholds.optimalmin) {
//                                       statusEmoji = "🟡";
//                                       actionText = "Stockout Risk";
//                                       colorClass = "text-yellow-600";
//                                   } else if (ytd > thresholds.optimalmax && ytd <= thresholds.capitalriskmax) {
//                                       statusEmoji = "🟡";
//                                       actionText = "Capital Risk (Overstock)";
//                                       colorClass = "text-yellow-600";
//                                   } else {
//                                       statusEmoji = "🔴";
//                                       actionText = "Important to Note (Capital Lock)";
//                                       colorClass = "text-red-500";
//                                   }
//                               }
//                           }
//                         } else {
//                           if (ytd >= 2.5 && ytd <= 4) {
//                               statusEmoji = "🟢";
//                               actionText = "Optimal Stock";
//                               colorClass = "text-green-600";
//                           } else {
//                               vsT = ytd < 2.5 ? ytd - 2.5 : ytd - 4;
//                               if (ytd >= 5.1) {
//                                   statusEmoji = "🔴";
//                                   actionText = "Critical Warning: Insufficient Stock";
//                                   colorClass = "text-red-500";
//                               } else if (ytd >= 4.1 && ytd <= 5) {
//                                   statusEmoji = "🟡";
//                                   actionText = "Stockout Risk";
//                                   colorClass = "text-yellow-600";
//                               } else if (ytd >= 2 && ytd <= 2.4) {
//                                   statusEmoji = "🟡";
//                                   actionText = "Capital Risk (Overstock)";
//                                   colorClass = "text-yellow-600";
//                               } else {
//                                   statusEmoji = "🔴";
//                                   actionText = "Important to Note (Capital Lock)";
//                                   colorClass = "text-red-500";
//                               }
//                           }
//                         }
//                       } else {
//                         statusEmoji = "⚪";
//                         actionText = "No data available";
//                         colorClass = "text-slate-400";
//                       }

//                       return (
//                         <tr key={idx} className="hover:bg-slate-50 transition-colors odd:bg-white even:bg-slate-50 group">
//                           <td className="px-4 py-3 font-bold text-slate-800 sticky left-0 z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 truncate">
//                             {row.plant}
//                           </td>
//                           <td className="px-4 py-3 font-bold sticky left-[80px] z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 truncate">
//                             {row.businessUnit.charAt(0).toUpperCase() + row.businessUnit.slice(1)}
//                           </td>
//                           <td className="px-4 py-3 font-bold text-center sticky left-[180px] z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 border-r border-slate-200/50">
//                             {row.year}
//                           </td>

//                           {row.monthlyData.map((m: any, i: number) => {
//                             let mColor = "text-slate-700";
                            
//                             if (m.value === null || m.value === 0) {
//                               mColor = "text-slate-300";
//                             } else if (thresholds) {
//                               if (m.value >= thresholds.optimalmin && m.value <= thresholds.optimalmax) {
//                                 mColor = "text-green-600 font-bold";
//                               } else if (m.value < thresholds.stockoutriskmin || m.value > thresholds.capitalriskmax) { // LOGIKA DOI DIBALIK UNTUK WARNA BULANAN
//                                 mColor = "text-red-500 font-bold";
//                               } else {
//                                 mColor = "text-yellow-600 font-bold";
//                               }
//                             }
                          
//                             return (
//                               <td 
//                                 key={i} 
//                                 className={`px-2 py-3 text-center border-r border-slate-100 ${mColor}`}
//                               >
//                                 {m.value !== null && m.value !== undefined && m.value > 0 
//                                   ? (m.value).toFixed(2) 
//                                   : "-"
//                                 }
//                               </td>
//                             );
//                           })}

//                           <td className="px-4 py-3 text-center font-bold border-r border-slate-100 whitespace-nowrap">
//                             {ytd !== null && ytd !== undefined 
//                               ? (ytd).toFixed(2) 
//                               : "-"}
//                           </td>
//                           <td className={`px-4 py-3 text-center font-bold border-r border-slate-100 whitespace-nowrap ${typeof vsT === 'number' ? colorClass : 'text-slate-300'}`}>
//                             {typeof vsT === 'number' ? (vsT > 0 ? `+${vsT.toFixed(2)}` : vsT.toFixed(2)) : "-"}
//                           </td>
//                           <td className="px-4 py-3 text-center text-lg leading-none border-r border-slate-100">
//                             {statusEmoji}
//                           </td>
//                           <td className={`px-4 py-3 italic break-words leading-tight font-medium ${colorClass}`}>
//                             {actionText}
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       {/* Diubah menjadi 19 agar persis dengan jumlah TH */}
//                       <td colSpan={19} className="py-20 text-center text-slate-400 italic bg-white">
//                         No data found for the selected filter.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//       </div>
//     </main>
//   );
// }

import Navigation from "@/components/dashboard/Navigation";
import FilterGroup from "@/components/dashboard/filterGroup";
import UploadButton from "@/components/dashboard/UploadButton";
import DownloadButton from "@/components/dashboard/downloadButton";

import { ITOService } from "@/services/inventoryTurnover";

export default async function PerformanceDetailPage({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const params = await searchParams;
  const options = await ITOService.getFilterOptions();

  const selectedYear = params.year
    ? Number(params.year.split(",")[0])
    : options.year[0];

  const selectedPlants = params.plant 
    ? String(params.plant).split(",").filter((v) => v !== "") 
    : [];    
    
  const selectedBU = params.business_unit 
    ? String(params.business_unit).split(",").filter((v) => v !== "") 
    : [];    

  const filters = {
    year: selectedYear,
    plants: selectedPlants,
    business_unit: selectedBU
  };

  const performanceData = await ITOService.getMonthlyPerformance(filters);
  const performanceDOIData = await ITOService.getDOIMonthlyPerformance(filters);

  // console.log(performanceDOIData);

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-br from-[#4bc0f2] to-[#6691dc] pt-4 pb-6 px-6 text-white shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start gap-0">
              <div className="relative h-24 md:h-32 w-auto overflow-hidden flex-shrink-0">
                <img 
                  src="/inventory_turnover.png"
                  alt="Logo" 
                  className="h-full w-auto object-contain object-left opacity-20"
                />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter uppercase">
                  Monitoring Inventory Turnover
                </h1>
                <p className="text-xs md:text-sm italic opacity-80 mt-1 text-orange-100">
                  Striving to achieve the best planning process
                </p>
              </div>
            </div>
            <div className="w-full lg:w-auto flex justify-center">
              <Navigation />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 order-2 lg:order-1">
               <FilterGroup options={options} showMonth={false}/>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-3 order-1 lg:order-2">
              <DownloadButton />
              <UploadButton />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-12">
        
        {/* ======================= TABLE 1: ITO ======================= */}
        <div>
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-4 tracking-wide">
            Inventory Turnover Performance
          </h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
            <div className="overflow-x-auto text-slate-700">
            <table suppressHydrationWarning className="w-full text-left text-[11px] border-collapse table-fixed">
                <thead suppressHydrationWarning>
                  <tr className="bg-[#dd8c8d] text-white uppercase tracking-wider font-bold">
                    <th className="w-[80px] px-4 py-3 sticky left-0 z-20 bg-[#dd8c8d]">Plant</th>
                    <th className="w-[100px] px-4 py-3 sticky left-[80px] z-20 bg-[#dd8c8d]">Segment</th>
                    <th className="w-[60px] px-4 py-3 text-center sticky left-[180px] z-20 bg-[#dd8c8d]">Year</th>
                    
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                      <th key={m} className="w-[65px] px-2 py-3 border-r border-white/10 text-center">{m}</th>
                    ))}
                    
                    <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">YTD Avg</th>
                    <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">VS Target</th>
                    <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">Status</th>
                    <th className="w-[200px] px-4 py-3 text-left">Action Needed</th>
                  </tr>
                </thead>
                
                <tbody suppressHydrationWarning className="divide-y divide-slate-100">
                  {performanceData.length > 0 ? (
                    performanceData.map((row, idx) => {
                      const plantThresholds = {
                        'LPG fish': { 
                          critical: 4.5, 
                          stockoutriskmin: 3.8, 
                          stockoutriskmax: 4.5, 
                          optimalmin: 3.3, 
                          optimalmax: 3.8, 
                          capitalriskmin: 2.5, 
                          capitalriskmax: 3.3 },
                        'MDN fish': { 
                          critical: 4.5, 
                          stockoutriskmin: 3.8, 
                          stockoutriskmax: 4.5, 
                          optimalmin: 3.3, 
                          optimalmax: 3.8, 
                          capitalriskmin: 2.5, 
                          capitalriskmax: 3.3 },  
                        'SPJ fish': { 
                          critical: 4.3, 
                          stockoutriskmin: 3.8, 
                          stockoutriskmax: 4.3, 
                          optimalmin: 3.0, 
                          optimalmax: 3.8, 
                          capitalriskmin: 2.1, 
                          capitalriskmax: 3.0 },    
                        'MDN shrimp': { 
                          critical: 4.3, 
                          stockoutriskmin: 3.8, 
                          stockoutriskmax: 4.3, 
                          optimalmin: 3.0, 
                          optimalmax: 3.8, 
                          capitalriskmin: 2.1, 
                          capitalriskmax: 3.0 },    
                        'LPG shrimp': { 
                          critical: 5.0, 
                          stockoutriskmin: 3.8, 
                          stockoutriskmax: 5.0, 
                          optimalmin: 2.72, 
                          optimalmax: 3.8, 
                          capitalriskmin: 2.0, 
                          capitalriskmax: 2.72 }, 
                        'CKP fish': { 
                          critical: 5.5, 
                          stockoutriskmin: 3.8, 
                          stockoutriskmax: 5.5, 
                          optimalmin: 2.5, 
                          optimalmax: 3.8, 
                          capitalriskmin: 1.8, 
                          capitalriskmax: 2.5 },  
                        'SBY shrimp': { 
                          critical: 5.5, 
                          stockoutriskmin: 3.8, 
                          stockoutriskmax: 5.5, 
                          optimalmin: 2.5, 
                          optimalmax: 3.8, 
                          capitalriskmin: 1.8, 
                          capitalriskmax: 2.5 },                                        
                      };
                      
                      const key = `${row.plant} ${row.businessUnit}`;
                      const thresholds = plantThresholds[key as keyof typeof plantThresholds];
                      const ytd = row.inventory_turnover_ytd;

                      let vsT: string | number = "-";
                      let statusEmoji = "";
                      let actionText = "";
                      let colorClass = "text-slate-700";

                      if(ytd !== null){
                        if (row.year >= 2026) {
                          if (!thresholds) {
                              statusEmoji = "⚪";
                              actionText = "Threshold Not Found";
                              colorClass = "text-slate-400";
                          } else {
                              if (ytd >= thresholds.optimalmin && ytd <= thresholds.optimalmax) {
                                  statusEmoji = "🟢";
                                  actionText = "Optimal Stock";
                                  colorClass = "text-green-600";
                              } else {
                                  vsT = ytd < thresholds.optimalmin ? ytd - thresholds.optimalmin : ytd - thresholds.optimalmax;
                                  
                                  // Logika ITO: Makin besar makin Insufficient (Merah), Makin kecil makin Capital Lock (Merah)
                                  if (ytd > thresholds.critical) {
                                      statusEmoji = "🔴";
                                      actionText = "Critical Warning: Insufficient Stock";
                                      colorClass = "text-red-500";
                                  } else if (ytd > thresholds.optimalmax && ytd <= thresholds.critical) {
                                      statusEmoji = "🟡";
                                      actionText = "Stockout Risk";
                                      colorClass = "text-yellow-600";
                                  } else if (ytd >= thresholds.capitalriskmin && ytd < thresholds.optimalmin) {
                                      statusEmoji = "🟡";
                                      actionText = "Capital Risk (Overstock)";
                                      colorClass = "text-yellow-600";
                                  } else {
                                      statusEmoji = "🔴";
                                      actionText = "Important to Note (Capital Lock)";
                                      colorClass = "text-red-500";
                                  }
                              }
                          }
                        } else {
                          // Fallback < 2026
                          if (ytd >= 2.5 && ytd <= 4) {
                              statusEmoji = "🟢";
                              actionText = "Optimal Stock";
                              colorClass = "text-green-600";
                          } else {
                              vsT = ytd < 2.5 ? ytd - 2.5 : ytd - 4;
                              if (ytd >= 5.1) {
                                  statusEmoji = "🔴";
                                  actionText = "Critical Warning: Insufficient Stock";
                                  colorClass = "text-red-500";
                              } else if (ytd > 4 && ytd < 5.1) {
                                  statusEmoji = "🟡";
                                  actionText = "Stockout Risk";
                                  colorClass = "text-yellow-600";
                              } else if (ytd >= 2 && ytd < 2.5) {
                                  statusEmoji = "🟡";
                                  actionText = "Capital Risk (Overstock)";
                                  colorClass = "text-yellow-600";
                              } else {
                                  statusEmoji = "🔴";
                                  actionText = "Important to Note (Capital Lock)";
                                  colorClass = "text-red-500";
                              }
                          }
                        }
                      } else {
                        statusEmoji = "⚪";
                        actionText = "No data available";
                        colorClass = "text-slate-400";
                      }

                      return (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors odd:bg-white even:bg-slate-50 group">
                          <td className="px-4 py-3 font-bold text-slate-800 sticky left-0 z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 truncate">
                            {row.plant}
                          </td>
                          <td className="px-4 py-3 font-bold sticky left-[80px] z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 truncate">
                            {row.businessUnit.charAt(0).toUpperCase() + row.businessUnit.slice(1)}
                          </td>
                          <td className="px-4 py-3 font-bold text-center sticky left-[180px] z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 border-r border-slate-200/50">
                            {row.year}
                          </td>

                          {row.monthlyData.map((m: any, i: number) => {
                            let mColor = "text-slate-700";
                            
                            if (m.value === null || m.value === 0) {
                              mColor = "text-slate-300";
                            } else if (thresholds) {
                              // ITO Monthly Logic
                              if (m.value >= thresholds.optimalmin && m.value <= thresholds.optimalmax) {
                                mColor = "text-green-600";
                              } else if (m.value > thresholds.critical || m.value < thresholds.capitalriskmin) {
                                mColor = "text-red-500";
                              } else {
                                mColor = "text-yellow-600";
                              }
                            }
                            
                            return (
                              <td 
                                key={i} 
                                className={`px-2 py-3 text-center border-r border-slate-100 ${mColor}`}
                              >
                                {m.value !== null && m.value !== undefined && m.value > 0 
                                  ? (m.value).toFixed(2) 
                                  : "-"
                                }
                              </td>
                            );
                          })}

                          <td className="px-4 py-3 text-center font-bold border-r border-slate-100 whitespace-nowrap">
                            {row.inventory_turnover_ytd !== null && row.inventory_turnover_ytd !== undefined 
                              ? (row.inventory_turnover_ytd).toFixed(2) 
                              : "-"}
                          </td>
                          <td className={`px-4 py-3 text-center font-bold border-r border-slate-100 whitespace-nowrap ${typeof vsT === 'number' ? colorClass : 'text-slate-300'}`}>
                            {typeof vsT === 'number' ? (vsT > 0 ? `+${vsT.toFixed(2)}` : vsT.toFixed(2)) : "-"}
                          </td>
                          <td className="px-4 py-3 text-center text-lg leading-none border-r border-slate-100">
                            {statusEmoji}
                          </td>
                          <td className={`px-4 py-3 italic break-words leading-tight font-medium ${colorClass}`}>
                            {actionText}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={20} className="py-20 text-center text-slate-400 italic bg-white">
                        No data found for the selected filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ======================= TABLE 2: DOI ======================= */}
        <div>
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-4 tracking-wide">
            Days of Inventory Performance
          </h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
            <div className="overflow-x-auto text-slate-700">
              <table className="w-full text-left text-[11px] border-collapse table-fixed">
                <thead>
                  <tr className="bg-[#f04487] text-white uppercase tracking-wider font-bold">
                    <th className="w-[80px] px-4 py-3 sticky left-0 z-20 bg-[#f04487]">Plant</th>
                    <th className="w-[100px] px-4 py-3 sticky left-[80px] z-20 bg-[#f04487]">Segment</th>
                    <th className="w-[60px] px-4 py-3 text-center sticky left-[180px] z-20 bg-[#f04487]">Year</th>
                    
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                      <th key={m} className="w-[65px] px-2 py-3 border-r border-white/10 text-center">{m}</th>
                    ))}
                    
                    <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">YTD Avg</th>
                    <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">VS Target</th>
                    <th className="w-[80px] px-4 py-3 border-r border-white/10 text-center">Status</th>
                    <th className="w-[200px] px-4 py-3 text-left">Action Needed</th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-slate-100">
                  {performanceDOIData.length > 0 ? (
                    performanceDOIData.map((row, idx) => {
                      const doiThresholds = {
                        'LPG fish': { 
                          critical: 6.5, 
                          stockoutriskmin: 6.5, 
                          stockoutriskmax: 8, 
                          optimalmin: 8, 
                          optimalmax: 9, 
                          capitalriskmin: 9, 
                          capitalriskmax: 12 },
                        'MDN fish': { 
                          critical: 6.5, 
                          stockoutriskmin: 6.5, 
                          stockoutriskmax: 8, 
                          optimalmin: 8, 
                          optimalmax: 9, 
                          capitalriskmin: 9, 
                          capitalriskmax: 12 },  
                        'SPJ fish': { 
                          critical: 7, 
                          stockoutriskmin: 7, 
                          stockoutriskmax: 8, 
                          optimalmin: 8, 
                          optimalmax: 10, 
                          capitalriskmin: 10, 
                          capitalriskmax: 14 },    
                        'MDN shrimp': { 
                          critical: 7, 
                          stockoutriskmin: 7, 
                          stockoutriskmax: 8, 
                          optimalmin: 8, 
                          optimalmax: 10, 
                          capitalriskmin: 10, 
                          capitalriskmax: 14 },    
                        'LPG shrimp': { 
                          critical: 6, 
                          stockoutriskmin: 6, 
                          stockoutriskmax: 8, 
                          optimalmin: 8, 
                          optimalmax: 11, 
                          capitalriskmin: 11, 
                          capitalriskmax: 15 }, 
                        'CKP fish': { 
                          critical: 5.5, 
                          stockoutriskmin: 5.5, 
                          stockoutriskmax: 8, 
                          optimalmin: 8, 
                          optimalmax: 12, 
                          capitalriskmin: 12, 
                          capitalriskmax: 16.5},  
                        'SBY shrimp': { 
                          critical: 5.5, 
                          stockoutriskmin: 5.5, 
                          stockoutriskmax: 8, 
                          optimalmin: 8, 
                          optimalmax: 12, 
                          capitalriskmin: 12, 
                          capitalriskmax: 16.5 },                                        
                      };
                      
                      const key = `${row.plant} ${row.businessUnit}`;
                      const thresholds = doiThresholds[key as keyof typeof doiThresholds];
                      
                      const ytd = row.days_of_inventory_ytd;

                      let vsT: string | number = "-";
                      let statusEmoji = "";
                      let actionText = "";
                      let colorClass = "text-slate-700";

                      if(ytd !== null){
                        if (row.year >= 2026) {
                          if (!thresholds) {
                              statusEmoji = "⚪";
                              actionText = "Threshold Not Found";
                              colorClass = "text-slate-400";
                          } else {
                              if (ytd >= thresholds.optimalmin && ytd <= thresholds.optimalmax) {
                                  statusEmoji = "🟢";
                                  actionText = "Optimal Stock";
                                  colorClass = "text-green-600";
                              } else {
                                  vsT = ytd < thresholds.optimalmin ? ytd - thresholds.optimalmin : ytd - thresholds.optimalmax;
                                  
                                  // Logika DOI (Berlawanan dengan ITO): 
                                  // Makin KECIL dari critical = Insufficient Stock (Merah)
                                  // Makin BESAR dari capitalriskmax = Capital Lock (Merah)
                                  if (ytd < thresholds.critical) {
                                      statusEmoji = "🔴";
                                      actionText = "Critical Warning: Insufficient Stock";
                                      colorClass = "text-red-500";
                                  } else if (ytd >= thresholds.critical && ytd < thresholds.optimalmin) {
                                      statusEmoji = "🟡";
                                      actionText = "Stockout Risk";
                                      colorClass = "text-yellow-600";
                                  } else if (ytd > thresholds.optimalmax && ytd <= thresholds.capitalriskmax) {
                                      statusEmoji = "🟡";
                                      actionText = "Capital Risk (Overstock)";
                                      colorClass = "text-yellow-600";
                                  } else {
                                      statusEmoji = "🔴";
                                      actionText = "Important to Note (Capital Lock)";
                                      colorClass = "text-red-500";
                                  }
                              }
                          }
                        } else {
                          // Fallback < 2026 yang disesuaikan dengan pola DOI (Asumsi target optimal: 8-10)
                          if (ytd >= 8 && ytd <= 10) {
                              statusEmoji = "🟢";
                              actionText = "Optimal Stock";
                              colorClass = "text-green-600";
                          } else {
                              vsT = ytd < 8 ? ytd - 8 : ytd - 10;
                              if (ytd < 7) {
                                  statusEmoji = "🔴";
                                  actionText = "Critical Warning: Insufficient Stock";
                                  colorClass = "text-red-500";
                              } else if (ytd >= 7 && ytd < 8) {
                                  statusEmoji = "🟡";
                                  actionText = "Stockout Risk";
                                  colorClass = "text-yellow-600";
                              } else if (ytd > 10 && ytd <= 14) {
                                  statusEmoji = "🟡";
                                  actionText = "Capital Risk (Overstock)";
                                  colorClass = "text-yellow-600";
                              } else {
                                  statusEmoji = "🔴";
                                  actionText = "Important to Note (Capital Lock)";
                                  colorClass = "text-red-500";
                              }
                          }
                        }
                      } else {
                        statusEmoji = "⚪";
                        actionText = "No data available";
                        colorClass = "text-slate-400";
                      }

                      return (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors odd:bg-white even:bg-slate-50 group">
                          <td className="px-4 py-3 font-bold text-slate-800 sticky left-0 z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 truncate">
                            {row.plant}
                          </td>
                          <td className="px-4 py-3 font-bold sticky left-[80px] z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 truncate">
                            {row.businessUnit.charAt(0).toUpperCase() + row.businessUnit.slice(1)}
                          </td>
                          <td className="px-4 py-3 font-bold text-center sticky left-[180px] z-10 bg-white group-even:bg-slate-50 group-hover:bg-slate-100 border-r border-slate-200/50">
                            {row.year}
                          </td>

                          {row.monthlyData.map((m: any, i: number) => {
                            let mColor = "text-slate-700";
                            
                            if (m.value === null || m.value === 0) {
                              mColor = "text-slate-300";
                            } else if (thresholds) {
                              // DOI Monthly Logic (Pengecekan Red dibalik karena lebih kecil = Kritis)
                              if (m.value >= thresholds.optimalmin && m.value <= thresholds.optimalmax) {
                                mColor = "text-green-600";
                              } else if (m.value < thresholds.critical || m.value > thresholds.capitalriskmax) {
                                mColor = "text-red-500";
                              } else {
                                mColor = "text-yellow-600";
                              }
                            }
                            
                            return (
                              <td 
                                key={i} 
                                className={`px-2 py-3 text-center border-r border-slate-100 ${mColor}`}
                              >
                                {m.value !== null && m.value !== undefined && m.value > 0 
                                  ? (m.value).toFixed(2) 
                                  : "-"
                                }
                              </td>
                            );
                          })}

                          <td className="px-4 py-3 text-center font-bold border-r border-slate-100 whitespace-nowrap">
                            {ytd !== null && ytd !== undefined 
                              ? (ytd).toFixed(2) 
                              : "-"}
                          </td>
                          <td className={`px-4 py-3 text-center font-bold border-r border-slate-100 whitespace-nowrap ${typeof vsT === 'number' ? colorClass : 'text-slate-300'}`}>
                            {typeof vsT === 'number' ? (vsT > 0 ? `+${vsT.toFixed(2)}` : vsT.toFixed(2)) : "-"}
                          </td>
                          <td className="px-4 py-3 text-center text-lg leading-none border-r border-slate-100">
                            {statusEmoji}
                          </td>
                          <td className={`px-4 py-3 italic break-words leading-tight font-medium ${colorClass}`}>
                            {actionText}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={20} className="py-20 text-center text-slate-400 italic bg-white">
                        No data found for the selected filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}