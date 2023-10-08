const express = require("express");
const passport = require("passport");

const UserRepo = require("./repository/userRepo");
const UserService = require("./service/userService");
const UserHandlers = require("./handlers/userHandler");
const { signin, user } = require("./middleware/auth");
const router = express.Router();

//repo
const userRepo = new UserRepo();

//service
const userService = new UserService(userRepo);

//handlers
const userHandler = new UserHandlers(userService, passport);

router.post("/login", signin, userHandler.loginHandler);

router.get("/user", userHandler.getUserHandler);

router.post("/user", userHandler.createUserHandler);

router.put("/user/update", user, userHandler.updateUserHandler);

module.exports = router;
