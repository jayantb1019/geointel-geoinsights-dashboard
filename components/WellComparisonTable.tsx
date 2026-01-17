
import React from 'react';
import { WellData } from '../types';
import { MapPin, Calendar, ArrowDown, Database, Info, Activity } from 'lucide-react';

interface Props {
  wells: WellData[];
}

const WellComparisonTable: React.FC<Props> = ({ wells }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden flex flex-col h-full ring-1 ring-slate-900/5">
      <div className="bg-white p-6 border-b border-slate-100 flex justify-between items-center">
        <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-3 tracking-tight text-lg">
                <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-100 text-indigo-600">
                    <Database size={20} /> 
                </div>
                Asset Specs
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-1.5 pl-1">Technical comparison matrix</p>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100 shadow-sm">
            {wells.length} Active Assets
        </div>
      </div>
      
      <div className="overflow-auto flex-1 custom-scrollbar">
        <table className="w-full text-sm text-left border-collapse">
            <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 sticky top-0 backdrop-blur-sm z-10">
                    <th className="px-8 py-5 font-bold text-[10px] uppercase tracking-widest text-slate-400 w-1/4">Property</th>
                    {wells.map(w => (
                        <th key={w.name} className="px-6 py-5 font-bold text-slate-800 whitespace-nowrap min-w-[140px] text-xs">
                            {w.name}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                <tr className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 font-semibold text-slate-500 flex items-center gap-3 text-xs uppercase tracking-wide">
                        <div className="p-1.5 rounded-md bg-slate-100 text-slate-500 ring-1 ring-slate-200/50"><ArrowDown size={14}/></div>
                        Total Depth
                    </td>
                    {wells.map(w => <td key={w.name} className="px-6 py-5 font-mono font-medium text-slate-700 tabular-nums">{w.td?.toLocaleString() ?? 'N/A'} <span className="text-slate-400 text-xs font-sans">m</span></td>)}
                </tr>
                <tr className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 font-semibold text-slate-500 flex items-center gap-3 text-xs uppercase tracking-wide">
                        <div className="p-1.5 rounded-md bg-slate-100 text-slate-500 ring-1 ring-slate-200/50"><Activity size={14}/></div>
                        KB Elevation
                    </td>
                    {wells.map(w => <td key={w.name} className="px-6 py-5 font-mono text-slate-600 tabular-nums">{w.kbElevation?.toLocaleString() ?? '-'} <span className="text-slate-400 text-xs font-sans">m</span></td>)}
                </tr>
                <tr className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 font-semibold text-slate-500 flex items-center gap-3 text-xs uppercase tracking-wide">
                        <div className="p-1.5 rounded-md bg-slate-100 text-slate-500 ring-1 ring-slate-200/50"><Calendar size={14}/></div>
                        Spud Date
                    </td>
                    {wells.map(w => <td key={w.name} className="px-6 py-5 text-slate-600 font-medium">{w.spudDate || '-'}</td>)}
                </tr>
                <tr className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 font-semibold text-slate-500 flex items-center gap-3 text-xs uppercase tracking-wide">
                        <div className="p-1.5 rounded-md bg-slate-100 text-slate-500 ring-1 ring-slate-200/50"><MapPin size={14}/></div>
                        Coordinates
                    </td>
                    {wells.map(w => (
                        <td key={w.name} className="px-6 py-5">
                            <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between items-baseline max-w-[140px] border-b border-slate-100 pb-1 border-dashed">
                                    <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">East</span>
                                    <span className="font-mono text-xs text-slate-700 tabular-nums">{w.location?.easting?.toLocaleString() ?? '-'}</span>
                                </div>
                                <div className="flex justify-between items-baseline max-w-[140px]">
                                    <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">North</span>
                                    <span className="font-mono text-xs text-slate-700 tabular-nums">{w.location?.northing?.toLocaleString() ?? '-'}</span>
                                </div>
                            </div>
                        </td>
                    ))}
                </tr>
                 <tr className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5 font-semibold text-slate-500 flex items-center gap-3 text-xs uppercase tracking-wide">
                         <div className="p-1.5 rounded-md bg-slate-100 text-slate-500 ring-1 ring-slate-200/50"><Database size={14}/></div>
                        Pay Zones
                    </td>
                    {wells.map(w => (
                        <td key={w.name} className="px-6 py-5">
                            <span className={`
                                inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border
                                ${w.production && w.production.length > 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}
                            `}>
                                {w.production?.length || 0} {w.production?.length === 1 ? 'Zone' : 'Zones'}
                            </span>
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default WellComparisonTable;
