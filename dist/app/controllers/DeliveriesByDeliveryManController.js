"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Delivery_1 = tslib_1.__importDefault(require("@models/Delivery"));
const sequelize_1 = require("sequelize");
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
const Recipient_1 = tslib_1.__importDefault(require("@models/Recipient"));
const DeliveryMan_1 = tslib_1.__importDefault(require("@models/DeliveryMan"));
const query = {
    pending: (deliveryman_id) => Delivery_1.default.findAll({
        include: [DeliveryMan_1.default, Recipient_1.default],
        where: {
            deliveryman_id,
            end_date: null,
            canceled_at: null,
        },
    }),
    done: (deliveryman_id) => Delivery_1.default.findAll({
        include: [DeliveryMan_1.default, Recipient_1.default],
        where: {
            deliveryman_id,
            [sequelize_1.Op.or]: [
                {
                    end_date: {
                        [sequelize_1.Op.ne]: null,
                    },
                },
                {
                    canceled_at: {
                        [sequelize_1.Op.ne]: null,
                    },
                },
            ],
        },
    }),
};
class DeliveriesByDeliveryManController {
    index(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!(req.query && req.query.status)) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'You must have to inform the status on query params' });
            }
            const key = Object.values(req.query).toString();
            const request = query[key];
            const response = yield request(req.params.id);
            return res.json(response);
        });
    }
}
exports.default = new DeliveriesByDeliveryManController();
//# sourceMappingURL=DeliveriesByDeliveryManController.js.map