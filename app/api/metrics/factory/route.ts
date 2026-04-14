import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { 
  calculateWorkerMetrics, 
  calculateWorkstationMetrics, 
  calculateFactoryMetrics,
  calculateProductionOverTime 
} from '@/lib/metrics';

export async function GET() {
  try {
    const [workers, workstations, events] = await Promise.all([
      prisma.worker.findMany(),
      prisma.workstation.findMany(),
      prisma.event.findMany({ orderBy: { timestamp: 'asc' } }),
    ]);

    const workerMetrics = calculateWorkerMetrics(workers, events);
    const workstationMetrics = calculateWorkstationMetrics(workstations, events);
    const factoryMetrics = calculateFactoryMetrics(workerMetrics, workstationMetrics);
    const productionOverTime = calculateProductionOverTime(events);

    return NextResponse.json({ 
      factoryMetrics,
      productionOverTime,
    });
  } catch (error) {
    console.error('Error calculating factory metrics:', error);
    return NextResponse.json(
      { error: 'Failed to calculate factory metrics' },
      { status: 500 }
    );
  }
}
