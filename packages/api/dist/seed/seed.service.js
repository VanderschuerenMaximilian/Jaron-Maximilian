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
const persons = require("./data/persons.json");
const alerts = require("./data/alerts.json");
const persons_service_1 = require("../persons/persons.service");
const person_entity_1 = require("../persons/entities/person.entity");
const alert_entity_1 = require("../alerts/entities/alert.entity");
const alerts_service_1 = require("../alerts/alerts.service");
let SeedService = exports.SeedService = class SeedService {
    constructor(personsService, alertsService) {
        this.personsService = personsService;
        this.alertsService = alertsService;
    }
    async addPersonsFromJson() {
        let thePersons = [];
        for (let person of persons) {
            const p = new person_entity_1.Person();
            p.firstName = person.firstName;
            p.lastName = person.lastName;
            p.fullName = person.fullName;
            p.workEmail = person.workEmail;
            p.personalEmail = person.personalEmail;
            p.phone = person.phone;
            p.personType = person.personType;
            p.createdAt = new Date();
            p.updatedAt = new Date();
            thePersons.push(p);
        }
        return this.personsService.saveAllPersons(thePersons);
    }
    async deleteAllPersons() {
        return this.personsService.truncate();
    }
    async addAlertsFromJson() {
        let theAlerts = [];
        for (let alert of alerts) {
            const a = new alert_entity_1.Alert();
            a.title = alert.title;
            a.description = alert.description;
            a.createdAt = new Date();
            a.updatedAt = new Date();
            theAlerts.push(a);
        }
        return this.alertsService.saveAllAlerts(theAlerts);
    }
    async deleteAllAlerts() {
        return this.alertsService.truncate();
    }
};
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [persons_service_1.PersonsService,
        alerts_service_1.AlertsService])
], SeedService);
//# sourceMappingURL=seed.service.js.map