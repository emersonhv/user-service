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
exports.GetAllFloods = void 0;
class GetAllFloods {
    constructor(floodRepository) {
        this.floodRepository = floodRepository;
        this.listFloods = [];
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const floods = yield this.floodRepository.getAllFloods();
            floods.forEach(flood => {
                this.listFloods.push({
                    id: flood.id,
                    name: flood.name,
                    shortName: flood.shortName,
                    description: flood.description,
                    metadata: flood.metadata,
                    portCaptain: flood.portCaptainId,
                    scenary: flood.scenaryId,
                    visible: flood.visible
                });
            });
            return this.listFloods;
        });
    }
}
exports.GetAllFloods = GetAllFloods;
