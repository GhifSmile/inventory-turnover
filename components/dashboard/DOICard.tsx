"use client"

import { CardContent } from "@/components/ui/card";
import { PackageSearch, Layers, Fish, Shell } from "lucide-react";

interface Props {
  overallDOI: number;
  fishDOI: number;
  shrimpDOI: number
}

export default function DOIAchievementCard({ overallDOI, fishDOI, shrimpDOI }: Props) {

  return (
    <div className="bg-white rounded-xl shadow-sm w-full h-full overflow-hidden">
      <CardContent className="h-full pt-4 pb-4 px-6 flex items-center bg-transparent">
        
        <div className="flex flex-col space-y-1 w-full"> 
          
          {/* Icon Utama (Tidak diubah) */}
          <div className="bg-transparent mb-3">
            <PackageSearch className="w-8 h-8 text-[#6691dc]" />
          </div>

          <div>
            {/* Title (Tidak diubah) */}
            <h3 className="text-[12px] font-bold text-black tracking-widest leading-none mb-5">
              Days of Inventory (DOI)
            </h3>
            
            {/* List Detail: Icon, Label, dan Value diperbesar */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Layers className="w-6 h-6 text-[#4bc0f2]" />
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold text-black">DOI - Overall:</span>
                  <span className="text-2xl font-bold text-[#4bc0f2] tracking-tight">{overallDOI}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Fish className="w-6 h-6 text-[#f2a977]" />
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold text-black">DOI - Fish:</span>
                  <span className="text-2xl font-bold text-[#f2a977] tracking-tight">{fishDOI}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Shell className="w-6 h-6 text-[#ca7bfc]" />
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold text-black">DOI - Shrimp:</span>
                  <span className="text-2xl font-bold text-[#ca7bfc] tracking-tight">{shrimpDOI}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </div>
  );
}