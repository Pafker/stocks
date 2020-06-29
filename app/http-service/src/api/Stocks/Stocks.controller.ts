export class StocksController {
    public getStocks ({ response }: { response: any }): void {
        response.body = {
            success: true,
            data: [1,2,3,4, 5]
        }
    }
}