import { config } from '../../deps.ts';

interface EnvironmentVariables {
    MQ_URL: string;
    DB_URL: string;
}

export const ENV = config({ safe: true }) as EnvironmentVariables;