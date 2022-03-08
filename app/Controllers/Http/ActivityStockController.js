'use strict';

const ActivityStock = use('App/Models/ActivityStock');

class ActivityStockController {
  async index({ auth }) {
    const userLogged = auth.user;
    try {
      const activitiesStocks = ActivityStock.where({
        unity_id: userLogged.unity_id,
      })
        .with('activity')
        .fetch();
      return activitiesStocks;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ActivityStockController;
