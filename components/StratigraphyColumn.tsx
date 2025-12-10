import React from 'react';
import { WellData, Formation } from '../types';

interface Props {
  data: WellData;
}

const StratigraphyColumn: React.FC<Props> = ({ data }) => {
  // Calculate total depth for scaling
  const maxDepth = data.td;
  
  // Height of the visual column in pixels
  const columnHeight = 800;
  
  const scale = (depth: number) => (depth / maxDepth) * columnHeight;

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50">
        <h3 className="font-semibold text-slate-800">Stratigraphic Column</h3>
        <p className="text-xs text-slate-500">Depth vs Lithology</p>
      </div>
      
      <div className="relative flex-1 w-full overflow-y-auto litho-scroll p-4">
        <div className="relative w-full" style={{ height: `${columnHeight}px` }}>
          {/* Depth Axis Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-300 z-10"></div>
          
          {/* Depth Markers */}
          {[0, 500, 1000, 1500, 2000, 2500].map(depth => (
            <div 
              key={depth} 
              className="absolute left-0 flex items-center" 
              style={{ top: `${scale(depth)}px` }}
            >
              <div className="w-2 h-px bg-slate-400"></div>
              <span className="text-[10px] text-slate-400 ml-1">{depth}m</span>
            </div>
          ))}

          {/* Formations */}
          <div className="absolute left-10 right-4 top-0 bottom-0">
            {data.formations.map((fmt, idx) => {
              const topPx = scale(fmt.topMD);
              const heightPx = scale(fmt.bottomMD - fmt.topMD);
              
              return (
                <div
                  key={idx}
                  className="absolute w-full border-b border-white/20 flex items-center justify-between px-2 group transition-all hover:brightness-95 cursor-pointer"
                  style={{
                    top: `${topPx}px`,
                    height: `${Math.max(heightPx, 20)}px`, // Minimum height for visibility
                    backgroundColor: fmt.color,
                  }}
                  title={`${fmt.name}: ${fmt.topMD}m - ${fmt.bottomMD}m\n${fmt.description || ''}`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="text-xs font-medium text-slate-800 truncate mix-blend-hard-light">
                      {fmt.name}
                    </span>
                    {fmt.oilShow && (
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-black animate-pulse" title="Oil Show Detected"></span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-700 hidden group-hover:block bg-white/50 px-1 rounded">
                    {fmt.topMD}m
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="p-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
         <span className="w-2 h-2 rounded-full bg-black"></span> Oil Show Detected
      </div>
    </div>
  );
};

export default StratigraphyColumn;