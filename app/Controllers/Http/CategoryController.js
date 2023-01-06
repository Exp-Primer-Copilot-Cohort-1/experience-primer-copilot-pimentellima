'use strict';

const mongoose = require('mongoose');

const Category = use('App/Models/Category');

class CategoryController {
  async index({ auth }) {
    const { unity_id } = auth.user;

    const categories = await Category.where({
      unity_id,
      active: true,
    })
      .fetch();

    return categories;
  }

  async store({ request, response, auth }) {
    const userLogged = auth.user;
    const data = request.only(['name', 'prof']);
    const categoryData = await Category.where({ name: data.name }).first();
    if (categoryData && categoryData.active) {
      return response.status(400).send({
        error: {
          message: 'Esta categoria já está cadastrada.',
        },
      });
    }
    const category = await Category.create({
      ...data,
      active: true,
      unity_id: mongoose.Types.ObjectId(userLogged.unity_id),
    });
    return category;
  }

  async update({ params, request }) {
    const category = await Category.where({ _id: params.id }).first();
    if (category) {
      const data = request.only(['name', 'active', 'prof']);
      category.merge(data);
      await category.save();
      return category;
    }
    return false;
  }

  async show({ params }) {
    const category = await Category.where({ _id: params.id })
      .with('forms')
      .firstOrFail();

    return category;
  }

  async destroy({ params }) {
    const category = await Category.where({ _id: params.id }).firstOrFail();
    await category.delete();
  }
}

module.exports = CategoryController;
