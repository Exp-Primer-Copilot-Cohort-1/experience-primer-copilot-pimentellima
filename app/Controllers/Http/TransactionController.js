/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */

'use strict';

const PaymentActivity = use('App/Models/PaymentActivity');
const ActivityPayMonth = use('App/Models/ActivityPayMonth');
const Activity = use('App/Models/Activity');

const mongoose = require('mongoose');
const moment = require('moment');

const {
  startOfDay, endOfDay, subHours, addDays, addMonths, addYears,
} = require('date-fns');

class TransactionController {
  async indexByPayment({request, auth}) {
    // PaymentActivity
    const userLogged = auth.user;
    const data = request.only(['date_start', 'date_end']);

    const startDate = data.date_start
      ? startOfDay(new Date(data.date_start)) : startOfDay(new Date());
    const endDate = data.date_end ? endOfDay(new Date(data.date_end)) : endOfDay(new Date());

    const payments = await PaymentActivity.where({
      unity_id: userLogged.unity_id,
    })
      .where(
        'pay_date', '>=', subHours(startDate, 3),
      ).where(
        'pay_date', '<=', endDate,
      )
      .with('activity')
      .sort('date')
      .fetch();

    const paymentsJson = payments.toJSON();
    const newPayments = paymentsJson.map((pay) => ({
      ...pay,
      type: 'payment',
    })).filter((pay) => pay.active);
    return newPayments;
  }

  async updateStatus({ params, request }) {
    const activy = await PaymentActivity.where({ _id: params.id }).firstOrFail();
    if (activy) {
      const data = request.only(['active']);
      activy.merge({
        ...data,
      });
      await activy.save();
      return activy;
    }
    return false;
  }

  async storeTransaction({ request, auth }) {
    const userLogged = auth.user;
    const data = request.only([
      'client',
      'prof',
      'total',
      'date_pay',
      'value',
      'repeat',
      'piecemeal',
      'type_payment',
      'paid',
      'months',
      'occurencies_count',
      'prof',
      'health_insurance',
      'category',
      'payment_form',
      'account',
      'occurencies_form',
      'cost_center',
      'due_date',
      'pay_date',
      'procedures',
      'description',
      'activity_id',
    ]);

    if (data.activity_id) {
      const activityAlter = await Activity.where({ _id: mongoose.Types.ObjectId(data.activity_id) })
        .first();
      if (activityAlter && activityAlter.procedures && activityAlter.procedures.length) {
        try {
          const proceduresNew = [];
          for (const proc of activityAlter.procedures) {
            const newProc = {
              ...proc,
              status: 'PAGO',
            };
            proceduresNew.push(newProc);
          }
          activityAlter.merge({procedures: proceduresNew, paid: !!data.paid});
          await activityAlter.save();
        } catch (er) {
          console.log(er);
        }
      }
    }

    if (data.piecemeal && data.type_payment === 'credit_card' && data.months > 1) {
      const value = data.value / data.months;
      const arrPay = [];
      for (let i = 1; i <= data.months; i++) {
        const obj = {
          client: data.client,
          value,
          date: moment(data.date_pay).add(i - 1, 'M'),
        };
        arrPay.push(obj);
      }
      for (const pay of arrPay) {
        await ActivityPayMonth.create({
          ...pay,
          active: true,
          unity_id: userLogged.unity_id,
          user_id: mongoose.Types.ObjectId(userLogged._id),
        });
      }
    } else {
      const obj = {
        client: data.client,
        value: data.value,
        date: data.date_pay,
      };
      await ActivityPayMonth.create({
        ...obj,
        active: true,
        unity_id: userLogged.unity_id,
        user_id: mongoose.Types.ObjectId(userLogged._id),
      });
    }
    if (data.repeat) {
      const arrRepeat = [];
      for (let i = 0; i < data.occurencies_count; i++) {
        arrRepeat.push(i + 1);
      }
      const timeToRepeat = data.occurencies_form.value;
      for (const timeRepeat of arrRepeat) {
        if (timeToRepeat === 'day') {
          await PaymentActivity.create({
            ...data,
            active: true,
            due_date: data.due_date ? addDays(new Date(data.due_date), timeRepeat) : null,
            pay_date: data.pay_date ? new Date(data.pay_date) : null,
            unity_id: userLogged.unity_id,
            user_id: mongoose.Types.ObjectId(userLogged._id),
          });
        } else if (timeToRepeat === 'week') {
          await PaymentActivity.create({
            ...data,
            active: true,
            due_date: data.due_date ? addDays(new Date(data.due_date), 7) : null,
            pay_date: data.pay_date ? new Date(data.pay_date) : null,
            unity_id: userLogged.unity_id,
            user_id: mongoose.Types.ObjectId(userLogged._id),
          });
        } else if (timeToRepeat === 'fortnight') {
          await PaymentActivity.create({
            ...data,
            active: true,
            due_date: data.due_date ? addDays(new Date(data.due_date), 15) : null,
            pay_date: data.pay_date ? new Date(data.pay_date) : null,
            unity_id: userLogged.unity_id,
            user_id: mongoose.Types.ObjectId(userLogged._id),
          });
        } else if (timeToRepeat === 'month') {
          await PaymentActivity.create({
            ...data,
            active: true,
            due_date: data.due_date ? addMonths(new Date(data.due_date), timeRepeat) : null,
            pay_date: data.pay_date ? new Date(data.pay_date) : null,
            unity_id: userLogged.unity_id,
            user_id: mongoose.Types.ObjectId(userLogged._id),
          });
        } else if (timeToRepeat === 'year') {
          await PaymentActivity.create({
            ...data,
            active: true,
            due_date: data.due_date ? addYears(new Date(data.due_date), timeRepeat) : null,
            pay_date: data.pay_date ? new Date(data.pay_date) : null,
            unity_id: userLogged.unity_id,
            user_id: mongoose.Types.ObjectId(userLogged._id),
          });
        }
      }
    } else {
      await PaymentActivity.create({
        ...data,
        active: true,
        pay_date: data.pay_date ? new Date(data.pay_date) : null,
        due_date: data.due_date ? new Date(data.due_date) : null,
        unity_id: userLogged.unity_id,
        user_id: mongoose.Types.ObjectId(userLogged._id),
      });
    }
  }

  async update({ params, request }) {
    const paymentChange = await PaymentActivity.where({ _id: params.id }).first();
    if (paymentChange) {
      const data = request.only([
        'client',
        'prof',
        'total',
        'type_payment',
        'months',
        'date_pay',
        'value',
        'repeat',
        'piecemeal',
        'type_payment',
        'paid',
        'months',
        'occurencies_count',
        'prof',
        'health_insurance',
        'category',
        'payment_form',
        'account',
        'occurencies_form',
        'cost_center',
        'due_date',
        'pay_date',
        'proc',
        'description',
      ]);
      paymentChange.merge(data);
      await paymentChange.save();
      return paymentChange;
    }
    return false;
  }
}

module.exports = TransactionController;
