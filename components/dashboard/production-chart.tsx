'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import type { WorkerMetrics } from '@/lib/types';
import { BarChart3 } from 'lucide-react';

interface ProductionChartProps {
  workerMetrics: WorkerMetrics[];
}

const COLORS = ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'];

export function ProductionChart({ workerMetrics }: ProductionChartProps) {
  const data = workerMetrics.map((w) => ({
    name: w.workerName.split(' ')[0],
    units: w.unitsProduced,
    rate: w.unitsPerHour,
  }));

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-indigo-100 p-2">
            <BarChart3 className="h-4 w-4 text-indigo-600" />
          </div>
          <div>
            <CardTitle className="text-lg">Units Produced by Worker</CardTitle>
            <CardDescription>Production output per team member</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              barCategoryGap="20%"
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e5e7eb" 
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
                  padding: '12px 16px',
                }}
                labelStyle={{ color: '#1f2937', fontWeight: 600, marginBottom: '4px' }}
                itemStyle={{ color: '#4f46e5' }}
              />
              <Legend 
                verticalAlign="top" 
                align="right"
                wrapperStyle={{ paddingBottom: '20px' }}
                formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
              />
              <Bar
                dataKey="units"
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
                name="Units Produced"
                animationDuration={1000}
                animationEasing="ease-out"
              >
                {data.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
