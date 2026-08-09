import Navigation from "@/components/dashboard/Navigation";
import FilterGroup from "@/components/dashboard/filterGroup";
import DataSubmissionTracker from "@/components/dashboard/dataSubmissionTracker";
import GaugeChart from "@/components/dashboard/GaugeChart";

import TrendTurnoverChartMonthly from "@/components/dashboard/LineChartITO";
import ComparisonBarChart from "@/components/dashboard/BarChartComparison";
import TopITOCard from "@/components/dashboard/TopITOCard";
import PlantAchievementCard from "@/components/dashboard/PlantAchievementCard";

import DownloadButton from "@/components/dashboard/downloadButton";
import UploadButton from "@/components/dashboard/UploadButton";

import { ITOService, ITOUtils} from "@/services/inventoryTurnover";

export default async function ExecutiveSummary({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {

  const params = await searchParams;
  const options = await ITOService.getFilterOptions();

  const selectedYear = params.year 
    ? Number(params.year)
    : options.year[0];  

  // Ambil Plants (Multi Select): Konversi string "A,B" jadi ["A", "B"]
  const selectedPlants = params.plant 
    ? String(params.plant).split(",").filter((v) => v !== "") 
    : [];

  // Ambil Months (Multi Select): Konversi string "1,2" jadi [1, 2]
  const selectedMonths = params.month 
    ? String(params.month).split(",").map(Number).filter((n) => !isNaN(n)) 
    : [];   
    
  const filters = {
    year: selectedYear, 
    months: selectedMonths,
    plants: selectedPlants,
  };

  let currentMonthForMoM: number;

  if (filters.months && filters.months.length > 0) {
    // Ambil bulan terbesar yang dipilih user
    currentMonthForMoM = Math.max(...filters.months);
  } else {
    // Jika user tidak pilih bulan (All), gunakan bulan sekarang
    const latestMonth = await ITOService.getLatestMonthAvailable(selectedYear);

    currentMonthForMoM = latestMonth || (new Date().getMonth() + 1);
  }

  const baselineMonthNumber = currentMonthForMoM;

  const MONTH_LABELS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const baselineMonth = MONTH_LABELS[baselineMonthNumber - 1] ?? MONTH_LABELS[0];

  const compareMonths = params.compare
    ? String(params.compare)
        .split(",")
        .filter((m) => MONTH_LABELS.includes(m) && m !== baselineMonth)
    : [];  
  
  const displayMonths = [baselineMonth, ...compareMonths].slice(0, 3);

  const [rawData, submissionStatus] = await Promise.all([
    ITOService.getInventoryTurnoverData(filters),
    ITOService.getSubmissionStatus(filters)
  ]);  

  const overallITO = ITOUtils.calculateOverall(rawData)
  const fishITO = ITOUtils.calculateFish(rawData)
  const shrimpITO = ITOUtils.calculateShrimp(rawData)
  const monthlyTrend = ITOUtils.computeMonthlyTrend(rawData)

  const kodePakanITO = ITOUtils.computeITOByPakan(rawData)
  // const[overallTurnover, fishTurnover, shrimpTurnover, monthlyTrend, plantComparison, overallDOI, fishDOI, shrimpDOI, submissionStatus] = await Promise.all([
  //   InventoryTurnoverService.getOverallTurnover(filters),
  //   InventoryTurnoverService.getFishTurnover(filters),
  //   InventoryTurnoverService.getShrimpTurnover(filters),
  //   InventoryTurnoverService.getMonthlyTrendData(filters),
  //   InventoryTurnoverService.getPlantComparison(filters),
  //   InventoryTurnoverService.getOverallDOI(filters),
  //   InventoryTurnoverService.getFishDOI(filters),
  //   InventoryTurnoverService.getShrimpDOI(filters),
  //   InventoryTurnoverService.getSubmissionStatus(filters),
  // ]);

  const perMonthComparison = await Promise.all(
    displayMonths.map(async (label) => {
      const monthNumber = MONTH_LABELS.indexOf(label) + 1;
      const monthRaw = await ITOService.getInventoryTurnoverData({
        ...filters,
        months: [monthNumber],
      });
      return { month: label, comparison: ITOUtils.computePlantComparison(monthRaw) };
    }),
  );

  const comparisonByMonth: Record<string, ReturnType<typeof ITOUtils.computePlantComparison>> = {};
  perMonthComparison.forEach(({ month, comparison }) => {
    comparisonByMonth[month] = comparison;
  });

  return (
    <main className="min-h-screen bg-slate-50">

      {/* HEADER SECTION */}
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
               <FilterGroup options={options} showBU={false}/>
            </div>
             
            <div className="flex flex-wrap justify-center lg:justify-end gap-3 order-1 lg:order-2">
              <DownloadButton />
              <UploadButton />
            </div>
                
          </div>
          
        </div>
      </header>

      {/* CONTENT SECTION (Executive Summary) */}
      <div className="max-w-7xl mx-auto px-8 py-10">

        <div className="mb-6">
          <DataSubmissionTracker data={submissionStatus} currentMonth={currentMonthForMoM}  />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <GaugeChart title="Overall Inventory Turnover" value={overallITO} type="overall" year={selectedYear} plants={selectedPlants}/>
          <GaugeChart title="Fish Inventory Turnover" value={fishITO} type="fish" year={selectedYear} plants={selectedPlants}/>
          <GaugeChart title="Shrimp Inventory Turnover" value={shrimpITO} type="shrimp" year={selectedYear} plants={selectedPlants}/>
        </div>

        {/* BARIS 2: TREND CHART (Kiri) & 2 SUMMARY CARDS VERTICAL (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 items-stretch">

          {/* Trend Chart mengambil 2/3 lebar (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <TrendTurnoverChartMonthly data={monthlyTrend} year={selectedYear}/>
          </div>

          <div className="lg:col-span-1">
            <TopITOCard data={kodePakanITO}/>
          </div>

          {/* 2 Summary Cards di-stack secara vertikal dalam 1 kolom sisanya */}
          {/* h-full dan flex-1 di sini penting agar tinggi card mengikuti tinggi chart di kiri */}
          {/* <div className="flex flex-col sm:flex-row lg:flex-col gap-4 h-full"> */}
            
            {/* <div className="flex-1 w-full sm:w-1/2 lg:w-full">
              <DOIAchievementCard overallDOI={overallDOI} fishDOI={fishDOI} shrimpDOI={shrimpDOI}/>
            </div> */}

            {/* <div className="flex-1 w-full sm:w-1/2 lg:w-full">
              <PlantAchievementCard data={plantComparison} year={selectedYear} />
            </div> */}

          {/* </div> */}

        </div>

        {/* BARIS 3: COMPARISON BAR CHART (Full Width di bawah) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          <div className="lg:col-span-2">
            <ComparisonBarChart 
              comparisonByMonth={comparisonByMonth}
              baselineMonth={baselineMonth}
              displayMonths={displayMonths}
              year={selectedYear}
            />
          </div>

          <div className="lg:col-span-1">
            <PlantAchievementCard
              comparisonByMonth={comparisonByMonth}
              year={selectedYear}
              displayMonths={displayMonths}
            />
          </div>

        </div>   

      </div>
     
    </main>
  );  

}