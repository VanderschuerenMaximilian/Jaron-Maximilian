"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_command_1 = require("nestjs-command");
const persons_module_1 = require("../persons/persons.module");
const seed_service_1 = require("./seed.service");
const seed_command_1 = require("./seed.command");
const alerts_module_1 = require("../alerts/alerts.module");
let SeedModule = exports.SeedModule = class SeedModule {
};
exports.SeedModule = SeedModule = __decorate([
    (0, common_1.Module)({
        imports: [persons_module_1.PersonsModule, alerts_module_1.AlertsModule, nestjs_command_1.CommandModule],
        providers: [seed_command_1.DatabaseSeedCommand, seed_service_1.SeedService],
    })
], SeedModule);
//# sourceMappingURL=seed.module.js.map