import { RouterContext, Status } from '../../../deps.ts';
import { MQSender, MQPayload } from '../../service/mq/mqSender.ts';
import { StocksMQEventType, AddStockLocals } from './Stocks.interface.ts';

interface StockMQPayload extends MQPayload {
    stockName: string;
}

export class StocksController {
    public getStocks (context: RouterContext): void {
        context.response.body = {
            success: true,
            data: [1,2,3,4,5]
        }
    }

    public async addStock (context: RouterContext): Promise<void> {
        const body = await context.request.body();
        const parsedBody: AddStockLocals = JSON.parse(body.value);

        const payload: StockMQPayload = { stockName: parsedBody.name };
        await MQSender.publish({ type: StocksMQEventType.STOCK_ADDED, payload });
        
        context.response.status = Status.Created;
        context.response.body = payload;
    }
}