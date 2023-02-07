/* eslint-disable no-underscore-dangle */

'use strict';

const PermissionEntity = require('../../Domain/Entities/Permission/permission-entity');
const Log = require('../../../config/log');
const MailEntity = require('../../Domain/Entities/Mail/mail-entity');

const EDGE = require('../../utils/constants-edge');

const Unity = use('App/Models/Unity');
const User = use('App/Models/User');
const Permission = use('App/Models/Permission');

const SELECTS = [
  '_id',
  'name',
  'birth_date',
  'genrer',
  'document',
  'number_id',
  'celphone',
  'phone',
  'cep',
  'address',
  'neighbohood',
  'complement',
  'address_number',
  'city',
  'state',
  'country',
  'naturalness',
  'nationality',
  'profession',
  'specialty',
  'board',
  'record',
  'occupation_code',
  'email',
  'type',
  'active',
  'unity_id',
  'avatar',
  'due_date',
  'created_at',
  'updated_at',
  'exib_minutes',
  'hour_end',
  'hour_start',
  'hour_start_lunch',
  'hour_end_lunch',
  'is_friday',
  'is_saturday',
  'is_sunday',
  'is_monday',
  'is_tuesday',
  'is_wednesday',
  'is_thursday',
  'lunch_time_active',
  'shedule_obs',
  'show_lack',
  'sms_checked',
  'mail_checked',
  'partner',
];

const fetchByKeyAndValue = async (Model, key, value) => {
  const item = await Model.select(SELECTS).where(key, '=', value).fetch();
  return item;
};

class SingUpController {
  async existUnity({ request, response }) {
    const { email } = request.all();

    const unity = await fetchByKeyAndValue(Unity, 'email', email);

    if (unity?.rows?.length === 0) {
      return response.status(404).json({ error: 'Unidade não encontrada.' });
    }

    return unity;
  }

  async existUser({ request, response }) {
    const data = request.all();
    const userExist = await fetchByKeyAndValue(User, 'email', data.email);

    if (userExist?.rows?.length === 0) {
      return response.status(404).json({ error: 'Usuário Já Cadastrada.' });
    }

    const user = await User.create({ ...data, active: true });

    return user;
  }

  async storeUnity({ request, response }) {
    try {
      const data = request.all();

      const unityExist = await fetchByKeyAndValue(Unity, 'email', data.email);

      if (unityExist?.rows?.length > 0) {
        return response.status(404).json({ error: 'Unidade já criada.' });
      }
      const unity = await Unity.create({ ...data, active: true });

      const permissions = new PermissionEntity()
        .defineAllPermissionByTrue()
        .params();

      await Permission.create({
        ...permissions,
        unity_id: unity._id,
      });

      return unity;
    } catch (error) {
      Log.error(error);

      return response.status(400).send({
        error: {
          message: 'Erro ao cadastrar unidade',
        },
      });
    }
  }

  async storeUserAdmin({ request, response }) {
    const data = request.all();

    const userExist = await fetchByKeyAndValue(User, 'email', data.email);

    if (userExist?.rows?.length > 0) {
      return response.status(404).json({ error: 'Usuário Já Cadastrada.' });
    }

    const user = await User.create({ ...data, active: false });

    await Promise.all([
      MailEntity.sendMail({
        email: user.email,
        props: {
          site_activation: `${process.env.SITE_URL}/account-activation/${user._id}`,
          label: user.label || user.name,
        },
        edge: EDGE.confirm_user,
        title: 'Ative sua conta na DPSystem',
      }),
      MailEntity.sendMail({
        edge: EDGE.new_account,
        props: { user_email: user.email },
        title: 'Um novo cadastro',
        email: process.env.MAIL_USERNAME,
      }),
    ]);

    return user;
  }

  async activeUser({ params }) {
    const user = await User.where({ _id: params.id }).firstOrFail();
    user.active = true;
    await user.save();
    return user;
  }
}

module.exports = SingUpController;
