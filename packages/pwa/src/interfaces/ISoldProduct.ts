export interface SoldProduct {
  id: number
  shopName: string
  orderDate: Date;
  name: string
  image: string
  price: number
  category: string
  amount: number
  size: string
  sauce: string
  toppings: string[]
  removables: string[]
  extraCost: number
  ingredients: string[]
}
