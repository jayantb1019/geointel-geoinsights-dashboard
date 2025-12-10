import React, { useState } from 'react';
import { ACRASIA_8_DATA, simulateExtraction } from './data';
import { WellData } from './types';
import StratigraphyComparison from './components/StratigraphyComparison';
import ProductionComparison from './components/ProductionComparison';
import WellComparisonTable from './components/WellComparisonTable';
import DocumentReferenceTable from './components/DocumentReferenceTable';
import FileUploader from './components/FileUploader';
import WellMap from './components/WellMap';
import { Box, Layers, BarChart3, Database } from 'lucide-react';

function App() {
  const [wells, setWells] = useState<WellData[]>([ACRASIA_8_DATA]);
  const [selectedWellId, setSelectedWellId] = useState<string>(ACRASIA_8_DATA.name);

  const handleFileUpload = async (files: File[]) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newWells = files.map(file => simulateExtraction(file.name));
        setWells(prev => [...prev, ...newWells]);
        
        if (newWells.length > 0) {
            setSelectedWellId(newWells[newWells.length - 1].name);
        }
        resolve();
      }, 1500); 
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans pb-24 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation Bar */}
      <nav className="bg-[#0f172a] text-white border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0f172a]/90">
        <div className="max-w-[1920px] mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-5 py-4">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20 ring-1 ring-white/10">
                <Box size={22} className="text-white" />
            </div>
            <div>
                <h1 className="text-xl font-bold tracking-tight text-white leading-none">Acrasia Field Analytics</h1>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">Subsurface Data Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 shadow-inner">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-slate-300 font-medium text-xs tracking-wide">Live Connection</span>
                </div>
                <div className="text-right border-l border-white/10 pl-6">
                    <div className="text-[10px] uppercase tracking-widest opacity-60 font-bold mb-0.5">Active Field</div>
                    <div className="font-semibold text-white tracking-tight">Cooper Basin PPL 203</div>
                </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1920px] mx-auto p-4 md:p-8 space-y-8">
        
        {/* Row 1: Upload (Full Width Banner style) */}
        <div className="w-full animate-in fade-in slide-in-from-top-4 duration-700">
            <FileUploader onUpload={handleFileUpload} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[650px]">
             {/* Map takes up 8 columns */}
             <div className="lg:col-span-8 h-[500px] lg:h-full animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
                <WellMap 
                    wells={wells} 
                    selectedWellId={selectedWellId} 
                    onSelectWell={setSelectedWellId} 
                />
             </div>
             {/* Key Metrics / Well List take up 4 columns */}
             <div className="lg:col-span-4 h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-100">
                 <WellComparisonTable wells={wells} />
             </div>
        </div>

        {/* Section Divider */}
        <div className="flex items-center gap-6 py-8">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent flex-1"></div>
            <div className="flex items-center gap-2.5 px-5 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-slate-500 text-xs font-bold uppercase tracking-widest">
                <Layers size={14} className="text-indigo-500"/>
                Subsurface Analysis
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent flex-1"></div>
        </div>

        {/* Row 3: Stratigraphy & Production */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          
          {/* Stratigraphy Comparison */}
          <div className="h-[750px] w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <StratigraphyComparison wells={wells} />
          </div>

          {/* Production Comparison */}
          <div className="h-[750px] w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <ProductionComparison wells={wells} />
            <div className="flex-1 border-t border-slate-100 bg-slate-50/30 p-8">
                <DocumentReferenceTable wells={wells} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;