import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const workers = [
  { id: 'W1', name: 'Rahul' },
  { id: 'W2', name: 'Amit' },
  { id: 'W3', name: 'Neha' },
  { id: 'W4', name: 'Priya' },
  { id: 'W5', name: 'Arjun' },
  { id: 'W6', name: 'Vikram' },
];

const workstations = [
  { id: 'S1', name: 'Assembly' },
  { id: 'S2', name: 'Packaging' },
  { id: 'S3', name: 'Welding' },
  { id: 'S4', name: 'Quality Check' },
  { id: 'S5', name: 'Labeling' },
  { id: 'S6', name: 'Dispatch' },
];

function generateEvents() {
  const events: Array<{
    timestamp: Date;
    workerId: string;
    workstationId: string;
    eventType: 'working' | 'idle' | 'absent' | 'product_count';
    confidence: number;
    count: number | null;
    modelVersion: string;
  }> = [];

  // Base time: start of today at 8 AM (shift start)
  const shiftStart = new Date();
  shiftStart.setHours(8, 0, 0, 0);

  // Generate events for 8-hour shift (480 minutes)
  const shiftDurationMinutes = 480;
  const eventInterval = 15; // Average 15 minutes between events

  for (let i = 0; i < workers.length; i++) {
    const worker = workers[i];
    const station = workstations[i]; // Each worker assigned to one station
    
    let currentTime = new Date(shiftStart);
    let eventCount = 0;
    const maxEventsPerWorker = Math.floor(shiftDurationMinutes / eventInterval);

    while (eventCount < maxEventsPerWorker) {
      // Random time offset (5-25 minutes)
      const timeOffset = 5 + Math.random() * 20;
      currentTime = new Date(currentTime.getTime() + timeOffset * 60000);

      // Check if still within shift
      const minutesSinceStart = (currentTime.getTime() - shiftStart.getTime()) / 60000;
      if (minutesSinceStart > shiftDurationMinutes) break;

      // Decide event type with realistic distribution
      const rand = Math.random();
      let eventType: 'working' | 'idle' | 'absent' | 'product_count';
      let count: number | null = null;

      if (rand < 0.55) {
        eventType = 'working';
      } else if (rand < 0.75) {
        eventType = 'idle';
      } else if (rand < 0.78) {
        eventType = 'absent';
      } else {
        eventType = 'product_count';
        count = Math.floor(Math.random() * 5) + 1; // 1-5 units
      }

      events.push({
        timestamp: new Date(currentTime),
        workerId: worker.id,
        workstationId: station.id,
        eventType,
        confidence: 0.85 + Math.random() * 0.14, // 0.85-0.99
        count,
        modelVersion: 'v1.2.3',
      });

      eventCount++;
    }
  }

  // Sort events by timestamp (handle out-of-order)
  events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  return events;
}

export async function POST() {
  try {
    // Clear existing data
    await prisma.event.deleteMany();
    await prisma.worker.deleteMany();
    await prisma.workstation.deleteMany();

    // Insert workers
    await prisma.worker.createMany({
      data: workers,
    });

    // Insert workstations
    await prisma.workstation.createMany({
      data: workstations,
    });

    // Generate and insert events
    const events = generateEvents();
    await prisma.event.createMany({
      data: events,
    });

    return NextResponse.json({
      success: true,
      message: 'Seed data created successfully',
      counts: {
        workers: workers.length,
        workstations: workstations.length,
        events: events.length,
      },
    });
  } catch (error) {
    console.error('Error seeding data:', error);
    return NextResponse.json(
      { error: 'Failed to seed data', details: String(error) },
      { status: 500 }
    );
  }
}
