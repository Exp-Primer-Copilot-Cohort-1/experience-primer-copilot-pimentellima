/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

'use strict';

const Activity = use('App/Models/Activity');
const User = use('App/Models/User');
const PaymentActivity = use('App/Models/PaymentActivity');
const mongoose = require('mongoose');

const {
  startOfDay, endOfDay, subHours, format,
} = require('date-fns');
const _ = require('lodash');
const moment = require('moment');

function removeDupes(dupeArray) {
  const temp = {};
  const tempArray = JSON.parse(JSON.stringify(dupeArray));
  dupeArray.forEach((item) => {
    if (temp[JSON.stringify(item)]) {
      tempArray.pop();
    } else {
      temp[JSON.stringify(item)] = item;
    }
  });
  return tempArray;
}

class ReportController {
  async indexHome({request, auth}) {
    const userLogged = auth.user;
    const data = request.only(['date_start', 'date_end', 'prof_id']);

    const startDate = data.date_start
      ? startOfDay(new Date(data.date_start)) : startOfDay(new Date());
    const endDate = data.date_end ? endOfDay(new Date(data.date_end)) : endOfDay(new Date());

    let activities = null;
    if (!data.prof_id) {
      activities = await Activity.where({
        unity_id: userLogged.unity_id,
      })
        .where(
          'date', '>=', subHours(startDate, 3),
        ).where(
          'date', '<=', endDate,
        )
        .sort('date')
        .fetch();
    } else {
      activities = await Activity.where({
        unity_id: userLogged.unity_id,
        prof_id: mongoose.Types.ObjectId(data.prof_id),
      })
        .where(
          'date', '>=', subHours(startDate, 3),
        ).where(
          'date', '<=', endDate,
        )
        .sort('date')
        .fetch();
    }

    const activitiesJson = activities
      ? activities.toJSON().filter((act) => act.scheduled !== 'not_count') : [];

    const users = await User.where({ unity_id: userLogged.unity_id, type: 'client' })
      .fetch();
    const usersJson = users.toJSON();

    let activitiesAll = null;
    if (!data.prof_id) {
      activitiesAll = await Activity.where({
        unity_id: userLogged.unity_id,
      })
        .sort('date')
        .fetch();
    } else {
      activitiesAll = await Activity.where({
        unity_id: userLogged.unity_id,
        prof_id: mongoose.Types.ObjectId(data.prof_id),
      })
        .sort('date')
        .fetch();
    }
    const activitiesAllJson = activitiesAll.toJSON();

    let newUsers = [];
    const userBirthDate = [];
    const oldUsers = [];
    usersJson.forEach((usr) => {
      activitiesAllJson.forEach((act) => {
        if ((act.client && act.client.value) && act.client.value === `${usr._id}`) {
          const findedUser = newUsers.find((u) => u._id === usr._id);
          if (findedUser) {
            newUsers = newUsers.filter((us) => us._id !== usr._id);
            const findedUserOld = oldUsers.find((u) => u._id === usr._id);
            if (!findedUserOld) { oldUsers.push(usr); }
          } else {
            newUsers.push(usr);
          }
        }
      });
      if (usr.birth_date) {
        const splt = usr.birth_date.split('/');
        if (format(new Date(splt[2], (parseInt(splt[1], 10) - 1), splt[0]), 'dd/MM') === format(new Date(), 'dd/MM')) {
          userBirthDate.push(usr);
        }
      }
    });

    const usersMale = [];
    const usersFemale = [];
    for (const userId of activitiesAllJson) {
      console.log('aqui', usersMale, usersFemale);
      if (userId.client && userId.client.value) {
        const user = await User.where({
          _id:
          mongoose.Types.ObjectId(userId.client.value),
        })
          .first();
        if (user && user.genrer) {
          if (user.genrer === 'male') {
            usersMale.push(user);
          } else if (user.genrer === 'female') {
            usersFemale.push(user);
          }
        }
      }
    }

    const usersNew = newUsers.map((usr) => {
      if (oldUsers.find((u) => u === usr)) {
        return null;
      }
      return usr;
    }).filter((u) => u !== null);

    const scheduleds = activitiesJson.filter((ac) => ac.scheduled === 'scheduled');
    const finished = activitiesJson.filter((ac) => ac.scheduled === 'finished');
    const canceled = activitiesJson.filter((ac) => ac.scheduled === 'canceled');
    const confirmed = activitiesJson.filter((ac) => ac.scheduled === 'confirmed');
    const canceledClient = activitiesJson.filter((ac) => ac.scheduled === 'canceled_client');

    const partners = [];
    const withOutpartners = [];
    activitiesJson.forEach((act) => {
      if (act.prof && act.prof.value) {
        const obj = {
          _id: act.prof.value,
          label: act.prof.label,
        };
        partners.push(obj);
      } else {
        const obj = {
          _id: act.prof.value,
          label: act.prof.label,
        };
        withOutpartners.push(obj);
      }
    });

    const withOutHealthInsurance = [];
    const withHealthInsurance = [];
    activitiesJson.forEach((act) => {
      if (act.health_insurance && act.health_insurance.value) {
        const obj = {
          _id: act.health_insurance.value,
          label: act.health_insurance.label,
        };
        withHealthInsurance.push(obj);
      } else {
        const obj = {
          _id: act._id,
          label: act.prof_id,
        };
        withOutHealthInsurance.push(obj);
      }
    });

    const withOutPartnersNew = [];
    const withPartnersNew = [];
    activitiesJson.forEach((act) => {
      if (act.client && act.client.partner) {
        const obj = {
          _id: act.client.partner.value,
          label: act.client.partner.label,
        };
        withPartnersNew.push(obj);
      } else {
        const obj = {
          _id: act._id,
          label: act.client ? act.client.value : '',
        };
        withOutPartnersNew.push(obj);
      }
    });

    return {
      partners_new: withPartnersNew,
      partners_with_out_new: withOutPartnersNew,
      partners_graph: _(withPartnersNew)
        .groupBy('label')
        .map((items, label) => ({ label, count: items.length }))
        .value(),
      activities_all: activitiesJson,
      scheduleds,
      finished,
      canceled,
      confirmed,
      canceled_client: canceledClient,
      users_male: removeDupes(usersMale),
      users_female: removeDupes(usersFemale),
      old_users: oldUsers,
      new_users: usersNew,
      all_users: users,
      profs: _(partners)
        .groupBy('label')
        .map((items, label) => ({ label, count: items.length }))
        .value(),
      without_profs: withOutpartners,
      without_partners: withOutHealthInsurance,
      partners: _(withHealthInsurance)
        .groupBy('label')
        .map((items, label) => ({ label, count: items.length }))
        .value(),
      birth_date: userBirthDate,
    };
  }

  async indexActivities({request, auth}) {
    const userLogged = auth.user;
    const data = request.only(['date_start', 'date_end']);

    const startDate = data.date_start
      ? startOfDay(new Date(data.date_start)) : startOfDay(new Date());
    const endDate = data.date_end ? endOfDay(new Date(data.date_end)) : endOfDay(new Date());

    const activities = await Activity.where({
      unity_id: userLogged.unity_id,
      schedule_block: false,
    })
      .where(
        'date', '>=', subHours(startDate, 3),
      ).where(
        'date', '<=', endDate,
      )
      .sort('date')
      .fetch();

    const activitiesJson = activities.toJSON().filter((act) => act.scheduled !== 'not_count');

    const scheduled = activitiesJson.filter((ac) => ac.scheduled === 'scheduled');
    const finished = activitiesJson.filter((ac) => ac.scheduled === 'finished');
    const canceled = activitiesJson.filter((ac) => ac.scheduled === 'canceled');
    const canceledClient = activitiesJson.filter((ac) => ac.scheduled === 'canceled_client');

    const getDaysAll = _(activitiesJson)
      .groupBy((v) => moment(v.date).format('DD/MM/YYYY'))
      .mapValues((v) => _.map(v, '_id'))
      .value();
    const valuesAll = Object.values(getDaysAll);
    const valuesObjAll = [];
    valuesAll.forEach((val) => {
      valuesObjAll.push(val.length);
    });

    const objDaysAll = {
      labels: Object.keys(getDaysAll).reverse(),
      values: valuesObjAll.reverse(),
    };

    const getDaysSchedule = _(scheduled)
      .groupBy((v) => moment(v.date).format('DD/MM/YYYY'))
      .mapValues((v) => _.map(v, '_id'))
      .value();
    const valuesSchedule = Object.values(getDaysSchedule);
    const valuesObjSchedule = [];
    valuesSchedule.forEach((val) => {
      valuesObjSchedule.push(val.length);
    });
    const objDaysSchedule = {
      labels: Object.keys(getDaysSchedule).reverse(),
      values: valuesObjSchedule.reverse(),
    };

    const getDaysFinished = _(finished)
      .groupBy((v) => moment(v.date).format('DD/MM/YYYY'))
      .mapValues((v) => _.map(v, '_id'))
      .value();
    const valuesFinished = Object.values(getDaysFinished);
    const valuesObjFinished = [];
    valuesFinished.forEach((val) => {
      valuesObjFinished.push(val.length);
    });
    const objDaysFinished = {
      labels: Object.keys(getDaysFinished).reverse(),
      values: valuesObjFinished.reverse(),
    };

    const getDaysCanceled = _(canceled)
      .groupBy((v) => moment(v.date).format('DD/MM/YYYY'))
      .mapValues((v) => _.map(v, '_id'))
      .value();
    const valuesCanceled = Object.values(getDaysCanceled);
    const valuesObjCanceled = [];
    valuesCanceled.forEach((val) => {
      valuesObjCanceled.push(val.length);
    });
    const objDaysCanceled = {
      labels: Object.keys(getDaysCanceled).reverse(),
      values: valuesObjCanceled.reverse(),
    };

    const getDaysCanceledClient = _(canceledClient)
      .groupBy((v) => moment(v.date).format('DD/MM/YYYY'))
      .mapValues((v) => _.map(v, '_id'))
      .value();
    const valuesCanceledClient = Object.values(getDaysCanceledClient);
    const valuesObjCanceledClient = [];
    valuesCanceledClient.forEach((val) => {
      valuesObjCanceledClient.push(val.length);
    });
    const objDaysCanceledClient = {
      labels: Object.keys(getDaysCanceledClient).reverse(),
      values: valuesObjCanceledClient.reverse(),
    };

    return {
      schedules: objDaysSchedule,
      finished: objDaysFinished,
      canceled: objDaysCanceled,
      canceled_client: objDaysCanceledClient,
      all: objDaysAll,
      activities: activitiesJson,
    };
  }

  async indexActivitiesCanceled({request, auth}) {
    const userLogged = auth.user;
    const data = request.only(['date_start', 'date_end']);

    const startDate = data.date_start ? startOfDay(new Date(data.date_start))
      : startOfDay(new Date());
    const endDate = data.date_end ? endOfDay(new Date(data.date_end)) : endOfDay(new Date());

    const activities = await Activity.where({
      unity_id: userLogged.unity_id,
    })
      .where(
        'date', '>=', subHours(startDate, 3),
      ).where(
        'date', '<=', endDate,
      )
      .sort('date')
      .fetch();

    const activitiesJson = activities.toJSON().filter((act) => act.scheduled !== 'not_count');

    const canceled = activitiesJson.filter((ac) => ac.status === 'canceled');
    const canceledClient = activitiesJson.filter((ac) => ac.status === 'canceled_client');

    const getDaysAll = _(activitiesJson)
      .groupBy((v) => moment(v.date).format('DD/MM/YYYY'))
      .mapValues((v) => _.map(v, '_id'))
      .value();
    const valuesAll = Object.values(getDaysAll);
    const valuesObjAll = [];
    valuesAll.forEach((val) => {
      valuesObjAll.push(val.length);
    });

    const objDaysAll = {
      labels: Object.keys(getDaysAll).reverse(),
      values: valuesObjAll.reverse(),
    };

    const getDaysSchedule = _(canceled)
      .groupBy((v) => moment(v.date).format('DD/MM/YYYY'))
      .mapValues((v) => _.map(v, '_id'))
      .value();
    const valuesSchedule = Object.values(getDaysSchedule);
    const valuesObjSchedule = [];
    valuesSchedule.forEach((val) => {
      valuesObjSchedule.push(val.length);
    });
    const objDaysSchedule = {
      labels: Object.keys(getDaysSchedule).reverse(),
      values: valuesObjSchedule.reverse(),
    };

    const getDaysCanceledClient = _(canceledClient)
      .groupBy((v) => moment(v.date).format('DD/MM/YYYY'))
      .mapValues((v) => _.map(v, '_id'))
      .value();
    const valuesFinished = Object.values(getDaysCanceledClient);
    const valuesObjFinished = [];
    valuesFinished.forEach((val) => {
      valuesObjFinished.push(val.length);
    });
    const objDaysFinished = {
      labels: Object.keys(getDaysCanceledClient).reverse(),
      values: valuesObjFinished.reverse(),
    };

    return {
      canceled: objDaysSchedule,
      canceledClient: objDaysFinished,
      all: objDaysAll,
      activities: activitiesJson,
    };
  }

  async indexActivitiesPartner({request, auth}) {
    const userLogged = auth.user;
    const data = request.only(['date_start', 'date_end', 'partner']);

    const startDate = data.date_start
      ? startOfDay(new Date(data.date_start)) : startOfDay(new Date());
    const endDate = data.date_end ? endOfDay(new Date(data.date_end)) : endOfDay(new Date());

    const activities = await Activity.where({
      unity_id: userLogged.unity_id,
    })
      .sort('date')
      .fetch();

    const activitiesJsonData = activities.toJSON().filter((act) => act.scheduled !== 'not_count');
    const activitiesJson = activitiesJsonData
      .filter((act) => act && act.client && act.client.partner && act.client.partner.value
        && act.client.partner.value === data.partner && new Date(act.date).getTime() >= subHours(startDate, 3).getTime()
        && new Date(act.date).getTime() <= endDate.getTime());

    const scheduled = activitiesJson.filter((ac) => ac.scheduled === 'scheduled');
    const rescheduled = activitiesJson.filter((ac) => ac.rescheduled === 'rescheduled');
    const finished = activitiesJson.filter((ac) => ac.scheduled === 'finished');

    const getDaysAll = _(activitiesJson)
      .groupBy((v) => moment(v.date).format('DD/MM/YYYY'))
      .mapValues((v) => _.map(v, '_id'))
      .value();
    const valuesAll = Object.values(getDaysAll);
    const valuesObjAll = [];
    valuesAll.forEach((val) => {
      valuesObjAll.push(val.length);
    });
    const objDaysAll = {
      labels: Object.keys(getDaysAll).reverse(),
      values: valuesObjAll.reverse(),
    };

    const getDaysSchedule = _(scheduled)
      .groupBy((v) => moment(v.date).format('DD/MM/YYYY'))
      .mapValues((v) => _.map(v, '_id'))
      .value();
    const valuesSchedule = Object.values(getDaysSchedule);
    const valuesObjSchedule = [];
    valuesSchedule.forEach((val) => {
      valuesObjSchedule.push(val.length);
    });
    const objDaysSchedule = {
      labels: Object.keys(getDaysSchedule).reverse(),
      values: valuesObjSchedule.reverse(),
    };

    const getDaysFinished = _(finished)
      .groupBy((v) => moment(v.date).format('DD/MM/YYYY'))
      .mapValues((v) => _.map(v, '_id'))
      .value();
    const valuesFinished = Object.values(getDaysFinished);
    const valuesObjFinished = [];
    valuesFinished.forEach((val) => {
      valuesObjFinished.push(val.length);
    });
    const objDaysFinished = {
      labels: Object.keys(getDaysFinished).reverse(),
      values: valuesObjFinished.reverse(),
    };

    const getDaysResche = _(rescheduled)
      .groupBy((v) => moment(v.date).format('DD/MM/YYYY'))
      .mapValues((v) => _.map(v, '_id'))
      .value();
    const valuesResche = Object.values(getDaysResche);
    const valuesObjResch = [];
    valuesResche.forEach((val) => {
      valuesObjResch.push(val.length);
    });
    const objDaysRescheduled = {
      labels: Object.keys(getDaysResche).reverse(),
      values: valuesObjResch.reverse(),
    };

    return {
      schedules: objDaysSchedule,
      rescheduled: objDaysRescheduled,
      finished: objDaysFinished,
      all: objDaysAll,
      activities: activitiesJson,
    };
  }

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
        'created_at', '>=', subHours(startDate, 3),
      ).where(
        'created_at', '<=', endDate,
      )
      .with('activity')
      .sort('date')
      .fetch();

    const paymentsJson = payments.toJSON();

    const getDaysAll = _(paymentsJson)
      .groupBy((v) => moment(v.date_pay).format('MM/YYYY'))
      .mapValues((v) => _.map(v, '_id'))
      .value();
    const valuesAll = Object.values(getDaysAll);
    const valuesObjAll = [];
    valuesAll.forEach((val) => {
      valuesObjAll.push(val.length);
    });
    const objDaysAll = {
      labels: Object.keys(getDaysAll).reverse(),
      values: valuesObjAll.reverse(),
    };

    return { all: objDaysAll, payments: paymentsJson };
  }

  async indexByPaymentType({request, auth}) {
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
        'created_at', '>=', subHours(startDate, 3),
      ).where(
        'created_at', '<=', endDate,
      )
      .with('activity')
      .sort('date')
      .fetch();

    const paymentsJson = payments.toJSON();
    const paymentsCorrect = paymentsJson.filter((v) => v.type_payment && v.type_payment.value);
    const getDaysAll = _(paymentsCorrect)
      .groupBy((v) => {
        if (v.type_payment && v.type_payment.value) {
          return v.type_payment.value;
        }
        return v.type_payment;
      })
      .mapValues((v) => _.map(v, '_id'))
      .value();
    const valuesAll = Object.values(getDaysAll);
    const valuesObjAll = [];
    valuesAll.forEach((val) => {
      valuesObjAll.push(val.length);
    });
    const objDaysAll = {
      labels: Object.keys(getDaysAll).reverse(),
      values: valuesObjAll.reverse(),
    };

    return { all: objDaysAll, payments: paymentsJson };
  }

  async indexByPaymentProf({request, auth}) {
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
        'created_at', '>=', subHours(startDate, 3),
      ).where(
        'created_at', '<=', endDate,
      )
      .with('activity')
      .sort('date')
      .fetch();

    const paymentsJson = payments.toJSON();

    const getDaysAll = _(paymentsJson)
      .groupBy((v) => v.prof.label)
      .mapValues((v) => _.map(v, '_id'))
      .value();
    const valuesAll = Object.values(getDaysAll);
    const valuesObjAll = [];
    valuesAll.forEach((val) => {
      valuesObjAll.push(val.length);
    });
    const objDaysAll = {
      labels: Object.keys(getDaysAll).reverse(),
      values: valuesObjAll.reverse(),
    };

    return { all: objDaysAll, payments: paymentsJson };
  }

  async indexByPaymentProfDate({request, auth, response}) {
    // PaymentActivity
    const userLogged = auth.user;
    const data = request.only(['date_start', 'date_end']);

    const startDate = data.date_start
      ? startOfDay(new Date(data.date_start)) : startOfDay(new Date());
    const endDate = data.date_end ? endOfDay(new Date(data.date_end)) : endOfDay(new Date());

    const activities = await Activity.where({
      unity_id: mongoose.Types.ObjectId(userLogged.unity_id),
    })
      .where(
        'date', '>=', startDate,
      ).where(
        'date', '<=', endDate,
      )
      .sort('date')
      .fetch();

    const activitiesJson = activities.toJSON().filter((act) => act.scheduled !== 'not_count');
    const procedures = activitiesJson.map((act) => act.procedures.map((proc) => ({
      ...proc,
      date: act.updated_at,
      activity: act,
    })));
    try {
      const valReturn = [];
      for (const proc of procedures) {
        for (const itens of proc) {
          if (itens.val && itens.status === 'PAGO') { valReturn.push({...itens, _id: valReturn.length + 1}); }
        }
      }

      const valReturnData = valReturn.map((it) => {
        if (it && it.activity && it.activity.health_insurance) {
          return it;
        }
        return null;
      }).filter((it) => it != null);
      const getAll = _(valReturnData)
        .groupBy((v) => v.activity.health_insurance.label)
        .mapValues((v) => _.map(v, 'val'))
        .value();
      const valuesAll = Object.values(getAll);
      const valuesObjAll = [];
      valuesAll.forEach((val) => {
        const valueFinal = val.reduce((current, next) => current + next, 0);
        valuesObjAll.push(valueFinal);
      });
      const objDaysAll = {
        labels: Object.keys(getAll).reverse(),
        values: valuesObjAll.reverse(),
      };

      return {procedures: objDaysAll, values: valReturn};
    } catch (er) {
      console.log(er);
      return response
        .status(er.status)
        .send({ error: { message: 'Usuário não tem permissão' } });
    }
  }

  async indexByPaymentProcedure({request, auth}) {
    // PaymentActivity
    const userLogged = auth.user;
    const data = request.only(['date_start', 'date_end']);

    const startDate = data.date_start
      ? startOfDay(new Date(data.date_start)) : startOfDay(new Date());
    const endDate = data.date_end ? endOfDay(new Date(data.date_end)) : endOfDay(new Date());

    const activities = await Activity.where({
      unity_id: mongoose.Types.ObjectId(userLogged.unity_id),
    })
      .where(
        'date', '>=', startDate,
      ).where(
        'date', '<=', endDate,
      )
      .sort('date')
      .fetch();

    const activitiesJson = activities.toJSON().filter((act) => act.scheduled !== 'not_count');
    const procedures = activitiesJson.map((act) => act.procedures.map((proc) => ({
      ...proc,
      date: act.updated_at,
    })));

    const valReturn = [];
    for (const proc of procedures) {
      for (const itens of proc) {
        if (itens.val && itens.status === 'PAGO') {
          valReturn.push({...itens, _id: valReturn.length + 1});
        }
      }
    }

    // console.log(valReturn)

    const getAll = _(valReturn)
      .groupBy((v) => v.label)
      .mapValues((v) => _.map(v, 'val'))
      .value();

    const valuesAll = Object.values(getAll);
    const valuesObjAll = [];
    valuesAll.forEach((val) => {
      valuesObjAll.push(val.length);
    });

    const objDaysAll = {
      labels: Object.keys(getAll).reverse(),
      values: valuesObjAll.reverse(),
    };

    return {procedures: objDaysAll, values: valReturn};
  }
}

module.exports = ReportController;
