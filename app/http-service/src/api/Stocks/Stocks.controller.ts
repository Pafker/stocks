import { RouterContext } from '../../../deps.ts';
import { MQSender } from '../../service/mq/mqSender.ts';

export class StocksController {
    public getStocks (context: RouterContext): void {
        context.response.body = {
            success: true,
            data: [1,2,3,4,5]
        }
    }

    public async addStock (context: RouterContext): Promise<void> {
        const body = await context.request.body();
        const parsedBody = JSON.parse(body.value);
        await MQSender.publish();
        context.response.body = {
            success: true,
            data: [1,2,3,4],
            gosciu: {name: parsedBody.name, value: 14},
        }
    }
}