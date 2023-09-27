"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WerknemerModule = void 0;
const common_1 = require("@nestjs/common");
const werknemer_service_1 = require("./werknemer.service");
const werknemer_resolver_1 = require("./werknemer.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const werknemer_entity_1 = require("./entities/werknemer.entity");
let WerknemerModule = exports.WerknemerModule = class WerknemerModule {
};
exports.WerknemerModule = WerknemerModule = __decorate([
    (0, common_1.Module)({
        providers: [werknemer_resolver_1.WerknemerResolver, werknemer_service_1.WerknemerService],
        imports: [typeorm_1.TypeOrmModule.forFeature([werknemer_entity_1.Werknemer])],
        exports: [werknemer_service_1.WerknemerService],
    })
], WerknemerModule);
//# sourceMappingURL=werknemer.module.js.map