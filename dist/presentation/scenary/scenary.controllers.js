"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenaryController = void 0;
const domain_1 = require("../../domain");
const logger_1 = __importDefault(require("../../config/logger"));
const get_all_scenary_usecase_1 = require("../../domain/use-cases/scenary/get-all-scenary.usecase");
const save_scenary_usecase_1 = require("../../domain/use-cases/scenary/save-scenary.usecase");
class ScenaryController {
    constructor(scenaryRepository) {
        this.scenaryRepository = scenaryRepository;
        this.handleError = (error, res) => {
            if (error instanceof domain_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            logger_1.default.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        };
        this.getAllScenary = (req, res) => {
            new get_all_scenary_usecase_1.GetAllScenary(this.scenaryRepository)
                .execute()
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        };
        this.saveScenary = (req, res) => {
            const scenaryForm = req.body;
            new save_scenary_usecase_1.SaveScenary(this.scenaryRepository)
                .execute(scenaryForm)
                .then((data) => {
                res.json(data);
            }).catch(error => this.handleError(error, res));
        };
    }
}
exports.ScenaryController = ScenaryController;
