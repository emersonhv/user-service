"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloodRepositoryImp = void 0;
class FloodRepositoryImp {
    constructor(floodDatasource) {
        this.floodDatasource = floodDatasource;
    }
    saveFlood(flood) {
        return this.floodDatasource.saveFlood(flood);
    }
    getAllFloods() {
        return this.floodDatasource.getAllFloods();
    }
    getFloodsByCaptainAndScenary(portCaptainId, scenaryId) {
        return this.floodDatasource.getFloodsByCaptainAndScenary(portCaptainId, scenaryId);
    }
    getFloodByCaptainAndScenary(portCaptainId, scenaryId) {
        return this.floodDatasource.getFloodByCaptainAndScenary(portCaptainId, scenaryId);
    }
}
exports.FloodRepositoryImp = FloodRepositoryImp;
