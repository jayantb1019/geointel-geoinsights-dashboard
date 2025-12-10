import React from 'react';
import { WellData } from '../types';
import { FileText, Bookmark, Quote, ExternalLink } from 'lucide-react';

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
            Audit trail of values extracted from PDF completion reports
        </p>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
        <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/80 border-b border-slate-100">
                <tr>
                    <th className="px-6 py-3 font-medium w-32">Well</th>
                    <th className="px-6 py-3 font-medium">Document Source</th>
                    <th className="px-6 py-3 font-medium">Extraction Context</th>
                    <th className="px-6 py-3 font-medium text-right w-24">Page</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {wells.flatMap((well) => 
                    well.documents.map((doc, idx) => (
                        <tr key={`${well.name}-${idx}`} className="group hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-semibold text-slate-700 align-top">
                                {idx === 0 ? well.name : ''}
                            </td>
                            <td className="px-6 py-4 align-top">
                                <div className="flex items-start gap-3">
                                    <div className="p-1.5 bg-blue-50 text-blue-600 rounded mt-0.5">
                                        <FileText size={14} />
                                    </div>
                                    <div>
                                        <div className="font-medium text-slate-800">{doc.title}</div>
                                        <div className="text-xs font-mono text-slate-400 mt-0.5">{doc.reference}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-slate-600 text-xs leading-relaxed align-top">
                                {doc.quote ? (
                                    <div className="relative pl-4 border-l-2 border-slate-200">
                                        <Quote size={10} className="absolute -left-1.5 -top-1 bg-white text-slate-300" />
                                        <span className="italic text-slate-500">"{doc.quote}"</span>
                                    </div>
                                ) : (
                                    <span className="text-slate-300 italic">No direct quote available</span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-slate-500 text-right align-top font-mono text-xs">
                                p.{doc.page}
                            </td>
                        </tr>
                    ))
                )}
                {wells.length === 0 && (
                    <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                            No documents currently loaded. Upload a report to see references.
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