const {
  create,
  getAll,
  getOne,
  remove,
  update,
} = require("../controllers/review.controller");

const reiws_router = require("express").Router();

reiws_router.post("/", create);
reiws_router.get("/", getAll);
reiws_router.get("/:id", getOne);
reiws_router.patch("/:id", update);
reiws_router.delete("/:id", remove);

module.exports = reiws_router;
