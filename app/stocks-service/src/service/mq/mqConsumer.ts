import { connectToMQ } from "../../server/mqConnect.ts";
import { AmqpChannel, BasicDeliver, BasicProperties } from '../../../deps.ts'

interface MQMessage<T> {
    type: string;
    payload: T;
}

export type MQPayload = {};

class MqConsumer {
    private channel!: AmqpChannel;
    private queueName: string;

    constructor(){
        this.queueName = "stocks.queue";
    }

    public async init(): Promise<void> {
        this.channel = await connectToMQ();
        await this.channel.declareQueue({ queue: this.queueName });
        await this.channel.consume(
            { queue: this.queueName },
            async (args: BasicDeliver, _props: BasicProperties, data: Uint8Array) => {
                await this.handleMessage(JSON.parse(new TextDecoder().decode(data)));
                await this.channel.ack({ deliveryTag: args.deliveryTag });
            },
        );
    }

    private async handleMessage(data: MQMessage<MQPayload>): Promise<void> {
        console.log(data);
    }
}

export const MQConsumer = new MqConsumer();