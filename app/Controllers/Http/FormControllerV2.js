/* eslint-disable no-console */
/* eslint-disable consistent-return */

'use strict';

const Form = use('App/Models/Form');
const FormEntity = require('../../Domain/Entities/Form/form-entity');

class FormControllerV2 {
  async findFormByUnityID({ auth }) {
    const userLogged = auth.user;

    try {
      const forms = Form
        .where({
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

  async store({ request, auth }) {
    const userLogged = auth.user;
    const data = request.all();

    const Entity = await FormEntity.build({ ...data, unity_id: userLogged.unity_id });

    const form = await Form.create(Entity.params());
    return form;
  }

  async findFormByCategoryID({ auth, params }) {
    const { unity_id } = auth.user;
    const { id } = params;

    const forms = await Form.where({
      unity_id,
      category_id: id,
      shared: true,
    })
      .fetch();

    return forms;
  }
}

module.exports = FormControllerV2;
