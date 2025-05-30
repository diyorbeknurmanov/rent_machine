const { sendErrorResponse } = require("../helpers/send_error_response");
const Role = require("../models/roles.model");
const User = require("../models/user.models");

const create = async (req, res) => {
  try {
    const { name, description } = req.body;

    const position = await Role.findOne({
      where: { name: name.toLowerCase() },
    });
    if (position) {
      return sendErrorResponse({ message: "bunday role Mavjud" }, res, 400);
    }
    const newrole = await Role.create({
      name: name.toLowerCase(),
      description,
    });
    res.status(201).send({ message: "New Role Added", newrole });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await Role.findAll({
      include: [
        {
          model: User,
          attributes: ["full_name", "email", "phone"],
        },
      ],
      attributes: ["name"],
    });
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Role.findByPk(id);
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const status = await Role.findByPk(id);
    if (!status) {
      return res.status(404).send({ message: "Role not found" });
    }

    await status.update(updateData);
    res.status(200).send({ message: "Updated successfully", data: status });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const status = await Role.findByPk(id);
    if (!status) {
      return res.status(404).send({ message: "Role not found" });
    }

    await status.destroy();
    res.status(200).send({ message: "Role deleted successfully" });
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
