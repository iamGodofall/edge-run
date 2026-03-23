import { AgentConfig } from './types';
export declare function run(agent: AgentConfig, input: unknown): Promise<{
    output: unknown;
    metrics: {
        latencyMs: number;
        memoryMb: number;
        exitCode: number;
    };
    error?: string;
}>;
export declare function supports(agentType: string): boolean;
//# sourceMappingURL=runtime.d.ts.map