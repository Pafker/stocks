import { Router } from '../../deps.ts';
import { Routes } from './routeConstants.ts';
import { StocksController } from '../api/Stocks/Stocks.controller.ts';
import { ViewRenderer } from '../views/mainView.ts';

const stocksController = new StocksController();
const viewRenderer = new ViewRenderer();

export const router = new Router();

router.get(Routes.Stocks, stocksController.getStocks);
router.post(Routes.Stocks, stocksController.addStock);
router.get(Routes.Static, viewRenderer.getView);