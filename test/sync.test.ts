import { syncState } from '../src';

describe('Sync', () => {
  test('syncState dry run', async () => {
    const result = await syncState({ dryRun: true });
    expect(result.synced).toBe(true);
  });
});

afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
});

