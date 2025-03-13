"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenaryMapper = void 0;
const domain_1 = require("../../domain");
class ScenaryMapper {
    static listScennaryEntityFromListObject(object) {
        this.scenaryList.splice(0, this.scenaryList.length);
        object.forEach(scene => {
            this.scenaryList.push(this.scenaryEntityFromObject(scene));
        });
        return this.scenaryList;
    }
    static scenaryEntityFromObject(object) {
        const { id, _id, name, description, autor, year } = object;
        if (!id) {
            throw domain_1.CustomError.badRequest('Missing id');
        }
        if (!name) {
            throw domain_1.CustomError.badRequest('Missing name');
        }
        if (!description) {
            throw domain_1.CustomError.badRequest('Missing description');
        }
        return new domain_1.ScenaryEntity(_id || id, name, description, autor, year);
    }
}
exports.ScenaryMapper = ScenaryMapper;
ScenaryMapper.scenaryList = [];
