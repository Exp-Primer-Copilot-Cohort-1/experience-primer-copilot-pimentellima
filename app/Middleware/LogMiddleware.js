'use strict';

const Log = require('../../config/log')

class LogMiddleware {
  async handle({ request }, next) {
    Log.info(`${new Date().toISOString()} -  ${request.url()}`)
    await next();
  }
}

module.exports = LogMiddleware;
