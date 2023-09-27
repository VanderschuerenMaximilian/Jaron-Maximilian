"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WerknemerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const werknemer_entity_1 = require("./entities/werknemer.entity");
const typeorm_2 = require("typeorm");
let WerknemerService = exports.WerknemerService = class WerknemerService {
    constructor(werknemerRepository) {
        this.werknemerRepository = werknemerRepository;
    }
    create(createWerknemerInput) {
        const werknemer = new werknemer_entity_1.Werknemer();
        werknemer.firstname = createWerknemerInput.firstname;
        werknemer.lastname = createWerknemerInput.lastname;
        werknemer.email = createWerknemerInput.email;
        return this.werknemerRepository.save(werknemer);
    }
    findAll() {
        return this.werknemerRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} werknemer`;
    }
    update(id, updateWerknemerInput) {
        return `This action updates a #${id} werknemer`;
    }
    remove(id) {
        return `This action removes a #${id} werknemer`;
    }
    saveAll(werknemers) {
        return this.werknemerRepository.save(werknemers);
    }
    truncate() {
        return this.werknemerRepository.clear();
    }
};
exports.WerknemerService = WerknemerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(werknemer_entity_1.Werknemer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WerknemerService);
//# sourceMappingURL=werknemer.service.js.map