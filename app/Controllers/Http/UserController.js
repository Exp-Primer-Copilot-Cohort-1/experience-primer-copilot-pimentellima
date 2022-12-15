/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

'use strict';

const SELECTS = require('../../SelectsQuery/user-select');

const mongoose = require('mongoose');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Unity = use('App/Models/Unity');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const UserLog = use('App/Models/UserLog');

const _ = require('lodash');
const MailEntity = require('../../Domain/Entities/Mail/mail-entity');
const Log = require('../../../config/log');
const EDGE = require('../../utils/constants-edge');

const Mail = use('Mail');

function customIsEquals(first, second) {
  const val = [];
  _.forEach(second, (value, key) => {
    if (first[key] !== value) {
      val.push({ value, key });
    }
  });
  return val;
}

class UserController {
  async index({ request, auth }) {
    const userLogged = auth.user;
    try {
      const data = request.only(['name']);

      if (data.name) {
        const users = await User.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
          unity_id: userLogged.unity_id,
        })
          .select(SELECTS)
          .sort('-name')
          .with('unity')
          .with('answer')
          .with('activity')
          .with('userLog')
          .fetch();
        return users;
      }
      const users = await User.where({
        unity_id: userLogged.unity_id,
      })
        .select(SELECTS)
        .with('answer')
        .with('activity')
        .with('unity')
        .with('userLog')
        .fetch();

      return users;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async indexByType({ request }) {
    try {
      const { unity, type } = request.only(['name', 'type', 'unity']);

      const users = User.where({
        unity_id: mongoose.Types.ObjectId(unity),
        type: { $regex: new RegExp(`.*${type}.*`) },
      })
        .select(SELECTS)
        .sort('-name')
        .with('unity')
        .with('answer')
        .with('activity')
        .fetch();
      return users;
    } catch (err) {
      return false;
    }
  }

  async store({ request, response }) {
    const data = request.only([
      'name',
      'avatar',
      'birth_date',
      'genrer',
      'document',
      'is_company',
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
      'observation',
      'sms_checked',
      'mail_checked',
      'specialty',
      'board',
      'record',
      'profession',
      'occupation_code',
      'email',
      'password',
      'unity_id',
      'type',
      'percent',
      'active',
      'is_monday',
      'is_tuesday',
      'is_wednesday',
      'is_thursday',
      'is_friday',
      'is_saturday',
      'is_sunday',
      'hour_start',
      'hour_end',
      'lunch_time_active',
      'hour_start_lunch',
      'hour_end_lunch',
      'schedule_obs',
      'exib_minutes',
      'show_lack',
      'partner',
    ]);
    const userData = await User.where({ email: data.email }).first();

    if (userData && userData.active) {
      return response.status(400).send({
        error: {
          message: 'O email já está cadastrado em outra conta.',
        },
      });
    }

    const unity = await Unity.where({ _id: data.unity_id }).first();

    if (!unity) {
      return response.status(400).send({
        error: {
          message: 'Unidade selecionada não existe.',
        },
      });
    }

    if (
      (data.type === 'sec'
        || data.type === 'prof'
        || data.type === 'admin_prof')
      && !data.password
    ) {
      const pwdChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const pwdLen = 6;
      const randPassword = Array(pwdLen)
        .fill(pwdChars)
        .map((x) => x[Math.floor(Math.random() * x.length)])
        .join('');
      data.password = randPassword;
      try {
        await Mail.send(
          'emails.create',
          { password: data.password },
          (message) => {
            message.from('ti@dpsystem.com.br');
            message.to(data.email);
            message.subject('A sua senha');
          },
        );
        Log.info(`Senha enviada para o ${data.email}`);
      } catch (error) {
        Log.error(error.message);
      }
    }

    const user = await User.create({
      ...data,
      unity_id: mongoose.Types.ObjectId(data.unity_id.toString()),
      avatar: '',
      active: data.type === 'client' ? true : data.active,
      due_date: null,
      email: data.email?.trim().toLowerCase() || '',
    });

    if (data.type !== 'client' && data.type !== 'sec' && data.type !== 'prof') {
      await Promise.all([
        MailEntity.sendMail({
          email: user.email,
          props: {
            site_activation: `${process.env.APP_URL}/account-activation/${user._id}`,
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
    }

    return user;
  }

  async update({ params, request, auth }) {
    const userLogged = auth.user;
    const user = await User.where({ _id: params.id }).firstOrFail();
    if (user) {
      const data = request.only([
        'name',
        'avatar',
        'birth_date',
        'genrer',
        'document',
        'is_company',
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
        'observation',
        'sms_checked',
        'mail_checked',
        'specialty',
        'board',
        'record',
        'profession',
        'occupation_code',
        'email',
        'password',
        'unity_id',
        'type',
        'percent',
        'active',
        'is_monday',
        'is_tuesday',
        'is_wednesday',
        'is_thursday',
        'is_friday',
        'is_saturday',
        'is_sunday',
        'hour_start',
        'hour_end',
        'lunch_time_active',
        'hour_start_lunch',
        'hour_end_lunch',
        'schedule_obs',
        'exib_minutes',
        'show_lack',
        'partner',
      ]);
      if (!data.password) {
        data.password = user.password;
      }
      if (data.unity_id) {
        const unity = await Unity.where({ _id: data.unity_id }).first();
        if (!unity) {
          return response.status(400).send({
            error: {
              message: 'Unidade selecionada não existe.',
            },
          });
        }
        try {
          const dataArr = customIsEquals(user.toJSON(), data);
          if (dataArr && dataArr.length && data.type === 'client') {
            for (const dt of dataArr) {
              let title = '';
              if (dt.key === 'name') {
                title = 'Nome';
              }
              if (dt.key === 'avatar') {
                title = 'Avatar';
              }
              if (dt.key === 'birth_date') {
                title = 'Data de nascimento';
              }
              if (dt.key === 'genrer') {
                title = 'Gênero';
              }
              if (dt.key === 'document') {
                title = 'Documento';
              }
              if (dt.key === 'is_company') {
                title = 'Empresa?';
              }
              if (dt.key === 'number_id') {
                title = 'Número identidade';
              }
              if (dt.key === 'celphone') {
                title = 'Celular';
              }
              if (dt.key === 'phone') {
                title = 'Telefone';
              }
              if (dt.key === 'cep') {
                title = 'CEP';
              }
              if (dt.key === 'address') {
                title = 'Endereço';
              }
              if (dt.key === 'profession') {
                title = 'Profissão';
              }
              if (dt.key === 'observation') {
                title = 'Observação';
              }
              if (dt.key === 'sms_checked') {
                title = 'Notificação via SMS';
              }
              if (dt.key === 'mail_checked') {
                title = 'Notificação via Email';
              }
              if (dt.key === 'naturalness') {
                title = 'Naturalidade';
              }
              if (dt.key === 'nationality') {
                title = 'Nacionalidade';
              }
              if (dt.key === 'state') {
                title = 'Estado';
              }
              if (dt.key === 'country') {
                title = 'País';
              }
              if (dt.key === 'neighbohood') {
                title = 'Bairro';
              }
              if (dt.key === 'complement') {
                title = 'Complemento';
              }
              if (dt.key === 'address_number') {
                title = 'Número do endereço';
              }
              if (dt.key === 'city') {
                title = 'Cidade';
              }
              if (dt.key === 'specialty') {
                title = 'Especialidade';
              }
              if (dt.key === 'occupation_code') {
                title = 'Código de ocupalção';
              }
              if (dt.key === 'email') {
                title = 'Email';
              }
              if (dt.key === 'password') {
                title = 'Senha';
              }
              if (dt.key === 'type') {
                title = 'Nível';
              }
              if (dt.key === 'active') {
                title = 'Ativo';
              }

              if (dt.key === 'partner') {
                title = 'Parceiro';
              }
              const obj = {
                title,
                before: dt.key !== 'password' ? user[dt.key] : '',
                after: dt.key !== 'password' ? data[dt.key] : '',
              };
              await UserLog.create({
                ...obj,
                user_id: mongoose.Types.ObjectId(user._id),
                admin: userLogged.toJSON(),
              });
            }
          }
        } catch (err) {
          console.log(err);
          return false;
        }
        user.merge({
          ...data,
          unity_id: mongoose.Types.ObjectId(data.unity_id),
        });
        await user.save();
        return user;
      }
      user.merge({
        ...data,
      });
      await user.save();
      return user;
    }
    return false;
  }

  async show({ params }) {
    const user = await User.where({ _id: params.id })
      .select(SELECTS)
      .with('unity')
      .with('answer')
      .with('activity')
      .with('userLog')
      .firstOrFail();

    return user;
  }

  async destroy({ params }) {
    const user = await User.where({ _id: params.id }).firstOrFail();
    await user.delete();
  }
}

module.exports = UserController;
