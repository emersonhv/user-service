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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloodDatasourceImpl = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
const flood_mappers_1 = require("../mappers/flood.mappers");
class FloodDatasourceImpl {
    constructor() { }
    saveFlood(flood) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const floodSaved = yield postgres_1.FloodLayerModel.create({
                    name: flood.name,
                    shortName: flood.shortName,
                    description: flood.description,
                    area_km2: flood.area_km2,
                    color: flood.color,
                    geometry: flood.geometry,
                    metadata: flood.metadata,
                    port_captaincy_id: flood.portCaptainId,
                    scenary_id: flood.scenaryId
                });
                return flood_mappers_1.FloodMapper.floodsEntityFromObject(floodSaved);
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                logger_1.default.error(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    getAllFloods() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const floodsList = yield postgres_1.FloodLayerModel.findAll({
                    attributes: [
                        'id',
                        'name',
                        'shortName',
                        'area_km2',
                        'description',
                        'metadata',
                        'color',
                        'port_captaincy_id',
                        'scenary_id',
                        'geometry',
                        'visible'
                    ],
                    order: [['name', 'ASC']]
                });
                return flood_mappers_1.FloodMapper.listFloodsEntityFromListObject(floodsList);
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                logger_1.default.error(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    getFloodsByCaptainAndScenary(portCaptainId, scenaryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const floodsList = yield postgres_1.FloodLayerModel.findAll({
                    where: { port_captaincy_id: portCaptainId, scenary_id: scenaryId },
                    attributes: [
                        'id',
                        'name',
                        'shortName',
                        'area_km2',
                        'description',
                        'metadata',
                        'color',
                        'port_captaincy_id',
                        'scenary_id',
                        'geometry',
                        'visible'
                    ]
                });
                return flood_mappers_1.FloodMapper.listFloodsEntityFromListObject(floodsList);
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                logger_1.default.error(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    getFloodByCaptainAndScenary(portCaptainId, scenaryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const flood = yield postgres_1.FloodLayerModel.findOne({
                    where: { port_captaincy_id: portCaptainId, scenary_id: scenaryId },
                    attributes: [
                        'id',
                        'name',
                        'shortName',
                        'area_km2',
                        'description',
                        'metadata',
                        'color',
                        'port_captaincy_id',
                        'scenary_id',
                        'geometry',
                        'visible'
                    ]
                });
                if (!flood)
                    throw domain_1.CustomError.badRequest('Flood not found');
                return flood_mappers_1.FloodMapper.floodsEntityFromObject(flood);
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                logger_1.default.error(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
}
exports.FloodDatasourceImpl = FloodDatasourceImpl;
