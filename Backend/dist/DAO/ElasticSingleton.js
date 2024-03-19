"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticSingleton = void 0;
const es8_1 = require("es8");
class ElasticSingleton {
    static getClient() {
        if (!this.instance) {
            this.instance = new es8_1.Client({
                node: 'http://40.76.255.234:9200',
                auth: {
                    username: 'narenderUser',
                    password: 'password123'
                }
            });
        }
        return this.instance;
    }
}
exports.ElasticSingleton = ElasticSingleton;
ElasticSingleton.instance = null;
//# sourceMappingURL=ElasticSingleton.js.map