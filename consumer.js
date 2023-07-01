const amqp = require("amqplib");

const exhangeName = "exhangeName";
const logtypes = process.argv.slice(2);

async function getMsg() {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    channel.assertExchange(exhangeName, "topic");
    const assertedQueue = await channel.assertQueue("", { exclusive: true });
    for (const pattern of logtypes) {
        channel.bindQueue(assertedQueue.queue, exhangeName, pattern);
    }
    channel.consume(assertedQueue.queue, (msg) => {
        console.log(msg);
        channel.ack(msg);
    });
}

getMsg();
