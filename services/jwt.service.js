const jwt = require("jsonwebtoken");
const config = require("config");

class Jwtservice {
  constructor(access_key, refresh_key) {
    this.access_key = access_key;
    this.refresh_key = refresh_key;
  }
  genreateToken(payload) {
    const AccessToken = jwt.sign(payload, this.access_key, {
      expiresIn: "24h",
    });

    const RefreshToken = jwt.sign(payload, this.refresh_key, {
      expiresIn: "15d",
    });

    return { AccessToken, RefreshToken };
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, this.access_key);
  }

  async verifyRefreshToken(token) {
    return jwt.verify(token, this.refresh_key);
  }
}

let jwtService = new Jwtservice(
  config.get("access_key"),
  config.get("refresh_key")
);

module.exports = { jwtService };
