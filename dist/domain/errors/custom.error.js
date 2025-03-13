"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
    static badRequest(message) {
        logger_1.default.error(message);
        return new CustomError(400, message);
    }
    static unauthorized(message) {
        logger_1.default.error(message);
        return new CustomError(401, message);
    }
    static forbidden(message) {
        logger_1.default.error(message);
        return new CustomError(403, message);
    }
    static notFound(message) {
        logger_1.default.error(message);
        return new CustomError(404, message);
    }
    static internalServer(message = 'Internal Server Error') {
        logger_1.default.error(message);
        return new CustomError(500, message);
    }
}
exports.CustomError = CustomError;
