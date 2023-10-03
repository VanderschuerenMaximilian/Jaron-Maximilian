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
exports.WerknemerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const werknemer_service_1 = require("./werknemer.service");
const werknemer_entity_1 = require("./entities/werknemer.entity");
const create_werknemer_input_1 = require("./dto/create-werknemer.input");
const update_werknemer_input_1 = require("./dto/update-werknemer.input");
const user_decorator_1 = require("../authentication/decorators/user.decorator");
const auth_1 = require("firebase-admin/auth");
const common_1 = require("@nestjs/common");
const firebase_guard_1 = require("../authentication/services/guards/firebase.guard");
let WerknemerResolver = exports.WerknemerResolver = class WerknemerResolver {
    constructor(werknemerService) {
        this.werknemerService = werknemerService;
    }
    createWerknemer(createWerknemerInput) {
        return this.werknemerService.create(createWerknemerInput);
    }
    findAll(currentUser) {
        console.log('currentUser: ', currentUser);
        return this.werknemerService.findAll();
    }
    findOne(id) {
        return this.werknemerService.findOne(id);
    }
    updateWerknemer(updateWerknemerInput) {
        return this.werknemerService.update(updateWerknemerInput.id, updateWerknemerInput);
    }
    removeWerknemer(id) {
        return this.werknemerService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => werknemer_entity_1.Werknemer),
    __param(0, (0, graphql_1.Args)('createWerknemerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_werknemer_input_1.CreateWerknemerInput]),
    __metadata("design:returntype", Promise)
], WerknemerResolver.prototype, "createWerknemer", null);
__decorate([
    (0, common_1.UseGuards)(firebase_guard_1.FirebaseGuard),
    (0, graphql_1.Query)(() => [werknemer_entity_1.Werknemer], { name: 'werknemers' }),
    __param(0, (0, user_decorator_1.FirebaseUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.UserRecord]),
    __metadata("design:returntype", void 0)
], WerknemerResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => werknemer_entity_1.Werknemer, { name: 'werknemer' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WerknemerResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => werknemer_entity_1.Werknemer),
    __param(0, (0, graphql_1.Args)('updateWerknemerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_werknemer_input_1.UpdateWerknemerInput]),
    __metadata("design:returntype", void 0)
], WerknemerResolver.prototype, "updateWerknemer", null);
__decorate([
    (0, graphql_1.Mutation)(() => werknemer_entity_1.Werknemer),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WerknemerResolver.prototype, "removeWerknemer", null);
exports.WerknemerResolver = WerknemerResolver = __decorate([
    (0, graphql_1.Resolver)(() => werknemer_entity_1.Werknemer),
    __metadata("design:paramtypes", [werknemer_service_1.WerknemerService])
], WerknemerResolver);
//# sourceMappingURL=werknemer.resolver.js.map