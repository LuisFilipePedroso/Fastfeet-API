"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Recipient_1 = tslib_1.__importDefault(require("@models/Recipient"));
const DeliveryMan_1 = tslib_1.__importDefault(require("@models/DeliveryMan"));
const File_1 = tslib_1.__importDefault(require("@models/File"));
let Delivery = class Delivery extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.IsNumeric,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Delivery.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.BelongsTo(() => Recipient_1.default, {
        foreignKey: 'recipient_id',
        as: 'recipient',
    }),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Delivery.prototype, "recipient_id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.BelongsTo(() => DeliveryMan_1.default, {
        foreignKey: 'deliveryman_id',
        as: 'deliveryman',
    }),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Delivery.prototype, "deliveryman_id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.BelongsTo(() => File_1.default, {
        foreignKey: 'signature_id',
        as: 'signature',
    }),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Delivery.prototype, "signature_id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Delivery.prototype, "product", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Date)
], Delivery.prototype, "canceled_at", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Date)
], Delivery.prototype, "start_date", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Date)
], Delivery.prototype, "end_date", void 0);
Delivery = tslib_1.__decorate([
    sequelize_typescript_1.Table({ modelName: 'deliveries' })
], Delivery);
exports.default = Delivery;
//# sourceMappingURL=Delivery.js.map