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
exports.BezoekerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const bezoeker_service_1 = require("./bezoeker.service");
const bezoeker_entity_1 = require("./entities/bezoeker.entity");
const create_bezoeker_input_1 = require("./dto/create-bezoeker.input");
const update_bezoeker_input_1 = require("./dto/update-bezoeker.input");
let BezoekerResolver = exports.BezoekerResolver = class BezoekerResolver {
    constructor(bezoekerService) {
        this.bezoekerService = bezoekerService;
    }
    createBezoeker(createBezoekerInput) {
        return this.bezoekerService.create(createBezoekerInput);
    }
    getBirds() {
        return this.bezoekerService.findAll();
    }
    findOne(id) {
        return this.bezoekerService.findOne(id);
    }
    updateBezoeker(updateBezoekerInput) {
        return this.bezoekerService.update(updateBezoekerInput.id, updateBezoekerInput);
    }
    removeBezoeker(id) {
        return this.bezoekerService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => bezoeker_entity_1.Bezoeker, { description: 'Create a bezoeker using the DTO.' }),
    __param(0, (0, graphql_1.Args)('createBezoekerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bezoeker_input_1.CreateBezoekerInput]),
    __metadata("design:returntype", Promise)
], BezoekerResolver.prototype, "createBezoeker", null);
__decorate([
    (0, graphql_1.Query)(() => [bezoeker_entity_1.Bezoeker], { name: 'bezoekers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BezoekerResolver.prototype, "getBirds", null);
__decorate([
    (0, graphql_1.Query)(() => bezoeker_entity_1.Bezoeker, { name: 'bezoeker' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BezoekerResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => bezoeker_entity_1.Bezoeker),
    __param(0, (0, graphql_1.Args)('updateBezoekerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_bezoeker_input_1.UpdateBezoekerInput]),
    __metadata("design:returntype", void 0)
], BezoekerResolver.prototype, "updateBezoeker", null);
__decorate([
    (0, graphql_1.Mutation)(() => bezoeker_entity_1.Bezoeker),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BezoekerResolver.prototype, "removeBezoeker", null);
exports.BezoekerResolver = BezoekerResolver = __decorate([
    (0, graphql_1.Resolver)(() => bezoeker_entity_1.Bezoeker),
    __metadata("design:paramtypes", [bezoeker_service_1.BezoekerService])
], BezoekerResolver);
//# sourceMappingURL=bezoeker.resolver.js.map