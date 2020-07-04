import { connect, logger, AmqpChannel } from "../../deps.ts";
import { ENV } from "./env.ts";

export async function connectToMQ(): Promise<AmqpChannel> {
    logger.info(`Connecting to MQ`);

    const connection = await connect(ENV.MQ_URL);
    const channel = await connection.openChannel();

    return channel;
}