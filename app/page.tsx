// 'use client';

// import { useState } from 'react';
// import { Activity, Factory, Clock, TrendingUp, Zap } from 'lucide-react';
// import { MetricCard } from '@/components/dashboard/metric-card';
// import { WorkersTable } from '@/components/dashboard/workers-table';
// import { WorkstationsTable } from '@/components/dashboard/workstations-table';
// import { ProductionChart } from '@/components/dashboard/production-chart';
// import { TimelineChart } from '@/components/dashboard/timeline-chart';
// import { Filters } from '@/components/dashboard/filters';

// import {
//   mockWorkers,
//   mockWorkstations,
//   mockWorkerMetrics,
//   mockWorkstationMetrics,
//   mockFactoryMetrics,
//   mockProductionOverTime,
// } from '@/lib/mock-data';
// import Image from 'next/image';

// function formatMinutesToHours(minutes: number): string {
//   const hours = Math.floor(minutes / 60);
//   const mins = minutes % 60;
//   return `${hours}h ${mins}m`;
// }

// export default function DashboardPage() {
//   const [selectedWorkerId, setSelectedWorkerId] = useState<string>('all');
//   const [selectedWorkstationId, setSelectedWorkstationId] = useState<string>('all');

//   // Filter metrics based on selection
//   const filteredWorkerMetrics = selectedWorkerId !== 'all'
//     ? mockWorkerMetrics.filter((m) => m.workerId === selectedWorkerId)
//     : mockWorkerMetrics;

//   const filteredWorkstationMetrics = selectedWorkstationId !== 'all'
//     ? mockWorkstationMetrics.filter((m) => m.workstationId === selectedWorkstationId)
//     : mockWorkstationMetrics;

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header with gradient */}
      
//     <header className="sticky top-0 z-50 border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl">
//   <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="flex h-14 items-center justify-between">
      
//       {/* Left */}
//       <div className="flex items-center gap-6">
//         <div className="group flex items-center gap-3">
//           <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 p-2 ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-200">
//             <Image
//               src="/storage-stacks.png"
//               alt="Storage Stacks"
//               width={24}
//               height={24}
//             />
//           </div>
//           <h1 className="text-base font-semibold text-white">
//             Worker Productivity
//           </h1>
//         </div>

//         <div className="hidden md:block h-5 w-px bg-gray-800" />

//         <nav className="hidden md:flex items-center gap-1">
//           <button className="rounded-md px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors">
//             Overview
//           </button>
//           <button className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors">
//             Analytics
//           </button>
//           <button className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition-colors">
//             Team
//           </button>
//         </nav>
//       </div>

//       {/* Right */}
//       <div className="flex items-center gap-2.5">
//         <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 backdrop-blur-sm">
//           <div className="relative flex h-1.5 w-1.5">
//             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
//             <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
//           </div>
//           <span className="text-xs font-medium text-emerald-400">Live</span>
//         </div>

//         <button className="flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900/50 px-2.5 py-1.5 hover:border-gray-700 hover:bg-gray-800/50 transition-all duration-150">
//           <div className="h-5 w-5 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600" />
          
//           <span className="hidden md:block text-sm font-medium text-gray-300">You</span>
//           <Image src="/user-setting.png" height={20} width={20} alt='admin'/>
//         </button>
//       </div>
//     </div>
//   </div>
// </header>
//       <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
//         <div className="space-y-8">
//           {/* Factory Summary Cards */}
//           <section>
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">Factory Overview</h2>
//                 <p className="text-sm text-gray-500 mt-1">Key performance indicators for this shift</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               <MetricCard
//                 title="Total Production"
//                 value={mockFactoryMetrics.totalProductionCount}
//                 subtitle="units this shift"
//                 icon={Factory}
//                 color="indigo"
//               />
//               <MetricCard
//                 title="Avg Utilization"
//                 value={`${mockFactoryMetrics.averageWorkerUtilization}%`}
//                 subtitle="worker efficiency"
//                 icon={Activity}
//                 color="green"
//               />
//               <MetricCard
//                 title="Total Active Time"
//                 value={formatMinutesToHours(mockFactoryMetrics.totalProductiveTime)}
//                 subtitle="combined productivity"
//                 icon={Clock}
//                 color="amber"
//               />
//               <MetricCard
//                 title="Avg Production Rate"
//                 value={mockFactoryMetrics.averageProductionRate}
//                 subtitle="units/hour"
//                 icon={TrendingUp}
//                 color="blue"
//               />
//             </div>
//           </section>

//           {/* Filters */}
//           <section>
//             <Filters
//               workers={mockWorkers}
//               workstations={mockWorkstations}
//               selectedWorkerId={selectedWorkerId}
//               selectedWorkstationId={selectedWorkstationId}
//               onWorkerChange={setSelectedWorkerId}
//               onWorkstationChange={setSelectedWorkstationId}
//             />
//           </section>

//           {/* Charts */}
//           <section>
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">Production Analytics</h2>
//                 <p className="text-sm text-gray-500 mt-1">Visual breakdown of productivity metrics</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <ProductionChart workerMetrics={filteredWorkerMetrics} />
//               <TimelineChart data={mockProductionOverTime} />
//             </div>
//           </section>

//           {/* Worker Table */}
//           <section>
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">Worker Performance</h2>
//                 <p className="text-sm text-gray-500 mt-1">Individual worker productivity metrics</p>
//               </div>
//             </div>
//             <WorkersTable
//               metrics={filteredWorkerMetrics}
//               selectedWorkerId={selectedWorkerId !== 'all' ? selectedWorkerId : undefined}
//             />
//           </section>

//           {/* Workstation Table */}
//           <section>
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">Workstation Performance</h2>
//                 <p className="text-sm text-gray-500 mt-1">Station utilization and throughput</p>
//               </div>
//             </div>
//             <WorkstationsTable
//               metrics={filteredWorkstationMetrics}
//               selectedWorkstationId={
//                 selectedWorkstationId !== 'all' ? selectedWorkstationId : undefined
//               }
//             />
//           </section>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="border-t bg-card mt-12">
//         <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//             <div className="flex items-center gap-2">
//               <div className="rounded-lg bg-indigo-100 p-1.5">
//                 <Factory className="h-4 w-4 text-indigo-600" />
//               </div>
//               <span className="text-sm font-medium text-gray-700">Worker Productivity Dashboard</span>
//             </div>
//             <p className="text-center text-sm text-gray-500">
//               AI-Powered Manufacturing Analytics System
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Activity, Factory, Clock, TrendingUp, Zap, RefreshCw } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/metric-card';
import { WorkersTable } from '@/components/dashboard/workers-table';
import { WorkstationsTable } from '@/components/dashboard/workstations-table';
import { ProductionChart } from '@/components/dashboard/production-chart';
import { TimelineChart } from '@/components/dashboard/timeline-chart';
import { Filters } from '@/components/dashboard/filters';
import { Spinner } from '@/components/ui/spinner';
import type { 
  Worker, 
  Workstation, 
  WorkerMetrics, 
  WorkstationMetrics, 
  FactoryMetrics,
  ProductionDataPoint 
} from '@/lib/types';
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then(res => res.json());

function formatMinutesToHours(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours}h ${mins}m`;
}

export default function DashboardPage() {
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>('all');
  const [selectedWorkstationId, setSelectedWorkstationId] = useState<string>('all');

  // Fetch workers data
  const { data: workersData, error: workersError, isLoading: workersLoading, mutate: mutateWorkers } = useSWR<{ metrics: WorkerMetrics[] }>(
    selectedWorkerId !== 'all' 
      ? `/api/metrics/workers?workerId=${selectedWorkerId}`
      : '/api/metrics/workers',
    fetcher,
    { refreshInterval: 30000 }
  );

  // Fetch workstations data
  const { data: workstationsData, error: workstationsError, isLoading: workstationsLoading, mutate: mutateWorkstations } = useSWR<{ metrics: WorkstationMetrics[] }>(
    selectedWorkstationId !== 'all'
      ? `/api/metrics/workstations?workstationId=${selectedWorkstationId}`
      : '/api/metrics/workstations',
    fetcher,
    { refreshInterval: 30000 }
  );

  // Fetch factory metrics
  const { data: factoryData, error: factoryError, isLoading: factoryLoading, mutate: mutateFactory } = useSWR<{ 
    factoryMetrics: FactoryMetrics;
    productionOverTime: ProductionDataPoint[];
  }>(
    '/api/metrics/factory',
    fetcher,
    { refreshInterval: 30000 }
  );

  const isLoading = workersLoading || workstationsLoading || factoryLoading;
  const hasError = workersError || workstationsError || factoryError;

  const workerMetrics = workersData?.metrics || [];
  const workstationMetrics = workstationsData?.metrics || [];
  const factoryMetrics = factoryData?.factoryMetrics || {
    totalProductionCount: 0,
    averageWorkerUtilization: 0,
    totalProductiveTime: 0,
    averageProductionRate: 0,
  };
  const productionOverTime = factoryData?.productionOverTime || [];

  // Extract unique workers and workstations for filters
  const workers: Worker[] = workerMetrics.map(m => ({ 
    id: m.workerId, 
    name: m.workerName,
    createdAt: new Date(),
    updatedAt: new Date()
  }));
  
  const workstations: Workstation[] = workstationMetrics.map(m => ({ 
    id: m.workstationId, 
    name: m.workstationName,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  const handleRefresh = () => {
    mutateWorkers();
    mutateWorkstations();
    mutateFactory();
  };

  if (hasError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="rounded-xl bg-red-100 p-4 mb-4 inline-block">
            <Factory className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to load data</h2>
          <p className="text-gray-500 mb-4">Please check your database connection and try again.</p>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

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
        {isLoading && workerMetrics.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Spinner className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
              <p className="text-gray-500">Loading dashboard data...</p>
            </div>
          </div>
        ) : (
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
                  value={factoryMetrics.totalProductionCount}
                  subtitle="units this shift"
                  icon={Factory}
                  color="indigo"
                />
                <MetricCard
                  title="Avg Utilization"
                  value={`${Math.round(factoryMetrics.averageWorkerUtilization)}%`}
                  subtitle="worker efficiency"
                  icon={Activity}
                  color="green"
                />
                <MetricCard
                  title="Total Active Time"
                  value={formatMinutesToHours(factoryMetrics.totalProductiveTime)}
                  subtitle="combined productivity"
                  icon={Clock}
                  color="amber"
                />
                <MetricCard
                  title="Avg Production Rate"
                  value={Math.round(factoryMetrics.averageProductionRate * 10) / 10}
                  subtitle="units/hour"
                  icon={TrendingUp}
                  color="blue"
                />
              </div>
            </section>

            {/* Filters */}
            <section>
              <Filters
                workers={workers}
                workstations={workstations}
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
                <ProductionChart workerMetrics={workerMetrics} />
                <TimelineChart data={productionOverTime} />
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
                metrics={workerMetrics}
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
                metrics={workstationMetrics}
                selectedWorkstationId={
                  selectedWorkstationId !== 'all' ? selectedWorkstationId : undefined
                }
              />
            </section>
          </div>
        )}
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
