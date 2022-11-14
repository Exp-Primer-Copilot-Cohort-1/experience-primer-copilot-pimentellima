'use strict';

class AuthAdminApiKey {
  async handle({ request, response }, next) {
    const authorization = request.header('Authorization');

    if (authorization !== process.env.ADMIN_API_KEY) {
      return response.status(401).json({
        message: 'Unauthorized due to invalid API key',
      });
    }

    return await next();
  }
}

module.exports = AuthAdminApiKey;
