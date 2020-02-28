"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Delivery_1 = tslib_1.__importDefault(require("@models/Delivery"));
const Yup = tslib_1.__importStar(require("yup"));
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
class EndDeliveryController {
    update(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const schema = Yup.object().shape({
                signature_id: Yup.number().required(),
            });
            if (!(yield schema.isValid(req.body))) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Validation fails' });
            }
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
            yield delivery.update({
                end_date: new Date(),
                signature_id: req.body.signature_id,
            });
            return res.json(delivery);
        });
    }
}
exports.default = new EndDeliveryController();
//# sourceMappingURL=FinishDeliveryController.js.map