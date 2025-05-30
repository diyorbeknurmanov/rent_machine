const {
  login,
  logout,
  refreshToken,
} = require("../controllers/auth.controller");

const auth_router = require("express").Router();

auth_router.post("/", login);
auth_router.post("/logout", logout);
auth_router.post("/refresh", refreshToken);

module.exports = auth_router;
