"use client"

import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

interface Props {
  value: number;
  title: string;
  type: 'overall' | 'fish' | 'shrimp';
  year: number;
}

export default function GaugeChart({ value, title, type , year}: Props) {

  const getArcConfig = () => {
      if (year >= 2026) {
        switch (type) {
          case 'overall':
          case 'fish':
          case 'shrimp':
            return [
              { limit: 2.1, color: '#f04487' },
              { limit: 3.0, color: '#fbb92c' },
              { limit: 3.8, color: '#02d1a7' },
              { limit: 4.3, color: '#fbb92c' },
              { limit: 6.0, color: '#f04487' },
            ];
          default:
            return [];
        }
      } else {
        switch (type) {
          case 'overall':
          case 'fish':
          case 'shrimp':
            return [
              { limit: 1.9, color: '#f04487' },
              { limit: 2.4, color: '#fbb92c' },
              { limit: 4.0, color: '#02d1a7' },
              { limit: 5.0, color: '#fbb92c' },
              { limit: 6.0, color: '#f04487' },
            ];
          default:
            return [];
        }
      }
    };

  const currentTicks = getArcConfig().map(arc => ({ value: arc.limit }));  

  return (
    <Card className="bg-white border-none shadow-sm">
        
      <CardHeader className="pb-0 pt-2 px-4 flex flex-col items-center justify-center">
        <CardTitle className="text-[12px] font-bold text-black tracking-widest text-center">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[200] flex flex-col items-center justify-center">
        <GaugeComponent
          value={value}
          maxValue={6.0}
          type="radial"
          style={{ 
              width: "100%", 
              maxWidth: "260px", // Mencegah gauge terlalu besar di mobile
              margin: "0 auto",
            }}
          labels={{
            valueLabel: {
                formatTextValue: (val: number) => `${val.toFixed(1)}`,
                style: {
                    fill: "#000000",  
                    textShadow: "none", 
                    fontWeight: "bold",
              }
            },
            tickLabels: {
              type: "outer",
              defaultTickValueConfig: {
                formatTextValue: (value: number) => `${value.toFixed(1)}`,
                style: {
                    fill: "#000000",
                    textShadow: "none",
                    fontSize: 7,
                }
              },
              ticks: currentTicks
            }
          }}
          arc={{
            subArcs: getArcConfig(),
            padding: 0.02,
            width: 0.3,
            cornerRadius: 0
          }}
          pointer={{
            elastic: true,
            animationDelay: 0,
            type: "needle",
            color: '#000000',
            baseColor: '#000000',
            width: 15,
            length: 0.75,            
          }}
        />
        {/* Label Angka di Bawah Gauge */}
        {/* <div className="text-2xl font-bold text-slate-900 -mt-4">{value}%</div> */}
      </CardContent>
    </Card>
  );
}