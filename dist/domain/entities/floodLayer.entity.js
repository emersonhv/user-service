"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloodLayerEntity = void 0;
const layer_entity_1 = require("./layer.entity");
class FloodLayerEntity extends layer_entity_1.LayerEntity {
    constructor(id, name, shortName, description, area_km2, color, metadata, portCaptainId, scenaryId, geometry, visible = true) {
        super(name, description, metadata);
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.description = description;
        this.area_km2 = area_km2;
        this.color = color;
        this.metadata = metadata;
        this.portCaptainId = portCaptainId;
        this.scenaryId = scenaryId;
        this.geometry = geometry;
        this.visible = visible;
    }
}
exports.FloodLayerEntity = FloodLayerEntity;
