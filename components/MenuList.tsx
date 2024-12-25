"use client"
import React, { useState, useEffect } from 'react';
import MenuItem from './MenuItem';
import { error } from 'console';

interface MenuItem {
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
}

const MenuList: React.FC = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setloading] = useState(true);


    // Fetch the menu Items
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const res = await fetch("../api/menu");
                const data = await res.json();

                setMenuItems(data);
                setloading(false);
            }
            catch {
                console.error("failed to fetch menu items (MenuList.tsx):");
                setloading(false);
            }

        };
        fetchMenuItems();

    }, []);

    // If the menu items are in teh fetching process (loading), display this
    if (loading) {
        return <p className="text-center mt-10">Loading menu items...</p>;
    }

    // Once Everything is loaded return the menu items

    // MAP each Item into its menuItem.tsx object and make a list to display 
    return (
        <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
                <MenuItem key={item.item_name} {...item} />
            ))}
        </div>
    );
};


export default MenuList;