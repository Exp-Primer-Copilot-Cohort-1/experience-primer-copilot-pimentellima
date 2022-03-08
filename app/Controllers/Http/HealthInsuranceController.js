'use strict';

const HealthInsurance = use('App/Models/HealthInsurance');
class HealthInsuranceController {
  async index({ request, auth }) {
    const userLogged = auth.user;
    const data = request.only(['name']);
    if (data.name) {
      const healthInsurances = HealthInsurance.where({
        name: { $regex: new RegExp(`.*${data.name}.*`) },
        unity_id: userLogged.unity_id,
      })
        .sort('-name')
        .fetch();
      return healthInsurances;
    }
    const healthInsurances = HealthInsurance.where({
      unity_id: userLogged.unity_id,
    }).fetch();
    return healthInsurances;
  }

  async store({ request, auth }) {
    const userLogged = auth.user;
    const data = request.only([
      'name',
      'register_code',
      'carence',
      'profs',
    ]);
    const healthInsurances = await HealthInsurance.create({
      ...data,
      active: true,
      unity_id: userLogged.unity_id,
    });
    return healthInsurances;
  }

  async update({ params, request, auth }) {
    const userLogged = auth.user;
    const healthInsurances = await HealthInsurance.where({ _id: params.id }).firstOrFail();
    const data = request.only([
      'name',
      'register_code',
      'carence',
      'active',
      'profs',
    ]);
    healthInsurances.merge({ ...data, unity_id: userLogged.unity_id });
    await healthInsurances.save();
    return healthInsurances;
  }

  async destroy({ params }) {
    const healthInsurances = await HealthInsurance.where({ _id: params.id }).firstOrFail();
    await healthInsurances.delete();
  }
}

module.exports = HealthInsuranceController;
