import type { 
  WorkerMetrics, 
  WorkstationMetrics, 
  FactoryMetrics,
  ProductionOverTime 
} from './types';

const SHIFT_DURATION_MINUTES = 8 * 60; // 8 hours in minutes

interface EventData {
  id: string;
  timestamp: Date;
  workerId: string;
  workstationId: string;
  eventType: string;
  confidence: number;
  count: number | null;
}

interface WorkerData {
  id: string;
  name: string;
}

interface WorkstationData {
  id: string;
  name: string;
}

export function calculateWorkerMetrics(
  workers: WorkerData[],
  events: EventData[]
): WorkerMetrics[] {
  // Sort events by timestamp
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return workers.map((worker) => {
    const workerEvents = sortedEvents.filter((e) => e.workerId === worker.id);
    
    let activeTime = 0;
    let idleTime = 0;
    let unitsProduced = 0;

    for (let i = 0; i < workerEvents.length; i++) {
      const event = workerEvents[i];
      const nextEvent = workerEvents[i + 1];
      
      // Calculate duration until next event (or assume 15 min if last event)
      const duration = nextEvent
        ? (new Date(nextEvent.timestamp).getTime() - new Date(event.timestamp).getTime()) / 60000
        : 15; // default 15 minutes for last event

      if (event.eventType === 'working') {
        activeTime += Math.min(duration, 60); // cap at 60 minutes per event
      } else if (event.eventType === 'idle') {
        idleTime += Math.min(duration, 60);
      }

      if (event.eventType === 'product_count' && event.count) {
        unitsProduced += event.count;
      }
    }

    const utilizationPercentage = SHIFT_DURATION_MINUTES > 0 
      ? (activeTime / SHIFT_DURATION_MINUTES) * 100 
      : 0;
    
    const activeHours = activeTime / 60;
    const unitsPerHour = activeHours > 0 ? unitsProduced / activeHours : 0;

    return {
      workerId: worker.id,
      workerName: worker.name,
      activeTime: Math.round(activeTime),
      idleTime: Math.round(idleTime),
      utilizationPercentage: Math.round(utilizationPercentage * 10) / 10,
      unitsProduced,
      unitsPerHour: Math.round(unitsPerHour * 10) / 10,
    };
  });
}

export function calculateWorkstationMetrics(
  workstations: WorkstationData[],
  events: EventData[]
): WorkstationMetrics[] {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return workstations.map((station) => {
    const stationEvents = sortedEvents.filter((e) => e.workstationId === station.id);
    
    let occupancyTime = 0;
    let unitsProduced = 0;

    for (let i = 0; i < stationEvents.length; i++) {
      const event = stationEvents[i];
      const nextEvent = stationEvents[i + 1];
      
      const duration = nextEvent
        ? (new Date(nextEvent.timestamp).getTime() - new Date(event.timestamp).getTime()) / 60000
        : 15;

      if (event.eventType === 'working') {
        occupancyTime += Math.min(duration, 60);
      }

      if (event.eventType === 'product_count' && event.count) {
        unitsProduced += event.count;
      }
    }

    const utilizationPercentage = SHIFT_DURATION_MINUTES > 0 
      ? (occupancyTime / SHIFT_DURATION_MINUTES) * 100 
      : 0;
    
    const occupancyHours = occupancyTime / 60;
    const throughputRate = occupancyHours > 0 ? unitsProduced / occupancyHours : 0;

    return {
      workstationId: station.id,
      workstationName: station.name,
      occupancyTime: Math.round(occupancyTime),
      utilizationPercentage: Math.round(utilizationPercentage * 10) / 10,
      unitsProduced,
      throughputRate: Math.round(throughputRate * 10) / 10,
    };
  });
}

export function calculateFactoryMetrics(
  workerMetrics: WorkerMetrics[],
  workstationMetrics: WorkstationMetrics[]
): FactoryMetrics {
  const totalProductiveTime = workerMetrics.reduce((sum, w) => sum + w.activeTime, 0);
  const totalProductionCount = workstationMetrics.reduce((sum, w) => sum + w.unitsProduced, 0);
  
  const totalActiveHours = totalProductiveTime / 60;
  const averageProductionRate = totalActiveHours > 0 
    ? totalProductionCount / totalActiveHours 
    : 0;
  
  const averageWorkerUtilization = workerMetrics.length > 0
    ? workerMetrics.reduce((sum, w) => sum + w.utilizationPercentage, 0) / workerMetrics.length
    : 0;

  return {
    totalProductiveTime: Math.round(totalProductiveTime),
    totalProductionCount,
    averageProductionRate: Math.round(averageProductionRate * 10) / 10,
    averageWorkerUtilization: Math.round(averageWorkerUtilization * 10) / 10,
  };
}

export function calculateProductionOverTime(events: EventData[]): ProductionOverTime[] {
  const productionByHour = new Map<string, number>();
  
  const productionEvents = events.filter(
    (e) => e.eventType === 'product_count' && e.count
  );

  productionEvents.forEach((event) => {
    const date = new Date(event.timestamp);
    const hourKey = `${date.getHours().toString().padStart(2, '0')}:00`;
    const current = productionByHour.get(hourKey) || 0;
    productionByHour.set(hourKey, current + (event.count || 0));
  });

  // Sort by hour and return
  return Array.from(productionByHour.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([hour, count]) => ({ hour, count }));
}
