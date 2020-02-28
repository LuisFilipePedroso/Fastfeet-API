"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const MaxDelivery_1 = tslib_1.__importDefault(require("@services/MaxDelivery"));
const Delivery_1 = tslib_1.__importDefault(require("@models/Delivery"));
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
class StartDeliveryController {
    update(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const delivery = yield Delivery_1.default.findOne({
                where: {
                    id: req.params.id,
                },
            });
            if (!delivery) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Delivery not found' });
            }
            const qtyOfDeliveries = yield MaxDelivery_1.default.get(`${delivery.deliveryman_id}`);
            if (qtyOfDeliveries && qtyOfDeliveries > 5) {
                return res
                    .status(http_status_codes_1.default.NOT_ACCEPTABLE)
                    .json({ error: 'You can only delivery 5 deliveries per day' });
            }
            yield delivery.update({
                start_date: new Date(),
            });
            yield MaxDelivery_1.default.set(`${delivery.deliveryman_id.toString()}`, qtyOfDeliveries + 1);
            return res.status(http_status_codes_1.default.CREATED).json(delivery);
        });
    }
}
exports.default = new StartDeliveryController();
//# sourceMappingURL=StartDeliveryController.js.map