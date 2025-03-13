"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDaneDto = void 0;
class GetDaneDto {
    constructor(name, description, metadata, color, geometry, flood, visible) {
        this.name = name;
        this.description = description;
        this.metadata = metadata;
        this.color = color;
        this.geometry = geometry;
        this.flood = flood;
        this.visible = visible;
    }
    static create(object) {
        const { name, description, metadata, color, geometry, flood, visible } = object;
        if (!name)
            return ['Missing name'];
        if (!description)
            return ['Missing description'];
        if (!metadata)
            return ['Missing metadata'];
        if (!color)
            return ['Missing color'];
        if (!geometry)
            return ['Missing geometry'];
        if (!flood)
            return ['Missing flood'];
        return [
            undefined,
            new GetDaneDto(name, description, metadata, color, geometry, flood, visible)
        ];
    }
}
exports.GetDaneDto = GetDaneDto;
