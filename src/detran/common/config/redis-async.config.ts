import * as Redis from 'async-redis';

const RedisHost: string = process.env.REDIS_HOST || '127.0.0.1';
const RedisPort: number = parseInt(process.env.REDIS_PORT, 10) || 6379;

export class RedisAsync {
    client: any;

    constructor() {
        this.client = Redis.createClient({
            host: RedisHost,
            port: RedisPort,
        });

    }
}