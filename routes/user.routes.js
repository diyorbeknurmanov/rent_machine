const {
  create,
  getAll,
  getOne,
  remove,
  update,
  findAllUser,
} = require("../controllers/user.controller");

const user_router = require("express").Router();

user_router.post("/", create);
user_router.get("/", getAll);
user_router.get("/findAll", findAllUser)
user_router.get("/:id", getOne);
user_router.patch("/:id", update);
user_router.delete("/:id", remove);

module.exports = user_router;
