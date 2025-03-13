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
exports.PortCaptaincyDatasourceImpl = void 0;
const postgres_1 = require("../../data/postgres");
const domain_1 = require("../../domain");
const portCaptaincy_mappers_1 = require("../mappers/portCaptaincy.mappers");
const logger_1 = __importDefault(require("../../config/logger"));
class PortCaptaincyDatasourceImpl {
    constructor() { }
    getAllCaptaincy() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const captainsList = yield postgres_1.PortCaptaincyModel.findAll({
                    attributes: [
                        'id',
                        'name',
                        'shortName',
                        'description',
                        'metadata',
                        'color',
                        'geometry'
                    ]
                });
                return portCaptaincy_mappers_1.PortCaptaincyMapper.listPortCaptainsEntityFromListObject(captainsList);
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
    getCaptaincyByName(portCaptaincyDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const captaincy = yield postgres_1.PortCaptaincyModel.findOne({
                    where: { shortName: portCaptaincyDto.shortName },
                    attributes: [
                        'id',
                        'name',
                        'shortName',
                        'description',
                        'metadata',
                        'color',
                        'geometry'
                    ]
                });
                if (!captaincy)
                    throw domain_1.CustomError.badRequest('Port Captaincy not found');
                return portCaptaincy_mappers_1.PortCaptaincyMapper.portCaptainsEntityFromObject(captaincy);
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
exports.PortCaptaincyDatasourceImpl = PortCaptaincyDatasourceImpl;
