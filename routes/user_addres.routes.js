const {
  create,
  getAll,
  getOne,
  remove,
  update,
  findUserAddress,
} = require("../controllers/user_address.controller");
const authGuard = require("../middleware/guard/auth.guard");
const roleGuard = require("../middleware/guard/role.guard");

const user_address = require("express").Router();

user_address.post("/", create);
user_address.get("/", authGuard, roleGuard(["admin", "user"]), getAll);
user_address.get("/user_address", findUserAddress);
user_address.get("/:id", getOne);
user_address.patch("/:id", update);
user_address.delete("/:id", remove);

module.exports = user_address;
