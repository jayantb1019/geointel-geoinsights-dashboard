import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { WellData } from '../types';
import { BarChart3 } from 'lucide-react';

interface Props {
  wells: WellData[];
}

const ProductionComparison: React.FC<Props> = ({ wells }) => {
  const allZones = Array.from(new Set(wells.flatMap(w => w.production.map(p => p.zone))));
  
  const chartData = allZones.map(zone => {
    const entry: any = { zone };
    wells.forEach(well => {
      const prod = well.production.find(p => p.zone === zone);
      if (prod) {
        entry[well.name] = prod.rateBOPD;
      }
    });
    return entry;
  });

  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];

  return (
    <div className="flex flex-col h-full p-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-2.5 tracking-tight text-lg">
                <div className="p-1.5 bg-indigo-50 rounded-lg border border-indigo-100">
                    <BarChart3 size={18} className="text-indigo-600" />
                </div>
                Production Performance
            </h3>
            <p className="text-xs font-medium text-slate-500 mt-1 pl-1">Initial flow rates (BOPD) per reservoir zone</p>
        </div>
      </div>

      <div className="flex-1 min-h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="zone" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }} 
              dy={12}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 11, fontFamily: 'monospace' }}
              label={{ value: 'FLOW RATE (BOPD)', angle: -90, position: 'insideLeft', fill: '#94A3B8', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }} 
            />
            <Tooltip 
              cursor={{ fill: '#F8FAFC', opacity: 0.8 }}
              contentStyle={{ 
                  borderRadius: '16px', 
                  border: '1px solid rgba(255,255,255,0.5)', 
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  padding: '16px',
                  backdropFilter: 'blur(8px)'
              }}
              itemStyle={{ fontSize: '12px', fontWeight: 600, padding: '2px 0' }}
              labelStyle={{ color: '#64748B', fontSize: '11px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}
            />
            <Legend 
                verticalAlign="top" 
                height={48} 
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}
            />
            
            {wells.map((well, index) => (
               <Bar 
                 key={well.name} 
                 dataKey={well.name} 
                 fill={colors[index % colors.length]} 
                 radius={[6, 6, 0, 0]} 
                 maxBarSize={50}
                 animationDuration={1500}
               />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductionComparison;