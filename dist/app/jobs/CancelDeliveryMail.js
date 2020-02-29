"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Mail_1 = tslib_1.__importDefault(require("@lib/Mail"));
class CancelDeliveryMail {
    get key() {
        return 'CancelDeliveryMail';
    }
    handle({ data }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { name, email, delivery } = data;
            console.log('A fila executou');
            Mail_1.default.sendEmail({
                to: `${name} <${email}>`,
                subject: 'Encomenda cancelada',
                template: 'cancelDelivery',
                context: {
                    deliveryman: name,
                    delivery,
                },
            });
        });
    }
}
exports.default = new CancelDeliveryMail();
//# sourceMappingURL=CancelDeliveryMail.js.map