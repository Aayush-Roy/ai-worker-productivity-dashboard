export type EventType = 'working' | 'idle' | 'absent' | 'product_count';

export interface Worker {
  id: string;
  name: string;
}

export interface Workstation {
  id: string;
  name: string;
}

export interface Event {
  id: string;
  timestamp: string;
  workerId: string;
  workstationId: string;
  eventType: EventType;
  confidence: number;
  count: number | null;
  modelVersion: string | null;
  createdAt: string;
}

export interface WorkerMetrics {
  workerId: string;
  workerName: string;
  activeTime: number; // in minutes
  idleTime: number; // in minutes
  utilizationPercentage: number;
  unitsProduced: number;
  unitsPerHour: number;
}

export interface WorkstationMetrics {
  workstationId: string;
  workstationName: string;
  occupancyTime: number; // in minutes
  utilizationPercentage: number;
  unitsProduced: number;
  throughputRate: number; // units per hour
}

export interface FactoryMetrics {
  totalProductiveTime: number; // in minutes
  totalProductionCount: number;
  averageProductionRate: number; // units per hour
  averageWorkerUtilization: number; // percentage
}

export interface CreateEventInput {
  timestamp: string;
  workerId: string;
  workstationId: string;
  eventType: EventType;
  confidence: number;
  count?: number | null;
  modelVersion?: string | null;
}

export interface ProductionOverTime {
  hour: string;
  count: number;
}
