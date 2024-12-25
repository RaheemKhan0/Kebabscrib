import { NextResponse } from 'next/server';
import connectMongodb from '../../../lib/mongodb';
import MenuItem from '../../../model/menu_items';

export async function GET(req: Request) {
    await connectMongodb();

    try {
        const menuItems = await MenuItem.find({});
        console.log("Item fetch - RABIE");
        return NextResponse.json(menuItems);
    } catch (error) {
        console.log("Item NOT fetch - RABIE");
        return NextResponse.json({ message: 'Failed to fetch menu items' }, { status: 500 });
    }
}


// import { NextApiRequest, NextApiResponse } from "next";
// import connectMongodb from "../../../lib/mongodb" 
// import MenuItem from '../../../model/menu_items';

// export default async function handler(
//     req: NextApiRequest,
//     res:NextApiResponse
// ) {
//     await connectMongodb();

//     try {
//         const menuItems = await MenuItem.find({});
//         console.log("item fetch - RABIE");
//         return new Response(JSON.stringify(menuItems), { status: 200 });
//     } catch (error) {
//         console.log("item NOTTTT fetch - RABIE");
//         return new Response(JSON.stringify({ message: 'Failed to fetch menu items' }), {
//             status: 500,
//         });
//     }
// } 


        // try{
    //     const menuItems = await MenuItem.find({});
    //     res.status(200).json(menuItems);
    // } 
    // catch {
    //     res.status(500).json({message: "Failed to fetch menu items from MongoDB - Rabie"})
    // }