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



@Injectable()
export class SeedService {
  constructor(
    private personsService: PersonsService,
    private alertsService: AlertsService,
    private shopsService: ShopsService,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private ingredientsService: IngredientsService,
    private soldProductsService: SoldProductsService,
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


}
