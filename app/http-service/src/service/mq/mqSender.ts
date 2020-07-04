import { connectToMQ } from "../../server/mqConnect.ts";
import { AmqpChannel } from '../../../deps.ts'

class MqSender {
    private channel!: AmqpChannel;
    private queueName: string;

    constructor(){
        this.queueName = "my.queue";
    }

    public async init(): Promise<void> {
        this.channel = await connectToMQ();
        await this.channel.declareQueue({ queue: this.queueName });
    }

    public async publish(): Promise<void> {
        await this.channel.publish(
            { routingKey: this.queueName },
            { contentType: "application/json" },
            new TextEncoder().encode(JSON.stringify({ foo: "bar" })),
        );
    }
}

export const MQSender = new MqSender();