"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ioredis_1 = tslib_1.__importDefault(require("ioredis"));
const redis_1 = tslib_1.__importDefault(require("@config/redis"));
class MaxDeliveryService {
    constructor() {
        this.redis = new ioredis_1.default({
            host: redis_1.default.host,
            port: Number(redis_1.default.port),
            keyPrefix: 'delivery:',
        });
    }
    set(key, value) {
        return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
    }
    get(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deliveries = yield this.redis.get(key);
            return deliveries ? JSON.parse(deliveries) : null;
        });
    }
}
exports.default = new MaxDeliveryService();
//# sourceMappingURL=MaxDelivery.js.map