import bodyParser from '../../util/body-parser.ts';
import { RouterContext } from '../../../deps.ts';

export class StocksController {
    public getStocks (context: RouterContext): void {
        context.response.body = {
            success: true,
            data: [1,2,3,4, 5]
        }
    }

    public async addStock (context: RouterContext): Promise<void> {
        const body = await bodyParser(context, ['name']);
        context.response.body = {
            success: true,
            data: [1,2,3,4, 5],
            gosciu: body.name
        }
    }
}