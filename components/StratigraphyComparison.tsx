import React from 'react';
import { WellData } from '../types';
import { Layers, ArrowRight } from 'lucide-react';

interface Props {
  wells: WellData[];
}

const StratigraphyComparison: React.FC<Props> = ({ wells }) => {
  const maxDepth = Math.max(...wells.map(w => w.td));
  const columnHeight = 600;
  
  const scale = (depth: number) => (depth / maxDepth) * columnHeight;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 border-b border-slate-100 bg-white/80 backdrop-blur-xl flex justify-between items-center z-20 relative shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
        <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-2.5 tracking-tight text-lg">
                <div className="p-1.5 bg-indigo-50 rounded-lg border border-indigo-100">
                    <Layers size={18} className="text-indigo-600" />
                </div>
                Lithostratigraphic Correlation
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-1.5 pl-1">Structural cross-section analysis • {wells.length} Wells</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-slate-900 ring-2 ring-slate-200"></span>
                <span className="font-semibold text-slate-600">Oil Show</span>
             </div>
        </div>
      </div>
      
      <div className="relative flex-1 w-full overflow-auto litho-scroll bg-slate-50/30">
        <div className="flex relative min-w-max p-8 pb-12">
            
            {/* Depth Axis (Sticky Left) */}
            <div className="sticky left-0 z-30 flex flex-col justify-between pr-6 border-r border-slate-200/60 h-[600px] w-20 text-right bg-white/95 backdrop-blur-md shadow-[10px_0_30px_-10px_rgba(0,0,0,0.03)] rounded-r-xl">
                {[0, 500, 1000, 1500, 2000, 2500, 3000].filter(d => d <= maxDepth).map(depth => (
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
            <div className="flex gap-16 px-10 h-[600px]">
                {wells.map((well) => (
                    <div key={well.name} className="flex flex-col items-center w-40 group/well">
                        {/* Well Head Header */}
                        <div className="mb-6 text-center sticky top-0 bg-white/95 backdrop-blur-sm z-20 w-[120%] -ml-[10%] pb-3 border-b border-indigo-100 transition-transform duration-300 group-hover/well:translate-y-1">
                             <div className="text-sm font-bold text-slate-900 truncate w-full group-hover/well:text-indigo-600 transition-colors">{well.name}</div>
                             <div className="flex items-center justify-center gap-1.5 mt-0.5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TD</span>
                                <span className="text-xs font-mono font-medium text-slate-600">{well.td}m</span>
                             </div>
                        </div>

                        {/* The Column */}
                        <div className="relative w-28 flex-1 bg-white shadow-2xl shadow-slate-200/60 ring-1 ring-slate-900/5 rounded-sm overflow-hidden" style={{ height: `${columnHeight}px` }}>
                            {/* Paper/Grain Texture Overlay */}
                            <div className="absolute inset-0 z-10 opacity-[0.15] mix-blend-multiply pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>
                            
                            {/* Grid lines background */}
                            <div className="absolute inset-0 z-0 opacity-[0.05] bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:100%_40px]"></div>

                            {well.formations.map((fmt, idx) => {
                                const topPx = scale(fmt.topMD);
                                const heightPx = scale(fmt.bottomMD - fmt.topMD);
                                
                                return (
                                    <div
                                        key={idx}
                                        className="absolute w-full flex items-center justify-center transition-all duration-200 hover:scale-[1.1] hover:z-20 hover:shadow-xl hover:ring-2 hover:ring-white cursor-help group/formation"
                                        style={{
                                            top: `${topPx}px`,
                                            height: `${Math.max(heightPx, 1)}px`, 
                                            backgroundColor: fmt.color,
                                            borderBottom: '1px solid rgba(255,255,255,0.15)'
                                        }}
                                    >
                                        {/* Rock Pattern Overlay */}
                                        <div className="absolute inset-0 w-full h-full opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:4px_4px]"></div>

                                        {/* Label for thick layers */}
                                        {heightPx > 28 && (
                                            <span className="relative z-10 text-[9px] text-slate-900/70 font-bold truncate px-1 text-center w-full block mix-blend-overlay uppercase tracking-tight">
                                                {fmt.name.split(' ')[0]}
                                            </span>
                                        )}
                                        
                                        {/* Oil Show Indicator */}
                                        {fmt.oilShow && (
                                            <div className="absolute -right-1 top-1/2 -translate-y-1/2 z-20">
                                                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-2 ring-white shadow-sm animate-pulse"></div>
                                            </div>
                                        )}
                                        
                                        {/* Popover Content */}
                                        <div className="opacity-0 group-hover/formation:opacity-100 pointer-events-none absolute left-[105%] top-0 min-w-[240px] bg-slate-900/95 backdrop-blur text-white p-3 rounded-xl shadow-2xl z-[60] transition-all duration-200 translate-x-2 group-hover/formation:translate-x-0 border border-white/10">
                                            <div className="flex items-start justify-between border-b border-white/10 pb-2 mb-2">
                                                <div className="font-bold text-sm leading-tight text-white">{fmt.name}</div>
                                                {fmt.oilShow && <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold uppercase">Oil Show</span>}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-[10px] font-mono text-slate-400 mb-2">
                                                <div>
                                                    <span className="block text-slate-500">Top</span>
                                                    <span className="text-white">{fmt.topMD.toFixed(1)}m</span>
                                                </div>
                                                <div>
                                                    <span className="block text-slate-500">Base</span>
                                                    <span className="text-white">{fmt.bottomMD.toFixed(1)}m</span>
                                                </div>
                                            </div>
                                            <div className="text-[11px] leading-relaxed text-slate-300 bg-white/5 p-2 rounded-lg border border-white/5">
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