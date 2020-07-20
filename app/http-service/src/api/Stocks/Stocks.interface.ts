export enum StocksMQEventType {
    STOCK_ADDED = 'STOCK_ADDED',
    STOCK_REMOVED = 'STOCK_REMOVED',
}

export interface AddStockLocals {
    name: string;
}