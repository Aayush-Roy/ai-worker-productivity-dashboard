'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor } from 'lucide-react';
import type { WorkstationMetrics } from '@/lib/types';
import { cn } from '@/lib/utils';

interface WorkstationsTableProps {
  metrics: WorkstationMetrics[];
  selectedWorkstationId?: string;
}

function getUtilizationStyles(percentage: number) {
  if (percentage >= 75) {
    return {
      bar: 'bg-emerald-500',
      text: 'text-emerald-600',
      bg: 'bg-emerald-100',
    };
  } else if (percentage >= 40) {
    return {
      bar: 'bg-amber-500',
      text: 'text-amber-600',
      bg: 'bg-amber-100',
    };
  }
  return {
    bar: 'bg-red-500',
    text: 'text-red-600',
    bg: 'bg-red-100',
  };
}

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

const stationColors = [
  'bg-sky-100 text-sky-700 border-sky-200',
  'bg-indigo-100 text-indigo-700 border-indigo-200',
  'bg-violet-100 text-violet-700 border-violet-200',
  'bg-emerald-100 text-emerald-700 border-emerald-200',
];

export function WorkstationsTable({
  metrics,
  selectedWorkstationId,
}: WorkstationsTableProps) {
  const filteredMetrics = selectedWorkstationId
    ? metrics.filter((m) => m.workstationId === selectedWorkstationId)
    : metrics;

  return (
    <Card className="border-0 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-sky-100 p-2">
            <Monitor className="h-4 w-4 text-sky-600" />
          </div>
          <div>
            <CardTitle className="text-lg">Workstation Performance</CardTitle>
            <CardDescription>Station utilization and throughput rates</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead className="font-semibold text-gray-700">Station</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Occupancy</TableHead>
              <TableHead className="w-[180px] font-semibold text-gray-700">Utilization</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Units Produced</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Throughput (units/hr)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMetrics.map((station, index) => {
              const styles = getUtilizationStyles(station.utilizationPercentage);
              return (
                <TableRow
                  key={station.workstationId}
                  className={cn(
                    'transition-colors hover:bg-sky-50/50',
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30',
                    selectedWorkstationId === station.workstationId && 'bg-sky-50 hover:bg-sky-50'
                  )}
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant="outline" 
                        className={cn('font-mono font-semibold px-2.5 py-1', stationColors[index % stationColors.length])}
                      >
                        {station.workstationId}
                      </Badge>
                      <span className="font-semibold text-gray-900">{station.workstationName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-gray-700">
                    {formatTime(station.occupancyTime)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={cn('h-full rounded-full transition-all duration-500', styles.bar)}
                          style={{ width: `${station.utilizationPercentage}%` }}
                        />
                      </div>
                      <span className={cn('text-sm font-semibold tabular-nums min-w-[45px] text-right', styles.text)}>
                        {station.utilizationPercentage}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold text-gray-900 tabular-nums">
                    {station.unitsProduced}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-gray-700">
                    {station.throughputRate}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
