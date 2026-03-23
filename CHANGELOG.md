# Changelog

(2024-10-05)

### Added
- Core scheduler with resource thresholds (CPU<80%, mem<1GB, battery>20%)
- Runtime with isolated subprocess execution (Node MVP)
- Triggers: immediate, daily, on-wifi, on-charge
- Simulated syncState (wifi-condition mock, HMAC prep)
- Types, index exports
- Demo & unit tests
- js-yaml dep for configs

### MVP Scope
- Local-only, no cloud
- Node agents only
- In-mem queue

Future: Python support, real sync/encryption, persistent queue.

