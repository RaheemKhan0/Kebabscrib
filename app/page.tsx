// import React from 'react'
// import MenuItem  from '../components/MenuItem' 

// const page = () => {
//   return (
//     <MenuItem/>
    
//   );
// }

// export default page


import MenuList from '../components/MenuList';
import Layout from './layout';
import HeroSection from '../components/HomeBody.tsx'

export default function Home() {
    return (
        <>        
            <HeroSection />
            <div className="py-16 bg-[#014421] text-white text-center">
                <h1 className="text-5xl font-bold">Welcome to Kebabscrib</h1>
                <p className="mt-4 text-lg">Explore Our Delicious Menu</p>
            </div>
            <MenuList />
        </>
    );
}

