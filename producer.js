const { producer } = require("./kafka");

const runProducer = async (messages) => {
  console.log("messages", messages, typeof messages);
  try {
    await producer.connect();
    console.log("Producer connected to Kafka");
    for (let i in messages) {
      const message = {
        key: `key-${i}`,
        value: JSON.stringify({ key: `key-${i}`, value: messages[i] }),
      };
      await producer.send({
        topic: "test-topic",
        messages: [message],
      });
      console.log("Message sent:", message);
    }
  } catch (error) {
    console.error("Error sending message:", error);
  } finally {
    await producer.disconnect();
    console.log("Producer disconnected from Kafka");
  }
};

// Parse and run
try {
  const rawArg = process.argv[2];
  const messages = JSON.parse(rawArg); // <- THIS is where undefined would happen if rawArg was missing or invalid
  runProducer(messages).catch(console.error);
} catch (err) {
  console.error("Failed to parse messages:", err);
}
