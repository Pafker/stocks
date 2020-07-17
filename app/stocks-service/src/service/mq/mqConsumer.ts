import { connectToMQ } from "../../server/mqConnect.ts";
import { AmqpChannel, BasicDeliver, BasicProperties } from '../../../deps.ts';
import { StocksMQEventType, StockPayload } from "../../api/Stocks/Stocks.interface.ts";
import { StocksService } from "../../api/Stocks/Stocks.service.ts";

interface MQMessage<T> {
    type: StocksMQEventType;
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
        const service = new StocksService();
        switch(data.type) {
            case StocksMQEventType.STOCK_ADDED:
                await service.addStock((data as MQMessage<StockPayload>).payload.stockName);
        }
    }
}

export const MQConsumer = new MqConsumer();