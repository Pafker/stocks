import { RouterContext, Status } from '../../../deps.ts';
import { MQSender, MQPayload } from '../../service/mq/mqSender.ts';
import { StocksMQEventType, AddStockLocals } from './Stocks.interface.ts';
import { ENV } from '../../server/env.ts';

interface StockMQPayload extends MQPayload {
    stockName: string;
}

export class StocksController {
    public async getStocks (context: RouterContext): Promise<void> {
        const res = await fetch(ENV.STOCKS_URL);
        const stocksResponse =  await res.json();

        context.response.status = Status.OK;
        context.response.body = stocksResponse;
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