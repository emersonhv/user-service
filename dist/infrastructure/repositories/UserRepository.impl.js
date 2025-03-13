"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
class UserRepositoryImpl {
    constructor(userDatasource) {
        this.userDatasource = userDatasource;
    }
    isLogin(tokenUser) {
        return this.userDatasource.isLogin(tokenUser);
    }
    login(loginUserDto) {
        return this.userDatasource.login(loginUserDto);
    }
    register(registerUserDto) {
        return this.userDatasource.register(registerUserDto);
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
