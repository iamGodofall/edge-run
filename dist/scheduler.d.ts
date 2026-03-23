import { ScheduleOptions, JobStatus, JobMetrics } from './types';
interface QueuedJob {
    id: string;
    options: ScheduleOptions;
    status: JobStatus;
    startTime?: number;
    metrics?: JobMetrics;
}
export declare function schedule(options: ScheduleOptions): Promise<{
    jobId: string;
    status: JobStatus;
}>;
export declare function cancel(jobId: string): boolean;
export declare function status(jobId: string): QueuedJob | undefined;
export {};
//# sourceMappingURL=scheduler.d.ts.map