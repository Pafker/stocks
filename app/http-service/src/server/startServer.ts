import { Application, logger } from '../../deps.ts';
import { router } from '../route/main.ts';

export async function startServer(PORT = 3000): Promise<void> {
    try {
        const app = new Application();

        app.use(router.routes());

        app.listen({ port: PORT });
        logger.info(`Server running on port ${PORT}`);
    } catch (err) {
        logger.error('Failed to start server: ', err);
    }
    return;
}