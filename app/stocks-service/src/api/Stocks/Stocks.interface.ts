import { MQPayload } from "../../service/mq/mqConsumer.ts";

export enum StocksMQEventType {
    STOCK_ADDED = 'STOCK_ADDED',
    STOCK_REMOVED = 'STOCK_REMOVED',
}

export interface StockPayload extends MQPayload {
    stockName: string;
}