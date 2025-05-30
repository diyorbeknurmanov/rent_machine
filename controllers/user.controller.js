const { sendErrorResponse } = require("../helpers/send_error_response");
const Role = require("../models/roles.model");
const UserAddress = require("../models/user.address");
const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const create = async (req, res) => {
  try {
    const { full_name, phone, email, password, confirm_password } = req.body;

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse(
        { message: "bunday foydalanuvchi mavjud" },
        res,
        400
      );
    }

    if (password !== confirm_password) {
      return sendErrorResponse({ message: "parollar mos emas" }, res, 400);
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const newData = await User.create({
      full_name,
      phone,
      email,
      hashed_password,
    });
    res.status(201).send({ message: "New User Added", newData });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await User.findAll({
      include: [
        { model: UserAddress, attributes: ["name", "address"] },
        { model: Role, attributes: ["name"], through:{attributes:[]} },
      ],
    });
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findByPk(id);
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const category = await User.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "User not found" });
    }

    await category.update(updateData);
    res.status(200).send({ message: "Updated successfully", data: category });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await User.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "User not found" });
    }

    await category.destroy();
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findAllUser = async (req, res) => {
  try {
    const userAddress = await User.findAll({
      //include: User
      include: [{ model: UserAddress, attributes: ["name", "address"] }],
      attributes: ["full_name", "phone"],
    });
    res
      .status(200)
      .send({ message: "foydalanuvchiga yangi mabnzil qoshildi", userAddress });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  findAllUser,
};
