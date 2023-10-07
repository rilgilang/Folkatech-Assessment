const express = require("express");
const passport = require("passport");
const {
  getUserHandler,
  createUserHandler,
  loginHandler,
} = require("./handlers/userHandler");
const { signin } = require("./middleware/auth");
const UserRepo = require("./repository/userRepo");
const UserService = require("./service/userService");
const router = express.Router();

const userRepo = new UserRepo();
const userService = new UserService(userRepo);

router.get(
  "/user",
  (req, res, next) => {
    req.service = userService;
    next();
  },
  getUserHandler
);

router.post(
  "/user",
  (req, res, next) => {
    req.service = userService;
    next();
  },
  createUserHandler
);

router.post("/login", signin);

module.exports = router;
