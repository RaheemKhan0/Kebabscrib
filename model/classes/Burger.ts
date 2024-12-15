import { MenuItem } from "../interfaces/MenuItem"; 

export class Burger implements MenuItem {
    name: string;
    description: string;
    price: { item: number; combo: number };
    category: string;
    pattyType: string; // Burger-specific attribute


    constructor(
        name: string,
        description: string,
        price: { item: number; combo: number },
        category: string,
        pattyType: string
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = "Burger";
        this.pattyType = pattyType;
    }

    calculatePrice(): number {
        return 1;
    }
}