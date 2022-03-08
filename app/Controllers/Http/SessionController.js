"use strict";

const User = use("App/Models/User");

class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.only(["email", "password"]);
    const user = await User.query()
      .with("unity")
      .where("email", email)
      .where("active", true)
      .firstOrFail("password", password);
    const token = await auth.withRefreshToken().attempt(email, password);
    return { user, token };
  }

  async refreshToken({ request, auth }) {
    const refreshTokenInput = request.input("refresh_token");
    return await auth
      .newRefreshToken()
      .generateForRefreshToken(refreshTokenInput, true);
  }
}

module.exports = SessionController;
