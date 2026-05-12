"use client"

import { CardContent } from "@/components/ui/card";
import { Factory } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { PlantComparisonData } from "@/services/inventoryTurnover";

interface Props {
  data: PlantComparisonData[];
  year: number;
}

export default function PlantAchievementCard({ data, year }: Props) {

  // const minTarget = 2.5;
  // const maxTarget = 4;

  // Hitung pencapaian berdasarkan fishTurnover dan shrimpTurnover
  // const achievedCount = data.reduce((acc, p) => {
  //   let count = 0;
  //   if (p.fishTurnover >= minTarget && p.fishTurnover <= maxTarget) count++;
  //   if (p.shrimpTurnover >= minTarget && p.shrimpTurnover <= maxTarget) count++;
  //   return acc + count;
  // }, 0);

  const plantThresholds = {
    'LPG fish': {
      critical: 4.5,
      stockoutriskmin: 3.8,
      stockoutriskmax: 4.5,
      optimalmin: 3.3,
      optimalmax: 3.8,
      capitalriskmin: 2.5,
      capitalriskmax: 3.3,
      important: 2.5,
    },
    'MDN fish': {
      critical: 4.5,
      stockoutriskmin: 3.8,
      stockoutriskmax: 4.5,
      optimalmin: 3.3,
      optimalmax: 3.8,
      capitalriskmin: 2.5,
      capitalriskmax: 3.3,
      important: 2.5,
    },  
    'SPJ fish': {
      critical: 4.3,
      stockoutriskmin: 3.8,
      stockoutriskmax: 4.3,
      optimalmin: 3.0,
      optimalmax: 3.8,
      capitalriskmin: 2.1,
      capitalriskmax: 3.0,
      important: 2.1,
    },    
    'MDN shrimp': {
      critical: 4.3,
      stockoutriskmin: 3.8,
      stockoutriskmax: 4.3,
      optimalmin: 3.0,
      optimalmax: 3.8,
      capitalriskmin: 2.1,
      capitalriskmax: 3.0,
      important: 2.1,
    },     
    'LPG shrimp': {
      critical: 5.0,
      stockoutriskmin: 3.8,
      stockoutriskmax: 4.9,
      optimalmin: 2.72,
      optimalmax: 3.8,
      capitalriskmin: 2.0,
      capitalriskmax: 2.72,
      important: 2.0,
    }, 
    'CKP fish': {
      critical: 5.5,
      stockoutriskmin: 3.8,
      stockoutriskmax: 5.4,
      optimalmin: 2.5,
      optimalmax: 3.8,
      capitalriskmin: 1.8,
      capitalriskmax: 2.4,
      important: 1.8,
    },  
    'SBY shrimp': {
      critical: 5.5,
      stockoutriskmin: 3.8,
      stockoutriskmax: 5.4,
      optimalmin: 2.5,
      optimalmax: 3.8,
      capitalriskmin: 1.8,
      capitalriskmax: 2.4,
      important: 1.8,
    },                                                                                
  }  

  type ThresholdData = typeof plantThresholds;

  const achievedCount = data.reduce((acc, p) => {
    let count = 0;

    if (year >= 2026) {
      const getOptimalRange = (plant: string, type: string) => {
        const key = `${plant} ${type}`;
        const fallbackKey = `${plant} ${type === 'fish' ? 'shrimp' : 'fish'}`;

        const thresholds = plantThresholds as Record<string, any>;
        const threshold = thresholds[key] || thresholds[fallbackKey];

        return threshold 
          ? { min: threshold.optimalmin, max: threshold.optimalmax } 
          : { min: null, max: null };
      };

      const fishRange = getOptimalRange(p.plant, 'fish');
      const shrimpRange = getOptimalRange(p.plant, 'shrimp');

      if (fishRange.min !== null && p.fishTurnover >= fishRange.min && p.fishTurnover <= fishRange.max) {
        count++;
      }
      if (shrimpRange.min !== null && p.shrimpTurnover >= shrimpRange.min && p.shrimpTurnover <= shrimpRange.max) {
        count++;
      }

    } else {
      const minTarget = 2.5;
      const maxTarget = 4;

      if (p.fishTurnover >= minTarget && p.fishTurnover <= maxTarget) count++;
      if (p.shrimpTurnover >= minTarget && p.shrimpTurnover <= maxTarget) count++;
    }

    return acc + count;
  }, 0);  

  const TOTAL_PLANTS = 7;
  
  const chartData = [
    { name: "Achieved", value: achievedCount },
    { name: "Remaining", value: Math.max(0, TOTAL_PLANTS - achievedCount) },
  ];

  // Menggunakan warna hex yang diminta untuk donut bagian achieved
  const COLORS = ["#ca7bfc", "#f1f5f9"];

  return (

    // <div 
    //   className="rounded-xl shadow-sm w-full h-full overflow-hidden border border-slate-200" 
    //   style={{ background: 'linear-gradient(135deg, #0dec111a 0%, #ffffff 100%)' }} // Opacity ~10% (#1a)
    // >

    <div 
      className="bg-white rounded-xl shadow-sm w-full h-full overflow-hidden"
    >
      <CardContent className="h-full pt-4 pb-4 px-5 flex items-center justify-between bg-transparent">
        
        {/* Sisi Kiri: Icon, Title, dan Angka */}
        <div className="flex flex-col space-y-1"> 
          
          {/* Icon Factory: Tanpa BG, mepet kiri sejajar Title */}
          <div className="bg-transparent mb-3">
            <Factory className="w-8 h-8 text-[#ca7bfc]" /> 
          </div>

          <div>
            <h3 className="text-[12px] font-bold text-black tracking-widest leading-none mb-5">
              Plant Achievement
            </h3>
            
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-black text-slate-800 tracking-tighter leading-none">
                {achievedCount}
              </span>
              <span className="text-3xl font-bold text-slate-200">/</span>
              <span className="text-3xl font-bold text-slate-400">
                {TOTAL_PLANTS}
              </span>
            </div>
            
            <p className="text-[10px] font-light text-slate-400 uppercase tracking-wider mt-0.5">
              Plants on Target
            </p>
          </div>
        </div>

        {/* Sisi Kanan: Donut Chart */}
        <div className="w-24 h-24 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={28} // Diperbesar sedikit agar proporsional dengan angka 6xl
                outerRadius={40}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </CardContent>
    </div>
  );
}