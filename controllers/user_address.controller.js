const { sendErrorResponse } = require("../helpers/send_error_response");
const UserAddress = require("../models/user.address");
const User = require("../models/user.models");
const { trace } = require("../routes");
const create = async (req, res) => {
  try {
    const { name, address, userId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return sendErrorResponse(
        { message: "bunday user mavjud emas" },
        res,
        400
      );
    }

    const newUserAddress = await UserAddress.create({
      name,
      address,
      userId,
    });
    res.status(201).send({ message: "New UserAddress Added", newUserAddress });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await UserAddress.findAll({});
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await UserAddress.findByPk(id);
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const category = await UserAddress.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "UserAddress not found" });
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
    const category = await UserAddress.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: "UserAddress not found" });
    }

    await category.destroy();
    res.status(200).send({ message: "UserAddress deleted successfully" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const findUserAddress = async (req, res) => {
  try {
    const userAddress = await UserAddress.findAll({
      //include: User
      include: [{ model: User, attributes: ["full_name", "phone"] }],
    });
    res.status(200).send({ message: "Barcha manzillar", userAddress });
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
  findUserAddress,
};
