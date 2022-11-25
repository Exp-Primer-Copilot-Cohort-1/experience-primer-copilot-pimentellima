/* eslint-disable no-console */
/* eslint-disable consistent-return */

'use strict';

const mongoose = require('mongoose');

const Form = use('App/Models/Form');
const Category = use('App/Models/Category');

class FormController {
  async findFormByProfID({ request, auth }) {
    const userLogged = auth.user;

    try {
      const { id } = request.params;

      const forms = Form
        .where({
          'prof.value': id,
          unity_id: userLogged.unity_id,
          active: true,
        })
        .sort('-name')
        .fetch();
      return forms;
    } catch (err) {
      console.log(err);
    }
  }

  async index({ request, auth }) {
    const userLogged = auth.user;
    try {
      const data = request.only(['name', 'date']);
      if (data.date) {
        const forms = Form.where({
          created_at: { $gte: data.date },
          unity_id: userLogged.unity_id,
        })
          .sort('-name')
          .with('category')
          .with('logAnswers', (builder) => builder.with('activity'))
          .fetch();
        return forms;
      }
      if (data.name) {
        const forms = Form.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
          unity_id: userLogged.unity_id,
        })
          .sort('-name')
          .with('category')
          .with('logAnswers', (builder) => builder.with('activity'))
          .fetch();
        return forms;
      }
      const forms = Form.where({
        unity_id: userLogged.unity_id,
      })
        .with('category')
        .with('logAnswers', (builder) => builder.with('activity'))
        .fetch();
      return forms;
    } catch (err) {
      console.log(err);
    }
  }

  async store({ request, response, auth }) {
    const userLogged = auth.user;
    const data = request.only(['name', 'questions', 'category_id', 'prof']);
    const formData = await Form.where({ name: data.name }).first();
    if (formData) {
      return response.status(400).send({
        error: {
          message: 'Já existe um formulário com este nome.',
        },
      });
    }
    const form = await Form.create({
      ...data,
      category_id: mongoose.Types.ObjectId(data.category_id),
      unity_id: mongoose.Types.ObjectId(userLogged.unity_id),
      active: true,
    });
    return form;
  }

  async update({ params, request }) {
    const form = await Form.where({ _id: params.id }).firstOrFail();
    if (form) {
      const data = request.only(['name', 'questions', 'active', 'category_id', 'prof']);
      if (data.category_id) {
        const category = await Category.where({
          _id: data.category_id,
        }).first();
        if (!category) {
          return response.status(400).send({
            error: {
              message: 'Categoria selecionada não existe.',
            },
          });
        }
        form.merge({
          ...data,
          category_id: mongoose.Types.ObjectId(data.category_id),
        });
        await form.save();
        return form;
      }
      form.merge({
        ...data,
      });
      await form.save();
      return form;
    }
  }

  async show({ params }) {
    const form = await Form.where({ _id: params.id })
      .with('category')
      .with('answers', (builder) => builder.with('activity'))
      .with('logAnswers', (builder) => builder.with('activity'))
      .firstOrFail();

    return form;
  }

  async destroy({ params }) {
    const form = await Form.where({ _id: params.id }).firstOrFail();
    await form.delete();
  }
}

module.exports = FormController;
