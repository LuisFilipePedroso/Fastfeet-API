"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("dotenv/config");
const Queue_1 = tslib_1.__importDefault(require("@lib/Queue"));
console.log('💼 Jobs queue started...');
Queue_1.default.processQueue();
//# sourceMappingURL=queue.js.map