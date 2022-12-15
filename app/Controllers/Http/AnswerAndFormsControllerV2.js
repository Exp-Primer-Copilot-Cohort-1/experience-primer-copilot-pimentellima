/* eslint-disable camelcase */

'use strict';

const mongoose = require('mongoose');

const Answer = use('App/Models/Answer');
const Form = use('App/Models/Form');

const existAnswer = async ({
  formId, clientId, unityId, activityId,
}) => {
  const answer = Answer.where({
    unity_id: unityId,
    client_id: clientId,
    form_id: formId,
    activity_id: activityId,
  })
    .sort('-name')
    .with('form', (builder) => builder.with('category'))
    .with('user')
    .with('activity')
    .fetch();

  return answer;
};

const existForm = async ({
  formId, clientId, unityId, activityId,
}) => {
  const form = Form.where({
    unity_id: unityId,
    client_id: clientId,
    form_id: formId,
    activity_id: activityId,
  })
    .sort('-name')
    .with('user')
    .with('activity')
    .fetch();

  return form;
};

class AnswerAndFormsControllerV2 {
  async findFormAndAnswer({ request, auth }) {
    const userLogged = auth.user;
    const { form_id, client_id, activity_id } = request.all();
    const params = {
      formId: form_id,
      clientId: client_id,
      unityId: userLogged.unity_id,
      activityId: activity_id,
    };
    const answers = existAnswer(params);
    const form = existForm(params);
  }
}

module.exports = AnswerAndFormsControllerV2;
