"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Delivery_1 = tslib_1.__importDefault(require("@models/Delivery"));
let DeliveryMan = class DeliveryMan extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.IsNumeric,
    sequelize_typescript_1.HasMany(() => Delivery_1.default, {
        foreignKey: 'deliveryman_id',
        as: 'deliverymanId',
    }),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], DeliveryMan.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], DeliveryMan.prototype, "name", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], DeliveryMan.prototype, "avatar_id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], DeliveryMan.prototype, "email", void 0);
DeliveryMan = tslib_1.__decorate([
    sequelize_typescript_1.Table({ modelName: 'deliveryman' })
], DeliveryMan);
exports.default = DeliveryMan;
//# sourceMappingURL=DeliveryMan.js.map