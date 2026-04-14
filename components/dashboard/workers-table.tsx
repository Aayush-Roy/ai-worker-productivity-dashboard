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
import { Users } from 'lucide-react';
import type { WorkerMetrics } from '@/lib/types';
import { cn } from '@/lib/utils';

interface WorkersTableProps {
  metrics: WorkerMetrics[];
  selectedWorkerId?: string;
}

function getUtilizationBadge(percentage: number) {
  if (percentage >= 75) {
    return (
      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 font-medium">
        High
      </Badge>
    );
  } else if (percentage >= 40) {
    return (
      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 font-medium">
        Medium
      </Badge>
    );
  } else {
    return (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200 font-medium">
        Low
      </Badge>
    );
  }
}

function getUtilizationColor(percentage: number): string {
  if (percentage >= 75) return 'text-emerald-600';
  if (percentage >= 40) return 'text-amber-600';
  return 'text-red-600';
}

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

const avatarColors = [
  'bg-indigo-100 text-indigo-600 ring-indigo-200',
  'bg-emerald-100 text-emerald-600 ring-emerald-200',
  'bg-amber-100 text-amber-600 ring-amber-200',
  'bg-sky-100 text-sky-600 ring-sky-200',
  'bg-rose-100 text-rose-600 ring-rose-200',
];

export function WorkersTable({ metrics, selectedWorkerId }: WorkersTableProps) {
  const filteredMetrics = selectedWorkerId
    ? metrics.filter((m) => m.workerId === selectedWorkerId)
    : metrics;

  return (
    <Card className="border-0 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-indigo-100 p-2">
            <Users className="h-4 w-4 text-indigo-600" />
          </div>
          <div>
            <CardTitle className="text-lg">Worker Productivity</CardTitle>
            <CardDescription>Individual performance metrics</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead className="font-semibold text-gray-700">Worker</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Active Time</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Idle Time</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Utilization</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Units Produced</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Units/Hour</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMetrics.map((worker, index) => (
              <TableRow
                key={worker.workerId}
                className={cn(
                  'transition-colors hover:bg-indigo-50/50',
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30',
                  selectedWorkerId === worker.workerId && 'bg-indigo-50 hover:bg-indigo-50'
                )}
              >
                <TableCell className="font-medium py-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold ring-2',
                      avatarColors[index % avatarColors.length]
                    )}>
                      {worker.workerName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{worker.workerName}</p>
                      <p className="text-xs text-gray-500 font-mono">
                        {worker.workerId}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right tabular-nums text-gray-700">
                  {formatTime(worker.activeTime)}
                </TableCell>
                <TableCell className="text-right tabular-nums text-gray-500">
                  {formatTime(worker.idleTime)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className={cn('font-semibold tabular-nums', getUtilizationColor(worker.utilizationPercentage))}>
                      {worker.utilizationPercentage}%
                    </span>
                    {getUtilizationBadge(worker.utilizationPercentage)}
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold text-gray-900 tabular-nums">
                  {worker.unitsProduced}
                </TableCell>
                <TableCell className="text-right tabular-nums text-gray-700">
                  {worker.unitsPerHour}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
