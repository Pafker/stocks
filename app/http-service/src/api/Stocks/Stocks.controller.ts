import { RouterContext } from '../../../deps.ts';

export class StocksController {
    public getStocks (context: RouterContext): void {
        context.response.body = {
            success: true,
            data: [1,2,3,4,5]
        }
    }

    public async addStock (context: RouterContext): Promise<void> {
        const body = await context.request.body();
        const formData = await body.value.read();
        context.response.body = {
            success: true,
            data: [1,2,3,4, 5],
            gosciu: formData.fields.name,
        }
    }
}