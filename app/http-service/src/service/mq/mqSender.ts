import { connectToMQ } from "../../server/mqConnect.ts";
import { AmqpChannel } from '../../../deps.ts'
import { StocksMQEventType } from "../../api/Stocks/Stocks.interface.ts";

interface MQMessage<T> {
    type: StocksMQEventType;
    payload: T;
}

export type MQPayload = {};

class MqSender {
    private channel!: AmqpChannel;
    private queueName: string;

    constructor(){
        this.queueName = "stocks.queue";
    }

    public async init(): Promise<void> {
        this.channel = await connectToMQ();
        await this.channel.declareQueue({ queue: this.queueName });
    }

    public async publish(msg: MQMessage<MQPayload>): Promise<void> {
        await this.channel.publish(
            { routingKey: this.queueName },
            { contentType: "application/json" },
            new TextEncoder().encode(JSON.stringify(msg)),
        );
    }
}

export const MQSender = new MqSender();