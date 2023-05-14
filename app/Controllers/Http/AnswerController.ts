'use strict';

const mongoose = require('mongoose');

const Answer = use('App/Models/Answer');
const LogAnswer = use('App/Models/LogAnswer');

class AnswerController {
  async index({ request, auth }) {
    const userLogged = auth.user;
    try {
      const data = request.only(['name']);
      if (data.name) {
        const answers = Answer.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
          unity_id: userLogged.unity_id,
        })
          .sort('-name')
          .with('form', (builder) => builder.with('category'))
          .with('user')
          .with('activity')
          .fetch();
        return answers;
      }
      const answers = Answer.where({
        unity_id: userLogged.unity_id,
      })
        .with('form', (builder) => builder.with('category'))
        .with('user')
        .with('activity')
        .fetch();
      return answers;
    } catch (err) {
      console.log(err);
    }
  }

  async store({ request }) {
    const data = request.all();

    const answer = await Answer.create({
      ...data,
      form_id: mongoose.Types.ObjectId(data.form_id),
      user_id: mongoose.Types.ObjectId(data.user_id),
      activity_id: mongoose.Types.ObjectId(data.activity_id),
      category_id: mongoose.Types.ObjectId(data.category_id),
      active: true,
    });
    await LogAnswer.create({
      ...data,
      form_id: mongoose.Types.ObjectId(data.form_id),
      user_id: mongoose.Types.ObjectId(data.user_id),
      activity_id: mongoose.Types.ObjectId(data.activity_id),
      active: true,
    });

    return answer;
  }

  async update({ params, request }) {
    const answer = await Answer.where({ _id: params.id }).firstOrFail();
    if (answer) {
      const data = request.only([
        'answers',
        'user_id',
        'active',
        'form_id',
        'activity_id',
      ]);
      answer.merge({
        ...data,
        form_id: mongoose.Types.ObjectId(data.form_id),
        user_id: mongoose.Types.ObjectId(data.user_id),
        activity_id: mongoose.Types.ObjectId(data.activity_id),
      });
      await answer.save();

      await LogAnswer.create({
        ...data,
        form_id: mongoose.Types.ObjectId(data.form_id),
        user_id: mongoose.Types.ObjectId(data.user_id),
        activity_id: mongoose.Types.ObjectId(data.activity_id),
      });
      return answer;
    }
  }

  async show({ params }) {
    const answer = await Answer.where({ _id: params.id })
      .with('form', (builder) => builder.with('category'))
      .with('user')
      .firstOrFail();

    return answer;
  }

  async showByFormId({ params, request }) {
    const data = request.only(['name']);
    if (data.name) {
      const answers = Answer.where({ form_id: params.form_id })
        .with('form', (builder) => builder.with('category'))
        .with('user', (builder) => builder.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
        }))
        .fetch();
      return answers;
    }
    const answer = await Answer.where({ form_id: params.form_id })
      .with('form')
      .with('user')
      .fetch();

    return answer;
  }

  async destroy({ params }) {
    const answer = await Answer.where({ _id: params.id }).firstOrFail();
    await answer.delete();
  }
}

module.exports = AnswerController;
