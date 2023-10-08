const express = require("express");

const UserRepo = require("./repository/userRepo");
const UserService = require("./service/userService");
const UserHandlers = require("./handlers/userHandler");
const { kafkaBootStrap } = require("./bootstrap/kafka");
const KafkaBroker = require("./broker/kafka");
const { signin, user } = require("./middleware/auth");
const router = express.Router();

//repo
const userRepo = new UserRepo();

//broker
const broker = new KafkaBroker(kafkaBootStrap, userRepo);
broker.consume("borrow");

//service
const userService = new UserService(userRepo);

//handlers
const userHandler = new UserHandlers(userService);

router.post("/login", signin, userHandler.loginHandler);

router.get("/user/:id", userHandler.getOneUserHandler);

router.get("/user", userHandler.getUserHandler);

router.post("/user", userHandler.createUserHandler);

router.put("/user/update", user, userHandler.updateUserHandler);

router.delete("/user/delete", user, userHandler.deleteHandler);

module.exports = router;
