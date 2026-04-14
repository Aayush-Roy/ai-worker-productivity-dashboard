'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { ProductionOverTime } from '@/lib/types';
import { TrendingUp } from 'lucide-react';

interface TimelineChartProps {
  data: ProductionOverTime[];
}

export function TimelineChart({ data }: TimelineChartProps) {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-emerald-100 p-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <div>
            <CardTitle className="text-lg">Production Over Time</CardTitle>
            <CardDescription>Hourly output trend throughout the shift</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={data} 
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#e5e7eb" 
                vertical={false}
              />
              <XAxis
                dataKey="hour"
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
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
                  padding: '12px 16px',
                }}
                labelStyle={{ color: '#1f2937', fontWeight: 600, marginBottom: '4px' }}
                itemStyle={{ color: '#22c55e' }}
              />
              <Legend 
                verticalAlign="top" 
                align="right"
                wrapperStyle={{ paddingBottom: '20px' }}
                formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#22c55e"
                strokeWidth={3}
                fill="url(#areaGradient)"
                dot={{ 
                  fill: '#fff', 
                  stroke: '#22c55e', 
                  strokeWidth: 2, 
                  r: 4 
                }}
                activeDot={{ 
                  r: 6, 
                  fill: '#22c55e',
                  stroke: '#fff',
                  strokeWidth: 2,
                }}
                name="Units Produced"
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
