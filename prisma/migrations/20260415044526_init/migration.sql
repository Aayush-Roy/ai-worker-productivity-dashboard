-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('working', 'idle', 'absent', 'product_count');

-- CreateTable
CREATE TABLE "workers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workstations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workstations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "worker_id" TEXT NOT NULL,
    "workstation_id" TEXT NOT NULL,
    "event_type" "EventType" NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "count" INTEGER,
    "model_version" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "events_worker_id_idx" ON "events"("worker_id");

-- CreateIndex
CREATE INDEX "events_workstation_id_idx" ON "events"("workstation_id");

-- CreateIndex
CREATE INDEX "events_timestamp_idx" ON "events"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "events_timestamp_worker_id_workstation_id_key" ON "events"("timestamp", "worker_id", "workstation_id");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "workers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_workstation_id_fkey" FOREIGN KEY ("workstation_id") REFERENCES "workstations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
