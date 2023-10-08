const { Kafka } = require("kafkajs");

//broker
const kafkaBootStrap = new Kafka({
  clientId: "library-app",
  brokers: ["localhost:9092"],
});

module.exports = { kafkaBootStrap };
