import Mail from '@lib/Mail';

class CancelDeliveryMail {
  get key() {
    return 'CancelDeliveryMail';
  }

  async handle({ data }) {
    const { name, email, delivery } = data;

    console.log('A fila executou');

    Mail.sendEmail({
      to: `${name} <${email}>`,
      subject: 'Encomenda cancelada',
      template: 'cancelDelivery',
      context: {
        deliveryman: name,
        delivery,
      },
    });
  }
}

export default new CancelDeliveryMail();
