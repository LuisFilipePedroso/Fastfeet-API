"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
const Delivery_1 = tslib_1.__importDefault(require("@models/Delivery"));
let Recipient = class Recipient extends sequelize_typescript_1.Model {
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
], Recipient.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Recipient.prototype, "name", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Recipient.prototype, "street", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Recipient.prototype, "number", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Recipient.prototype, "complement", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Recipient.prototype, "state", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Recipient.prototype, "city", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Recipient.prototype, "postal_code", void 0);
Recipient = tslib_1.__decorate([
    sequelize_typescript_1.Table({ modelName: 'recipients' })
], Recipient);
exports.default = Recipient;
//# sourceMappingURL=Recipient.js.map