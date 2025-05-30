const {
  create,
  getAll,
  getOne,
  remove,
  update,
} = require("../controllers/user_role.controller");

const user_role_router = require("express").Router();

user_role_router.post("/", create);
user_role_router.get("/", getAll);
user_role_router.get("/:id", getOne);
user_role_router.patch("/:id", update);
user_role_router.delete("/", remove);

module.exports = user_role_router;
