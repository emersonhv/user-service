"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaneRoutes = void 0;
const express_1 = require("express");
const dane_datasource_impl_1 = require("../../infrastructure/datasources/dane.datasource.impl");
const dane_repository_impl_1 = require("../../infrastructure/repositories/dane.repository.impl");
const dane_controllers_1 = require("./dane.controllers");
const cache_middleware_1 = require("../middlewares/cache.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
class DaneRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const daneDatasource = new dane_datasource_impl_1.DaneDataourceImpl();
        const daneRepository = new dane_repository_impl_1.DaneRepositoryImp(daneDatasource);
        const daneController = new dane_controllers_1.DaneController(daneRepository);
        router.get('/dane/:floodid', cache_middleware_1.CacheMiddleware.getCache, daneController.getDaneByFlood);
        router.post('/dane', auth_middleware_1.AuthMiddleware.validatwJWT, daneController.saveDane);
        return router;
    }
}
exports.DaneRoutes = DaneRoutes;
