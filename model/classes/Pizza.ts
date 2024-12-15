import { MenuItem } from "../interfaces/MenuItem"; 

export class Pizza implements MenuItem {
    name: string;
    description: string;
    price: { item: number; combo: number; };
    category: string;

    constructor(
        name: string,
        description: string,
        price: { item: number; combo: number },
        category: string,
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = "Pizza";

    }
    calculatePrice(): number {
        return 1;
    }

    
}