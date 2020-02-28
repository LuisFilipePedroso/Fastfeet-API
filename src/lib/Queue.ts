import Bee from 'bee-queue';
import NewDeliveryMail from '@jobs/NewDeliveryMail';
import CancelDeliveryMail from '@jobs/CancelDeliveryMail';

import redisConfig from '@config/redis';

const jobs = [NewDeliveryMail, CancelDeliveryMail];

class Queue {
  private queus = {};

  constructor() {
    this.init();
  }

  private init() {
    jobs.forEach(({ key, handle }) => {
      this.queus[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
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

export default new Queue();
