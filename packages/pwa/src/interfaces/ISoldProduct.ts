export interface SoldProduct {
  id: number
  productName: string
  shopName: string
  orderDate: Date;
  name: string
  image: string
  price: number
  extraCost: number
  category: string
  amount: number
  size: string
  sauce: string
  toppings: string[]
  removables: string[]
  ingredients: string[]
}
