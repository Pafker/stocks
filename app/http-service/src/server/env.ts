import { config } from '../../deps.ts';

type EnvironmentVariables = { 
    MQ_URL: string;
    STOCKS_URL: string;
};

export const ENV = config({ safe: true }) as EnvironmentVariables;