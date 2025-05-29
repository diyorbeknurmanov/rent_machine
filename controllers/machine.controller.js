const { sendErrorResponse } = require("../helpers/send_error_response");
const Category = require("../models/category.model");
const District = require("../models/district.model");
const Image = require("../models/image.model");
const Machine = require("../models/machine.model");
const Region = require("../models/region.model");
const User = require("../models/user.models");

const create = async (req, res) => {
  try {
    const {
      name,
      price_per_hour,
      description,
      is_available,
      min_hour,
      min_price,
      regionId,
      districtId,
      userId,
      categoryId,
    } = req.body;

    const region = await Region.findByPk(regionId);
    if (!region) {
      return sendErrorResponse(
        { message: "bunday region mavjud emas" },
        res,
        400
      );
    }
    const district = await District.findByPk(districtId);
    if (!district) {
      return sendErrorResponse(
        { message: "bunday district mavjud emas" },
        res,
        400
      );
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return sendErrorResponse(
        { message: "bunday user mavjud emas" },
        res,
        400
      );
    }
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return sendErrorResponse(
        { message: "bunday category mavjud emas" },
        res,
        400
      );
    }

    const newData = await Machine.create({
      name,
      price_per_hour,
      description,
      is_available,
      min_hour,
      min_price,
      regionId,
      districtId,
      userId,
      categoryId,
    });
    res.status(201).send({ message: "New Machine Added", newData });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await Machine.findAll({
      include: [
        { model: Region, attributes: ["name"] },
        { model: District, attributes: ["name"] },
        { model: User, attributes: ["full_name", "phone", "email"] },
        { model: Category, attributes: ["name"] },
        { model: Image, attributes: ["img_url"] },
      ],
      attributes: {
        exclude: ["regionId", "districtId", "userId", "categoryId"],
      },
    });
    res.status(200).send(data);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Machine.findByPk(id, {
      include: [
        { model: Region, attributes: ["name"] },
        { model: District, attributes: ["name"] },
        { model: User, attributes: ["full_name", "phone", "email"] },
        { model: Category, attributes: ["name"] },
        { model: Image, attributes: ["img_url"] },
      ],
      attributes: {
        exclude: ["regionId", "districtId", "userId", "categoryId"],
      },
    });
    res.status(200).send(data);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const machine = await Machine.findByPk(id);
    if (!machine) {
      return res.status(404).send({ message: "Machine not found" });
    }

    await machine.update(updateData);
    res.status(200).send({ message: "Updated successfully", data: machine });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const commission = await Machine.findByPk(id);
    if (!commission) {
      return res.status(404).send({ message: "Machine not found" });
    }

    await commission.destroy();
    res.status(200).send({ message: "Machine deleted successfully" });
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
