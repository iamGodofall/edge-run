"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedule = schedule;
exports.cancel = cancel;
exports.status = status;
const os_1 = __importDefault(require("os"));
const jobs = new Map();
let jobCounter = 0;
function getCpuUsage() {
    const load = os_1.default.loadavg()[0];
    return Math.min(load / os_1.default.cpus().length * 100, 100);
}
function getMemoryUsageMb() {
    const memory = process.memoryUsage();
    return (memory.heapUsed + memory.rss) / 1024 / 1024;
}
function getBatteryLevel() {
    // MVP: Simulate (Node no native battery API on all platforms)
    return 50 + Math.random() * 50; // 50-100%
}
function checkResources(resources) {
    const maxCpu = resources?.maxCpu ?? 80;
    const maxMem = resources?.maxMemoryMb ?? 1024;
    const minBat = resources?.minBattery ?? 20;
    return getCpuUsage() < maxCpu &&
        getMemoryUsageMb() < maxMem &&
        getBatteryLevel() > minBat;
}
async function schedule(options) {
    if (!checkResources(options.agent.resources)) {
        throw new Error('Resources exceed thresholds');
    }
    const jobId = `job_${++jobCounter}`;
    const job = {
        id: jobId,
        options,
        status: 'queued'
    };
    jobs.set(jobId, job);
    // Execute based on trigger (MVP simple)
    if (options.trigger === 'immediate') {
        job.status = 'running';
        setTimeout(() => {
            job.status = 'completed';
            // Simulate completion
        }, 1000 + Math.random() * 2000);
    }
    else if (options.trigger === 'daily') {
        setTimeout(() => {
            if (job.status === 'queued') {
                job.status = 'running';
                // ... sim
            }
        }, 5000); // Sim daily
    }
    else {
        // on-wifi/on-charge: sim after check
        setTimeout(() => {
            if (job.status === 'queued') {
                job.status = 'running';
            }
        }, 3000);
    }
    return { jobId, status: job.status };
}
function cancel(jobId) {
    const job = jobs.get(jobId);
    if (job) {
        jobs.delete(jobId);
        return true;
    }
    return false;
}
function status(jobId) {
    const job = jobs.get(jobId);
    if (job) {
        return {
            ...job,
            metrics: job.metrics || { latencyMs: 0, memoryMb: 0 }
        };
    }
}
//# sourceMappingURL=scheduler.js.map