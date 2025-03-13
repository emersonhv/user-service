"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortCaptaincyRepositoryImp = void 0;
class PortCaptaincyRepositoryImp {
    constructor(portCaptainsDatasource) {
        this.portCaptainsDatasource = portCaptainsDatasource;
    }
    getAllCaptaincy() {
        return this.portCaptainsDatasource.getAllCaptaincy();
    }
    getCaptaincyByName(portCaptaincyDto) {
        return this.portCaptainsDatasource.getCaptaincyByName(portCaptaincyDto);
    }
}
exports.PortCaptaincyRepositoryImp = PortCaptaincyRepositoryImp;
