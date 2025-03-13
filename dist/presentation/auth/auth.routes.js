"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const UserControllers_1 = require("./UserControllers");
const infrastructure_1 = require("../../infrastructure");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new infrastructure_1.UserDatasourceImpl();
        const userRepository = new infrastructure_1.UserRepositoryImpl(datasource);
        const controller = new UserControllers_1.UserController(userRepository);
        // Definir todas mis rutas principales
        router.post('/login', controller.loginUser);
        router.post('/register', auth_middleware_1.AuthMiddleware.validatwJWT, controller.registerUser);
        router.get('/islogin/:token', controller.isLoginUser);
        router.get('/', auth_middleware_1.AuthMiddleware.validatwJWT, controller.getUser);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
