/* eslint-disable no-console */

'use strict';

const mongoose = require('mongoose');

const Ingredient = use('App/Models/Ingredientlist');

class IngredientlistController {
  async index({ request, auth }) {
    const userLogged = auth.user;
    try {
      const data = request.only(['name']);
      if (data.name) {
        const ingredients = Ingredient.where({
          name: { $regex: new RegExp(`.*${data.name}.*`) },
          unity_id: userLogged.unity_id,
        })
          .sort('-name')
          .fetch();
        return ingredients;
      }
      const ingredients = Ingredient.where({
        unity_id: userLogged.unity_id,
      })
        .fetch();
      return ingredients;
    } catch (err) {
      console.log(err);
      return response
        .status(err.status)
        .send({ error: { message: err } });
    }
  }

  async store({ request, auth }) {
    const userLogged = auth.user;
    const data = request.only(['name', 'description', 'prof']);

    const ingredients = await Ingredient.create({
      ...data,
      active: true,
      unity_id: mongoose.Types.ObjectId(userLogged.unity_id),
    });
    return ingredients;
  }

  async update({ params, request }) {
    const ingredients = await Ingredient.where({ _id: params.id }).first();
    if (ingredients) {
      const data = request.only(['name', 'description', 'active', 'prof']);
      ingredients.merge(data);
      await ingredients.save();
      return ingredients;
    }
    return false;
  }

  async show({ params }) {
    const ingredients = await Ingredient.where({ _id: params.id })
      .firstOrFail();

    return ingredients;
  }

  async destroy({ params }) {
    const ingredients = await Ingredient.where({ _id: params.id }).firstOrFail();
    await ingredients.delete();
  }
}

module.exports = IngredientlistController;
