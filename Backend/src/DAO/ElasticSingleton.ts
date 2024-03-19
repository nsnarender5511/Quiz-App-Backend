import { Client } from 'es8';

export class ElasticSingleton {
    private static instance: Client | null = null;

    public static getClient(): Client {
        if (!this.instance) {
            this.instance = new Client({
                node: 'http://40.76.255.234:9200',
                auth: {
                    username: 'narenderUser',
                    password: 'password123'
                }}
            )
        }
        return this.instance;

    }   
}
