'use strict';

const Schedule = use('App/Models/Schedule');
class ScheduleController {
  async index({ request, auth }) {
    const userLogged = auth.user;
    try {
      const data = request.only(['name']);
      if (data.name) {
        const schedules = Schedule.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
          unity_id: userLogged.unity_id,
        })
          .with('forms')
          .sort('-name')
          .fetch();
        return schedules;
      }
      const schedules = Schedule.where({
        unity_id: userLogged.unity_id,
      })
        .with('forms')
        .fetch();
      return schedules;
    } catch (err) {
      console.log(err);
    }
  }

  async store({ request, response }) {
    const data = request.only(['name', 'unity_id']);
    const unity = await Unity.where({ _id: data.unity_id }).first();
    if (!unity) {
      return response.status(400).send({
        error: {
          message: 'Unidade selecionada não existe.',
        },
      });
    }
    const schedules = await Schedule.create({ ...data, active: true });
    return schedules;
  }

  async update({ params, request, response }) {
    const schedules = await Schedule.where({ _id: params.id }).firstOrFail();
    const data = request.only(['name', 'active', 'unity_id']);
    const unity = await Unity.where({ _id: data.unity_id }).first();
    if (!unity) {
      return response.status(400).send({
        error: {
          message: 'Unidade selecionada não existe.',
        },
      });
    }
    schedules.merge(data);
    await schedules.save();
    return schedules;
  }

  async destroy({ params }) {
    const schedules = await Schedule.where({ _id: params.id }).firstOrFail();
    await schedules.delete();
  }
}

module.exports = ScheduleController;
