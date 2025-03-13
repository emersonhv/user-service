"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaneLayerEntity = void 0;
const layer_entity_1 = require("./layer.entity");
class DaneLayerEntity extends layer_entity_1.LayerEntity {
    constructor(id, name, description, color, metadata, floodId, geometry, visible = true) {
        super(name, description, metadata);
        this.id = id;
        this.name = name;
        this.description = description;
        this.color = color;
        this.metadata = metadata;
        this.floodId = floodId;
        this.geometry = geometry;
        this.visible = visible;
    }
}
exports.DaneLayerEntity = DaneLayerEntity;
