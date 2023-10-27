const amqp = require("amqplib/channel_api");
const { v4: uuidv4 } = require("uuid");

async function callRPC(message, res) {
  const connection = await amqp.connect("amqp://localhost");

  const channel = await connection.createChannel();

  const q = await channel.assertQueue("", { exclusive: true });

  var correlationId = uuidv4();

  //   console.log("Sending message to queue...");
  channel.sendToQueue("rpc_queue", Buffer.from(String(message)), {
    correlationId: correlationId,
    replyTo: q.queue,
  });

  const getResult = () => {
    return new Promise((resolve, reject) => {
      try {
        channel.consume(
          q.queue,
          (msg) => {
            if (msg.properties.correlationId == correlationId) {
              const result = msg.content.toString();
              console.log(`CorrelationId: ${correlationId}; Result: ${result}`);

              connection.close();
              return resolve(result);
            }
          },
          {
            noAck: true,
          }
        );
      } catch (error) {
        return reject(error);
      }
    });
  };

  const result = await getResult();
  //   console.log("result", result);
  return result;
}

module.exports = { callRPC };

// callRPC(5);
