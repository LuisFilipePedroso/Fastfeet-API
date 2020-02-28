"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
let DeliveryProblem = class DeliveryProblem extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.IsNumeric,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], DeliveryProblem.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.IsNumeric,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], DeliveryProblem.prototype, "delivery_id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], DeliveryProblem.prototype, "description", void 0);
DeliveryProblem = tslib_1.__decorate([
    sequelize_typescript_1.Table({ modelName: 'delivery_problems' })
], DeliveryProblem);
exports.default = DeliveryProblem;
//# sourceMappingURL=DeliveryProblem.js.map