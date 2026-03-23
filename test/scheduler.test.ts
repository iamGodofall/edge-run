import { schedule, cancel, status, AgentConfig, ScheduleOptions } from '../src';

jest.mock('os', () => ({
  loadavg: () => [0.1, 0.2, 0.3],
  cpus: () => [{}]
}));

jest.mock('process', () => ({
  memoryUsage: () => ({ heapUsed: 50 * 1024 * 1024, rss: 100 * 1024 * 1024 })
}));

describe('Scheduler', () => {
  const agent: AgentConfig = {
    id: 'test',
    type: 'node',
    entrypoint: '/test.js'
  };

  const options: ScheduleOptions = {
    agent,
    trigger: 'immediate',
    input: {}
  };

  test('schedule immediate', async () => {
    const { jobId } = await schedule(options);
/job_\d+/
  });

  test('cancel job', async () => {
    const { jobId } = await schedule(options);
    expect(cancel(jobId)).toBe(true);
  });
});

afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
});

