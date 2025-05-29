const {
  create,
  getAll,
  getOne,
  remove,
  update,
} = require("../controllers/machine.controller");

const machine_router = require("express").Router();

machine_router.post("/", create);
machine_router.get("/", getAll);
machine_router.get("/:id", getOne);
machine_router.patch("/:id", update);
machine_router.delete("/:id", remove);

module.exports = machine_router;
