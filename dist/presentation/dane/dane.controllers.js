"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaneController = void 0;
const domain_1 = require("../../domain");
const logger_1 = __importDefault(require("../../config/logger"));
const redis_database_1 = require("../../data/redis/redis-database");
class DaneController {
    constructor(daneRepository) {
        this.daneRepository = daneRepository;
        this.handleError = (error, res) => {
            if (error instanceof domain_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            logger_1.default.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        };
        this.setDataCache = (nameSet, millisec, json) => {
            const client = redis_database_1.RedisInstance.getInstance();
            if (!client.alreadyOpened()) {
                client.connect();
            }
            client.setValue(nameSet, millisec, json)
                .catch(error => console.log(`Error messaje: ${error}`));
        };
        this.getDaneByFlood = (req, res) => {
            const { floodid } = req.params;
            new domain_1.GetDaneByFlood(this.daneRepository)
                .execute(floodid)
                .then((data) => {
                this.setDataCache(req.originalUrl, 86400, JSON.stringify(data));
                res.json(data);
            }).catch(error => this.handleError(error, res));
        };
        this.saveDane = (req, res) => {
            var _a;
            let daneForm = req.body;
            const daneGeometry = (_a = req.files) === null || _a === void 0 ? void 0 : _a.geometry;
            if (daneGeometry) {
                daneForm.geometry = JSON.stringify(daneGeometry.data.toString('ascii'));
            }
            new domain_1.SaveDane(this.daneRepository)
                .execute(daneForm)
                .then((data) => {
                res.json(data);
            }).catch(error => this.handleError(error, res));
        };
    }
}
exports.DaneController = DaneController;
