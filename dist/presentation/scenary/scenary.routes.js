"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenaryRoutes = void 0;
const express_1 = require("express");
const scenary_datasource_impl_1 = require("../../infrastructure/datasources/scenary.datasource.impl");
const scenary_repository_impl_1 = require("../../infrastructure/repositories/scenary.repository.impl");
const scenary_controllers_1 = require("./scenary.controllers");
class ScenaryRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new scenary_datasource_impl_1.ScenaryDatasourceImpl();
        const scenaryRepository = new scenary_repository_impl_1.ScenaryRepositoryImp(datasource);
        const controller = new scenary_controllers_1.ScenaryController(scenaryRepository);
        router.get('/scenary', controller.getAllScenary); //AuthMiddleware.validatwJWT
        router.post('/scenary', controller.saveScenary);
        return router;
    }
}
exports.ScenaryRoutes = ScenaryRoutes;
