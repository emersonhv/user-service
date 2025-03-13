"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloodMapper = void 0;
const domain_1 = require("../../domain");
const floodLayer_entity_1 = require("../../domain/entities/floodLayer.entity");
class FloodMapper {
    static listFloodsEntityFromListObject(object) {
        //this.floodsList.splice(0, this.floodsList.length);
        object.forEach(flood => {
            this.floodsList.push(this.floodsEntityFromObject(flood));
        });
        return this.floodsList;
    }
    static floodsEntityFromObject(object) {
        const { id, _id, name, shortName, description, color, metadata, geometry, area_km2, port_captaincy_id, scenary_id, visible } = object;
        if (!id) {
            throw domain_1.CustomError.badRequest('Missing id');
        }
        if (!name) {
            throw domain_1.CustomError.badRequest('Missing name');
        }
        if (!shortName) {
            throw domain_1.CustomError.badRequest('Missing short name');
        }
        if (!area_km2) {
            throw domain_1.CustomError.badRequest('Missing short area_km2');
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
        if (!port_captaincy_id) {
            throw domain_1.CustomError.badRequest('Missing port captain id');
        }
        if (!scenary_id) {
            throw domain_1.CustomError.badRequest('Missing scenary id');
        }
        return new floodLayer_entity_1.FloodLayerEntity(_id || id, name, shortName, description, area_km2, color, metadata, port_captaincy_id, scenary_id, geometry, visible);
    }
}
exports.FloodMapper = FloodMapper;
FloodMapper.floodsList = [];
