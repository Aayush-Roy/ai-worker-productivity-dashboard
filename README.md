# AI-Powered Worker Productivity Dashboard

A production-style full-stack web application for monitoring worker productivity in a manufacturing environment using AI-powered CCTV cameras with computer vision.

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   AI Camera     │────▶│   Backend API   │────▶│   PostgreSQL    │
│   (CV Model)    │     │   (Next.js)     │     │   Database      │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │ Metrics Service │
                        └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │   Dashboard     │
                        │   (React/Next)  │
                        └─────────────────┘
```

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Recharts
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Containerization**: Docker & Docker Compose

## Database Schema

### Workers Table
| Column | Type | Description |
|--------|------|-------------|
| id | string | Worker ID (W1-W6) |
| name | string | Worker name |
| created_at | datetime | Record creation timestamp |

### Workstations Table
| Column | Type | Description |
|--------|------|-------------|
| id | string | Workstation ID (S1-S6) |
| name | string | Workstation name |
| created_at | datetime | Record creation timestamp |

### Events Table
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Event unique identifier |
| timestamp | datetime | When the event occurred |
| worker_id | string | Reference to worker |
| workstation_id | string | Reference to workstation |
| event_type | enum | working, idle, absent, product_count |
| confidence | float | AI model confidence (0.0-1.0) |
| count | int? | Unit count for product_count events |
| model_version | string? | AI model version that generated the event |
| created_at | datetime | Record creation timestamp |

## Metric Formulas

### Worker-Level Metrics

| Metric | Formula |
|--------|---------|
| Total Active Time | Sum of durations between consecutive "working" events |
| Total Idle Time | Sum of durations between consecutive "idle" events |
| Utilization % | (active_time / shift_duration) × 100 |
| Units Produced | Sum of count from all product_count events |
| Units/Hour | total_units / (active_time / 60) |

### Workstation-Level Metrics

| Metric | Formula |
|--------|---------|
| Occupancy Time | Total time with an active worker |
| Utilization % | (occupancy_time / shift_duration) × 100 |
| Units Produced | Sum of count from all product_count events |
| Throughput Rate | units_produced / (occupancy_time / 60) |

### Factory-Level Metrics

| Metric | Formula |
|--------|---------|
| Total Productive Time | Sum of all worker active times |
| Total Production Count | Sum of all units produced |
| Avg Production Rate | total_production / total_active_hours |
| Avg Worker Utilization | Mean of all worker utilization percentages |

## Assumptions

1. **Shift Duration**: 8 hours (480 minutes)
2. **Event Sequencing**: Events occur sequentially within a shift
3. **Product Count Contribution**: Each `product_count` event contributes to worker/station productivity
4. **Worker Assignment**: Each worker is assigned to one primary workstation

## Edge Case Handling

### Duplicate Events
- Idempotency key: `(timestamp, worker_id, workstation_id)`
- Duplicate events are ignored to prevent double-counting

### Out-of-Order Timestamps
- Events are sorted by timestamp before metrics calculation
- Late-arriving events are processed correctly

### Intermittent Connectivity
- Events are stored asynchronously
- API accepts batch event submissions
- Failed submissions can be retried

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm (or npm/yarn)
- Docker & Docker Compose (optional)

### Local Development

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd worker-productivity-dashboard
   pnpm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL
   ```

3. **Set up the database**
   ```bash
   pnpm db:generate
   pnpm db:push
   pnpm db:seed
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open the dashboard**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Deployment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/events | Create a new event |
| GET | /api/events | List recent events |
| POST | /api/seed-data | Populate with sample data |
| GET | /api/metrics/workers | Get worker productivity metrics |
| GET | /api/metrics/workstations | Get workstation metrics |
| GET | /api/metrics/factory | Get factory summary metrics |

### Query Parameters

- `workerId`: Filter metrics by worker (e.g., `?workerId=W1`)
- `workstationId`: Filter metrics by workstation (e.g., `?workstationId=S1`)

## Scaling Strategy

### Phase 1: 5 Cameras
- Single PostgreSQL instance
- Single application server
- Direct API ingestion

### Phase 2: 100 Cameras
- Message queue (Kafka/RabbitMQ) for event ingestion
- Horizontal scaling of application servers
- Read replicas for database
- Redis for caching metrics

### Phase 3: Multi-Site Deployment
- Cloud PostgreSQL (managed)
- Microservices architecture
- Site-specific metrics aggregation
- Global dashboard with regional drill-down

```
┌─────────────────────────────────────────────────────────┐
│                    Load Balancer                        │
└─────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   App Node 1  │  │   App Node 2  │  │   App Node N  │
└───────────────┘  └───────────────┘  └───────────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ▼
                ┌─────────────────────┐
                │   Message Queue     │
                │   (Kafka/RabbitMQ)  │
                └─────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   Worker 1    │  │   Worker 2    │  │   Worker N    │
│   (Events)    │  │   (Metrics)   │  │   (Reports)   │
└───────────────┘  └───────────────┘  └───────────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │   PostgreSQL        │
                │   (Primary)         │
                └─────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   Replica 1   │  │   Replica 2   │  │   Replica N   │
└───────────────┘  └───────────────┘  └───────────────┘
```

## Model Versioning & Monitoring

### Model Version Tracking
- Each event stores `model_version` field
- Enables A/B testing of model improvements
- Historical analysis by model version

### Model Drift Detection
Monitor confidence score trends:
```sql
SELECT 
  model_version,
  DATE(timestamp) as date,
  AVG(confidence) as avg_confidence,
  MIN(confidence) as min_confidence
FROM events
GROUP BY model_version, DATE(timestamp)
ORDER BY date DESC;
```

### Retraining Triggers
- Alert when average confidence drops below 0.85
- Flag events with confidence < 0.7 for manual review
- Automatic dataset collection for retraining

## License

MIT License
