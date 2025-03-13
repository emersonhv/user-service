"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloodRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const cache_middleware_1 = require("../middlewares/cache.middleware");
const flood_datasource_impl_1 = require("../../infrastructure/datasources/flood.datasource.impl");
const flood_repository_impl_1 = require("../../infrastructure/repositories/flood.repository.impl");
const flood_controllers_1 = require("./flood.controllers");
class FloodRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const floofDatasource = new flood_datasource_impl_1.FloodDatasourceImpl();
        const floodRepository = new flood_repository_impl_1.FloodRepositoryImp(floofDatasource);
        const floodController = new flood_controllers_1.FloodController(floodRepository);
        router.get('/floods', auth_middleware_1.AuthMiddleware.validatwJWT, cache_middleware_1.CacheMiddleware.getCache, floodController.getFloods);
        router.get('/flood/:captainid/:scenaryid', cache_middleware_1.CacheMiddleware.getCache, floodController.getFloodByCaptainAndScenary);
        router.get('/floods/:captainid/:scenaryid', cache_middleware_1.CacheMiddleware.getCache, floodController.getFloodsByCaptainAndScenary); //, AuthMiddleware.validatwJWT
        router.post('/flood', auth_middleware_1.AuthMiddleware.validatwJWT, floodController.saveFlood);
        return router;
    }
}
exports.FloodRoutes = FloodRoutes;
