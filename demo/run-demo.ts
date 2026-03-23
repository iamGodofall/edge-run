#!/usr/bin/env node
import { schedule, run, syncState, AgentConfig, ScheduleOptions, status } from '../src';

async function main() {
  const agent: AgentConfig = {
    id: 'demo-agent',
    type: 'node',
    entrypoint: './demo-agent.js'
  };

  const options: ScheduleOptions = {
    agent,
    trigger: 'immediate',
    input: { message: 'Hello edge-run!' }
  };

  console.log('=== edge-run v0.1.0 Demo ===');
  console.log('Scheduling job...');
  const { jobId, status: schedStatus } = await schedule(options);
  console.log(`Job ${jobId} status: ${schedStatus}`);

  console.log('\\nRunning agent...');
  const result = await run(agent, options.input);
  console.log('Output:', result.output);
  console.log('Metrics:', result.metrics);

  console.log('\\nSync state (MVP)...');
  const syncRes = await syncState();
  console.log(syncRes);

  console.log('\\nJob status:', status(jobId)); // sync func

}

main().catch(console.error);
