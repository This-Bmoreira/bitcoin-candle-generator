import { connect, type Channel } from 'amqplib'

export const createMessageChanel = async (): Promise<Channel> => {
  try {
    const connection = await connect(process.env.AMQP_SERVER ?? 'amqp://dev:root@localhost:5672')
    const channel = await connection.createChannel()
    await channel.assertQueue(process.env.QUEUE_NAME ?? 'candles')
    return channel
  } catch (err) {
    console.log('Error While trying to connect to RabbitMQ')
    console.log(err)
    throw err
  }
}
