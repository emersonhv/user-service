"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaneRepositoryImp = void 0;
class DaneRepositoryImp {
    constructor(daneDatasource) {
        this.daneDatasource = daneDatasource;
    }
    saveDate(dane) {
        return this.daneDatasource.saveDane(dane);
    }
    getDaneByFlood(floodId) {
        return this.daneDatasource.getDane(floodId);
    }
}
exports.DaneRepositoryImp = DaneRepositoryImp;
