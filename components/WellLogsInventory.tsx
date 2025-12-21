
import React from 'react';
import { WellData } from '../types';
import { Binary, Calendar, Ruler, Info } from 'lucide-react';

interface Props {
  wells: WellData[];
}

const WellLogsInventory: React.FC<Props> = ({ wells }) => {
  const maxDepth = Math.max(...wells.map(w => w.td));

  // Helper for horizontal positioning
  const getPos = (depth: number) => `${(depth / maxDepth) * 100}%`;
  const getWidth = (start: number, end: number) => `${((end - start) / maxDepth) * 100}%`;

  return (
    <div className="flex flex-col h-full bg-white relative rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 ring-1 ring-slate-900/5">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-white/80 backdrop-blur-xl flex justify-between items-center z-20 rounded-t-3xl">
        <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-3 tracking-tight text-lg">
                <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-100 text-indigo-600">
                    <Binary size={20} />
                </div>
                Wireline Logs Inventory
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-1.5 pl-1">Log suites comparison • Depth vs Coverage</p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-indigo-500 opacity-90 border border-indigo-600"></span> Run 1
            </div>
            <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-violet-400 opacity-90 border border-violet-500"></span> Run 2+
            </div>
        </div>
      </div>
      
      {/* Chart Container */}
      <div className="flex-1 overflow-x-auto overflow-y-auto bg-slate-50/50 p-6 relative custom-scrollbar rounded-b-3xl">
         <div className="min-w-[600px] h-full flex flex-col">
            {/* X-Axis (Depth) */}
            <div className="h-8 relative border-b border-slate-300 ml-32 mb-2">
                 {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
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

            {/* Rows */}
            <div className="flex-1 space-y-3 pb-6">
                {wells.map(well => (
                    <div key={well.name} className="flex items-center group/well relative hover:z-[100]">
                         {/* Label */}
                         <div className="w-32 pr-4 text-right shrink-0">
                            <div className="text-xs font-bold text-slate-700 group-hover/well:text-indigo-600 truncate transition-colors">{well.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">TD: {well.td}m</div>
                         </div>

                         {/* Track */}
                         <div className="flex-1 h-12 relative bg-white border border-slate-200 rounded-lg shadow-sm group-hover/well:shadow-md transition-all">
                              {/* Grid bg (Clipped) */}
                              <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
                                  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:100px_100%]"></div>
                              </div>

                              {/* Logs (Unclipped for overlapping tooltips if needed) */}
                              {well.logs.map((log, idx) => (
                                  <div
                                    key={idx}
                                    className={`absolute top-2 bottom-2 rounded-[2px] border opacity-90 transition-all hover:opacity-100 hover:scale-y-110 hover:shadow-md cursor-help group/log z-10
                                        ${log.runNumber === 1 ? 'bg-indigo-500 border-indigo-600' : 'bg-violet-400 border-violet-500'}
                                    `}
                                    style={{
                                        left: getPos(log.topMD),
                                        width: getWidth(log.topMD, log.bottomMD),
                                        minWidth: '2px'
                                    }}
                                  >
                                      {/* Tooltip */}
                                      <div className="opacity-0 group-hover/log:opacity-100 pointer-events-none absolute bottom-full right-0 mb-2 bg-slate-900 text-white text-[10px] p-3 rounded-xl shadow-xl whitespace-nowrap z-[200] transition-opacity duration-150 min-w-[180px] ring-1 ring-white/10">
                                          <div className="font-bold text-indigo-300 mb-1.5 flex items-center gap-2 border-b border-white/10 pb-1.5">
                                              <Binary size={12} /> 
                                              <span className="truncate max-w-[150px]">{log.suite}</span>
                                          </div>
                                          <div className="space-y-1.5 text-slate-300 font-medium">
                                              <div className="flex justify-between gap-4"><span className="text-slate-500 uppercase tracking-wider text-[9px] font-bold">Run</span> <span className="font-mono text-white">#{log.runNumber}</span></div>
                                              <div className="flex justify-between gap-4"><span className="text-slate-500 uppercase tracking-wider text-[9px] font-bold">Depth</span> <span className="font-mono text-white">{log.topMD} - {log.bottomMD}m</span></div>
                                              <div className="flex justify-between gap-4"><span className="text-slate-500 uppercase tracking-wider text-[9px] font-bold">Date</span> <span className="font-mono text-white">{log.date}</span></div>
                                              <div className="flex justify-between gap-4"><span className="text-slate-500 uppercase tracking-wider text-[9px] font-bold">Svc Co</span> <span className="text-white">{log.company}</span></div>
                                          </div>
                                          {/* Arrow */}
                                          <div className="absolute right-4 bottom-0 -mb-1 w-2.5 h-2.5 bg-slate-900 transform rotate-45 border-b border-r border-slate-900/50"></div>
                                      </div>
                                  </div>
                              ))}
                              
                              {well.logs.length === 0 && (
                                  <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-300 italic">No Logs</div>
                              )}
                         </div>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default WellLogsInventory;
