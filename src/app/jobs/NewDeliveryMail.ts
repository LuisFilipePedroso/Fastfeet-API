import Mail from '@lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { name, email, product, recipient } = data;

    console.log('A fila executou');

    Mail.sendEmail({
      to: `${name} <${email}>`,
      subject: 'Nova encomenda',
      template: 'newDelivery',
      context: {
        deliveryman: name,
        product,
        recipient,
      },
    });
  }
}

export default new NewDeliveryMail();
