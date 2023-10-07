const express = require("express");
const UsersRepo = require("./repository/userRepo");
const UsersService = require("./service/userService");
const { getUserHandler, createUserHandler } = require("./handlers/userHandler");

const router = express.Router();

const usersRepo = new UsersRepo();

const usersService = new UsersService({ user: usersRepo });

router.get(
  "/user",
  (req, res, next) => {
    req.service = usersService;
    next();
  },
  getUserHandler
);

router.post(
  "/user",
  (req, res, next) => {
    req.service = usersService;
    next();
  },
  createUserHandler
);

module.exports = router;
