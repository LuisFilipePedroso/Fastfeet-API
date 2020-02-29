"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DeliveryProblem_1 = tslib_1.__importDefault(require("@models/DeliveryProblem"));
const Delivery_1 = tslib_1.__importDefault(require("@models/Delivery"));
const DeliveryMan_1 = tslib_1.__importDefault(require("@models/DeliveryMan"));
const Yup = tslib_1.__importStar(require("yup"));
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
const CancelDeliveryMail_1 = tslib_1.__importDefault(require("@jobs/CancelDeliveryMail"));
const Queue_1 = tslib_1.__importDefault(require("@lib/Queue"));
class DeliveryProblemController {
    index(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield DeliveryProblem_1.default.findAll({
                where: {
                    delivery_id: req.params.id,
                },
            });
            return res.json(response);
        });
    }
    store(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const schema = Yup.object().shape({
                delivery_id: Yup.number().required(),
                description: Yup.string().required(),
            });
            if (!(yield schema.isValid(req.body))) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Validation fails' });
            }
            const delivery = yield Delivery_1.default.findByPk(req.params.id);
            if (!delivery) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Delivery does not exists' });
            }
            const deliveryProblem = yield DeliveryProblem_1.default.create({
                delivery_id: req.params.id,
                description: req.body.description,
            });
            return res.status(http_status_codes_1.default.CREATED).json(deliveryProblem);
        });
    }
    delete(req, res) {
        var _a, _b, _c, _d, _e, _f;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deliveryProblem = yield DeliveryProblem_1.default.findByPk(req.params.id);
            if (!deliveryProblem) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Delivery problem does not exists' });
            }
            const delivery = yield Delivery_1.default.findByPk(deliveryProblem.delivery_id);
            if ((_a = delivery) === null || _a === void 0 ? void 0 : _a.canceled_at) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Delivery was already canceled' });
            }
            const deliveryman = yield DeliveryMan_1.default.findByPk((_b = delivery) === null || _b === void 0 ? void 0 : _b.deliveryman_id);
            yield Queue_1.default.add(CancelDeliveryMail_1.default.key, {
                name: (_c = deliveryman) === null || _c === void 0 ? void 0 : _c.name,
                email: (_d = deliveryman) === null || _d === void 0 ? void 0 : _d.email,
                delivery: (_e = delivery) === null || _e === void 0 ? void 0 : _e.id,
            });
            yield ((_f = delivery) === null || _f === void 0 ? void 0 : _f.update({ canceled_at: new Date() }));
            return res.json({ success: 'Delivery was canceled successfully' });
        });
    }
}
exports.default = new DeliveryProblemController();
//# sourceMappingURL=DeliveryProblemController.js.map