"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("./auth/auth.routes");
const portCaptaincy_routes_1 = require("./portcaptain/portCaptaincy.routes");
const scenary_routes_1 = require("./scenary/scenary.routes");
const flood_routes_1 = require("./flood/flood.routes");
const dane_routes_1 = require("./dane/dane.routes");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        // Definir todas mis rutas principales
        router.use('/api/auth', auth_routes_1.AuthRoutes.routes);
        router.use('/api/v1/', [
            portCaptaincy_routes_1.PortCaptaincyRoutes.routes,
            scenary_routes_1.ScenaryRoutes.routes,
            flood_routes_1.FloodRoutes.routes,
            dane_routes_1.DaneRoutes.routes
        ]);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
