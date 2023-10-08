import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  // ------------ Person ------------
  @Command({
    command: 'seed:database:persons',
    describe: 'Seed the database with persons',
  })
  async seedPersons() {
    console.info('🪴 Start seeding of persons')
    const persons = await this.seedService.addPersonsFromJson()
    console.info(`🧑 ${persons.length} persons are added`)
  }
  @Command({
    command: 'seed:reset:persons',
    describe: 'Delete all data from the persons table',
  })
  async deletePersons() {
    console.info('🔪 Start deleting persons')
    await this.seedService.deleteAllPersons()
    console.info('❌ Removed persons')
  }

  // ------------ Alert ------------

  @Command({
    command: 'seed:database:alerts',
    describe: 'Seed the database with alerts',
  })
  async seedAlerts() {
    console.info('🪴 Start seeding of alerts')
    await this.seedService.addAlertsFromJson()
    console.info('🚨 Alerts are added')
  }

  @Command({
    command: 'seed:reset:alerts',
    describe: 'Delete all data from the alerts table',
  })
  async deleteAlerts() {
    console.info('🔪 Start deleting alerts')
    await this.seedService.deleteAllAlerts()
    console.info('❌ Removed alerts')
  }

  // ------------ Shop ------------
  // npx nestjs-command seed:database:shops
  // npx nestjs-command seed:reset:shops

  @Command({
    command: 'seed:database:shops',
    describe: 'Seed the database with shops',
  })
  async seedShops() {
    console.info('🪺 Start seeding of shops')
    const shops = await this.seedService.addShopsFromJson()
    console.info(`🛒 ${shops.length} Shops are added`)
  }

  @Command({
    command: 'seed:reset:shops',
    describe: 'Delete all data from the shops table',
  })
  async deleteShops() {
    console.info('🔪 Start deleting shops')
    await this.seedService.deleteAllShops()
    console.info('🪶 Removed shops')
  }

  // ------------ Category ------------
  // npx nestjs-command seed:database:categories
  // npx nestjs-command seed:reset:categories
  @Command({
    command: 'seed:database:categories',
    describe: 'Seed the database with categories',
  })
  async seedCategories() {
    console.info('🪺 Start seeding of categories')
    const categories = await this.seedService.addCategoriesFromJson()
    console.info(`🛒 ${categories.length} Categories are added`)
  }

  @Command({
    command: 'seed:reset:categories',
    describe: 'Delete all data from the categrories table',
  })
  async deleteCategories() {
    console.info('🔪 Start deleting categories')
    await this.seedService.deleteAllCategories()
    console.info('🪶 Removed categories')
  }

  // ------------ Product ------------
  // npx nestjs-command seed:database:products
  // npx nestjs-command seed:reset:products
  @Command({
    command: 'seed:database:products',
    describe: 'Seed the database with products',
  })
  async seedProducts() {
    console.info('🪺 Start seeding of products')
    const products = await this.seedService.addProductsFromJson()
    console.info(`🛒 ${products.length} Products are added`)
  }

  @Command({
    command: 'seed:reset:products',
    describe: 'Delete all data from the products table',
  })
  async deleteProducts() {
    console.info('🔪 Start deleting products')
    await this.seedService.deleteAllProducts()
    console.info('🪶 Removed products')
  }

  // ------------ Ingredients ------------
  // npx nestjs-command seed:database:ingredients
  // npx nestjs-command seed:reset:ingredients
  @Command({
    command: 'seed:database:ingredients',
    describe: 'Seed the database with ingredients',
  })
  async seedIngredients() {
    console.info('🪺 Start seeding of ingredients')
    const ingredients = await this.seedService.addIngredientsFromJson()
    console.info(`🛒 ${ingredients.length} Ingredients are added`)
  }

  @Command({
    command: 'seed:reset:ingredients',
    describe: 'Delete all data from the ingredients table',
  })
  async deleteIngredients() {
    console.info('🔪 Start deleting ingredients')
    await this.seedService.deleteAllIngredients()
    console.info('🪶 Removed ingredients')
  }
}

