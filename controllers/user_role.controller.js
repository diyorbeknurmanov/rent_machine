const { sendErrorResponse } = require("../helpers/send_error_response");
const Role = require("../models/roles.model");
const UserRole = require("../models/user-role.model");
const User = require("../models/user.models");

const create = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return sendErrorResponse(
        { message: "bunday user mavjud emas" },
        res,
        400
      );
    }

    const role = await Role.findByPk(roleId);
    if (!role) {
      return sendErrorResponse(
        { message: "bunday role mavjud emas" },
        res,
        400
      );
    }

    const new_user_role = await UserRole.create({
      userId,
      roleId,
    });
    res
      .status(201)
      .send({ message: "Userga yangi Role qoshildi", new_user_role });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await UserRole.findAll({
      include: [
        { model: User, attributes: ["full_name"] },
        { model: Role, attributes: ["name"] },
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
    const data = await UserRole.findByPk(id);
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const status = await UserRole.findByPk(id);
    if (!status) {
      return res.status(404).send({ message: "UserRole not found" });
    }

    await status.update(updateData);
    res.status(200).send({ message: "Updated successfully", data: status });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  const { userId, roleId } = req.body;

  try {
    const userRole = await UserRole.findOne({
      where: {
        userId,
        roleId,
      },
    });

    if (!userRole) {
      return res.status(404).send({ message: "UserRole topilmadi" });
    }

    await userRole.destroy();
    res.status(200).send({ message: "UserRole ochirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
