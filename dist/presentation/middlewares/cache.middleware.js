"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheMiddleware = void 0;
const redis_database_1 = require("../../data/redis/redis-database");
class CacheMiddleware {
}
exports.CacheMiddleware = CacheMiddleware;
_a = CacheMiddleware;
CacheMiddleware.getCache = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let client = redis_database_1.RedisInstance.getInstance();
    if (!client.alreadyOpened()) {
        client.connect();
    }
    client.getValue(req.originalUrl)
        .then((data) => {
        if (data) {
            res.status(200).send(JSON.parse(data));
        }
        else {
            next();
        }
    }).catch((error) => {
        console.log(`Error on cache: ${error}`);
    });
});
