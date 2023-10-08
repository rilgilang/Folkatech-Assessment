const express = require("express");

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
const userHandler = new UserHandlers(userService);

router.post("/login", signin, userHandler.loginHandler);

router.get("/user", userHandler.getUserHandler);

router.post("/user", userHandler.createUserHandler);

router.put("/user/update", user, userHandler.updateUserHandler);

router.delete("/user/delete", user, userHandler.deleteHandler);

module.exports = router;
