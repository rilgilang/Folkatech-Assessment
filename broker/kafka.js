class KafkaBroker {
  constructor(kafka, userRepo) {
    this.kafka = kafka;
    this.userRepo = userRepo;
  }
  publish = async (topic, message) => {
    try {
      const producer = this.kafka.producer();

      await producer.connect();
      await producer.send({
        topic: topic,
        messages: [{ value: message }],
      });

      await producer.disconnect();
    } catch (error) {
      console.log("publisher error --> ", error);
    }
  };

  consume = async (topic) => {
    try {
      const consumer = this.kafka.consumer({ groupId: "library-group" });

      await consumer.connect();
      await consumer.subscribe({ topic: topic, fromBeginning: true });

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          let user = await this.userRepo.findOneById(message.value.toString());

          if (!user) {
            console.log("consumer error user not found");
          } else {
            let updateUser = await this.userRepo.updateUser(
              message.value.toString(),
              { currentBorrow: user.currentBorrow + 1 }
            );
          }
        },
      });
    } catch (error) {
      console.log("consumer error --> ", error);
    }
  };
}

module.exports = KafkaBroker;
