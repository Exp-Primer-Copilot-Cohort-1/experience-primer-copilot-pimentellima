/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

'use strict';

const mongoose = require('mongoose');
const moment = require('moment');

const Activity = use('App/Models/Activity');
const ActivityLog = use('App/Models/ActivityLog');
const User = use('App/Models/User');
const Procedure = use('App/Models/Procedure');
const Stock = use('App/Models/Stock');
const PaymentActivity = use('App/Models/PaymentActivity');
const ActivityPayMonth = use('App/Models/ActivityPayMonth');
const ActivityStock = use('App/Models/ActivityStock');

const _ = require('lodash');

function customIsEquals(first, second) {
  const val = [];
  _.forEach(second, (value, key) => {
    if (first[key] !== value) {
      val.push({ value, key });
    }
  });
  return val;
}

const Mail = use('Mail');
const { format, parseISO, subYears } = require('date-fns');
const { rest } = require('lodash');

class ActivityController {
  async index({ auth }) {
    const userLogged = auth.user;
    try {
      if (userLogged.type === 'admin' || userLogged.type === 'admin_prof') {
        const activities = Activity.where({
          unity_id: userLogged.unity_id,
        })
          .with('user')
          .fetch();
        return activities;
      }
      if (userLogged.type === 'sec' || userLogged.type === 'sec') {
        const activities = Activity.where({
          unity_id: userLogged.unity_id,
        })
          .with('user')
          .fetch();
        return activities;
      }
      if (userLogged.type === 'prof' || userLogged.type === 'prof') {
        const activities = Activity.where({
          unity_id: userLogged.unity_id,
          user_id: userLogged._id,
        })
          .sort('-created_at')
          .with('user')
          .fetch();
        return activities;
      }
      return [];
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async indexByClient({ params }) {
    const activy = await Activity.where({ 'client.value': params.id, status: 'finished' })
      .sort('-date')
      .fetch();

    return activy;
  }

  async store({ request, auth }) {
    const userLogged = auth.user;
    const data = request.only([
      'date',
      'description',
      'hour_start',
      'hour_end',
      'status',
      'schedule_block',
      'schedule',
      'procedures',
      'client',
      'obs',
      'prof',
      'partner',
      'phone',
      'all_day',
      'dates',
      'is_recorrent',
      'is_recorrent_quantity',
      'is_recorrent_now',
      'is_recorrent_quantity_now',
      'health_insurance',
    ]);
    if (data.all_day || data.schedule_block) {
      const {
        dates: elementDates,
        is_recorrent,
        is_recorrent_quantity,
        is_recorrent_now,
        is_recorrent_quantity_now,
        ...newData
      } = data;
      const dateAc = format(parseISO(data.date), 'yyyy-MM-dd');
      data.date = new Date(
        dateAc.split('-')[0],
        parseInt(dateAc.split('-')[1], 10) - 1,
        parseInt(dateAc.split('-')[2], 10),
        0,
        0,
      );
      const activity = await Activity.create({
        ...newData,
        date: new Date(
          dateAc.split('-')[0],
          parseInt(dateAc.split('-')[1], 10) - 1,
          parseInt(dateAc.split('-')[2], 10),
          0,
          0,
        ),
        active: true,
        unity_id: userLogged.unity_id,
        scheduled: 'scheduled',
        prof_id: mongoose.Types.ObjectId(data.prof.value),
      });
      return activity;
    }

    let activity = null;
    if (
      data.is_recorrent_now
        && data.is_recorrent_quantity_now
        && data.dates
        && data.dates.length
    ) {
      const activitiesArr = [];
      const userData = await User.where({ _id: data.prof.value }).first();
      for (const dat of data.dates) {
        const dateAc = format(new Date(dat.date), 'yyyy-MM-dd');
        const activitynew = await Activity.create({
          ...data,
          date: new Date(
            dateAc.split('-')[0],
            parseInt(dateAc.split('-')[1], 10) - 1,
            parseInt(dateAc.split('-')[2], 10),
            0,
            0,
          ),
          active: true,
          unity_id: userLogged.unity_id,
          user_id: mongoose.Types.ObjectId(userData._id),
          prof_id: mongoose.Types.ObjectId(data.prof.value),
          scheduled: 'scheduled',
        });
        activitiesArr.push(activitynew);
      }
      activity = activitiesArr[0];

      const actStock = await ActivityStock
        .where({ user_id: mongoose.Types.ObjectId(data.prof.value) })
        .with('activity').fetch();
      const actStockJSON = actStock.toJSON();
      if (actStockJSON && actStockJSON.length) {
        let activityFinded = null;
        actStockJSON.forEach((act) => {
          if (act.activity.client.value === data.client.value) {
            activityFinded = act;
          }
        });
        console.log('aquiiiiii ---**----', activityFinded);
        if (activityFinded) {
          const acStock = await ActivityStock.where({
            activity_id:
            mongoose.Types.ObjectId(activityFinded.activity_id),
          })
            .with('activity').first();
          const quantity = acStock.quantity_atual - data.is_recorrent_quantity
          - data.is_recorrent_quantity_now
            <= 0 ? 0
            : acStock.quantity_atual - data.is_recorrent_quantity - data.is_recorrent_quantity_now;

          console.log('aquiiiiii ---**----', quantity);
          if (quantity <= 0) {
            await acStock.delete();
          } else {
            acStock.merge({
              unity_id: userLogged.unity_id,
              user_id: mongoose.Types.ObjectId(userData._id),
              activity_id: mongoose.Types.ObjectId(activityFinded.activity_id),
              quantity,
              quantity_total: acStock.quantity_total,
              quantity_atual: quantity,
            });
            await acStock.save();
          }
        } else {
          await ActivityStock.create({
            unity_id: userLogged.unity_id,
            user_id: mongoose.Types.ObjectId(userData._id),
            activity_id: mongoose.Types.ObjectId(activitiesArr[0]._id),
            quantity: data.is_recorrent_quantity - data.is_recorrent_quantity_now,
            quantity_atual: data.is_recorrent_quantity - data.is_recorrent_quantity_now,
            quantity_total: data.is_recorrent_quantity,
          });
        }
      } else {
        await ActivityStock.create({
          unity_id: userLogged.unity_id,
          user_id: mongoose.Types.ObjectId(userData._id),
          activity_id: mongoose.Types.ObjectId(activitiesArr[0]._id),
          quantity: parseInt(data.is_recorrent_quantity, 10)
            - parseInt(data.is_recorrent_quantity_now, 10),
          quantity_atual: parseInt(data.is_recorrent_quantity, 10)
            - parseInt(data.is_recorrent_quantity_now, 10),
          quantity_total: data.is_recorrent_quantity,
        });
      }
    } else {
      const userData = await User.where({ _id: data.prof.value }).first();
      if (userData) {
        try {
          await Mail.send(
            'emails.activity',
            {
              date: format(data.date ? new Date(data.date) : new Date(), 'dd/MM/yyyy'),
            },
            (message) => {
              message.from('ti@dpsystem.com.br');
              message.to(userData.email);
              message.subject('Uma nova atividade');
            },
          );
        } catch (error) {
          console.log(error);
        }
      }
      if (data.is_recorrent && !data.is_recorrent_now) {
        const dateAc = format(parseISO(data.date), 'yyyy-MM-dd');
        data.date = new Date(
          dateAc.split('-')[0],
          parseInt(dateAc.split('-')[1], 10) - 1,
          parseInt(dateAc.split('-')[2], 10),
          0,
          0,
        );
        activity = await Activity.create({
          ...data,
          date: subYears(new Date(
            dateAc.split('-')[0],
            parseInt(dateAc.split('-')[1], 10) - 1,
            parseInt(dateAc.split('-')[2], 10),
            0,
            0,
          ), 20),
          active: true,
          unity_id: userLogged.unity_id,
          user_id: mongoose.Types.ObjectId(userData._id),
          scheduled: 'not_count',
          // scheduled: 'scheduled',
          prof_id: mongoose.Types.ObjectId(data.prof.value),
        });

        const actStock = await ActivityStock
          .where({ user_id: mongoose.Types.ObjectId(data.prof.value) })
          .with('activity').fetch();
        const actStockJSON = actStock.toJSON();
        if (actStockJSON && actStockJSON.length) {
          let activityFinded = null;
          actStockJSON.forEach((act) => {
            if (act.activity.client.value === data.client.value) {
              activityFinded = act;
            }
          });
          if (activityFinded) {
            const acStck = await ActivityStock
              .where({ activity_id: mongoose.Types.ObjectId(activityFinded.activity_id) }).first();
            const quantity = acStck.quantity - 1 <= 0 ? 0
              : acStck.quantity - 1;
            if (quantity <= 0) {
              await acStck.delete();
            } else {
              acStck.merge({
                unity_id: userLogged.unity_id,
                user_id: mongoose.Types.ObjectId(userData._id),
                activity_id: mongoose.Types.ObjectId(activityFinded.activity_id),
                quantity_total: acStck.quantity_total,
                quantity_atual: quantity,
                quantity,
              });
              await acStck.save();
            }
          } else {
            await ActivityStock.create({
              unity_id: userLogged.unity_id,
              user_id: mongoose.Types.ObjectId(userData._id),
              activity_id: mongoose.Types.ObjectId(activity._id),
              quantity_total: data.is_recorrent_quantity,
              quantity_atual: data.is_recorrent_quantity,
              quantity: data.is_recorrent_quantity,
            });
          }
        } else {
          await ActivityStock.create({
            unity_id: userLogged.unity_id,
            user_id: mongoose.Types.ObjectId(userData._id),
            activity_id: mongoose.Types.ObjectId(activity._id),
            quantity_total: data.is_recorrent_quantity,
            quantity_atual: data.is_recorrent_quantity,
            quantity: data.is_recorrent_quantity,
          });
        }

        const obj = {
          title: 'Nova atividade',
        };
        await ActivityLog.create({
          ...obj,
          activity_id: mongoose.Types.ObjectId(activity._id),
          admin: userLogged.toJSON(),
        });
        return activity;
      }
      delete data.dates;
      delete data.is_recorrent;
      delete data.is_recorrent_quantity;
      delete data.is_recorrent_now;
      delete data.is_recorrent_quantity_now;

      const dateAc = format(parseISO(data.date), 'yyyy-MM-dd');
      data.date = new Date(
        dateAc.split('-')[0],
        parseInt(dateAc.split('-')[1], 10) - 1,
        parseInt(dateAc.split('-')[2], 10),
        0,
        0,
      );
      activity = await Activity.create({
        ...data,
        date: new Date(
          dateAc.split('-')[0],
          parseInt(dateAc.split('-')[1], 10) - 1,
          parseInt(dateAc.split('-')[2], 10),
          0,
          0,
        ),
        active: true,
        unity_id: userLogged.unity_id,
        user_id: mongoose.Types.ObjectId(userData._id),
        scheduled: 'scheduled',
        prof_id: mongoose.Types.ObjectId(data.prof.value),
      });
    }
    if (!data.is_recorrent) {
      const actStock = await ActivityStock
        .where({ user_id: mongoose.Types.ObjectId(data.prof.value) })
        .with('activity').fetch();
      const userData = await User.where({ _id: data.prof.value }).first();
      const actStockJSON = actStock.toJSON();
      if (actStockJSON && actStockJSON.length) {
        let activityFinded = null;
        actStockJSON.forEach((act) => {
          if (act.activity.client.value === data.client.value) {
            activityFinded = act;
          }
        });
        if (activityFinded) {
          const acStock = await ActivityStock
            .where({ activity_id: mongoose.Types.ObjectId(activityFinded.activity_id) }).first();
          const quantity = acStock.quantity - 1 <= 0 ? 0
            : acStock.quantity - 1;
          if (quantity <= 0) {
            await acStock.delete();
          } else {
            acStock.merge({
              unity_id: userLogged.unity_id,
              user_id: mongoose.Types.ObjectId(userData._id),
              activity_id: mongoose.Types.ObjectId(activityFinded.activity_id),
              quantity_total: acStock.quantity_total,
              quantity_atual: quantity,
              quantity,
            });
            await acStock.save();
          }
        }
      }

      const obj = {
        title: 'Nova atividade',
      };

      await ActivityLog.create({
        ...obj,
        activity_id: mongoose.Types.ObjectId(activity._id),
        admin: userLogged.toJSON(),
      });
      return activity;
    }
    return false;
  }

  async update({ params, request }) {
    const activy = await Activity.where({ _id: params.id }).firstOrFail();
    if (activy) {
      const data = request.only([
        'date',
        'hour_start',
        'hour_end',
        'description',
        'active',
        'status',
        'schedule_block',
        'schedule',
        'procedures',
        'client',
        'obs',
        'prof',
        'partner',
        'phone',
        'all_day',
        'started_at',
        'health_insurance',
        'finished_at',
        'scheduled',
      ]);

      if (data.active === 'false' || data.active === false) {
        activy.merge({
          active: false,
        });
        await activy.save();
        return activy;
      }
      if (data.date) {
        const dateAc = format(parseISO(data.date), 'yyyy-MM-dd');
        data.date = new Date(
          dateAc.split('-')[0],
          parseInt(dateAc.split('-')[1], 10) - 1,
          parseInt(dateAc.split('-')[2], 10),
          0,
          0,
        );
      }
      try {
        if (data.status && data.status === 'finished') {
          if (activy.procedures && activy.procedures.length) {
            for (const proc of activy.procedures) {
              const procedure = await Procedure
                .where({ _id: mongoose.Types.ObjectId(proc.value) }).first();
              if (procedure && procedure.products) {
                for (const produ of procedure.products) {
                  const stocks = await Stock
                    .where({ _id: mongoose.Types.ObjectId(produ.product.value) }).first();
                  stocks
                    .merge({
                      quantity: parseInt(stocks.quantity, 10)
                      - parseInt(produ.quantity, 10),
                    });
                  await stocks.save();
                }
              }
            }
          }
        }
      } catch (er) {
        console.log(er);
      }
      console.log('aquiiiiii', data.hour_end, data.hour_start);
      if (format(data.date, 'dd/MM/yyyy') !== format(activy.date, 'dd/MM/yyyy')
        || format(parseISO(data.hour_start), 'HH:mm') !== format(parseISO(`${activy.hour_start}`), 'HH:mm')
        || format(parseISO(data.hour_end), 'HH:mm') !== format(parseISO(`${activy.hour_end}`), 'HH:mm')) {
        data.status = 'rescheduled';
      }
      console.log(data.date);
      activy.merge({
        ...data,
      });
      await activy.save();

      const dataArr = customIsEquals(activy.toJSON(), data);
      for (const dt of dataArr) {
        let title = 'scheduled';
        if (dt.key === '') {
          title = 'Agendado';
        }
        if (dt.key === 'finished_at') {
          title = 'Finalizado às';
        }
        if (dt.key === 'started_at') {
          title = 'Iniciado às';
        }
        if (dt.key === 'all_day') {
          title = 'Atividade o dia completo';
        }
        if (dt.key === 'partner') {
          title = 'Parceiro';
        }
        if (dt.key === 'phone') {
          title = 'Telefone';
        }
        if (dt.key === 'obs') {
          title = 'Observação';
        }
        if (dt.key === 'prof') {
          title = 'Profissional';
        }
        if (dt.key === 'client') {
          title = 'Cliente';
        }
        if (dt.key === 'procedures') {
          title = 'Procedimentos';
        }
        if (dt.key === 'active') {
          title = 'Ativo';
        }
        if (dt.key === 'date') {
          title = 'Data';
        }
        if (dt.key === 'hour_start') {
          title = 'Hora de inicio';
        }
        if (dt.key === 'hour_end') {
          title = 'Hora final';
        }
        if (dt.key === 'description') {
          title = 'Descrição';
        }
        if (dt.key === 'status') {
          title = 'Status';
        }
        if (dt.key === 'schedule_block') {
          title = 'Bloquear agendamento';
        }
        if (dt.key === 'schedule') {
          title = 'Agendar';
        }
        const obj = {
          title,
        };
        await ActivityLog.create({
          ...obj,
          activity_id: mongoose.Types.ObjectId(activity._id),
          admin: userLogged.toJSON(),
        });
      }

      return activy;
    }
    return false;
  }

  async updateStatus({ params, request }) {
    const activy = await Activity.where({ _id: params.id }).firstOrFail();
    if (activy) {
      const data = request.only(['started_at', 'finished_at', 'scheduled', 'time', 'status']);
      activy.merge({
        ...data,
      });
      await activy.save();
      return activy;
    }
    return false;
  }

  async updateStatusUser({ params, request }) {
    const activy = await Activity.where({ _id: params.id }).firstOrFail();
    if (activy && (activy.status === 'finished'
    || activy.status === 'canceled'
    || activy.status === 'canceled_client')) {
      const data = request.only(['status']);
      activy.merge({
        ...data,
      });
      await activy.save();
      return activy;
    }
    return false;
  }

  async show({ params }) {
    const activy = await Activity.where({ _id: params.id })
      .with('user')
      .firstOrFail();

    return activy;
  }

  async destroy({ params }) {
    const activy = await Activity.where({ _id: params.id }).firstOrFail();
    await activy.delete();
  }

  async payment({ request, auth }) {
    // PaymentActivity
    const userLogged = auth.user;
    const data = request.only([
      'activity_id',
      'client',
      'prof',
      'total',
      'type_payment',
      'months',
      'date_pay',
    ]);

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
        activityAlter.merge({procedures: proceduresNew});
        await activityAlter.save();
      } catch (er) {
        console.log(er);
      }
    }

    if (data.type_payment === 'credit_card' && data.months > 1) {
      const value = data.total / data.months;
      const arrPay = [];
      for (let i = 1; i <= data.months; i++) {
        const obj = {
          activity_id: mongoose.Types.ObjectId(data.activity_id),
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
        activity_id: mongoose.Types.ObjectId(data.activity_id),
        client: data.client,
        value: data.total,
        date: data.date_pay,
      };
      await ActivityPayMonth.create({
        ...obj,
        active: true,
        unity_id: userLogged.unity_id,
        user_id: mongoose.Types.ObjectId(userLogged._id),
      });
    }
    await PaymentActivity.create({
      ...data,
      active: true,
      date_pay: new Date(data.date_pay),
      activity_id: mongoose.Types.ObjectId(data.activity_id),
      unity_id: userLogged.unity_id,
      user_id: mongoose.Types.ObjectId(userLogged._id),
    });
    return activityAlter;
  }
}

module.exports = ActivityController;
