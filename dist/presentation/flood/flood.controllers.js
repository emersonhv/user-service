"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloodController = void 0;
const domain_1 = require("../../domain");
const logger_1 = __importDefault(require("../../config/logger"));
const get_floods_by_captain_scenary_usecase_1 = require("../../domain/use-cases/flood/get-floods-by-captain-scenary.usecase");
const get_flood_by_captain_scenary_usecase_1 = require("../../domain/use-cases/flood/get-flood-by-captain-scenary.usecase");
const redis_database_1 = require("../../data/redis/redis-database");
const save_flood_usecase_1 = require("../../domain/use-cases/flood/save-flood.usecase");
const get_all_floods_usecase_1 = require("../../domain/use-cases/flood/get-all-floods.usecase");
class FloodController {
    constructor(floodRepository) {
        this.floodRepository = floodRepository;
        this.handleError = (error, res) => {
            if (error instanceof domain_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            logger_1.default.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        };
        this.getFloods = (req, res) => {
            new get_all_floods_usecase_1.GetAllFloods(this.floodRepository)
                .execute()
                .then((data) => {
                this.setDataCache(req.originalUrl, 86400, JSON.stringify(data));
                res.json(data);
            })
                .catch(error => this.handleError(error, res));
        };
        this.getFloodsByCaptainAndScenary = (req, res) => {
            const { captainid, scenaryid } = req.params;
            new get_floods_by_captain_scenary_usecase_1.GetFloodsByCaptainAndScenary(this.floodRepository)
                .execute(captainid, scenaryid)
                .then((data) => {
                this.setDataCache(req.originalUrl, 86400, JSON.stringify(data));
                res.json(data);
            })
                .catch(error => this.handleError(error, res));
        };
        this.getFloodByCaptainAndScenary = (req, res) => {
            const { captainid, scenaryid } = req.params;
            new get_flood_by_captain_scenary_usecase_1.GetFloodByCaptainAndScenary(this.floodRepository)
                .execute(captainid, scenaryid)
                .then((data) => {
                this.setDataCache(req.originalUrl, 86400, JSON.stringify(data));
                res.json(data);
            }).catch(error => this.handleError(error, res));
        };
        this.setDataCache = (nameSet, millisec, json) => {
            const client = redis_database_1.RedisInstance.getInstance();
            if (!client.alreadyOpened()) {
                client.connect();
            }
            client.setValue(nameSet, millisec, json)
                .catch(error => console.log(`Error messaje: ${error}`));
        };
        this.saveFlood = (req, res) => {
            var _a;
            let floodForm = req.body;
            const floodGeometry = (_a = req.files) === null || _a === void 0 ? void 0 : _a.geometry;
            if (floodGeometry) {
                floodForm.geometry = JSON.stringify(floodGeometry.data.toString('ascii'));
            }
            new save_flood_usecase_1.SaveFlood(this.floodRepository)
                .execute(floodForm)
                .then((data) => {
                res.json(data);
            }).catch(error => this.handleError(error, res));
        };
    }
}
exports.FloodController = FloodController;
