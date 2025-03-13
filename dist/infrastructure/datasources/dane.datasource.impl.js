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
exports.DaneDataourceImpl = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
const dane_mappers_1 = require("../mappers/dane.mappers");
class DaneDataourceImpl {
    constructor() { }
    getDane(floodId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daneFound = yield postgres_1.DaneLayerModel.findOne({
                    where: { flood_id: floodId }
                });
                if (!daneFound)
                    throw domain_1.CustomError.badRequest('Dane not found');
                return dane_mappers_1.DaneMapper.daneEntityFromObject(daneFound);
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
    saveDane(dane) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const daneSaved = yield postgres_1.DaneLayerModel.create({
                    name: dane.name,
                    desciption: dane.description,
                    metadata: dane.metadata,
                    color: dane.color,
                    geometry: dane.geometry,
                    flood_id: dane.floodId
                });
                return dane_mappers_1.DaneMapper.daneEntityFromObject(daneSaved);
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
exports.DaneDataourceImpl = DaneDataourceImpl;
