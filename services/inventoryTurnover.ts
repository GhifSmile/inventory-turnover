import { db } from "@/lib/db";
import {sql} from "drizzle-orm";

interface MonthlyPerformanceRow {
  plant: string | null;
  business_unit: string | null;
  year: number | null;
  jan: string | number | null;
  feb: string | number | null;
  mar: string | number | null;
  apr: string | number | null;
  may: string | number | null;
  jun: string | number | null;
  jul: string | number | null;
  aug: string | number | null;
  sep: string | number | null;
  oct: string | number | null;
  nov: string | number | null;
  dec: string | number | null;
  inventory_turnover_ytd: string | number | null;
}

interface TrendAnalysisRow {
  year: number | null;
  month: number | null;
  overall_turnover: string | number | null;
  fish_turnover: string | number | null;
  shrimp_turnover: string | number | null;
  best_performing: string | null;
  worst_performing: string | null;
}

interface RawDataRow {
  year: number;
  month: number;
  plant: string;
  business_unit: string;
  material_code: string;
  saldo_awal:number;
  penerimaan: number;
  pemakaian: number;
  saldo_akhir: number;
  avg_saldo: number;
  turnover: number;
  days_of_inventory: number;
}

interface TurnoverFilters {
  year: number;   
  months?: number[]; // Array untuk multi-select
  plants?: string[]; // Array untuk multi-select
  business_unit?: string[];
}

// --- INTERFACES FOR UI ---
export interface MonthlyPerformanceData {
  plant: string;
  businessUnit: string;
  year: number;
  monthlyData: { month: string; value: number }[];
  inventory_turnover_ytd: number;
}

export interface TrendAnalysisData {
  year: number;
  month: string;
  overallTurnover: number; 
  fishTurnover: number;   
  shrimpTurnover: number;  
  bestPerforming: string;
  worstPerforming: string;
}

export interface MonthlyTrendData {
  month: string;
  overallTurnover: number;
}

export interface PlantComparisonData {
  plant: string;
  overallTurnover: number;
  fishTurnover: number;
  shrimpTurnover: number;
}

export interface PlantSubmissionStatus {
  plant: string;
  completedMonths: number;
  percentage: number;
  details: { month: number; isFilled: boolean }[];
}


// Helper
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface BUSummary {
  sum_p: number;
  sum_avg_s: number;
}

function calculateTurnoverByUnit(data: RawDataRow[], businessUnitFilter: string | null = null): number {
  if (!data || data.length === 0) return 0;

  let filteredData = data;
  if (businessUnitFilter && businessUnitFilter.trim().length > 0) {
    const filterKey = businessUnitFilter.toLowerCase();
    filteredData = data.filter(row => row.business_unit && row.business_unit.toLowerCase() === filterKey);
  }

  if (filteredData.length === 0) return 0.0;

  const totals = filteredData.reduce((acc, row) => {
    acc.sum_p += Number(row.pemakaian) || 0;
    acc.sum_avg_s += Number(row.avg_saldo) || 0;
    return acc;
  }, { sum_p: 0, sum_avg_s: 0 });

  const inventory_turnover = totals.sum_avg_s === 0 
    ? 0 
    : Number((totals.sum_p / totals.sum_avg_s).toFixed(1));  

  return inventory_turnover;
}

function calculateDOIByUnit(data: RawDataRow[], businessUnitFilter: string | null = null): number {
  if (!data || data.length === 0) return 0;

  let filteredData = data;
  if (businessUnitFilter && businessUnitFilter.trim().length > 0) {
    const filterKey = businessUnitFilter.toLowerCase();
    filteredData = data.filter(row => row.business_unit && row.business_unit.toLowerCase() === filterKey);
  }

  if (filteredData.length === 0) return 0;
  
  const totals = filteredData.reduce((acc, row) => {
    acc.sum_p += Number(row.pemakaian) || 0;
    acc.sum_avg_s += Number(row.avg_saldo) || 0;
    return acc;
  }, { sum_p: 0, sum_avg_s: 0 });  

  const uniqueYearMonths = new Set<string>();
  for (const row of filteredData) {
    if (row.year && row.month) {
      uniqueYearMonths.add(`${row.year}-${row.month}`);
    }
  }

  let totalDays = 0;
  uniqueYearMonths.forEach(key => {
    const [year, month] = key.split("-").map(Number);
    totalDays += new Date(year, month, 0).getDate();
  });

  if (totalDays === 0) return 0;

  const doi = totals.sum_p === 0 
    ? 0 
    : Number(((totals.sum_avg_s / totals.sum_p) * totalDays).toFixed(0));  
  
  return doi;
}

export const InventoryTurnoverService ={

  getSubmissionStatus: async (filters: TurnoverFilters): Promise<PlantSubmissionStatus[]> => {
    try {
      let targetMonth: number;

      const toTitleCase = (str: string) => {
        if (!str) return "";
        return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
      };      

      const plantData = await db.execute(sql`
          SELECT DISTINCT plant FROM inventory_turnover
          ORDER BY plant ASC
      `) as unknown as { plant: string }[]; 

      const defaultPlants = plantData.map((r) => r.plant);

      const activePlants: string[] = filters.plants && filters.plants.length > 0 
        ? filters.plants 
        : defaultPlants;

      if (filters.months && filters.months.length > 0) {
        targetMonth = Math.max(...filters.months);
      } else {
        const maxMonthResult = await db.execute(sql`
          SELECT MAX(month) as max_month
          FROM inventory_turnover
          WHERE year = ${filters.year}
        `);
        targetMonth = (maxMonthResult as any)[0]?.max_month || (new Date().getMonth() + 1);
      }

      const plantClause = filters.plants && filters.plants.length > 0 
        ? sql`AND plant IN (${sql.join(filters.plants, sql`, `)})` 
        : sql``;

      // Hanya ambil data untuk targetMonth yang ditentukan
      const result = await db.execute(sql`
        SELECT DISTINCT plant, business_unit
        FROM inventory_turnover
        WHERE year = ${filters.year} 
          AND month = ${targetMonth}
          ${plantClause}
      `);

      const rows = result as unknown as { plant: string; business_unit: string }[];

      const uniqueGroups = Array.from(
        new Set(rows.map(r => `${r.plant}|${r.business_unit}`))
      ).map(key => {
        const [plant, business_unit] = key.split('|');
        return { plant, business_unit };
      });  
      
      uniqueGroups.sort((a, b) => {
        const plantCompare = a.plant.localeCompare(b.plant);
        if (plantCompare !== 0) return plantCompare;
        return a.business_unit.localeCompare(b.business_unit);
      });      

      return uniqueGroups.map(group => {
      const isFilled = rows.some(r => 
        r.plant?.toUpperCase() === group.plant.toUpperCase() &&
        r.business_unit?.toUpperCase() === group.business_unit.toUpperCase()
      );

      const formattedBU = toTitleCase(group.business_unit);
        const displayName = formattedBU 
          ? `${group.plant} - ${formattedBU}` 
          : group.plant;

        const details = [{
          month: targetMonth,
          isFilled: isFilled
        }];

        return {
          plant: displayName,
          completedMonths: isFilled ? 1 : 0,
          percentage: isFilled ? 100 : 0,
          details: details
        };
      });

    } catch (error) {
      console.error("Error in getSubmissionStatus:", error);
      return [];
    }
  },  

  getFilterOptions: async () => {
    const result = await db.execute(sql`
      SELECT DISTINCT year FROM inventory_turnover 
      ORDER BY year DESC
    `);

    const plantData = await db.execute(sql`
        SELECT DISTINCT plant FROM inventory_turnover
        ORDER BY plant ASC
    `);

    const BUData = await db.execute(sql`
      SELECT DISTINCT business_unit FROM inventory_turnover
      ORDER BY business_unit ASC  
    `);
    
    return {
      year: (result as any).map((r: any) => Number(r.year)),
      plants: (plantData as any).map((r: any) => r.plant),
      business_unit: (BUData as any).map((r: any) => r.business_unit),
      months: monthNames.map((name, i) => ({ id: i + 1, name }))
    };
  },    

  getLatestMonthAvailable: async (year: number): Promise<number | null> => {
    try {
      const result = await db.execute(sql`
        SELECT MAX(month) as max_month 
        FROM inventory_turnover 
        WHERE year = ${year}
      `);
      
      const maxMonth = (result as any)[0]?.max_month;
      return maxMonth ? Number(maxMonth) : null;
    } catch (error) {
      console.error("Error fetching latest month:", error);
      return null;
    }
  },  

  getMonthlyPerformance: async (filters: TurnoverFilters): Promise<MonthlyPerformanceData[]> => {
    const yearClause = sql`AND year = ${filters.year}`;

    const plantClause = filters.plants && filters.plants.length > 0 
      ? sql`AND plant IN (${sql.join(filters.plants, sql`, `)})` 
      : sql``;

    const BUClause = filters.business_unit && filters.business_unit.length > 0 
      ? sql`AND business_unit IN (${sql.join(filters.business_unit, sql`, `)})` 
      : sql``;      
    
    try {
      const result = await db.execute(sql`
        SELECT * FROM it_plant_performance_detail_monthly
        WHERE 1=1
        ${yearClause}
        ${plantClause}  
        ${BUClause}      
        ORDER BY plant ASC, business_unit ASC
      `);

      const rows = result as unknown as MonthlyPerformanceRow[];

      return rows.map((row) => ({
        plant: row.plant ?? "Unknown",
        businessUnit: row.business_unit ?? "N/A",
        year: Number(row.year),
        monthlyData: [
          { month: 'Jan', value: Number(row.jan) || 0 },
          { month: 'Feb', value: Number(row.feb) || 0 },
          { month: 'Mar', value: Number(row.mar) || 0 },
          { month: 'Apr', value: Number(row.apr) || 0 },
          { month: 'May', value: Number(row.may) || 0 },
          { month: 'Jun', value: Number(row.jun) || 0 },
          { month: 'Jul', value: Number(row.jul) || 0 },
          { month: 'Aug', value: Number(row.aug) || 0 },
          { month: 'Sep', value: Number(row.sep) || 0 },
          { month: 'Oct', value: Number(row.oct) || 0 },
          { month: 'Nov', value: Number(row.nov) || 0 },
          { month: 'Dec', value: Number(row.dec) || 0 },
        ],
        inventory_turnover_ytd: Number(row.inventory_turnover_ytd)|| 0,
      }));
    } catch (error) {
      console.error("Error in getMonthlyPerformance:", error);
      return [];
    }
  },
  
  getTrendAnalysis: async (filters: TurnoverFilters): Promise<TrendAnalysisData[]> => {
    const targetYear = filters.year;
    const targetMonths = filters.months;
    try {
      // Pastikan query tetap menggunakan sintaks yang benar untuk parameter opsional
      const monthCondition = (targetMonths && targetMonths.length > 0)
        ? sql`AND month IN (${sql.join(targetMonths, sql`, `)})`
        : sql``;

      const result = await db.execute(sql`
        SELECT 
          year,
          month, 
          overall_turnover,
          fish_turnover,
          shrimp_turnover,
          best_performing,
          worst_performing
        FROM it_trend_analysis_monthly 
        WHERE year = ${targetYear}
        ${monthCondition}
        ORDER BY month ASC
      `);

      const rows = result as unknown as TrendAnalysisRow[];

      return rows.map((row) => ({
        year: Number(row.year) || targetYear,
        month: row.month ? monthNames[Number(row.month) - 1] : "Unknown",
        overallTurnover: Number(row.overall_turnover) || 0,
        fishTurnover: Number(row.fish_turnover) || 0,
        shrimpTurnover: Number(row.shrimp_turnover) || 0,
        bestPerforming: row.best_performing ?? "-",
        worstPerforming: row.worst_performing ?? "-",
      }));
    } catch (error) {
      console.error("Error in getTrendAnalysis:", error);
      return [];
    }
  },  

  getInventoryTurnoverData: async (filters: TurnoverFilters): Promise<RawDataRow[]> => {
    try {

      const yearClause = sql`AND year = ${filters.year}`;

      const monthClause = filters.months && filters.months.length > 0 
        ? sql`AND month IN (${sql.join(filters.months, sql`, `)})` 
        : sql``;
        
      const plantClause = filters.plants && filters.plants.length > 0 
        ? sql`AND plant IN (${sql.join(filters.plants, sql`, `)})` 
        : sql``;

      const result = await db.execute(sql`
        SELECT year, month, plant, business_unit, material_code, saldo_awal, penerimaan, pemakaian, saldo_akhir, avg_saldo, turnover, days_of_inventory
        FROM inventory_turnover
        WHERE 1=1
        ${yearClause}
        ${monthClause}
        ${plantClause}
      `);

      return result as unknown as RawDataRow[];
      
    } catch (error) {
      console.error("Error in getInventoryTurnoverData:", error);
      return [];
    }
  },  

  getOverallTurnover: async (filters: TurnoverFilters): Promise<number> => {
    const data = await InventoryTurnoverService.getInventoryTurnoverData(filters);
    return calculateTurnoverByUnit(data, null);
  },

  getFishTurnover: async (filters: TurnoverFilters): Promise<number> => {
    const data = await InventoryTurnoverService.getInventoryTurnoverData(filters);
    return calculateTurnoverByUnit(data, 'fish');
  },

  getShrimpTurnover: async (filters: TurnoverFilters): Promise<number> => {
    const data = await InventoryTurnoverService.getInventoryTurnoverData(filters);
    return calculateTurnoverByUnit(data, 'shrimp');
  },   
  
  getMonthlyTrendData: async (filters: TurnoverFilters): Promise<MonthlyTrendData[]> => {
    try {
      const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      const rawData = await InventoryTurnoverService.getInventoryTurnoverData(filters);

      if (!rawData || rawData.length === 0) {
        return shortMonths.map(name => ({ month: name, overallTurnover: 0 }));
      }

      return shortMonths.map((name, index) => {
        const monthNumber = index + 1;
        const monthData = rawData.filter(d => Number(d.month) === monthNumber);

        if (monthData.length === 0) {
          return { month: name, overallTurnover: 0 };
        }

        const totals = monthData.reduce((acc, row) => {
          acc.sum_p += Number(row.pemakaian) || 0;
          acc.sum_avg_s += Number(row.avg_saldo) || 0;
          return acc;
        }, { sum_p: 0, sum_avg_s: 0 });
      
        const inventory_turnover = totals.sum_avg_s === 0 
          ? 0 
          : Number((totals.sum_p / totals.sum_avg_s).toFixed(1));

        return {
          month: name,
          overallTurnover: inventory_turnover
        };
      });
    } catch (error) {
      console.error("Error in getMonthlyTrendData:", error);
      return [];
    }
  },  

  getPlantComparison: async (filters: TurnoverFilters): Promise<PlantComparisonData[]> => {
    try {
      // 1. Ambil data mentah sesuai filter (Year, Month, dll)
      const rawData = await InventoryTurnoverService.getInventoryTurnoverData(filters);

      if (!rawData || rawData.length === 0) return [];

      // 2. Dapatkan list plant unik
      const plants = Array.from(new Set(rawData.map(d => d.plant))).filter(Boolean);

      // 3. Helper function internal untuk menghitung akurasi per segment (Overall/Fish/Shrimp)
      const calculateInternalTurnover = (data: RawDataRow[], businessUnit: string | null) => {
        // Filter berdasarkan Business Unit jika diminta (fish/shrimp)
        const filteredData = businessUnit 
          ? data.filter(d => d.business_unit?.toLowerCase() === businessUnit.toLowerCase())
          : data;

        if (filteredData.length === 0) return 0;

        const totals = filteredData.reduce((acc, row) => {
          acc.sum_p += Number(row.pemakaian) || 0;
          acc.sum_avg_s += Number(row.avg_saldo) || 0;
          return acc;
        }, { sum_p: 0, sum_avg_s: 0 });
      
        const inventory_turnover = totals.sum_avg_s === 0 
          ? 0 
          : Number((totals.sum_p / totals.sum_avg_s).toFixed(1));          

        return Number(inventory_turnover.toFixed(1));
      };

      // 4. Map hasil untuk setiap plant
      return plants.map(plantName => {
        const plantData = rawData.filter(d => d.plant === plantName);

        return {
          plant: plantName,
          overallTurnover: calculateInternalTurnover(plantData, null),
          fishTurnover: calculateInternalTurnover(plantData, 'fish'),
          shrimpTurnover: calculateInternalTurnover(plantData, 'shrimp'),
        };
      });
    } catch (error) {
      console.error("Error in getPlantComparison:", error);
      return [];
    }
  },    

  getOverallDOI: async (filters: TurnoverFilters): Promise<number> => {
    const data = await InventoryTurnoverService.getInventoryTurnoverData(filters);
    return calculateDOIByUnit(data, null);
  },

  getFishDOI: async (filters: TurnoverFilters): Promise<number> => {
    const data = await InventoryTurnoverService.getInventoryTurnoverData(filters);
    return calculateDOIByUnit(data, 'fish');
  },
  
  getShrimpDOI: async (filters: TurnoverFilters): Promise<number> => {
    const data = await InventoryTurnoverService.getInventoryTurnoverData(filters);
    return calculateDOIByUnit(data, 'shrimp');
  }  

};