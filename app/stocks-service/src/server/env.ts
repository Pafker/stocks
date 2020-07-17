import { config } from '../../deps.ts';

type EnvironmentVariables = { 
    MQ_URL: string;
    REDIS_URL: string;
};

export const ENV = config({ safe: true }) as EnvironmentVariables;