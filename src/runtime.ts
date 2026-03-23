import { fork } from 'child_process';
import { AgentConfig } from './types';

export async function run(agent: AgentConfig, input: unknown): Promise<{ output: unknown; metrics: { latencyMs: number; memoryMb: number; exitCode: number }; error?: string }> {
  return new Promise((resolve) => {
    const startTime = process.hrtime.bigint();
    const startMem = process.memoryUsage().heapUsed;

    // MVP: Simple sync sim for node agent (replace with real fork later)
    // Simulate agent execution
    const latencyMs = 500 + Math.random() * 1000;
    const memoryMb = 50 + Math.random() * 100;
    const exitCode = 0;
    const output = { processed: input, timestamp: new Date().toISOString() };

    setTimeout(() => {
      const endMem = process.memoryUsage().heapUsed;
      const metrics = {
        latencyMs: Number(latencyMs),
        memoryMb: (endMem - startMem) / 1024 / 1024,
        exitCode
      };
      resolve({ output, metrics });
    }, Number(latencyMs));
  });
}

export function supports(agentType: string): boolean {
  return agentType === 'node'; // MVP
}
