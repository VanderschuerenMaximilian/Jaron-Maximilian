"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BezoekerModule = void 0;
const common_1 = require("@nestjs/common");
const bezoeker_service_1 = require("./bezoeker.service");
const bezoeker_resolver_1 = require("./bezoeker.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const bezoeker_entity_1 = require("./entities/bezoeker.entity");
let BezoekerModule = exports.BezoekerModule = class BezoekerModule {
};
exports.BezoekerModule = BezoekerModule = __decorate([
    (0, common_1.Module)({
        providers: [bezoeker_resolver_1.BezoekerResolver, bezoeker_service_1.BezoekerService],
        imports: [typeorm_1.TypeOrmModule.forFeature([bezoeker_entity_1.Bezoeker])],
        exports: [bezoeker_service_1.BezoekerService],
    })
], BezoekerModule);
//# sourceMappingURL=bezoeker.module.js.map