'use strict';

const LogAnswer = use('App/Models/LogAnswer');
class LogAnswerController {
  async showByFormId({ params, request }) {
    const data = request.only(['name']);
    if (data.name) {
      const answers = LogAnswer.where({ form_id: params.form_id })
        .with('form', (builder) => builder.with('category'))
        .with('user', (builder) => builder.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
        }))
        .fetch();
      return answers;
    }
    const answer = await LogAnswer.where({ form_id: params.form_id })
      .with('form')
      .with('user')
      .fetch();
    return answer;
  }
}

module.exports = LogAnswerController;
