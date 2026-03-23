# edge-run v0.1.0 - Offline-First Agent Orchestrator

Local-first agent scheduling & runtime. Zero cloud. Runs on your machine only.

## Quick Start

```bash
npm install
npm run demo  # See working example
npm test      # Run units
```

## Usage

```typescript
import { schedule, run, syncState } from 'edge-run';

// Schedule agent job
const job = await schedule({
  agent: { id: 'my-agent', type: 'node', entrypoint: './my-agent.js' },
  trigger: 'immediate',
  input: { data: 'hello' }
});

// Run agent directly
const result = await run(job.agent, job.input);
console.log(result.output);

// Sync (MVP sim)
await syncState();
```

## API

- `schedule(options: ScheduleOptions)`: Queue with resource/trigger checks
- `cancel(jobId: string)`
- `status(jobId: string)`
- `run(agent: AgentConfig, input: unknown)`
- `syncState(options?)`

See `/demo` for examples. Full types in `src/types.ts`.

## Local-First Principles
- All data stays local
- Resource-aware scheduling (CPU/Mem/Battery)
- Triggers: immediate, daily, on-wifi/charge (sim)
- Isolated runtime (subprocess)

## Development
```bash
npm run build  # tsc
npm run dev    # ts-node src/index.ts
```

MIT License. v0.1.0 MVP shipped! 🚀

---

**Part of the Agent Builder Suite**  
→ [capkit](https://github.com/iamGodofall/capkit): Scoped capabilities for agents  
→ [quickbench](https://github.com/iamGodofall/quickbench): Reproducible agent evaluation  
→ [edge-run](https://github.com/iamGodofall/edge-run): Offline-first orchestration  
→ [connector-starter](https://github.com/iamGodofall/connector-starter): Generate adapters fast *(coming soon)*

*Built for builders who ship. MIT licensed. Local-first by design.*
