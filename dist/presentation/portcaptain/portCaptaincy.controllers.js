"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortCaptaincyController = void 0;
const get_all_captaincy_usecase_1 = require("../../domain/use-cases/portcaptain/get-all-captaincy.usecase");
const domain_1 = require("../../domain");
const logger_1 = __importDefault(require("../../config/logger"));
const get_captaincy_by_name_usecase_1 = require("../../domain/use-cases/portcaptain/get-captaincy-by-name.usecase");
const get_captaincy_dto_1 = require("../../domain/dtos/captain/get-captaincy.dto");
class PortCaptaincyController {
    constructor(portCaptainsRepository) {
        this.portCaptainsRepository = portCaptainsRepository;
        this.handleError = (error, res) => {
            if (error instanceof domain_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            logger_1.default.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        };
        this.getAllPortCaptains = (req, res) => {
            new get_all_captaincy_usecase_1.GetAllPortCaptaincy(this.portCaptainsRepository)
                .execute()
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        };
        this.getPortCaptainsByName = (req, res) => {
            const [error, portCaptaincyDto] = get_captaincy_dto_1.GetPortCaptaincyDto.create(req.params);
            if (error)
                return res.status(400).json({ error });
            new get_captaincy_by_name_usecase_1.GetPortCaptaincyByName(this.portCaptainsRepository)
                .execute(portCaptaincyDto)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        };
    }
}
exports.PortCaptaincyController = PortCaptaincyController;
