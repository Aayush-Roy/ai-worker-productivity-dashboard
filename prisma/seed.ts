import { PrismaClient, EventType } from '@prisma/client';

const prisma = new PrismaClient();

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
    eventType: EventType;
    confidence: number;
    count: number | null;
    modelVersion: string;
  }> = [];

  // Base time: start of today at 8 AM (shift start)
  const shiftStart = new Date();
  shiftStart.setHours(8, 0, 0, 0);

  // Generate events for 8-hour shift (480 minutes)
  const shiftDurationMinutes = 480;
  const eventInterval = 15;

  for (let i = 0; i < workers.length; i++) {
    const worker = workers[i];
    const station = workstations[i];
    
    let currentTime = new Date(shiftStart);
    let eventCount = 0;
    const maxEventsPerWorker = Math.floor(shiftDurationMinutes / eventInterval);

    while (eventCount < maxEventsPerWorker) {
      const timeOffset = 5 + Math.random() * 20;
      currentTime = new Date(currentTime.getTime() + timeOffset * 60000);

      const minutesSinceStart = (currentTime.getTime() - shiftStart.getTime()) / 60000;
      if (minutesSinceStart > shiftDurationMinutes) break;

      const rand = Math.random();
      let eventType: EventType;
      let count: number | null = null;

      if (rand < 0.55) {
        eventType = EventType.working;
      } else if (rand < 0.75) {
        eventType = EventType.idle;
      } else if (rand < 0.78) {
        eventType = EventType.absent;
      } else {
        eventType = EventType.product_count;
        count = Math.floor(Math.random() * 5) + 1;
      }

      events.push({
        timestamp: new Date(currentTime),
        workerId: worker.id,
        workstationId: station.id,
        eventType,
        confidence: 0.85 + Math.random() * 0.14,
        count,
        modelVersion: 'v1.2.3',
      });

      eventCount++;
    }
  }

  events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  return events;
}

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.event.deleteMany();
  await prisma.worker.deleteMany();
  await prisma.workstation.deleteMany();

  console.log('Cleared existing data');

  // Insert workers
  await prisma.worker.createMany({
    data: workers,
  });
  console.log(`Created ${workers.length} workers`);

  // Insert workstations
  await prisma.workstation.createMany({
    data: workstations,
  });
  console.log(`Created ${workstations.length} workstations`);

  // Generate and insert events
  const events = generateEvents();
  await prisma.event.createMany({
    data: events,
  });
  console.log(`Created ${events.length} events`);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
