"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllScenary = void 0;
class GetAllScenary {
    constructor(scenaryRepository) {
        this.scenaryRepository = scenaryRepository;
        this.listScenaris = [];
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const scenaris = yield this.scenaryRepository.getAllScenary();
            scenaris.forEach(scene => {
                this.listScenaris.push({
                    id: scene.id,
                    name: scene.name,
                    description: scene.description,
                    autor: scene.autor,
                    year: scene.year
                });
            });
            return this.listScenaris;
        });
    }
}
exports.GetAllScenary = GetAllScenary;
