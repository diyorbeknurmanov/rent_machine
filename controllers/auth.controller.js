const { sendErrorResponse } = require("../helpers/send_error_response");
const Role = require("../models/roles.model");
const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const config = require("config");
const { jwtService } = require("../services/jwt.service");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      include: [
        { model: Role, attributes: ["name"], through: { attributes: [] } },
      ],
    });

    if (!user) {
      return sendErrorResponse(
        { message: "email yoki password notog'ri" },
        res,
        400
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.hashed_password
    );
    if (!isPasswordValid) {
      return sendErrorResponse(
        { message: "email yoki password notog'ri" },
        res,
        400
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.roles,
    };

    const token = jwtService.genreateToken(payload);

    const hashed_token = await bcrypt.hash(token.AccessToken, 7);
    user.hashed_token = hashed_token;
    await user.save();

    res.cookie("RefreshToken", token.RefreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });

    res.status(200).send({
      message: "User logged in",
      AccessToken: token.AccessToken,
    });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const logout = async (req, res) => {
  try {
    const { RefreshToken } = req.cookies;

    if (!RefreshToken) {
      return sendErrorResponse(
        { message: "Cookieda refreshToken topilmadi" },
        res,
        400
      );
    }

    const decodedToken = await jwtService.verifyRefreshToken(RefreshToken);

    const user = await User.findByPk(decodedToken.id);
    if (!user) {
      return res.status(400).send({ message: "Foydalanuvchi topilmadi" });
    }

    user.hashed_token = null;
    await user.save();

    res.clearCookie("RefreshToken");
    res.send({ message: "User logged out" });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { RefreshToken } = req.cookies;

    if (!RefreshToken) {
      return sendErrorResponse(
        { message: "Refresh token topilmadi" },
        res,
        400
      );
    }

    const decoded = await jwtService.verifyRefreshToken(RefreshToken);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return sendErrorResponse(
        { message: "Foydalanuvchi topilmadi" },
        res,
        400
      );
    }

    const tokens = jwtService.genreateToken({
      id: user.id,
      email: user.email,
      role: user.roles,
    });

    const hashed_token = await bcrypt.hash(tokens.AccessToken, 7);
    user.hashed_token = hashed_token;
    await user.save();

    res.cookie("RefreshToken", tokens.RefreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });

    res.status(200).send({ AccessToken: tokens.AccessToken });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  login,
  refreshToken,
  logout,
};
