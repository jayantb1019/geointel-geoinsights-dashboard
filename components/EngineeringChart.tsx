
import React from 'react';
import { WellData } from '../types';
import { Construction, AlertTriangle, AlertOctagon, Info, Crosshair, ChevronRight } from 'lucide-react';

interface Props {
  wells: WellData[];
}

const EngineeringChart: React.FC<Props> = ({ wells }) => {
  const maxDepth = Math.max(...wells.map(w => w.td || 2000), 100);
  
  // Helper for horizontal positioning as percentage
  const getPos = (depth: number) => `${(depth / maxDepth) * 100}%`;
  const getWidth = (start: number, end: number) => `${((end - start) / maxDepth) * 100}%`;

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-100 bg-white/80 backdrop-blur-xl flex justify-between items-center z-20">
        <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-3 tracking-tight text-lg">
                <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-100 text-indigo-600">
                    <Construction size={20} />
                </div>
                Drilling & Completions Events
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-1.5 pl-1">Horizontal Engineering Log • Depth vs Events</p>
        </div>
        <div className="flex gap-6">
             <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Complication
             </div>
             <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                <span className="w-4 h-2 bg-slate-800 rounded-sm border border-slate-600 opacity-80" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '4px 4px' }}></span> Perforation
             </div>
        </div>
      </div>
      
      {/* Chart Area */}
      <div className="relative flex-1 w-full overflow-x-auto bg-slate-50/50 p-8">
        <div className="min-w-[1000px] h-full flex flex-col">
            
            {/* Depth Axis (Top) */}
            <div className="flex mb-4 relative h-8 border-b border-slate-300 ml-48">
                {[0, 0.2, 0.4, 0.6, 0.8, 1].map((tick) => {
                    const depth = Math.round(maxDepth * tick);
                    return (
                        <div 
                            key={tick} 
                            className="absolute bottom-0 flex flex-col items-center transform -translate-x-1/2"
                            style={{ left: `${tick * 100}%` }}
                        >
                            <span className="mb-2 text-[10px] font-mono font-bold text-slate-400">{depth}m</span>
                            <div className="h-2 w-px bg-slate-300"></div>
                        </div>
                    );
                })}
            </div>

            {/* Well Tracks */}
            <div className="flex-1 space-y-6">
                {wells.map((well) => (
                    <div key={well.name} className="flex items-center group/well relative hover:z-[100]">
                        {/* Well Info Label (Left) */}
                        <div className="w-48 pr-6 flex flex-col items-end shrink-0">
                             <div className="font-bold text-sm text-slate-900 group-hover/well:text-indigo-600 transition-colors">{well.name}</div>
                             <div className="text-[10px] text-slate-400 font-mono">TD: {well.td?.toLocaleString() ?? '?'}m</div>
                        </div>

                        {/* Track */}
                        <div className="flex-1 h-16 relative bg-white border border-slate-200 rounded-lg shadow-sm group-hover/well:shadow-md transition-all">
                            
                            {/* Clipped Background Layer for Grid & Lines */}
                            <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
                                {/* Grid Background */}
                                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:100px_100%]"></div>
                                {/* Borehole Line */}
                                <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 border-y border-slate-200 -mt-0.5"></div>
                            </div>

                            {/* Perforations (Unclipped) */}
                            {well.perforations && well.perforations.map((perf, idx) => (
                                <div
                                    key={`perf-${idx}`}
                                    className="absolute top-1/2 -translate-y-1/2 h-8 bg-slate-800 border-2 border-slate-600 z-10 group/perf cursor-help rounded-sm"
                                    style={{
                                        left: getPos(perf.topMD),
                                        width: `calc(${getWidth(perf.topMD, perf.bottomMD)} + 2px)`, // Ensure min width visibility
                                        minWidth: '4px'
                                    }}
                                >
                                    {/* Texture */}
                                    <div className="w-full h-full opacity-60 bg-[radial-gradient(circle,#fff_1px,transparent_1px)] [background-size:4px_4px]"></div>
                                    
                                    {/* Tooltip */}
                                    <div className="opacity-0 group-hover/perf:opacity-100 pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-slate-900 text-white text-[10px] p-2.5 rounded shadow-xl whitespace-nowrap z-[200] transition-opacity duration-150">
                                        <div className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1"><Crosshair size={10}/> Perforation Zone</div>
                                        <div>{perf.zone}</div>
                                        <div className="font-mono text-slate-400 mt-0.5">{perf.topMD}-{perf.bottomMD}m</div>
                                        <div className="absolute left-1/2 bottom-0 -mb-1 w-2 h-2 bg-slate-900 transform rotate-45 -translate-x-1/2"></div>
                                    </div>
                                </div>
                            ))}

                            {/* Complications (Unclipped) */}
                            {well.complications && well.complications.map((comp, idx) => {
                                let Icon = Info;
                                let colorClass = "text-blue-500 bg-blue-50 border-blue-200";
                                
                                if (comp.severity === 'medium') {
                                    Icon = AlertTriangle;
                                    colorClass = "text-amber-500 bg-amber-50 border-amber-200";
                                } else if (comp.severity === 'high') {
                                    Icon = AlertOctagon;
                                    colorClass = "text-rose-500 bg-rose-50 border-rose-200";
                                }

                                return (
                                    <div
                                        key={`comp-${idx}`}
                                        className="absolute top-1/2 -translate-y-1/2 z-20 group/comp cursor-pointer -ml-3" // Offset to center icon
                                        style={{ left: getPos(comp.depth) }}
                                    >
                                        <div className={`p-1.5 rounded-full border shadow-sm ${colorClass} hover:scale-110 transition-transform`}>
                                            <Icon size={14} />
                                        </div>

                                        {/* Complication Tooltip */}
                                        <div className="opacity-0 group-hover/comp:opacity-100 pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white border border-slate-200 text-slate-800 p-3 rounded-xl shadow-xl w-48 z-[200] ring-1 ring-slate-900/5 transition-opacity duration-150">
                                            <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${comp.severity === 'high' ? 'text-rose-600' : comp.severity === 'medium' ? 'text-amber-600' : 'text-blue-600'}`}>
                                                {comp.type}
                                            </div>
                                            <div className="text-xs text-slate-600 leading-snug">{comp.description}</div>
                                            <div className="mt-2 text-[10px] font-mono font-medium text-slate-400 flex items-center justify-between border-t border-slate-100 pt-1">
                                                <span>Depth</span>
                                                <span>{comp.depth}m</span>
                                            </div>
                                            <div className="absolute left-1/2 top-0 -mt-1.5 w-3 h-3 bg-white border-t border-l border-slate-200 transform rotate-45 -translate-x-1/2"></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        {/* End TD Marker */}
                        <div className="w-12 pl-3 text-[10px] text-slate-300 font-mono">
                            <ChevronRight size={14} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default EngineeringChart;
