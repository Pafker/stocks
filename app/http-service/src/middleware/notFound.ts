import { Status, Context, logger } from '../../deps.ts'
import { HttpResponse } from '../util/constants.ts';

export function notFound(context: Context) {
    logger.info(`HTTP ERROR at url: ${context.request.url}: ${HttpResponse.NotFound}`);
    context.response.status = Status.NotFound;
    context.response.body = { error: HttpResponse.NotFound };
  }