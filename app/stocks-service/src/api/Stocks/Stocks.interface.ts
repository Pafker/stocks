import { MQPayload } from "../../service/mq/mqConsumer.ts";

export enum StocksMQEventType {
    STOCK_ADDED = 'STOCK_ADDED',
}

export interface StockPayload extends MQPayload {
    stockName: string;
}