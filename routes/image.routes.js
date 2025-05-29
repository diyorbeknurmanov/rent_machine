const {
  create,
  getAll,
  getOne,
  remove,
  update,
} = require("../controllers/image.controller");

const image_router = require("express").Router();

image_router.post("/", create);
image_router.get("/", getAll);
image_router.get("/:id", getOne);
image_router.patch("/:id", update);
image_router.delete("/:id", remove);

module.exports = image_router;
