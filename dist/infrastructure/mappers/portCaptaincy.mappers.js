"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortCaptaincyMapper = void 0;
const domain_1 = require("../../domain");
const portCaptaincy_entity_1 = require("../../domain/entities/portCaptaincy.entity");
class PortCaptaincyMapper {
    static listPortCaptainsEntityFromListObject(object) {
        this.portCaptainsList.splice(0, this.portCaptainsList.length);
        object.forEach(captain => {
            this.portCaptainsList.push(this.portCaptainsEntityFromObject(captain));
        });
        return this.portCaptainsList;
    }
    static portCaptainsEntityFromObject(object) {
        const { id, _id, name, shortName, description, metadata, color, geometry } = object;
        if (!id) {
            throw domain_1.CustomError.badRequest('Missing id');
        }
        if (!name) {
            throw domain_1.CustomError.badRequest('Missing name');
        }
        if (!shortName) {
            throw domain_1.CustomError.badRequest('Missing short name');
        }
        if (!description) {
            throw domain_1.CustomError.badRequest('Missing description');
        }
        /**
         * TODO: agregar informacion a metadata
        */
        if (!metadata) {
            throw domain_1.CustomError.badRequest('Missing metadata');
        }
        /**
         * TODO: agregar informacion a geometry
        */
        if (!geometry) {
            throw domain_1.CustomError.badRequest('Missing geometry');
        }
        return new portCaptaincy_entity_1.PortCaptaincyEntity(_id || id, name, shortName, description, metadata, color, geometry);
    }
}
exports.PortCaptaincyMapper = PortCaptaincyMapper;
PortCaptaincyMapper.portCaptainsList = [];
