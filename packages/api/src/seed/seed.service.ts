import { Injectable } from '@nestjs/common'

// Person
import * as persons from './data/persons.json' // set  "resolveJsonModule": true in tsconfig.json
import { PersonsService } from 'src/persons/persons.service'
import { Person } from 'src/persons/entities/person.entity'
import { PersonType } from 'src/interfaces/IPersonType'
// Alert
import * as alerts from './data/alerts.json' // set  "resolveJsonModule": true in tsconfig.json
import { Alert } from 'src/alerts/entities/alert.entity'
import { AlertsService } from 'src/alerts/alerts.service'
// Shop
import * as shops from './data/shops.json' // set  "resolveJsonModule": true in tsconfig.json
import { Shop } from 'src/shops/entities/shop.entity'
import { ShopsService } from 'src/shops/shops.service'
// Category
import * as categories from './data/categories.json' // set  "resolveJsonModule": true in tsconfig.json
import { Category } from 'src/categories/entities/category.entity'
import { CategoriesService } from 'src/categories/categories.service'


@Injectable()
export class SeedService {
  constructor(
    private personsService: PersonsService,
    private alertsService: AlertsService,
    private shopsService: ShopsService,
    private categoriesService: CategoriesService,
  ) {}

  // -------------------- Person --------------------
  async addPersonsFromJson(): Promise<Person[]> {
    let thePersons: Person[] = []
    for (let person of persons) {
      const p = new Person()
      p.firstName = person.firstName
      p.lastName = person.lastName
      p.fullName = person.fullName
      p.workEmail = person.workEmail
      p.personalEmail = person.personalEmail
      p.phone = person.phone
      p.personType = person.personType as PersonType
      p.createdAt = new Date()
      p.updatedAt = new Date()

      thePersons.push(p)
    }

    return this.personsService.saveAllPersons(thePersons)
  }

  async deleteAllPersons(): Promise<void> {
    return this.personsService.truncate()
  }

  // -------------------- Alert --------------------
  async addAlertsFromJson(): Promise<Alert[]> {
    let theAlerts: Alert[] = []
    for (let alert of alerts) {
      const a = new Alert()
      a.title = alert.title
      a.description = alert.description
      a.createdAt = new Date()
      a.updatedAt = new Date()

      theAlerts.push(a)
    }

    return this.alertsService.saveAllAlerts(theAlerts)
  }

  async deleteAllAlerts(): Promise<void> {
    return this.alertsService.truncate()
  }

  // -------------------- Shop --------------------
  async addShopsFromJson(): Promise<Shop[]> {
    let theShops: Shop[] = []
    for (let shop of shops) {
      const s = new Shop()
      s.category = shop.category
      s.description = shop.description
      s.dishes = shop.dishes
      s.image = shop.image
      s.name = shop.name
      s.shopType = shop.shopType
      s.zone = shop.zone
      

      theShops.push(s)
    }

    return this.shopsService.saveAllShops(theShops)
  }

  async deleteAllShops(): Promise<void> {
    return this.shopsService.truncate()
  }

  // -------------------- Category --------------------
  async addCategoriesFromJson(): Promise<Category[]> {
    let theCategories: Category[] = []
    for (let category of categories) {
      const c = new Category()
      c.name = category.name
      c.image = category.image

      theCategories.push(c)
    }

    return this.categoriesService.saveAllCategories(theCategories)
  }

  async deleteAllCategories(): Promise<void> {
    return this.categoriesService.truncate()
  }

}
