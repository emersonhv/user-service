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
exports.UserDatasourceImpl = void 0;
const config_1 = require("../../config");
const config_2 = require("../../config");
const logger_1 = __importDefault(require("../../config/logger"));
const PrismaClient_1 = __importDefault(require("@/infrastructure/database/PrismaClient"));
const domain_1 = require("../../domain");
const UserMapper_1 = require("../mappers/UserMapper");
class UserDatasourceImpl {
    constructor(hashPassword = config_2.BcryptAdapter.hash, comparePassword = config_2.BcryptAdapter.compare, validToken = config_1.JwtAdapter.validateToken) {
        this.hashPassword = hashPassword;
        this.comparePassword = comparePassword;
        this.validToken = validToken;
    }
    isLogin(tokenUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = tokenUser;
            try {
                const tokenIsValid = yield this.validToken(token);
                if (!tokenIsValid)
                    return false;
                return true;
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
    login(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginUserDto;
            try {
                const user = yield PrismaClient_1.default.user.findFirst({ where: { email: email } });
                if (!user)
                    throw domain_1.CustomError.badRequest('Incorrect credentials');
                //if (!user.status) throw CustomError.badRequest('User is not verifided');
                const isMatching = this.comparePassword(password, user.password);
                if (!isMatching)
                    throw domain_1.CustomError.badRequest('Incorrect credentials');
                return UserMapper_1.UserMapper.userEntityFromObject(user);
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
    register(registerUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = registerUserDto;
            try {
                const emailExist = yield PrismaClient_1.default.user.findFirst({ where: { email: email } });
                if (emailExist)
                    throw domain_1.CustomError.badRequest(`User whit email '${email}' already exists`);
                const user = yield PrismaClient_1.default.user.create({
                    data: {
                        name: name,
                        email: email,
                        password: this.hashPassword(password),
                    }
                });
                return UserMapper_1.UserMapper.userEntityFromObject(user);
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
exports.UserDatasourceImpl = UserDatasourceImpl;
