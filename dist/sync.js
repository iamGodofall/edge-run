"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncState = syncState;
async function syncState(options) {
    const dryRun = options?.dryRun ?? true;
    if (dryRun) {
        console.log('Would sync when on-wifi (MVP simulation)');
        return { synced: true, bytes: 1024 }; // Mock
    }
    // Future: HMAC encrypt, conditional upload
    throw new Error('Full sync not implemented in MVP');
}
//# sourceMappingURL=sync.js.map