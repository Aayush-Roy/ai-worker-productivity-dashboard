'use client';

import { useState } from 'react';
import { Activity, Factory, Clock, TrendingUp, Zap } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/metric-card';
import { WorkersTable } from '@/components/dashboard/workers-table';
import { WorkstationsTable } from '@/components/dashboard/workstations-table';
import { ProductionChart } from '@/components/dashboard/production-chart';
import { TimelineChart } from '@/components/dashboard/timeline-chart';
import { Filters } from '@/components/dashboard/filters';
import {
  mockWorkers,
  mockWorkstations,
  mockWorkerMetrics,
  mockWorkstationMetrics,
  mockFactoryMetrics,
  mockProductionOverTime,
} from '@/lib/mock-data';

function formatMinutesToHours(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export default function DashboardPage() {
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>('all');
  const [selectedWorkstationId, setSelectedWorkstationId] = useState<string>('all');

  // Filter metrics based on selection
  const filteredWorkerMetrics = selectedWorkerId !== 'all'
    ? mockWorkerMetrics.filter((m) => m.workerId === selectedWorkerId)
    : mockWorkerMetrics;

  const filteredWorkstationMetrics = selectedWorkstationId !== 'all'
    ? mockWorkstationMetrics.filter((m) => m.workstationId === selectedWorkstationId)
    : mockWorkstationMetrics;

  return (
    <div className="min-h-screen bg-background">
      {/* Header with gradient */}
      <header className="relative overflow-hidden border-b bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="container relative mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm ring-2 ring-white/30">
                <Factory className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Worker Productivity Dashboard</h1>
                <p className="text-sm text-indigo-100">
                  AI-Powered Manufacturing Analytics
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm ring-1 ring-white/30">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-sm font-medium text-white">Live</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                <Zap className="h-4 w-4 text-amber-300" />
                <span className="text-sm text-indigo-100">Real-time sync</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Factory Summary Cards */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Factory Overview</h2>
                <p className="text-sm text-gray-500 mt-1">Key performance indicators for this shift</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Production"
                value={mockFactoryMetrics.totalProductionCount}
                subtitle="units this shift"
                icon={Factory}
                color="indigo"
              />
              <MetricCard
                title="Avg Utilization"
                value={`${mockFactoryMetrics.averageWorkerUtilization}%`}
                subtitle="worker efficiency"
                icon={Activity}
                color="green"
              />
              <MetricCard
                title="Total Active Time"
                value={formatMinutesToHours(mockFactoryMetrics.totalProductiveTime)}
                subtitle="combined productivity"
                icon={Clock}
                color="amber"
              />
              <MetricCard
                title="Avg Production Rate"
                value={mockFactoryMetrics.averageProductionRate}
                subtitle="units/hour"
                icon={TrendingUp}
                color="blue"
              />
            </div>
          </section>

          {/* Filters */}
          <section>
            <Filters
              workers={mockWorkers}
              workstations={mockWorkstations}
              selectedWorkerId={selectedWorkerId}
              selectedWorkstationId={selectedWorkstationId}
              onWorkerChange={setSelectedWorkerId}
              onWorkstationChange={setSelectedWorkstationId}
            />
          </section>

          {/* Charts */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Production Analytics</h2>
                <p className="text-sm text-gray-500 mt-1">Visual breakdown of productivity metrics</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProductionChart workerMetrics={filteredWorkerMetrics} />
              <TimelineChart data={mockProductionOverTime} />
            </div>
          </section>

          {/* Worker Table */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Worker Performance</h2>
                <p className="text-sm text-gray-500 mt-1">Individual worker productivity metrics</p>
              </div>
            </div>
            <WorkersTable
              metrics={filteredWorkerMetrics}
              selectedWorkerId={selectedWorkerId !== 'all' ? selectedWorkerId : undefined}
            />
          </section>

          {/* Workstation Table */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Workstation Performance</h2>
                <p className="text-sm text-gray-500 mt-1">Station utilization and throughput</p>
              </div>
            </div>
            <WorkstationsTable
              metrics={filteredWorkstationMetrics}
              selectedWorkstationId={
                selectedWorkstationId !== 'all' ? selectedWorkstationId : undefined
              }
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-indigo-100 p-1.5">
                <Factory className="h-4 w-4 text-indigo-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Worker Productivity Dashboard</span>
            </div>
            <p className="text-center text-sm text-gray-500">
              AI-Powered Manufacturing Analytics System
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
