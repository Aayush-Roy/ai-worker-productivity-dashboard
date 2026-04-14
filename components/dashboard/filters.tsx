'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, Users, Monitor } from 'lucide-react';
import type { Worker, Workstation } from '@/lib/types';

interface FiltersProps {
  workers: Worker[];
  workstations: Workstation[];
  selectedWorkerId: string;
  selectedWorkstationId: string;
  onWorkerChange: (value: string) => void;
  onWorkstationChange: (value: string) => void;
}

export function Filters({
  workers,
  workstations,
  selectedWorkerId,
  selectedWorkstationId,
  onWorkerChange,
  onWorkstationChange,
}: FiltersProps) {
  return (
    <Card className="border-0 shadow-md bg-gradient-to-r from-indigo-50/50 via-white to-sky-50/50">
      <CardContent className="p-5">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="rounded-lg bg-indigo-100 p-2">
              <Filter className="h-4 w-4 text-indigo-600" />
            </div>
            <span className="font-semibold">Filters</span>
          </div>
          
          <div className="h-8 w-px bg-gray-200 hidden sm:block" />
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span className="font-medium">Worker</span>
            </div>
            <Select value={selectedWorkerId} onValueChange={onWorkerChange}>
              <SelectTrigger className="w-[180px] bg-white border-gray-200 focus:ring-indigo-500 focus:ring-offset-0 focus:border-indigo-500 rounded-xl shadow-sm">
                <SelectValue placeholder="All Workers" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg border-gray-200">
                <SelectItem value="all" className="rounded-lg">All Workers</SelectItem>
                {workers.map((worker) => (
                  <SelectItem key={worker.id} value={worker.id} className="rounded-lg">
                    {worker.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Monitor className="h-4 w-4" />
              <span className="font-medium">Workstation</span>
            </div>
            <Select value={selectedWorkstationId} onValueChange={onWorkstationChange}>
              <SelectTrigger className="w-[200px] bg-white border-gray-200 focus:ring-indigo-500 focus:ring-offset-0 focus:border-indigo-500 rounded-xl shadow-sm">
                <SelectValue placeholder="All Workstations" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg border-gray-200">
                <SelectItem value="all" className="rounded-lg">All Workstations</SelectItem>
                {workstations.map((station) => (
                  <SelectItem key={station.id} value={station.id} className="rounded-lg">
                    {station.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
