import { Redis } from "../../../deps.ts";
import { RDSConnector } from "../../server/redisConnect.ts"

export class StocksService {
    private client: Promise<Redis>;

    constructor(){
        this.client = RDSConnector.getClient();
    }
    
    public async addStock(stockName: string): Promise<void> {
        const client = await this.client;
        await client.set(stockName, String(new Date().valueOf()));
    }

    public async deleteStock(stockName: string): Promise<void> {
        const client = await this.client;
        await client.del(stockName);
    }

    public async getStocks(): Promise<string[]> {
        const client = await this.client;
        const stocks = await client.keys("*");
        return stocks;
    }
}