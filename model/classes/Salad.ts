import { MenuItem } from "@modelinterfaces/MenuItem";

export class Salad implements MenuItem {
    name: string;
    description: string;
    price: { item: number; combo: number; };
    category: string;

    constructor (
        name: string,
        description: string,
        price: { item: number; combo: number; },
        category: string,
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = "Salad ";
    }

    calculatePrice(): number {
        return 1;
    }
}
