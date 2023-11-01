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
  sauce?: string | { name: string };
  toppings: { name: string }[];
  removables: string[]
  ingredients: string[]
}
