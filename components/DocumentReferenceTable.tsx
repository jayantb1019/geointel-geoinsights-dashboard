
import React from 'react';
import { WellData } from '../types';
import { FileText, Bookmark, Quote, Link2 } from 'lucide-react';

interface Props {
  wells: WellData[];
}

const DocumentReferenceTable: React.FC<Props> = ({ wells }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wide">
            <Bookmark size={16} className="text-slate-400" /> Source Data Verification
        </h3>
        <p className="text-xs text-slate-400 mt-1">
            Audit trail linking dashboard visualizations to original source documents.
        </p>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-sm text-left border-collapse">
            <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                    <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-wider text-slate-500 w-1/5">Well Number</th>
                    <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-wider text-slate-500 w-1/4">Extracted Data</th>
                    <th className="px-6 py-4 font-bold text-[10px] uppercase tracking-wider text-slate-500">Source Text Segment</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {wells.flatMap((well) => 
                    well.documents.map((doc, idx) => (
                        <tr key={`${well.name}-${idx}`} className="group hover:bg-slate-50 transition-colors">
                            {/* Column 1: Well Number (Name) */}
                            <td className="px-6 py-5 align-top">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                    <span className="font-bold text-slate-700 text-xs">{well.name}</span>
                                </div>
                            </td>

                            {/* Column 2: Extracted Data */}
                            <td className="px-6 py-5 align-top">
                                <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-2 inline-block">
                                    <span className="font-mono text-xs font-semibold text-indigo-700 block">
                                        {doc.extractedData || 'Data Point'}
                                    </span>
                                </div>
                                <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-slate-400">
                                    <FileText size={10} />
                                    <span>{doc.title}</span>
                                </div>
                            </td>

                            {/* Column 3: Source Text Segment */}
                            <td className="px-6 py-5 align-top">
                                <div className="relative">
                                     {doc.quote ? (
                                        <div className="relative pl-5 border-l-2 border-slate-200 group-hover:border-indigo-300 transition-colors">
                                            <Quote size={12} className="absolute -left-1.5 top-0.5 bg-white text-slate-300 group-hover:text-indigo-400 transition-colors" />
                                            <p className="italic text-slate-600 text-xs leading-relaxed font-serif">
                                                "{doc.quote}"
                                            </p>
                                        </div>
                                    ) : (
                                        <span className="text-slate-300 italic text-xs">No extract available</span>
                                    )}
                                    
                                    <div className="mt-3 flex items-center gap-3 text-[10px] font-mono text-slate-400">
                                        <div className="flex items-center gap-1 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                                            <Link2 size={10} />
                                            <span>{doc.reference}</span>
                                        </div>
                                        <span>•</span>
                                        <span className="font-semibold">Page {doc.page}</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
                {wells.length === 0 && (
                    <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">
                            No well data loaded.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentReferenceTable;
