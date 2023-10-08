const express = require("express");

const UserRepo = require("./repository/userRepo");
const UserService = require("./service/userService");
const UserHandlers = require("./handlers/userHandler");
const { kafkaBootStrap } = require("./bootstrap/kafka");
const KafkaBroker = require("./broker/kafka");
const { signin, user } = require("./middleware/auth");
const { checkApiKey } = require("./middleware/apiKey");

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

router.post("/login", checkApiKey, signin, userHandler.loginHandler);

router.get("/user/:id", checkApiKey, userHandler.getOneUserHandler);

router.get("/user", checkApiKey, userHandler.getUserHandler);

router.post("/register", checkApiKey, userHandler.createUserHandler);

router.put("/user/update", checkApiKey, user, userHandler.updateUserHandler);

router.delete("/user/delete", checkApiKey, user, userHandler.deleteHandler);

module.exports = router;
