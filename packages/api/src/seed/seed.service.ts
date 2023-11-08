import { Injectable } from '@nestjs/common'

// Person
import * as persons from './data/persons.json'
import { PersonsService } from 'src/persons/persons.service'
import { Person } from 'src/persons/entities/person.entity'
import { PersonType } from 'src/interfaces/IPersonType'
// Alert
import * as alerts from './data/alerts.json'
import { Alert } from 'src/alerts/entities/alert.entity'
import { AlertsService } from 'src/alerts/alerts.service'
import { JobType } from 'src/interfaces/IJobType'
import { AlertState } from 'src/interfaces/IAlertState'
// Zone
import * as zones from './data/zones.json'
import { Zone } from 'src/zones/entities/zone.entity'
import { ZonesService } from 'src/zones/zones.service'
// Shop
import * as shops from './data/shops.json'
import { Shop } from 'src/shops/entities/shop.entity'
import { ShopsService } from 'src/shops/shops.service'
// Category
import * as categories from './data/categories.json'
import { Category } from 'src/categories/entities/category.entity'
import { CategoriesService } from 'src/categories/categories.service'
// Product
import * as products from './data/products.json' 
import { Product } from 'src/products/entities/product.entity'
import { ProductsService } from 'src/products/products.service'
// Ingredient
import * as ingredients from './data/ingredients.json'
import { Ingredient } from 'src/ingredients/entities/ingredient.entity'
import { IngredientsService } from 'src/ingredients/ingredients.service'
// SoldProduct
import * as soldProducts from './data/sold-products.json'
import { SoldProduct } from 'src/sold-products/entities/sold-product.entity'
import { SoldProductsService } from 'src/sold-products/sold-products.service'
// Order
import * as orders from './data/orders.json'
import { Order } from 'src/orders/entities/order.entity'
import { OrdersService } from 'src/orders/orders.service'
// Stock
import * as stocks from './data/stocks.json'
import { Stock } from 'src/stocks/entities/stock.entity'
import { StocksService } from 'src/stocks/stocks.service'
// Task
import * as tasks from './data/tasks.json'
import { Task } from 'src/tasks/entities/task.entity'
import { TasksService } from 'src/tasks/tasks.service'

@Injectable()
export class SeedService {
  constructor(
    private personsService: PersonsService,
    private alertsService: AlertsService,
    private zonesService: ZonesService,
    private shopsService: ShopsService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private ingredientsService: IngredientsService,
    private soldProductsService: SoldProductsService,
    private ordersService: OrdersService,
    private stocksService: StocksService,
    private tasksService: TasksService,
  ) {}

  // -------------------- Person --------------------
  async addPersonsFromJson(): Promise<Person[]> {
    let thePersons: Person[] = []
    for (let person of persons) {
      const p = new Person()
      p.uid = person.uid? person.uid : null
      p.firstName = person.firstName
      p.lastName = person.lastName
      p.fullName = person.fullName
      p.workEmail = person.workEmail
      p.personalEmail = person.personalEmail
      p.phone = person.phone
      p.jobType = person.jobType as JobType
      p.personType = person.personType as PersonType
      p.createdAt = new Date()
      p.updatedAt = new Date()
      p.locale = person.locale ? person.locale : 'en'

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
      a.state = alert.state as AlertState
      a.createdBy = alert.createdBy
      a.createdAt = new Date()
      a.updatedAt = new Date()

      theAlerts.push(a)
    }

    return this.alertsService.saveAllAlerts(theAlerts)
  }
  async deleteAllAlerts(): Promise<void> {
    return this.alertsService.truncate()
  }

  // -------------------- Zone --------------------
  async addZonesFromJson(): Promise<Zone[]> {
    let theZones: Zone[] = []
    for (let zone of zones) {
      const z = new Zone()
      z.name = zone.name
      z.description = zone.description
      z.createdAt = new Date()
      z.updatedAt = new Date()
      
      theZones.push(z)
    }

    return this.zonesService.saveAllZones(theZones)
  }

  async deleteAllZones(): Promise<void> {
    return this.zonesService.truncate()
  }

  // -------------------- Shop --------------------
  async addShopsFromJson(): Promise<Shop[]> {
    let theShops: Shop[] = []
    for (let shop of shops) {
      const s = new Shop()
      s.category = shop.category
      s.description = shop.description
      s.products = shop.products
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

  // -------------------- Product --------------------
  async addProductsFromJson(): Promise<Product[]> {
    let theProducts: Product[] = []
    for (let product of products) {
      const p = new Product()
      p.name = product.name
      p.description = product.description
      p.image = product.image
      p.price = product.price
      p.sizeModifier = product.sizeModifier
      p.category = product.category
      p.size = Array.isArray(product.size) ? product.size : [product.size] as string[]
      p.sauce = product.sauce
      p.extra = product.extra
      p.removable = product.removable
      p.ingredients = Array.isArray(product.ingredients) ? product.ingredients : [product.ingredients] as string[]
      p.shopType = product.shopType

      theProducts.push(p)
    }

    return this.productsService.saveAllProducts(theProducts)
  }
  async deleteAllProducts(): Promise<void> {
    return this.productsService.truncate()
  }

  // -------------------- Ingredient --------------------
  async addIngredientsFromJson(): Promise<Ingredient[]> {
    let theIngredient: Ingredient[] = []
    for (let ingredient of ingredients) {
      const i = new Ingredient()
      i.maxStock = ingredient.maxStock,
      i.minStock = ingredient.minStock,
      i.name = ingredient.name,
      i.price = ingredient.price,
      i.stock = ingredient.stock,
      i.stockReduction = ingredient.stockReduction,
      i.unit = ingredient.unit,
      theIngredient.push(i)
    }

    return this.ingredientsService.saveAllIngredients(theIngredient)
  }
  async deleteAllIngredients(): Promise<void> {
    return this.ingredientsService.truncate()
  }

  // -------------------- SoldProduct --------------------
  async addSoldProductsFromJson(): Promise<SoldProduct[]> {
    let theSoldProducts: SoldProduct[] = []
    for (let soldProduct of soldProducts) {
      const sp = new SoldProduct()
      sp.size = soldProduct.size
      sp.sauce = soldProduct.sauce
      sp.removeables = soldProduct.removeables
      sp.amount = soldProduct.amount
      sp.extras = soldProduct.extras
      sp.productId = soldProduct.productId

      theSoldProducts.push(sp)
    }

    return this.soldProductsService.saveAllSoldProducts(theSoldProducts)
  }
  async deleteAllSoldProducts(): Promise<void> {
    return this.soldProductsService.truncate()
  }
  // -------------------- Order --------------------
  async addOrdersFromJson(): Promise<Order[]> {
    let theOrders: Order[] = []
    for (let order of orders) {
      const o = new Order()
      o.shopName = order.shopName
      o.totalPrice = order.totalPrice
      o.soldProducts = order.soldProducts

      theOrders.push(o)
    }

    return this.ordersService.saveAllOrders(theOrders)
  }
  async deleteAllOrders(): Promise<void> {
    return this.ordersService.truncate()
  }
  // -------------------- Stock --------------------
  async addStocksFromJson(): Promise<Stock[]> {
    let theStocks: Stock[] = []
    for (let stock of stocks) {
      const s = new Stock()
      s.facilityName = stock.facilityName
      s.name = stock.name
      s.price = stock.price
      s.stock = stock.stock
      s.stockReduction = stock.stockReduction
      s.unit = stock.unit
      s.minStock = stock.minStock
      s.maxStock = stock.maxStock

      theStocks.push(s)
    }

    return this.stocksService.saveAllStocks(theStocks)
  }
  async deleteAllStocks(): Promise<void> {
    return this.stocksService.truncate()
  }

  // -------------------- Task --------------------
  async addTasksFromJson(): Promise<Task[]> {
    let theTasks: Task[] = []
    for (let task of tasks) {
      const t = new Task()
      t.personId = task.personId
      t.workblockId = task.workblockId
      t.title = task.title
      t.description = task.description
      t.createdAt = new Date()
      t.stockItems = task.stockItems

      theTasks.push(t)
    }

    return this.tasksService.saveAllTasks(theTasks)
  }
  async deleteAllTasks(): Promise<void> {
    return this.tasksService.truncate()
  }


}
