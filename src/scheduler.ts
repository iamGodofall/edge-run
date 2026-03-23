import os from 'os';
import { ScheduleOptions, AgentConfig, JobStatus, JobResult, JobMetrics } from './types';

interface QueuedJob {
  id: string;
  options: ScheduleOptions;
  status: JobStatus;
  startTime?: number;
  metrics?: JobMetrics;
}

const jobs = new Map<string, QueuedJob>();
let jobCounter = 0;

function getCpuUsage(): number {
  const load = os.loadavg()[0];
  return Math.min(load / os.cpus().length * 100, 100);
}

function getMemoryUsageMb(): number {
  const memory = process.memoryUsage();
  return (memory.heapUsed + memory.rss) / 1024 / 1024;
}

function getBatteryLevel(): number {
  // MVP: Simulate (Node no native battery API on all platforms)
  return 50 + Math.random() * 50; // 50-100%
}

type ResourcesConfig = { maxCpu?: number; maxMemoryMb?: number; minBattery?: number };

function checkResources(resources?: ResourcesConfig): boolean {
  const maxCpu = resources?.maxCpu ?? 80;
  const maxMem = resources?.maxMemoryMb ?? 1024;
  const minBat = resources?.minBattery ?? 20;

  return getCpuUsage() < maxCpu &&
         getMemoryUsageMb() < maxMem &&
         getBatteryLevel() > minBat;
}

export async function schedule(options: ScheduleOptions): Promise<{ jobId: string; status: JobStatus }> {
  if (!checkResources(options.agent.resources)) {
    throw new Error('Resources exceed thresholds');
  }

  const jobId = `job_${++jobCounter}`;
  const job: QueuedJob = {
    id: jobId,
    options,
    status: 'queued'
  };

  jobs.set(jobId, job);

  // Execute based on trigger (MVP simple)
  if (options.trigger === 'immediate') {
    job.status = 'running';
    setTimeout(() => {
      job.status = 'completed';
      // Simulate completion
    }, 1000 + Math.random() * 2000);
  } else if (options.trigger === 'daily') {
    setTimeout(() => {
      if (job.status === 'queued') {
        job.status = 'running';
        // ... sim
      }
    }, 5000); // Sim daily
  } else {
    // on-wifi/on-charge: sim after check
    setTimeout(() => {
      if (job.status === 'queued') {
        job.status = 'running';
      }
    }, 3000);
  }

  return { jobId, status: job.status };
}

export function cancel(jobId: string): boolean {
  const job = jobs.get(jobId);
  if (job) {
    jobs.delete(jobId);
    return true;
  }
  return false;
}

export function status(jobId: string): QueuedJob | undefined {
  const job = jobs.get(jobId);
  if (job) {
    return {
      ...job,
      metrics: job.metrics || { latencyMs: 0, memoryMb: 0 }
    };
  }
}
