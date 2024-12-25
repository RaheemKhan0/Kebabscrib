import React from "react";
import '../public/styles/globals.css'

interface MenuItemProps {
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

const MenuItem: React.FC<MenuItemProps> =  ({
    item_name,
    item_description,
    item_price,
    item_category,
    size,
    sauces,
    extra_toppings,
    item_img_url,

}) => {
    return (
        <div className="border rounded-lg shadow-md hover:shadow-lg overflow-hidden bg-white">
        {/* Display Image */}
        {item_img_url ? (
            <img
                src={item_img_url}
                alt={item_name}
                className="w-full h-48 object-cover"
            />
        ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Image not available</p>
            </div>
        )} 

        <div className="p-4">
            {/* item_name and item_category */}
            <h1 className="text 2xl font-bold"> {item_name} </h1>
            <p className="text-sm text-gray-500 capitalize">{item_category}</p>

            {/* Item Description */}
            <p className="text-gray-700 mt-2">{item_description}</p>
            
             {/* Price */}
             <div className="mt-4"> 
                <p className="text-lg font-bold">Price: ${item_price.single}  </p>
                {item_price.combo && (
                    <p className="text-sm text-gray-500">Combo: ${item_price.combo} </p>
                )}

             </div>



        </div>





        </div> // Menu Item end
    );
}

export default MenuItem;