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
    async seedPersons() {
        console.info('🪴 Start seeding of persons');
        const persons = await this.seedService.addPersonsFromJson();
        console.info(`🧑 ${persons.length} persons are added`);
    }
    async deletePersons() {
        console.info('🔪 Start deleting persons');
        await this.seedService.deleteAllPersons();
        console.info('❌ Removed persons');
    }
    async seedAlerts() {
        console.info('🪴 Start seeding of alerts');
        await this.seedService.addAlertsFromJson();
        console.info('🚨 Alerts are added');
    }
    async deleteAlerts() {
        console.info('🔪 Start deleting alerts');
        await this.seedService.deleteAllAlerts();
        console.info('❌ Removed alerts');
    }
};
__decorate([
    (0, nestjs_command_1.Command)({
        command: 'seed:database:persons',
        describe: 'Seed the database with persons',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DatabaseSeedCommand.prototype, "seedPersons", null);
__decorate([
    (0, nestjs_command_1.Command)({
        command: 'seed:reset:persons',
        describe: 'Delete all data from the persons table',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DatabaseSeedCommand.prototype, "deletePersons", null);
__decorate([
    (0, nestjs_command_1.Command)({
        command: 'seed:database:alerts',
        describe: 'Seed the database with alerts',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DatabaseSeedCommand.prototype, "seedAlerts", null);
__decorate([
    (0, nestjs_command_1.Command)({
        command: 'seed:reset:alerts',
        describe: 'Delete all data from the alerts table',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DatabaseSeedCommand.prototype, "deleteAlerts", null);
exports.DatabaseSeedCommand = DatabaseSeedCommand = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [seed_service_1.SeedService])
], DatabaseSeedCommand);
//# sourceMappingURL=seed.command.js.map