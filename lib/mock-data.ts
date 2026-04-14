import type { 
  WorkerMetrics, 
  WorkstationMetrics, 
  FactoryMetrics,
  ProductionOverTime,
  Worker,
  Workstation
} from './types';

// Static mock data for demo purposes when database is not available

export const mockWorkers: Worker[] = [
  { id: 'W1', name: 'Rahul' },
  { id: 'W2', name: 'Amit' },
  { id: 'W3', name: 'Neha' },
  { id: 'W4', name: 'Priya' },
  { id: 'W5', name: 'Arjun' },
  { id: 'W6', name: 'Vikram' },
];

export const mockWorkstations: Workstation[] = [
  { id: 'S1', name: 'Assembly' },
  { id: 'S2', name: 'Packaging' },
  { id: 'S3', name: 'Welding' },
  { id: 'S4', name: 'Quality Check' },
  { id: 'S5', name: 'Labeling' },
  { id: 'S6', name: 'Dispatch' },
];

export const mockWorkerMetrics: WorkerMetrics[] = [
  { workerId: 'W1', workerName: 'Rahul', activeTime: 385, idleTime: 75, utilizationPercentage: 80.2, unitsProduced: 48, unitsPerHour: 7.5 },
  { workerId: 'W2', workerName: 'Amit', activeTime: 362, idleTime: 98, utilizationPercentage: 75.4, unitsProduced: 42, unitsPerHour: 7.0 },
  { workerId: 'W3', workerName: 'Neha', activeTime: 410, idleTime: 50, utilizationPercentage: 85.4, unitsProduced: 55, unitsPerHour: 8.0 },
  { workerId: 'W4', workerName: 'Priya', activeTime: 375, idleTime: 85, utilizationPercentage: 78.1, unitsProduced: 45, unitsPerHour: 7.2 },
  { workerId: 'W5', workerName: 'Arjun', activeTime: 395, idleTime: 65, utilizationPercentage: 82.3, unitsProduced: 51, unitsPerHour: 7.7 },
  { workerId: 'W6', workerName: 'Vikram', activeTime: 350, idleTime: 110, utilizationPercentage: 72.9, unitsProduced: 38, unitsPerHour: 6.5 },
];

export const mockWorkstationMetrics: WorkstationMetrics[] = [
  { workstationId: 'S1', workstationName: 'Assembly', occupancyTime: 385, utilizationPercentage: 80.2, unitsProduced: 48, throughputRate: 7.5 },
  { workstationId: 'S2', workstationName: 'Packaging', occupancyTime: 362, utilizationPercentage: 75.4, unitsProduced: 42, throughputRate: 7.0 },
  { workstationId: 'S3', workstationName: 'Welding', occupancyTime: 410, utilizationPercentage: 85.4, unitsProduced: 55, throughputRate: 8.0 },
  { workstationId: 'S4', workstationName: 'Quality Check', occupancyTime: 375, utilizationPercentage: 78.1, unitsProduced: 45, throughputRate: 7.2 },
  { workstationId: 'S5', workstationName: 'Labeling', occupancyTime: 395, utilizationPercentage: 82.3, unitsProduced: 51, throughputRate: 7.7 },
  { workstationId: 'S6', workstationName: 'Dispatch', occupancyTime: 350, utilizationPercentage: 72.9, unitsProduced: 38, throughputRate: 6.5 },
];

export const mockFactoryMetrics: FactoryMetrics = {
  totalProductiveTime: 2277,
  totalProductionCount: 279,
  averageProductionRate: 7.4,
  averageWorkerUtilization: 79.1,
};

export const mockProductionOverTime: ProductionOverTime[] = [
  { hour: '08:00', count: 25 },
  { hour: '09:00', count: 38 },
  { hour: '10:00', count: 42 },
  { hour: '11:00', count: 35 },
  { hour: '12:00', count: 20 },
  { hour: '13:00', count: 32 },
  { hour: '14:00', count: 45 },
  { hour: '15:00', count: 42 },
];
