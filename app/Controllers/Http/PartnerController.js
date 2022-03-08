'use strict';

const Partner = use('App/Models/Partner');
class PartnerController {
  async index({ request, auth }) {
    const userLogged = auth.user;
    const data = request.only(['name']);
    if (data.name) {
      const partner = Partner.where({
        name: { $regex: new RegExp(`.*${data.name}.*`) },
        unity_id: userLogged.unity_id,
      })
        .sort('-name')
        .fetch();
      return partner;
    }
    const partner = Partner.where({
      unity_id: userLogged.unity_id,
    }).fetch();
    return partner;
  }

  async store({ request, auth }) {
    const userLogged = auth.user;
    const data = request.only([
      'name',
      'register_code',
      'hour_start',
      'hour_end',
    ]);
    const partner = await Partner.create({
      ...data,
      active: true,
      unity_id: userLogged.unity_id,
    });
    return partner;
  }

  async update({ params, request, auth }) {
    const userLogged = auth.user;
    const partner = await Partner.where({ _id: params.id }).firstOrFail();
    const data = request.only([
      'name',
      'register_code',
      'hour_start',
      'hour_end',
      'active',
    ]);
    partner.merge({ ...data, unity_id: userLogged.unity_id });
    await partner.save();
    return partner;
  }

  async destroy({ params }) {
    const partner = await Partner.where({ _id: params.id }).firstOrFail();
    await partner.delete();
  }
}

module.exports = PartnerController;
