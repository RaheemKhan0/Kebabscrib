import { MenuItem } from "@modelinterfaces/MenuItem";

export class Sandwich implements MenuItem {
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
        this.category = "Sandwich";
    }


    calculatePrice(): number {
        return 1;
    }
}