/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */

'use strict';

const PaymentProf = use('App/Models/PaymentProf');

class PaymentProfController {
  async index({ request, auth }) {
    const userLogged = auth.user;
    const data = request.only(['name']);
    if (data.name) {
      const payments = PaymentProf.where({
        name: { $regex: new RegExp(`.*${data.name}.*`) },
        unity_id: userLogged.unity_id,
      })
        .sort('-name')
        .fetch();
      return payments;
    }
    const payments = PaymentProf.where({
      unity_id: userLogged.unity_id,
    })
      .fetch();
    return payments;
  }

  async store({ request, auth }) {
    const userLogged = auth.user;
    const data = request.only([
      'value',
      'percent',
      'procedure',
      'prof',
    ]);
    const payments = await PaymentProf.create({
      ...data,
      active: true,
      unity_id: userLogged.unity_id,
    });
    return payments;
  }

  async update({ params, request, auth }) {
    const userLogged = auth.user;
    const payments = await PaymentProf.where({ _id: params.id }).firstOrFail();
    const data = request.only([
      'value',
      'percent',
      'procedure',
      'prof',
      'active',
    ]);
    payments.merge({ ...data, unity_id: userLogged.unity_id });
    await payments.save();

    return payments;
  }

  async destroy({ params }) {
    const payments = await PaymentProf.where({ _id: params.id }).firstOrFail();
    await payments.delete();
  }
}

module.exports = PaymentProfController;
