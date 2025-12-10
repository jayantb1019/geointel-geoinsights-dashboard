import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { WellData } from '../types';

interface Props {
  data: WellData;
}

const ProductionChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="font-semibold text-slate-800">Initial Production Test Results</h3>
        <p className="text-sm text-slate-500">Flow Rates (BOPD) by Zone</p>
      </div>

      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data.production}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis 
              dataKey="zone" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748B', fontSize: 12 }}
              label={{ value: 'Barrels of Oil Per Day (BOPD)', angle: -90, position: 'insideLeft', fill: '#64748B', fontSize: 12 }} 
            />
            <Tooltip 
              cursor={{ fill: '#F1F5F9' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="rateBOPD" radius={[4, 4, 0, 0]} barSize={60}>
              {data.production.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#0EA5E9' : '#10B981'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        {data.production.map((item, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-xs text-slate-500 mb-1">{item.zone}</div>
            <div className="text-2xl font-bold text-slate-800">{item.rateBOPD} <span className="text-sm font-normal text-slate-400">BOPD</span></div>
            <div className="text-[10px] text-slate-400 mt-1">Interval: {item.interval}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductionChart;