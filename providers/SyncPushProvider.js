/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

'use strict';

const { ServiceProvider } = require('@adonisjs/fold');

class SyncPushProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {}

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    const cron = require('node-cron');
    const Bull = use('Rocketseat/Bull');
    const Job = use('App/Jobs/SyncPush');
    const User = use('App/Models/User');
    const DefaultConfig = use('App/Models/DefaultConfig');
    const Activity = use('App/Models/Activity');
    const mongoose = require('mongoose');

    const {
      getYear,
      getDate,
      getMonth,
      isAfter,
      format,
      parseISO,
      addDays,
    } = require('date-fns');

    try {
      cron.schedule('0 6 * * *', async () => {
        const activities = await Activity
          .fetch();
        const activitiesJson = activities.toJSON();
        for (const activity of activitiesJson) {
          const defaultConfigs = await DefaultConfig.where({
            unity_id: mongoose.Types.ObjectId(activity.unity_id),
          })
            .first();

          const dateSelected = format(addDays(new Date(), defaultConfigs.days), 'yyyy-MM-dd');
          const acDay = format(new Date(activity.date), 'yyyy-MM-dd');

          if (acDay === dateSelected) {
            Bull.add(
              Job.key,
              {
                alertUser: {
                  activity,
                },
              },
            );
          }
        }
      });

      cron.schedule('0 6 * * *', async () => {
        const dateSelected = format(new Date(), 'yyyy-MM-dd');
        const activities = await Activity.where({
          date: new Date(
            dateSelected.split('-')[0],
            parseInt(dateSelected.split('-')[1], 10) - 1,
            parseInt(dateSelected.split('-')[2], 10),
            0,
            0,
          ),
        })
          .with('user')
          .fetch();
        const activitiesJson = activities.toJSON();
        for (const activity of activitiesJson) {
          try {
            const dateC = new Date(
              getYear(new Date()),
              getMonth(new Date()),
              getDate(new Date()),
              parseInt(format(parseISO(activity.hour_start), 'HH'), 10) - 1,
              0,
              0,
            );
            if (isAfter(dateC, new Date())) {
              const user = await User.where({ _id: activity.prof.value })
                .first();
              if (user) {
                Bull.add(
                  Job.key,
                  {
                    data: {
                      email: user.email,
                      date: activity.date,
                    },
                  },
                  // dateC
                );
              }
            }
          } catch (e) {
            console.log(e);
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = SyncPushProvider;
