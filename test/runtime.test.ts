import { run, supports } from '../src';

describe('Runtime', () => {
  test('supports node', () => {
    expect(supports('node')).toBe(true);
    expect(supports('python')).toBe(false);
  });

  test('run agent', async () => {
    const result = await run({ id: 'test', type: 'node', entrypoint: '' }, 'input');
    expect(result.output).toBeDefined();
    expect(result.metrics.latencyMs).toBeGreaterThan(0);
  });
});

afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
});

