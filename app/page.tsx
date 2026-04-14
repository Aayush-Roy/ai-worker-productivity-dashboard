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
import Image from 'next/image';

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
      
    <header className="sticky top-0 z-50 border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex h-14 items-center justify-between">
      
      {/* Left */}
      <div className="flex items-center gap-6">
        <div className="group flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 p-2 ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-200">
            <Image
              src="/storage-stacks.png"
              alt="Storage Stacks"
              width={24}
              height={24}
            />
          </div>
          <h1 className="text-base font-semibold text-white">
            Worker Productivity
          </h1>
        </div>

        <div className="hidden md:block h-5 w-px bg-gray-800" />

        <nav className="hidden md:flex items-center gap-1">
          <button className="rounded-md px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
            Overview
          </button>
          <button className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors">
            Analytics
          </button>
          <button className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors">
            Team
          </button>
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2.5">
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 backdrop-blur-sm">
          <div className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-medium text-emerald-400">Live</span>
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900/50 px-2.5 py-1.5 hover:border-gray-700 hover:bg-gray-800/50 transition-all duration-150">
          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600" />
          
          <span className="hidden md:block text-sm font-medium text-gray-300">You</span>
          <Image src="/user-setting.png" height={20} width={20} alt='admin'/>
        </button>
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
