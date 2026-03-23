export interface AgentConfig {
    id: string;
    type: 'node' | 'python';
    entrypoint: string;
    resources?: {
        maxCpu?: number;
        maxMemoryMb?: number;
        minBattery?: number;
    };
}
export interface ScheduleOptions {
    agent: AgentConfig;
    trigger: 'immediate' | 'daily' | 'on-wifi' | 'on-charge';
    input: unknown;
}
export interface JobResult {
    jobId: string;
    output: unknown;
    metrics: {
        latencyMs: number;
        memoryMb: number;
        exitCode: number;
    };
    error?: string;
}
export type JobStatus = 'queued' | 'running' | 'completed' | 'failed';
export interface JobMetrics {
    latencyMs: number;
    memoryMb: number;
    cpuPercent?: number;
}
//# sourceMappingURL=types.d.ts.map