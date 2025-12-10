import React, { useCallback, useState } from 'react';
import { Loader2, CheckCircle2, UploadCloud, FileText, ArrowUpCircle } from 'lucide-react';

interface Props {
  onUpload: (files: File[]) => Promise<void>;
}

const FileUploader: React.FC<Props> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).filter((f: any) => f.type === 'application/pdf') as File[];
      if (files.length > 0) {
        setIsProcessing(true);
        await onUpload(files);
        setIsProcessing(false);
        setUploadCount(prev => prev + files.length);
      }
    }
  }, [onUpload]);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setIsProcessing(true);
      await onUpload(files);
      setIsProcessing(false);
      setUploadCount(prev => prev + files.length);
    }
  };

  return (
    <div className="w-full group">
       <div 
        className={`
          relative w-full border-2 border-dashed rounded-2xl px-8 py-10 flex items-center justify-between transition-all duration-500 cursor-pointer overflow-hidden
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-50/80 scale-[1.005] shadow-2xl shadow-indigo-200/50' 
            : 'border-slate-200 hover:border-indigo-300 bg-white shadow-sm hover:shadow-xl hover:shadow-indigo-100/40'
          }
          ${isProcessing ? 'opacity-70 pointer-events-none' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-500 ${isDragging ? 'opacity-100' : 'group-hover:opacity-100'}`}></div>
        
        <input 
          id="file-upload" 
          type="file" 
          multiple 
          accept=".pdf" 
          className="hidden" 
          onChange={handleFileInput}
        />
        
        <div className="flex items-center gap-8 relative z-10">
             <div className={`
                w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-inner
                ${isDragging 
                    ? 'bg-indigo-500 text-white scale-110 rotate-3 shadow-indigo-300' 
                    : 'bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-indigo-600 group-hover:shadow-lg group-hover:scale-105 group-hover:ring-1 group-hover:ring-indigo-100'
                }
             `}>
                {isProcessing ? (
                   <Loader2 className="w-10 h-10 animate-spin" />
                ) : (
                   <UploadCloud className="w-10 h-10" />
                )}
            </div>
            <div className="flex flex-col">
                 <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-900 transition-colors tracking-tight">
                  {isProcessing ? 'Ingesting Well Data...' : 'Upload Completion Reports'}
                </h3>
                <p className="text-sm font-medium text-slate-500 group-hover:text-indigo-600/70 transition-colors mt-2 max-w-md leading-relaxed">
                  {isProcessing ? 'AI extracting lithology, depth, and flow rates' : 'Drag and drop PDF well completion reports here to automatically extract and visualize subsurface data.'}
                </p>
            </div>
        </div>

        <div className="flex items-center gap-6 relative z-10">
            {uploadCount > 0 && !isProcessing && (
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50/80 backdrop-blur-md px-5 py-2.5 rounded-xl border border-emerald-100 shadow-sm animate-in fade-in slide-in-from-right-4">
                    <CheckCircle2 size={18} />
                    <span className="font-semibold text-sm">{uploadCount} Processed</span>
            </div>
            )}
            
            {!isProcessing && (
                <div className={`hidden sm:flex flex-col items-end gap-1 transition-opacity duration-300 ${uploadCount > 0 ? 'opacity-50' : 'opacity-100'}`}>
                    <div className="flex items-center gap-2 text-slate-400 bg-slate-100/50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <FileText size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">PDF Only</span>
                    </div>
                </div>
            )}

            <div className={`
                w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300
                ${isDragging ? 'border-indigo-300 bg-white text-indigo-600' : 'border-slate-100 bg-slate-50 text-slate-300 group-hover:border-indigo-200 group-hover:text-indigo-500 group-hover:bg-indigo-50'}
            `}>
                <ArrowUpCircle size={24} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;