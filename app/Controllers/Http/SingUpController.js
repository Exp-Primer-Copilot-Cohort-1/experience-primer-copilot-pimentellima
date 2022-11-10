/* eslint-disable no-underscore-dangle */
const PermissionEntity = require('../../Domain/Entities/Permission/permission-entity');

const Unity = use('App/Models/Unity');
const User = use('App/Models/Unity');
const Permission = use('App/Models/Permission');

const Mail = use('Mail');
const Log = use('App/Services/Log');

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
  const item = Model.select(SELECTS).where(key, '=', value).fetch();
  return item;
};

class SingUpController {
  async existUnity({ request, response }) {
    const { email } = request.all();

    const unity = await fetchByKeyAndValue(Unity, 'email', email);

    if (!unity && !unity.length) {
      return response.status(401).json({ error: 'Unidade não encontrada.' });
    }

    return unity;
  }

  async existUser({ request, response }) {
    const data = request.all();
    const userExist = await fetchByKeyAndValue(User, 'email', data.email);

    if (userExist?.length > 0) {
      return response.status(401).json({ error: 'Usuário Já Cadastrada.' });
    }

    const user = await User.create({ ...data, active: true });

    return user;
  }

  async singUpUnity({ request, response }) {
    const data = request.all();

    const unityExist = await fetchByKeyAndValue(Unity, 'email', data.email);

    if (unityExist?.length > 0) {
      return response.status(401).json({ error: 'Unidade Já Cadastrada.' });
    }

    const unity = await Unity.create({ ...data, active: true });

    const permissions = new PermissionEntity().defineAllPermissionByTrue();

    await Permission.create({
      ...permissions.params(),
      unity_id: unity._id,
    });

    return unity;
  }

  async singUpUserAdmin({ request, response }) {
    const data = request.all();

    const userExist = await fetchUnityByEmail(data.email);

    if (userExist?.length > 0) {
      return response.status(401).json({ error: 'Usuário Já Cadastrada.' });
    }

    const user = await User.create({ ...data, active: false });

    const unity = await Unity.where({ _id: data.unity_id }).first();

    if (!unity) {
      return response.status(400).send({
        error: {
          message: 'Unidade selecionada não existe.',
        },
      });
    }

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
  }
}

module.exports = SingUpController;
