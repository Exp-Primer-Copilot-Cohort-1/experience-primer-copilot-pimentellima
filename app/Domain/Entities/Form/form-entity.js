/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

class FormEntity {
  map = new Map();

  constructor() { }

  static async build(data) {
    const {
      name,
      questions,
      category_id,
      prof,
      shared,
      active,
      unity_id,
    } = data;

    return new FormEntity()
      .defineName(name)
      .defineQuestions(questions)
      .defineCategory(category_id)
      .defineProf(prof)
      .defineShared(shared)
      .defineActive(active)
      .defineUnityID(unity_id);
  }

  defineName(name) {
    this.map.set('name', name);
    return this;
  }

  defineQuestions(questions = []) {
    this.map.set('questions', questions);
    return this;
  }

  defineCategory(category_id) {
    this.map.set('category_id', mongoose.Types.ObjectId(category_id));
    return this;
  }

  defineUnityID(unity_id) {
    this.map.set('unity_id', mongoose.Types.ObjectId(unity_id));
    return this;
  }

  defineProf(prof) {
    this.map.set('prof', prof);
    return this;
  }

  defineShared(shared = false) {
    this.map.set('shared', shared);
    return this;
  }

  defineActive(active = true) {
    this.map.set('active', active);
    return this;
  }

  params() {
    return Object.fromEntries(this.map);
  }
}

module.exports = FormEntity;
