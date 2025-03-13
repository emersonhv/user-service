"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortCaptaincyEntity = void 0;
const layer_entity_1 = require("./layer.entity");
class PortCaptaincyEntity extends layer_entity_1.LayerEntity {
    constructor(id, name, shortName, description, metadata, color, geometry) {
        super(name, description, metadata);
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.description = description;
        this.metadata = metadata;
        this.color = color;
        this.geometry = geometry;
    }
}
exports.PortCaptaincyEntity = PortCaptaincyEntity;
