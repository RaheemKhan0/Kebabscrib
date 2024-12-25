export interface MenuItem {
    name: string;
    description: string;
    price: {item : number, combo: number};
    category: string;
  
    // Possible functions
    calculatePrice(): number; // e.g add tax etc
}
