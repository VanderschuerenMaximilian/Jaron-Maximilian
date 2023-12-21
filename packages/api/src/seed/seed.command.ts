import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  // ------------ Person ------------
  // npx nestjs-command seed:database:persons
  // npx nestjs-command seed:reset:persons
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
  // npx nestjs-command seed:database:alerts
  // npx nestjs-command seed:reset:alerts
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

  // ------------ Zone ------------
  // npx nestjs-command seed:database:zones
  // npx nestjs-command seed:reset:zones

  @Command({
    command: 'seed:database:zones',
    describe: 'Seed the database with zones',
  })
  async seedZones() {
    console.info('🗺 Start seeding of zones')
    const zones = await this.seedService.addZonesFromJson()
    console.info(`🗺 ${zones.length} Zones are added`)
  }

  @Command({
    command: 'seed:reset:zones',
    describe: 'Delete all data from the zones table',
  })
  async deleteZones() {
    console.info('🔪 Start deleting zones')
    await this.seedService.deleteAllZones()
    console.info('❌ Removed zones')
  }

  // ------------ Ticket Prices ------------
  // npx nestjs-command seed:database:ticket-prices
  // npx nestjs-command seed:reset:ticket-prices

  @Command({
    command: 'seed:database:ticket-prices',
    describe: 'Seed the database with ticket-prices',
  })
  async seedTicketPrices() {
    console.info('🎟 Start seeding of ticket-prices')
    const ticketPrices = await this.seedService.addTicketPricesFromJson()
    console.info(`🎟 ${ticketPrices.length} TicketPrices are added`)
  }

  @Command({
    command: 'seed:reset:ticket-prices',
    describe: 'Delete all data from the ticket-prices table',
  })
  async deleteTicketPrices() {
    console.info('🔪 Start deleting ticket-prices')
    await this.seedService.deleteAllTicketPrices()
    console.info('❌ Removed ticket-prices')
  }

  // ------------ Tickets ------------
  // npx nestjs-command seed:reset:tickets

  @Command({
    command: 'seed:reset:tickets',
    describe: 'Delete all data from the tickets table',
  })
  async deleteTickets() {
    console.info('🔪 Start deleting tickets')
    await this.seedService.deleteAllTickets()
    console.info('❌ Removed tickets')
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

  // ------------ SoldProduct ------------
  // npx nestjs-command seed:database:sold-products
  // npx nestjs-command seed:reset:sold-products
  @Command({
    command: 'seed:database:sold-products',
    describe: 'Seed the database with sold-products',
  })
  async seedSoldProducts() {
    console.info('🪺 Start seeding of sold-products')
    const soldProducts = await this.seedService.addSoldProductsFromJson()
    console.info(`🛒 ${soldProducts.length} SoldProducts are added`)
  }

  @Command({
    command: 'seed:reset:sold-products',
    describe: 'Delete all data from the sold-products table',
  })
  async deleteSoldProducts() {
    console.info('🔪 Start deleting sold products')
    await this.seedService.deleteAllSoldProducts()
    console.info('🪶 Removed sold products')
  }

  // ------------ Order ------------
  // npx nestjs-command seed:database:orders
  // npx nestjs-command seed:reset:orders
  @Command({
    command: 'seed:database:orders',
    describe: 'Seed the database with orders',
  })
  async seedOrders() {
    console.info('🪺 Start seeding of orders')
    const orders = await this.seedService.addOrdersFromJson()
    console.info(`🛒 ${orders.length} Orders are added`)
  }
  @Command({
    command: 'seed:reset:orders',
    describe: 'Delete all data from the orders table',
  })
  async deleteOrders() {
    console.info('🔪 Start deleting orders')
    await this.seedService.deleteAllOrders()
    console.info('🪶 Removed orders')
  }

  // ------------ Stock ------------
  // npx nestjs-command seed:database:stocks
  // npx nestjs-command seed:reset:stocks
  @Command({
    command: 'seed:database:stocks',
    describe: 'Seed the database with stocks',
  })
  async seedStocks() {
    console.info('🪺 Start seeding of stocks')
    const stocks = await this.seedService.addStocksFromJson()
    console.info(`🛒 ${stocks.length} Stocks are added`)
  }
  @Command({
    command: 'seed:reset:stocks',
    describe: 'Delete all data from the stocks table',
  })
  async deleteStocks() {
    console.info('🔪 Start deleting stocks')
    await this.seedService.deleteAllStocks()
    console.info('🪶 Removed stocks')
  }

  // ------------ Tasks ------------
  // npx nestjs-command seed:database:tasks
  // npx nestjs-command seed:reset:tasks
  @Command({
    command: 'seed:database:tasks',
    describe: 'Seed the database with tasks',
  })
  async seedTasks() {
    console.info('🪺 Start seeding of tasks')
    const tasks = await this.seedService.addTasksFromJson()
    console.info(`🛒 ${tasks.length} Tasks are added`)
  }
  @Command({
    command: 'seed:reset:tasks',
    describe: 'Delete all data from the tasks table',
  })
  async deleteTasks() {
    console.info('🔪 Start deleting tasks')
    await this.seedService.deleteAllTasks()
    console.info('🪶 Removed tasks')
  }

  // ------------ All ------------
  // npx nestjs-command seed:database:all
  // npx nestjs-command seed:reset:all
  @Command({
    command: 'seed:database:all',
    describe: 'Seed the entire database',
  })
  async seedAll() {
    console.info('🌱 Start seeding of the database');
    await this.seedPersons();
    await this.seedAlerts();
    await this.seedZones();
    await this.seedTicketPrices();
    await this.seedShops();
    await this.seedCategories();
    await this.seedProducts();
    await this.seedIngredients();
    await this.seedSoldProducts();
    await this.seedStocks();
    console.info('🌱 Database seeding completed.');
  }
  @Command({
    command: 'seed:reset:all',
    describe: 'Delete all data from the entire database',
  })
  async deleteAll() {
    console.info('🔪 Start deleting all data from the database');
    await this.deletePersons();
    await this.deleteAlerts();
    await this.deleteZones();
    await this.deleteTicketPrices();
    await this.deleteTickets();
    await this.deleteShops();
    await this.deleteCategories();
    await this.deleteProducts();
    await this.deleteIngredients();
    await this.deleteSoldProducts();
    await this.deleteOrders();
    await this.deleteStocks();
    await this.deleteTasks();
    console.info('🔪 Database deletion completed.');
  }


}

