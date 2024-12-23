import React from 'react';
const Footer = () => {
    return (
        <footer className="bg-KebabGreen text-white py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold">Kebabscrib</h2>
                    <p className="mt-2 text-sm">Serving the best kebabs in town since 2023.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                    
                    <div>
                        <ul className="mt-2 mr-15 space-y-2">
                            <li><a href="/menu" className="hover:underline">Menu</a></li>
                            <li><a href="/contact" className="hover:underline">Contact</a></li>
                            <li><a href="/about" className="hover:underline">About Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold">Follow Us</h3>
                        <ul className="mt-2 space-y-2">
                            <li><a href="#" className="hover:underline">Instagram</a></li>
                            <li><a href="#" className="hover:underline">Facebook</a></li>
                            <li><a href="#" className="hover:underline">Twitter</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="text-center mt-8 text-sm text-gray-500">
                © {new Date().getFullYear()} Kebabscrib. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
