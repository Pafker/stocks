import { logger } from '../../deps.ts';
import { MQConsumer } from '../service/mq/mqConsumer.ts';

export async function startServer(): Promise<void> {
    try {
        await MQConsumer.init();
        logger.info(`Server running.`);
    } catch (err) {
        logger.error('Failed to start server: ', err);
    }
    return;
}