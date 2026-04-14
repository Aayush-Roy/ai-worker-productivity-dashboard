import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import type { CreateEventInput } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: CreateEventInput = await request.json();

    // Validate required fields
    if (!body.timestamp || !body.workerId || !body.workstationId || !body.eventType) {
      return NextResponse.json(
        { error: 'Missing required fields: timestamp, workerId, workstationId, eventType' },
        { status: 400 }
      );
    }

    // Validate event type
    const validEventTypes = ['working', 'idle', 'absent', 'product_count'];
    if (!validEventTypes.includes(body.eventType)) {
      return NextResponse.json(
        { error: `Invalid event type. Must be one of: ${validEventTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Handle duplicate events using idempotency key
    const existingEvent = await prisma.event.findUnique({
      where: {
        idempotency_key: {
          timestamp: new Date(body.timestamp),
          workerId: body.workerId,
          workstationId: body.workstationId,
        },
      },
    });

    if (existingEvent) {
      return NextResponse.json(
        { message: 'Event already exists', event: existingEvent },
        { status: 200 }
      );
    }

    // Create new event
    const event = await prisma.event.create({
      data: {
        timestamp: new Date(body.timestamp),
        workerId: body.workerId,
        workstationId: body.workstationId,
        eventType: body.eventType,
        confidence: body.confidence,
        count: body.count ?? null,
        modelVersion: body.modelVersion ?? null,
      },
    });

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100,
      include: {
        worker: true,
        workstation: true,
      },
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
