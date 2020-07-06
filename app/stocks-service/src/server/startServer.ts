import { logger } from '../../deps.ts';

export async function startServer(): Promise<void> {
    try {
        logger.info(`Server running.`);
    } catch (err) {
        logger.error('Failed to start server: ', err);
    }
    return;
}