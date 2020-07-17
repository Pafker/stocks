import { logger } from '../../deps.ts';
import { MQConsumer } from '../service/mq/mqConsumer.ts';
import { RDSConnector } from './redisConnect.ts';

export async function startServer(): Promise<void> {
    try {
        await MQConsumer.init();
        await RDSConnector;
        logger.info(`Server running.`);
    } catch (err) {
        logger.error('Failed to start server: ', err);
    }
    return;
}