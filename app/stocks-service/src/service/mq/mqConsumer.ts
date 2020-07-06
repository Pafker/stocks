import { connectToMQ } from "../../server/mqConnect.ts";
import { AmqpChannel } from '../../../deps.ts'

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
            async (args, props, data) => {
                console.log(JSON.stringify(args));
                console.log(JSON.stringify(props));
                console.log(new TextDecoder().decode(data));
                await this.channel.ack({ deliveryTag: args.deliveryTag });
            },
        );
    }
}

export const MQConsumer = new MqConsumer();