const express = require("express");
const passport = require("passport");

const UserRepo = require("./repository/userRepo");
const UserService = require("./service/userService");
const UserHandlers = require("./handlers/userHandler");
const router = express.Router();

//repo
const userRepo = new UserRepo();

//service
const userService = new UserService(userRepo);

//handlers
const userHandler = new UserHandlers(userService);

router.get("/user", userHandler.getUserHandler);

router.post("/user", userHandler.createUserHandler);

router.post("/login", userHandler.loginHandler);

module.exports = router;
