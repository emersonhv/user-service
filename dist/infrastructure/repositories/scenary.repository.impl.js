"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenaryRepositoryImp = void 0;
class ScenaryRepositoryImp {
    constructor(scenaryDatasource) {
        this.scenaryDatasource = scenaryDatasource;
    }
    saveScenary(scenary) {
        return this.scenaryDatasource.saveScenary(scenary);
    }
    getAllScenary() {
        return this.scenaryDatasource.getAllScenary();
    }
}
exports.ScenaryRepositoryImp = ScenaryRepositoryImp;
