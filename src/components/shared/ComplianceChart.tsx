'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { CategoryScore } from '../../types/diagnosis';

interface ComplianceChartProps {
  data: CategoryScore[];
}

export function ComplianceChart({ data }: ComplianceChartProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full h-[400px] bg-slate-900 p-4 rounded-xl shadow-lg border border-slate-800">
      <h2 className="text-xl font-semibold text-center mb-4 text-slate-100">
        Índice de Conformidade Ambiental
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          {/* Linhas da teia escurecidas */}
          <PolarGrid stroke="#334155" />
          
          <PolarAngleAxis 
            dataKey="name" 
            tick={{ fill: '#cbd5e1', fontSize: 12 }}
          />
          
          {/* CORREÇÃO DO EIXO: angle={90} joga a régua para o centro-topo */}
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fill: '#94a3b8', fontSize: 10 }}
          />
          
          <Radar
            name="Conformidade (%)"
            dataKey="value"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.5}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '8px' }}
            itemStyle={{ color: '#10b981' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}