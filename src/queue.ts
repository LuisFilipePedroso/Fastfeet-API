import 'dotenv/config';
import Queue from '@lib/Queue';

console.log('💼 Jobs queue started...');

Queue.processQueue();
