const {
  create,
  getAll,
  getOne,
  remove,
  update,
  findAllUser,
} = require("../controllers/user.controller");
const authGuard = require("../middleware/guard/auth.guard");
const selfGuard = require("../middleware/guard/self.guard");

const user_router = require("express").Router();

user_router.post("/", create);
user_router.get("/", getAll);
user_router.get("/findAll", findAllUser);
user_router.get("/:id", authGuard, selfGuard, getOne);
user_router.patch("/:id", authGuard, selfGuard, update);
user_router.delete("/:id", authGuard, selfGuard, remove);

module.exports = user_router;
