import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { calculateWorkerMetrics } from '@/lib/metrics';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workerId = searchParams.get('workerId');

    const workers = await prisma.worker.findMany({
      where: workerId ? { id: workerId } : undefined,
    });

    const events = await prisma.event.findMany({
      where: workerId ? { workerId } : undefined,
      orderBy: { timestamp: 'asc' },
    });

    const metrics = calculateWorkerMetrics(workers, events);

    return NextResponse.json({ metrics });
  } catch (error) {
    console.error('Error calculating worker metrics:', error);
    return NextResponse.json(
      { error: 'Failed to calculate worker metrics' },
      { status: 500 }
    );
  }
}
