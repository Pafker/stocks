import { config } from '../../deps.ts';

type EnvironmentVariables = { 
    MQ_URL: string;
    DB_URL: string;
};

export const ENV = config({ safe: true }) as EnvironmentVariables;