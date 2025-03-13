"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaneMapper = void 0;
const domain_1 = require("../../domain");
const daneLayer_entity_1 = require("../../domain/entities/daneLayer.entity");
class DaneMapper {
    static daneEntityFromObject(object) {
        const { id, _id, name, description, color, metadata, geometry, flood_id } = object;
        if (!id) {
            throw domain_1.CustomError.badRequest('Missing id');
        }
        if (!name) {
            throw domain_1.CustomError.badRequest('Missing name');
        }
        if (!description) {
            throw domain_1.CustomError.badRequest('Missing description');
        }
        if (!color) {
            throw domain_1.CustomError.badRequest('Missing color');
        }
        if (!metadata) {
            throw domain_1.CustomError.badRequest('Missing metadata');
        }
        if (!geometry) {
            throw domain_1.CustomError.badRequest('Missing geometry');
        }
        if (!flood_id) {
            throw domain_1.CustomError.badRequest('Missing port captain id');
        }
        return new daneLayer_entity_1.DaneLayerEntity(_id || id, name, description, color, metadata, flood_id, geometry);
    }
}
exports.DaneMapper = DaneMapper;
