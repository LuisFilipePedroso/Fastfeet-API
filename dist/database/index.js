"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Recipient_1 = tslib_1.__importDefault(require("@models/Recipient"));
const User_1 = tslib_1.__importDefault(require("@models/User"));
const DeliveryMan_1 = tslib_1.__importDefault(require("@models/DeliveryMan"));
const Delivery_1 = tslib_1.__importDefault(require("@models/Delivery"));
const File_1 = tslib_1.__importDefault(require("@models/File"));
const DeliveryProblem_1 = tslib_1.__importDefault(require("@models/DeliveryProblem"));
class Database {
    constructor() {
        this.init();
    }
    init() {
        this.connection = new sequelize_typescript_1.Sequelize({
            dialect: 'postgres',
            host: process.env.DB_DOCKER_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [Recipient_1.default, User_1.default, DeliveryMan_1.default, Delivery_1.default, File_1.default, DeliveryProblem_1.default],
            define: {
                timestamps: true,
                underscored: true,
                freezeTableName: true,
            },
        });
    }
}
exports.default = new Database();
//# sourceMappingURL=index.js.map