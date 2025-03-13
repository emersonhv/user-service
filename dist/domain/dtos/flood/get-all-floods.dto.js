"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllFloodsDto = void 0;
class GetAllFloodsDto {
    constructor(name, shortName, description, metadata, geometry, portCaptain, scenary, visible) {
        this.name = name;
        this.shortName = shortName;
        this.description = description;
        this.metadata = metadata;
        this.geometry = geometry;
        this.portCaptain = portCaptain;
        this.scenary = scenary;
        this.visible = visible;
    }
    static create(object) {
        const { name, shortName, description, metadata, geometry, portCaptain, scenary, visible } = object;
        if (!name)
            return ['Missing name'];
        if (!shortName)
            return ['Missing short name'];
        if (!description)
            return ['Missing description'];
        if (!metadata)
            return ['Missing metadata'];
        if (!geometry)
            return ['Missing geometry'];
        if (!portCaptain)
            return ['Missing port captain'];
        if (!scenary)
            return ['Missing scenary'];
        return [
            undefined,
            new GetAllFloodsDto(name, shortName, description, metadata, geometry, portCaptain, scenary, visible)
        ];
    }
}
exports.GetAllFloodsDto = GetAllFloodsDto;
