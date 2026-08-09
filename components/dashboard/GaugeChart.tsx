// "use client"

// import dynamic from "next/dynamic";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Download } from "lucide-react";
// import { useCallback, useRef, useState } from "react";
// import { toPng } from "html-to-image";

// const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

// interface Props {
//   value: number | null;
//   title: string;
//   type: 'overall' | 'fish' | 'shrimp';
//   year: number;
//   plants?: string[];
// }

// export default function GaugeChart({ value, title, type , year}: Props) {

//   const getArcConfig = () => {
//       if (year >= 2026) {
//         switch (type) {
//           case 'overall':
//           case 'fish':
//           case 'shrimp':
//             return [
//               { limit: 2.1, color: '#f04487' },
//               { limit: 3.0, color: '#fbb92c' },
//               { limit: 3.8, color: '#02d1a7' },
//               { limit: 4.3, color: '#fbb92c' },
//               { limit: 6.0, color: '#f04487' },
//             ];
//           default:
//             return [];
//         }
//       } else {
//         switch (type) {
//           case 'overall':
//           case 'fish':
//           case 'shrimp':
//             return [
//               { limit: 1.9, color: '#f04487' },
//               { limit: 2.4, color: '#fbb92c' },
//               { limit: 4.0, color: '#02d1a7' },
//               { limit: 5.0, color: '#fbb92c' },
//               { limit: 6.0, color: '#f04487' },
//             ];
//           default:
//             return [];
//         }
//       }
//     };

//   const currentTicks = getArcConfig().map(arc => ({ value: arc.limit }));  

//   return (
//     <Card className="bg-white border-none shadow-sm">
        
//       <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-center justify-center">
//         <CardTitle className="text-[12px] font-bold text-black tracking-widest text-center">
//           {title}
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="h-[200] flex flex-col items-center justify-center">
//         <GaugeComponent
//           value={value}
//           maxValue={6.0}
//           type="radial"
//           style={{ 
//               width: "100%", 
//               maxWidth: "260px", // Mencegah gauge terlalu besar di mobile
//               margin: "0 auto",
//             }}
//           labels={{
//             valueLabel: {
//                 formatTextValue: (val: number) => `${val.toFixed(1)}`,
//                 style: {
//                     fill: "#000000",  
//                     textShadow: "none", 
//                     fontWeight: "bold",
//               }
//             },
//             tickLabels: {
//               type: "outer",
//               defaultTickValueConfig: {
//                 formatTextValue: (value: number) => `${value.toFixed(1)}`,
//                 style: {
//                     fill: "#000000",
//                     textShadow: "none",
//                     fontSize: 7,
//                 }
//               },
//               ticks: currentTicks
//             }
//           }}
//           arc={{
//             subArcs: getArcConfig(),
//             padding: 0.02,
//             width: 0.3,
//             cornerRadius: 0
//           }}
//           pointer={{
//             elastic: true,
//             animationDelay: 0,
//             type: "needle",
//             color: '#000000',
//             baseColor: '#000000',
//             width: 15,
//             length: 0.75,            
//           }}
//         />
//         {/* Label Angka di Bawah Gauge */}
//         {/* <div className="text-2xl font-bold text-slate-900 -mt-4">{value}%</div> */}
//       </CardContent>
//     </Card>
//   );
// }

"use client"

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";

const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

interface Props {
  value: number | null;
  title: string;
  type: 'overall' | 'fish' | 'shrimp';
  year: number;
  plants?: string[]; 
}

export default function GaugeChart({ value, title, type, year, plants}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // 1. Logika penentuan apakah chart harus muncul atau tidak
  const getTargetInfo = () => {
    let hasTarget = type === 'overall' || type === 'fish' || type === 'shrimp';
    
    if (plants && plants.length > 0) {
      const hasFishInSelection = plants.some(p => p.toUpperCase().includes('FF') || p.toUpperCase().includes('FISH'));
      const hasShrimpInSelection = plants.some(p => p.toUpperCase().includes('SF') || p.toUpperCase().includes('SHRIMP'));

      if (type !== 'overall') {
        if (hasFishInSelection && !hasShrimpInSelection && type === 'shrimp') hasTarget = false;
        if (hasShrimpInSelection && !hasFishInSelection && type === 'fish') hasTarget = false;
      }
    }
    return { hasTarget };
  };

  const { hasTarget } = getTargetInfo();

  // 2. Logika Arc Config sesuai referensi baru Anda
  const getArcConfig = () => {
    if (!hasTarget) return [];

    if (year < 2026) {
      return [
        { limit: 1.9, color: '#f04487' },
        { limit: 2.5, color: '#fbb92c' },
        { limit: 4.0, color: '#02d1a7' },
        { limit: 5.0, color: '#fbb92c' },
        { limit: 6.0, color: '#f04487' },
      ];
    }

    let limits = [2.1, 3.0, 3.8, 4.3, 5.0];
    if (plants && plants.length === 1) {
      const plant = plants[0].toUpperCase();
      const isFF = plant.includes('FF') || plant.includes('FISH');
      const isSF = plant.includes('SF') || plant.includes('SHRIMP');

      if ((plant.includes('LPG') && isFF) || (plant.includes('MDN') && isFF)) {
        limits = [2.5, 3.3, 3.8, 4.5, 5.5];
      } else if ((plant.includes('MDN') && isSF) || (plant.includes('SPJ') && isFF)) {
        limits = [2.1, 3.0, 3.8, 4.3, 5.0];
      } else if (plant.includes('LPG') && isSF) {
        limits = [2.0, 2.72, 3.8, 5.0, 6.0];
      } else if ((plant.includes('CKP') && isFF) || (plant.includes('SBY') && isSF)) {
        limits = [1.8, 2.5, 3.8, 5.5, 6.5];
      }
    }

    return [
      { limit: limits[0], color: '#f04487' }, 
      { limit: limits[1], color: '#fbb92c' }, 
      { limit: limits[2], color: '#02d1a7' }, 
      { limit: limits[3], color: '#fbb92c' }, 
      { limit: limits[4], color: '#f04487' }, 
    ];
  };

  const arcConfig = getArcConfig();
  const maxLimit = arcConfig.length > 0 ? arcConfig[arcConfig.length - 1].limit : 6.0;
  const dynamicMaxValue = Math.max(maxLimit, value !== null ? Math.ceil(value * 1.2) : 0);
  const currentTicks = arcConfig.map(arc => ({ value: arc.limit }));

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      const downloadBtn = cardRef.current.querySelector('[data-no-print]');
      if (downloadBtn) (downloadBtn as HTMLElement).style.display = 'none';
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
      if (downloadBtn) (downloadBtn as HTMLElement).style.display = '';
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.png`;
      link.click();
    } catch (e) { console.error(e); } finally { setIsDownloading(false); }
  }, [title]);

  return (
    <Card ref={cardRef} className="bg-white border-none shadow-sm">
      <CardHeader className="relative pb-0 pt-4 px-4 flex items-center justify-center">
        <CardTitle className="text-[12px] font-bold text-black tracking-widest text-center">{title}</CardTitle>
        <div className="absolute right-4 -top-2">
          <button 
              onClick={handleDownload} 
              disabled={isDownloading} 
              data-no-print 
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all duration-200 disabled:opacity-50"
              title="Download as PNG"
              >
            <Download size={16} />
          </button>
        </div>
      </CardHeader>

      <CardContent className="h-[200px] flex flex-col items-center justify-center">
        {/* Menggunakan Conditional Rendering untuk menghilangkan komponen sepenuhnya */}
        {hasTarget && value !== null ? (
          <GaugeComponent
            value={value}
            maxValue={dynamicMaxValue}
            type="radial"
            style={{ width: "100%", maxWidth: "260px", margin: "0 auto" }}
            labels={{
              valueLabel: {
                formatTextValue: () => value === null ? "-" : value.toFixed(2),
                style: { fill: "#000000", textShadow: "none", fontWeight: "bold", fontSize: value === null ? 40: 35 }
              },
              tickLabels: {
                type: "outer",
                defaultTickValueConfig: {
                  formatTextValue: (v: number) => `${v.toFixed(2)}`,
                  style: { fill: "#000000", textShadow: "none", fontSize: 6 }
                },
                ticks: currentTicks
              }
            }}
            arc={{ subArcs: arcConfig, padding: 0.02, width: 0.3, cornerRadius: 0 }}
            pointer={{ 
              elastic: true, 
              animationDelay: 0, 
              type: "needle", 
              color: value === null ? 'transparent' : '#000000',
              baseColor: value === null ? 'transparent' : '#000000', 
              width: 15, 
              length: 0.75 
            }}
          />
        ) : null}
      </CardContent>
    </Card>
  );
}