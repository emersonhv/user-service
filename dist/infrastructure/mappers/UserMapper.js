"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const domain_1 = require("../../domain");
class UserMapper {
    static userEntityFromObject(object) {
        const { id, _id, name, email, password, role, status } = object;
        if (!id) {
            throw domain_1.CustomError.badRequest('Missing id');
        }
        if (!name) {
            throw domain_1.CustomError.badRequest('Missing name');
        }
        if (!email) {
            throw domain_1.CustomError.badRequest('Missing email');
        }
        return new domain_1.User(_id || id, name, email, password);
    }
}
exports.UserMapper = UserMapper;
