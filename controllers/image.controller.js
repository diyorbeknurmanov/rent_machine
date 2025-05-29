const { sendErrorResponse } = require("../helpers/send_error_response");
const Image = require("../models/image.model");
const Machine = require("../models/machine.model");

const create = async (req, res) => {
  try {
    const { img_url, uploaded_at, machineId } = req.body;

    const machine = await Machine.findByPk(machineId);
    if (!machine) {
      return sendErrorResponse(
        { message: "bunday machine mavjud emas" },
        res,
        400
      );
    }

    const newData = await Image.create({
      message: "image added",
      img_url,
      uploaded_at,
      machineId,
    });
    res.status(201).send({ message: "New Image Added", newData });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await Image.findAll({
      include: [
        {
          model: Machine,
          attributes: ["name", "price_per_hour", "description"],
        },
      ],
    });
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Image.findByPk(id, {
      include: [
        {
          model: Machine,
          attributes: ["name", "price_per_hour", "description"],
        },
      ],
    });
    res.status(201).send(data);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).send({ message: "Image not found" });
    }

    await image.update(updateData);
    res.status(200).send({ message: "Updated successfully", data: image });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).send({ message: "Image not found" });
    }

    await image.destroy();
    res.status(200).send({ message: "Image deleted successfully" });
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
