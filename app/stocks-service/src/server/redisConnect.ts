import { logger, RedisConnect, Redis } from "../../deps.ts";
import { ENV } from "./env.ts";

class RedisConnector {
    private static redisClient: Promise<Redis>;

    constructor() {
        logger.info(`Connecting to Redis`);
        const redis = RedisConnect({
            hostname: ENV.REDIS_URL,
        });
        RedisConnector.redisClient = redis;
    }

    public async getClient(): Promise<Redis> {
        const redis = await RedisConnector.redisClient;
        return redis;
    }
}

export const RDSConnector = new RedisConnector();