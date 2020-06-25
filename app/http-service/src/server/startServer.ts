import { Application, Router } from '../../deps.ts';

export async function startServer(PORT = 3000): Promise<void> {
    try {
        const app = new Application();
        const router = new Router();
        const getProd = ({ response }: { response: any }) => {
            response.body = {
                success: true,
                data: [1,2,3]
            }
        };
        router.get('/api', getProd);
        app.use(router.routes());
        app.listen({ port: PORT });
        console.log(`Server running on port ${PORT}`);
    } catch (err) {
        console.log('Error: ', err);
    }
    return;
}