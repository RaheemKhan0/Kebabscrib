import { MenuItem } from "../interfaces/MenuItem";

export class tacos implements MenuItem {
  name: string;
  description: string;
  price: { item: number; combo: number };
  category: string;
  size: string;
  sauces: Array<string>;
  meatType: string;

  constructor(
    name: string,
    description: string,
    
    price: { item: number; combo: number },
    category: string,
    size: string,
    sauces: Array<string>,
    meatType : string
  ) { 
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.size = size;
    this.sauces = sauces
    this.meatType = meatType;
  }


  calculatePrice(): number {
    return 1;
  }
}
