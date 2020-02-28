"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bee_queue_1 = tslib_1.__importDefault(require("bee-queue"));
const NewDeliveryMail_1 = tslib_1.__importDefault(require("@jobs/NewDeliveryMail"));
const redis_1 = tslib_1.__importDefault(require("@config/redis"));
const jobs = [NewDeliveryMail_1.default];
class Queue {
    constructor() {
        this.queus = {};
        this.init();
    }
    init() {
        jobs.forEach(({ key, handle }) => {
            this.queus[key] = {
                bee: new bee_queue_1.default(key, {
                    redis: redis_1.default,
                }),
                handle,
            };
        });
    }
    add(queue, job) {
        return this.queus[queue].bee.createJob(job).save();
    }
    processQueue() {
        jobs.forEach(job => {
            const { bee, handle } = this.queus[job.key];
            bee.process(handle);
        });
    }
}
exports.default = new Queue();
//# sourceMappingURL=Queue.js.map