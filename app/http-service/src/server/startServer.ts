import { Application, logger } from '../../deps.ts';
import { router } from '../route/main.ts';
import { notFound } from '../middleware/notFound.ts';
import { MQSender } from '../service/mq/mqSender.ts';

export async function startServer(PORT = 3000): Promise<void> {
    try {
        await MQSender.init();
        const app = new Application();

        app.use(router.routes());
        app.use(notFound);
        
        app.listen({ port: PORT });
        logger.info(`Server running on port ${PORT}`);
    } catch (err) {
        logger.error('Failed to start server: ', err);
    }
    return;
}