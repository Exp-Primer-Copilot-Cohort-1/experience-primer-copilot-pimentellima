/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

class ProcedureEntity {
  constructor(procedure) {
    this.map = new Map();

    Object.keys(procedure).forEach((key) => {
      this.map.set(key, procedure[key]);
    });

    if (procedure.prof !== undefined) {
      this.map.set('prof', {
        value: activity.prof?.value || null,
        label: activity.prof?.label || null,
      });
    }

    if (procedure.health_insurance !== undefined) {
      this.map.set('health_insurance', procedure.health_insurance?.map((healthInsurance) => ({
        value: healthInsurance?.value || null,
        label: healthInsurance?.label || null,
      })));
    }
  }

  params() {
    return Object.fromEntries(this.map);
  }
}

module.exports = ProcedureEntity;
