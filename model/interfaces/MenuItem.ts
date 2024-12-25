export interface MenuItem {
    // name: string;
    // description: string;
    // price: {item : number, combo: number};
    // category: string;


    item_name: string;
    item_description: string;
    item_price: {
        single: number;
        combo?: number;
    };
    item_category: string;
    size?: string;
    sauces?: string[];
    extra_toppings?: string[];
    item_img_url?: string;
  
    // Possible functions
    calculatePrice(): number; // e.g add tax etc
}
