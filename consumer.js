const { consumer } = require("./kafka");

const runConsumer = async () => {
  try {
    await consumer.connect();
    console.log("Consumer connected to Kafka");

    await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const parsedMessage = JSON.parse(message.value.toString());
        console.log(`Received message: ${parsedMessage.key} - ${parsedMessage.value}`);
      },
    });
  } catch (error) {
    console.error("Error consuming message:", error);
  }
}

runConsumer().catch(console.error);