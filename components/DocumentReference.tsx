import React from 'react';
import { WellData } from '../types';
import { FileText } from 'lucide-react';

interface Props {
  data: WellData;
}

const DocumentReference: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <FileText size={18} />
        Extracted Data References
      </h3>
      <div className="space-y-3">
        {data.documents.map((doc, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
            <div className="mt-1 bg-blue-100 text-blue-600 p-1.5 rounded">
                <FileText size={14} />
            </div>
            <div>
                <div className="text-sm font-medium text-slate-800">{doc.title}</div>
                <div className="text-xs text-slate-500">Ref: {doc.reference} • Page {doc.page}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentReference;