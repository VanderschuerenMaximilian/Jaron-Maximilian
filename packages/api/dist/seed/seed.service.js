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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const bezoeker_service_1 = require("../bezoeker/bezoeker.service");
const werknemer_service_1 = require("../werknemer/werknemer.service");
const bezoeker_entity_1 = require("../bezoeker/entities/bezoeker.entity");
const bezoekers = require("./data/bezoekers.json");
const werknemers = require("./data/werknemers.json");
const werknemer_entity_1 = require("../werknemer/entities/werknemer.entity");
let SeedService = exports.SeedService = class SeedService {
    constructor(bezoekerService, werknemersService) {
        this.bezoekerService = bezoekerService;
        this.werknemersService = werknemersService;
    }
    async addBezoekersFromJson() {
        let theBezoeker = [];
        for (let bezoeker of bezoekers) {
            const b = new bezoeker_entity_1.Bezoeker();
            b.name = bezoeker.name;
            b.fullname = bezoeker.fullname;
            b.email = bezoeker.email;
            theBezoeker.push(b);
        }
        return this.bezoekerService.save(theBezoeker);
    }
    async deleteAllBezoekers() {
        return this.bezoekerService.truncate();
    }
    async addWerknemersFromJson() {
        let theWerknemer = [];
        for (let werknemer of werknemers) {
            const b = new werknemer_entity_1.Werknemer();
            b.firstname = werknemer.firstname;
            b.lastname = werknemer.lastname;
            b.email = werknemer.email;
            theWerknemer.push(b);
        }
        return this.werknemersService.saveAll(theWerknemer);
    }
    async deleteAllWerknemers() {
        return this.werknemersService.truncate();
    }
};
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bezoeker_service_1.BezoekerService,
        werknemer_service_1.WerknemerService])
], SeedService);
//# sourceMappingURL=seed.service.js.map