const amqp = require('amqplib');

const exhangeName = "exhangeName"
const [logtype  , message] = process.argv.slice(2)

async function sendMsg(){
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()
    channel.assertExchange(exhangeName , "topic")
    channel.publish(exhangeName , logtype , Buffer.from(message))
    setTimeout(()=>{
        connection.close()
        process.exit(0)
    } , 1000)
}

sendMsg()