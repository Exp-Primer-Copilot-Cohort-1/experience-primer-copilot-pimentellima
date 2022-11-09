'use strict';

class AuthAdminApiKey {
  async handle({ request }, next) {
    const authorization = request.header('Authorization');

    if (authorization !== process.env.ADMIN_API_KEY) {
      return response.status(401).json({
        message: 'Unauthorized',
      });
    }

    return await next();
  }
}

module.exports = AuthAdminApiKey;
