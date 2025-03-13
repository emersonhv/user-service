"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetScenaryDto = void 0;
class GetScenaryDto {
    constructor(id, name, description, autor, year) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.autor = autor;
        this.year = year;
    }
    static create(object) {
        const { id, name, description, autor, year } = object;
        if (!name)
            return ['Missing name'];
        if (!description)
            return ['Missing description'];
        //if ( !year ) return ['Missing year'];
        return [
            undefined,
            new GetScenaryDto(id, name, description, autor, year)
        ];
    }
}
exports.GetScenaryDto = GetScenaryDto;
