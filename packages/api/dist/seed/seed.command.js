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
exports.DatabaseSeedCommand = void 0;
const nestjs_command_1 = require("nestjs-command");
const common_1 = require("@nestjs/common");
const seed_service_1 = require("./seed.service");
let DatabaseSeedCommand = exports.DatabaseSeedCommand = class DatabaseSeedCommand {
    constructor(seedService) {
        this.seedService = seedService;
    }
    async seedBezoekers() {
        console.info('✔ Start seeding of bezoekers');
        const birds = await this.seedService.addBezoekersFromJson();
        console.info(`🧑 ${birds.length} bezoekers are added`);
    }
    async deleteBezoekers() {
        console.info('🔪 Start deleting bezoekers');
        await this.seedService.deleteAllBezoekers();
        console.info('❌ Removed bezoekers');
    }
    async seedWerknemers() {
        console.info('🪺 Start seeding of birds');
        const werknemers = await this.seedService.addWerknemersFromJson();
        console.info(`🤷‍♂️ ${werknemers.length} Werknemers are added`);
    }
    async deleteWerknemers() {
        console.info('🔪 Start deleting werknemers');
        await this.seedService.deleteAllWerknemers();
        console.info('🪶 Removed werknemers');
    }
};
__decorate([
    (0, nestjs_command_1.Command)({
        command: 'seed:database:bezoekers',
        describe: 'Seed the database with bezoekers',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DatabaseSeedCommand.prototype, "seedBezoekers", null);
__decorate([
    (0, nestjs_command_1.Command)({
        command: 'seed:reset:bezoekers',
        describe: 'Delete all data from the bezoekers table',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DatabaseSeedCommand.prototype, "deleteBezoekers", null);
__decorate([
    (0, nestjs_command_1.Command)({
        command: 'seed:database:werknemers',
        describe: 'Seed the database with werknemers',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DatabaseSeedCommand.prototype, "seedWerknemers", null);
__decorate([
    (0, nestjs_command_1.Command)({
        command: 'seed:reset:werknemers',
        describe: 'Delete all data from the werknemer table',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DatabaseSeedCommand.prototype, "deleteWerknemers", null);
exports.DatabaseSeedCommand = DatabaseSeedCommand = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [seed_service_1.SeedService])
], DatabaseSeedCommand);
//# sourceMappingURL=seed.command.js.map