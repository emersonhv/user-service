"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPortCaptaincyDto = void 0;
class GetPortCaptaincyDto {
    constructor(id, name, shortName, description, metadata, color, geometry) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
        this.description = description;
        this.metadata = metadata;
        this.color = color;
        this.geometry = geometry;
    }
    static create(object) {
        const { id, name, shortName, description, metadata, color, geometry } = object;
        //if ( !name ) return ['Missing name'];
        if (!shortName)
            return ['Missing short name'];
        //if ( !description ) return ['Missing description'];
        //if ( !metadata ) return ['Missing metadata'];
        //if ( !geometry ) return ['Missing geometry'];
        return [
            undefined,
            new GetPortCaptaincyDto(id, name, shortName, description, metadata, color, geometry)
        ];
    }
}
exports.GetPortCaptaincyDto = GetPortCaptaincyDto;
