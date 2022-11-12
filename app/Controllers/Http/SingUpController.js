/* eslint-disable no-underscore-dangle */

'use strict';

const PermissionEntity = require('../../Domain/Entities/Permission/permission-entity');
const Log = require('../../../config/log');

const Unity = use('App/Models/Unity');
const User = use('App/Models/User');
const Permission = use('App/Models/Permission');

const Mail = use('Mail');

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
    try {
      const data = request.all();

      const userExist = await fetchByKeyAndValue(User, 'email', data.email);

      if (userExist?.rows?.length > 0) {
        return response.status(404).json({ error: 'Usuário Já Cadastrada.' });
      }

      const user = await User.create({ ...data, active: false });

      try {
        await Mail.send('emails.confirm', {
          site_activation: `${process.env.APP_URL}/users-confirm/${user._id}`,
          label: user.label || user.name,
        }, (message) => {
          message.from('ti@dpsystem.com.br');
          message.to(user.email);
          message.subject('Ative sua conta na DPSystem');
        });
        Log.info(`Email de confirmação enviado para ${user.email}`);

        await Mail.send(
          'emails.new_account',
          { user_email: user.email },
          (message) => {
            message.from('ti@dpsystem.com.br');
            message.to('ti@dpsystem.com.br');
            message.subject('Um novo cadastro');
          },
        );
      } catch (error) {
        Log.error(error);
      }

      return user;
    } catch (error) {
      Log.error(error);

      return response.status(400).send({
        error: {
          message: 'Erro ao cadastrar usuário',
        },
      });
    }
  }
}

module.exports = SingUpController;
