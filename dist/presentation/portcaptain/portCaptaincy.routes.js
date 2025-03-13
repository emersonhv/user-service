"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortCaptaincyRoutes = void 0;
const express_1 = require("express");
const portCaptaincy_controllers_1 = require("./portCaptaincy.controllers");
const portCaptaincy_repository_impl_1 = require("../../infrastructure/repositories/portCaptaincy.repository.impl");
const portCaptaincy_datasource_impl_1 = require("../../infrastructure/datasources/portCaptaincy.datasource.impl");
class PortCaptaincyRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new portCaptaincy_datasource_impl_1.PortCaptaincyDatasourceImpl();
        const portCaptainsRepository = new portCaptaincy_repository_impl_1.PortCaptaincyRepositoryImp(datasource);
        const controller = new portCaptaincy_controllers_1.PortCaptaincyController(portCaptainsRepository);
        router.get('/portcaptaincies', controller.getAllPortCaptains); //AuthMiddleware.validatwJWT, CacheMiddleware.getCache
        router.get('/portcaptaincies/:shortName', controller.getPortCaptainsByName); // AuthMiddleware.validatwJWT, 
        return router;
    }
}
exports.PortCaptaincyRoutes = PortCaptaincyRoutes;
