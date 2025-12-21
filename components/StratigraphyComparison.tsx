
import React from 'react';
import { WellData } from '../types';
import { Layers, Droplets } from 'lucide-react';

interface Props {
  wells: WellData[];
}

const StratigraphyComparison: React.FC<Props> = ({ wells }) => {
  const maxDepth = Math.max(...wells.map(w => w.td));
  const columnHeight = 650;
  
  const scale = (depth: number) => (depth / maxDepth) * columnHeight;

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-white/80 backdrop-blur-xl flex justify-between items-center z-20 relative">
        <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-3 tracking-tight text-lg">
                <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-100 text-indigo-600">
                    <Layers size={20} />
                </div>
                Lithostratigraphic Correlation
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-1.5 pl-1">Structural cross-section analysis • {wells.length} Wells</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100 shadow-sm text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm ring-1 ring-emerald-200"></span>
                Oil Show Detected
             </div>
        </div>
      </div>
      
      {/* Visualization Area */}
      <div className="relative flex-1 w-full overflow-auto litho-scroll bg-slate-50/50">
        <div className="flex relative min-w-max p-8 pb-12">
            
            {/* Depth Axis (Sticky Left) */}
            <div className="sticky left-0 z-30 flex flex-col justify-between pr-4 border-r border-slate-300/50 h-[650px] w-24 text-right bg-white/95 backdrop-blur-md shadow-[4px_0_20px_-5px_rgba(0,0,0,0.05)] rounded-r-2xl my-auto">
                {/* Ruler Markings */}
                <div className="absolute inset-y-0 right-0 w-px bg-slate-300"></div>
                
                {[0, 250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000].filter(d => d <= maxDepth).map(depth => (
                    <div 
                        key={depth} 
                        className="absolute right-0 w-full flex items-center justify-end group cursor-default" 
                        style={{ top: `${scale(depth)}px` }}
                    >
                        <span className="text-[10px] font-mono font-medium text-slate-400 group-hover:text-indigo-600 transition-colors mr-3">{depth}m</span>
                        <div className="w-2 h-px bg-slate-300 group-hover:bg-indigo-500 group-hover:w-3 transition-all"></div>
                    </div>
                ))}
            </div>

            {/* Wells Container */}
            <div className="flex gap-16 px-12 h-[650px]">
                {wells.map((well) => (
                    <div key={well.name} className="flex flex-col items-center w-40 group/well relative hover:z-[100]">
                        {/* Well Head Header */}
                        <div className="mb-6 text-center sticky top-0 bg-white/95 backdrop-blur-sm z-20 w-[140%] -ml-[20%] pb-4 pt-2 border-b border-indigo-100/50 transition-transform duration-300 group-hover/well:translate-y-1 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-b-xl">
                             <div className="text-sm font-bold text-slate-900 truncate w-full group-hover/well:text-indigo-600 transition-colors">{well.name}</div>
                             <div className="flex items-center justify-center gap-2 mt-1">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-1.5 py-0.5 rounded">TD</span>
                                <span className="text-xs font-mono font-medium text-slate-600">{well.td}m</span>
                             </div>
                        </div>

                        {/* The Column (Overflow visible for tooltips) */}
                        <div className="relative w-32 flex-1 bg-white shadow-2xl shadow-slate-300/40 ring-1 ring-slate-900/5 rounded-sm transform transition-transform duration-500" style={{ height: `${columnHeight}px` }}>
                            
                            {/* Clipped Background Layer for Textures */}
                            <div className="absolute inset-0 z-10 rounded-sm overflow-hidden pointer-events-none">
                                {/* Paper/Grain Texture Overlay */}
                                <div className="absolute inset-0 opacity-[0.15] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>
                                {/* Grid lines background */}
                                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:100%_40px]"></div>
                            </div>

                            {/* Formations (Unclipped) */}
                            {well.formations.map((fmt, idx) => {
                                const topPx = scale(fmt.topMD);
                                const heightPx = scale(fmt.bottomMD - fmt.topMD);
                                
                                return (
                                    <div
                                        key={idx}
                                        className="absolute w-full flex items-center justify-center transition-all duration-200 hover:z-20 hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:ring-2 hover:ring-white cursor-help group/formation"
                                        style={{
                                            top: `${topPx}px`,
                                            height: `${Math.max(heightPx, 1)}px`, 
                                            backgroundColor: fmt.color,
                                            borderBottom: '1px solid rgba(255,255,255,0.1)'
                                        }}
                                    >
                                        {/* Rock Pattern Overlay */}
                                        <div className="absolute inset-0 w-full h-full opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px]"></div>

                                        {/* Label for thick layers */}
                                        {heightPx > 32 && (
                                            <span className="relative z-10 text-[9px] text-slate-900/60 font-black truncate px-1 text-center w-full block mix-blend-color-burn uppercase tracking-tight">
                                                {fmt.name.split(' ')[0]}
                                            </span>
                                        )}
                                        
                                        {/* Oil Show Indicator with Tooltip */}
                                        {fmt.oilShow && (
                                            <div className="absolute -right-2 top-1/2 -translate-y-1/2 z-30 group/oil">
                                                <div className="w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white shadow-lg flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                                </div>
                                                
                                                {/* Tooltip */}
                                                <div className="opacity-0 group-hover/oil:opacity-100 pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 w-48 bg-slate-900 text-white p-3 rounded-lg shadow-xl z-[200] transition-opacity duration-200">
                                                    <div className="flex items-center gap-2 mb-1 border-b border-white/10 pb-1">
                                                        <Droplets size={12} className="text-emerald-400" />
                                                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Hydrocarbon Show</span>
                                                    </div>
                                                    <div className="text-[10px] text-slate-300 leading-snug">
                                                        Presence of oil detected in <span className="text-white font-medium">{fmt.name}</span> formation.
                                                    </div>
                                                    <div className="mt-2 text-[10px] font-mono text-slate-500">
                                                        Depth: {fmt.topMD}m - {fmt.bottomMD}m
                                                    </div>
                                                    {/* Triangle pointer */}
                                                    <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-1 border-8 border-transparent border-r-slate-900"></div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Formation Info Popover */}
                                        <div className="opacity-0 group-hover/formation:opacity-100 pointer-events-none absolute left-[105%] top-0 min-w-[260px] bg-white/95 backdrop-blur-xl text-slate-800 p-4 rounded-xl shadow-2xl shadow-slate-900/20 z-[200] transition-all duration-200 translate-x-4 group-hover/formation:translate-x-0 border border-slate-200 ring-1 ring-slate-900/5">
                                            <div className="flex items-start justify-between border-b border-slate-100 pb-2 mb-2">
                                                <div className="font-bold text-sm leading-tight text-slate-900">{fmt.name}</div>
                                                {fmt.oilShow && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide border border-emerald-200">Oil Show</span>}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-[10px] font-mono text-slate-500 mb-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                                <div>
                                                    <span className="block text-slate-400 uppercase tracking-wider text-[9px] mb-0.5">Top MD</span>
                                                    <span className="text-slate-700 font-bold text-xs">{fmt.topMD.toFixed(1)}m</span>
                                                </div>
                                                <div>
                                                    <span className="block text-slate-400 uppercase tracking-wider text-[9px] mb-0.5">Base MD</span>
                                                    <span className="text-slate-700 font-bold text-xs">{fmt.bottomMD.toFixed(1)}m</span>
                                                </div>
                                            </div>
                                            <div className="text-xs leading-relaxed text-slate-600">
                                                {fmt.description || 'No lithological description available.'}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default StratigraphyComparison;
