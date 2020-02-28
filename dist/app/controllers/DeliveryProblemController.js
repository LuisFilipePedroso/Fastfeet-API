"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const DeliveryProblem_1 = tslib_1.__importDefault(require("@models/DeliveryProblem"));
const Yup = tslib_1.__importStar(require("yup"));
const http_status_codes_1 = tslib_1.__importDefault(require("http-status-codes"));
class DeliveryProblemController {
    index(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield DeliveryProblem_1.default.findAll();
            return res.json(response);
        });
    }
    find(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield DeliveryProblem_1.default.findByPk(req.params.id);
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
            const deliveryProblem = yield DeliveryProblem_1.default.create(req.body);
            return res.status(http_status_codes_1.default.CREATED).json(deliveryProblem);
        });
    }
    update(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const schema = Yup.object().shape({
                delivery_id: Yup.number(),
                description: Yup.string(),
            });
            if (!(yield schema.isValid(req.body))) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Validation fails' });
            }
            const deliveryProblem = yield DeliveryProblem_1.default.findByPk(req.params.id);
            if (!deliveryProblem) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Delivery problem does not exists' });
            }
            yield deliveryProblem.update(req.body);
            return res.json(deliveryProblem);
        });
    }
    delete(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const deliveryProblem = yield DeliveryProblem_1.default.findByPk(req.params.id);
            if (!deliveryProblem) {
                return res
                    .status(http_status_codes_1.default.BAD_REQUEST)
                    .json({ error: 'Delivery problem does not exists' });
            }
            yield deliveryProblem.destroy();
            return res.json({ success: 'Delivery problem was deleted successfully' });
        });
    }
}
exports.default = new DeliveryProblemController();
//# sourceMappingURL=DeliveryProblemController.js.map