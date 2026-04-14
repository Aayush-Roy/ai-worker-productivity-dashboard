import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { calculateWorkstationMetrics } from '@/lib/metrics';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workstationId = searchParams.get('workstationId');

    const workstations = await prisma.workstation.findMany({
      where: workstationId ? { id: workstationId } : undefined,
    });

    const events = await prisma.event.findMany({
      where: workstationId ? { workstationId } : undefined,
      orderBy: { timestamp: 'asc' },
    });

    const metrics = calculateWorkstationMetrics(workstations, events);

    return NextResponse.json({ metrics });
  } catch (error) {
    console.error('Error calculating workstation metrics:', error);
    return NextResponse.json(
      { error: 'Failed to calculate workstation metrics' },
      { status: 500 }
    );
  }
}
