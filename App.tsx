
import React, { useState } from 'react';
import { ACRASIA_8_DATA, simulateExtraction } from './data';
import { WellData } from './types';
import StratigraphyComparison from './components/StratigraphyComparison';
import ProductionComparison from './components/ProductionComparison';
import WellComparisonTable from './components/WellComparisonTable';
import DocumentReferenceTable from './components/DocumentReferenceTable';
import EngineeringChart from './components/EngineeringChart';
import FileUploader from './components/FileUploader';
import WellMap from './components/WellMap';
import { Box, Layers, Construction, Activity } from 'lucide-react';

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
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 font-sans pb-24 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation Bar */}
      <nav className="bg-[#0f172a] text-white border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0f172a]/90 shadow-2xl shadow-slate-900/20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-5 py-4">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20 ring-1 ring-white/10">
                <Box size={24} className="text-white" />
            </div>
            <div>
                <h1 className="text-xl font-bold tracking-tight text-white leading-none">Acrasia Field Analytics</h1>
                <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subsurface Data Intelligence</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span className="text-[10px] font-mono text-indigo-400">v2.4.1</span>
                </div>
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
                <div className="text-right border-l border-white/10 pl-8">
                    <div className="text-[10px] uppercase tracking-widest opacity-60 font-bold mb-0.5">Active Field</div>
                    <div className="font-bold text-white tracking-tight flex items-center gap-2">
                        Cooper Basin PPL 203
                        <Activity size={12} className="text-indigo-400" />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1920px] mx-auto p-6 lg:p-10 space-y-10">
        
        {/* Row 1: Upload */}
        <div className="w-full animate-in fade-in slide-in-from-top-4 duration-700">
            <FileUploader onUpload={handleFileUpload} />
        </div>

        {/* Row 2: Map & Key Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[650px]">
             <div className="lg:col-span-8 h-[500px] lg:h-full animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
                <WellMap 
                    wells={wells} 
                    selectedWellId={selectedWellId} 
                    onSelectWell={setSelectedWellId} 
                />
             </div>
             <div className="lg:col-span-4 h-full animate-in fade-in slide-in-from-right-4 duration-700 delay-100">
                 <WellComparisonTable wells={wells} />
             </div>
        </div>

        {/* Section Divider: Subsurface */}
        <div className="flex items-center gap-6 py-6 opacity-80">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
            <div className="flex items-center gap-2.5 px-6 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-slate-500 text-xs font-bold uppercase tracking-widest">
                <Layers size={14} className="text-indigo-500"/>
                Subsurface Formation & Engineering
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
        </div>

        {/* Row 3: Stratigraphy (Full Width now) */}
        <div className="h-[700px] w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 ring-1 ring-slate-900/5">
            <StratigraphyComparison wells={wells} />
        </div>

        {/* Row 4: Engineering Chart (Full Width) */}
        <div className="h-[450px] w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 ring-1 ring-slate-900/5">
             <EngineeringChart wells={wells} />
        </div>

        {/* Section Divider: Production */}
        <div className="flex items-center gap-6 py-6 opacity-80">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
            <div className="flex items-center gap-2.5 px-6 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-slate-500 text-xs font-bold uppercase tracking-widest">
                <Construction size={14} className="text-indigo-500"/>
                Production & Verification
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
        </div>

        {/* Row 5: Production & Docs */}
        <div className="w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 ring-1 ring-slate-900/5">
            <div className="h-[500px]">
                <ProductionComparison wells={wells} />
            </div>
            <div className="flex-1 border-t border-slate-100 bg-slate-50/50 p-8">
                <DocumentReferenceTable wells={wells} />
            </div>
        </div>

      </main>
    </div>
  );
}

export default App;
