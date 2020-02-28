import Redis from 'ioredis';

import redisConfig from '@config/redis';

class MaxDeliveryService {
  private redis: Redis.Redis;

  constructor() {
    this.redis = new Redis({
      host: redisConfig.host,
      port: Number(redisConfig.port),
      keyPrefix: 'delivery:',
    });
  }

  set(key: string, value: any) {
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
  }

  async get(key: string) {
    const deliveries = await this.redis.get(key);

    return deliveries ? JSON.parse(deliveries) : null;
  }
}

export default new MaxDeliveryService();
