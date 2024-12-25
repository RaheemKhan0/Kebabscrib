import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';


const Footer: React.FC = () => {
    return (
        <footer className="bg-KebabGreen text-white py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl text-KebabGold font-bold ">Kebabs Crib</h2>
                    <p className="mt-2 text-sm text-KebabGold">Serving the best kebabs in town since 2011.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                    <div>
                        <h3 className="font-semibold text-KebabGold">Follow Us</h3>
                        <div className="flex space-x-6 mt-4">
                            <a href="https://www.instagram.com/kebabscrib/profilecard/?igsh=cGlla2V3ajJ2ZmVu" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-KebabGold hover:text-white text-3xl transition-colors duration-300" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebookF className="text-yellow-500 hover:text-white text-3xl transition-colors duration-300" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-yellow-500 hover:text-white text-3xl transition-colors duration-300" />
                            </a>
                            
                            {/* <div className="mt-8">
                                <h3 className="text-lg font-semibold">Find Us</h3>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509307!2d144.9537363155049!3d-37.81720997975195"
                                    width="100%" height="300" loading="lazy" className="rounded-md"
                                ></iframe>
                            </div> */}
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-8 text-sm text-gray-500">
                © {new Date().getFullYear()} Kebabscrib. All rights reserved. 
            </div>
        </footer>
    );
};



// const Footer = () => {
//     return (
//         <footer className="bg-KebabGreen text-white py-8">
//             <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
//                 <div className="mb-6 md:mb-0">
//                     <h2 className="text-2xl font-bold text-KebabGold">Kebabscrib</h2>
//                     <p className="mt-2 text-sm">Serving the best kebabs in town since 2011.</p>
//                 </div>
                
//                 <div className="flex flex-col md:flex-row gap-6">
                    
//                     <div>
//                         <ul className="mt-2 mr-15 space-y-2">
//                             <li><a href="/menu" className="hover:underline  text-KebabGold">Menu</a></li>
//                             <li><a href="/contact" className="hover:underline  text-KebabGold">Contact</a></li>
//                             <li><a href="/about" className="hover:underline  text-KebabGold">About Us</a></li>
//                         </ul>
//                     </div>

//                     <div>
//                         <h3 className="font-semibold">Follow Us</h3>
//                         <ul className="mt-2 space-y-2">
//                             <li><a href="#" className="hover:underline  text-KebabGold" >
//                             <FaInstagram className="text-KebabGold hover:text-white text-2xl" /> </a>
//                             </li>
//                             <li><a href="#" className="hover:underline ">
//                             <FaFacebookF className="hover:text-KebabGold text-2xl" /></a>
//                             </li>
//                             <li><a href="#" className="hover:underline ">
//                             <FaTwitter className="hover:text-KebabGold text-2xl" /></a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>

//             <div className="text-center mt-8 text-sm text-gray-500">
//                 © {new Date().getFullYear()} Kebabscrib. All rights reserved.
//             </div>
//         </footer>
//     );
// };

export default Footer;
