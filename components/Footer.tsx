import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/#menu" },
  { label: "Custom Taco", href: "/customtaco" },
  { label: "Contact", href: "/contactus" },
];

const socials = [
  {
    icon: <FaInstagram />,
    href: "https://www.instagram.com/kebabscrib/profilecard/?igsh=cGlla2V3ajJ2ZmVu",
    label: "Instagram",
  },
  {
    icon: <FaFacebookF />,
    href: "https://facebook.com",
    label: "Facebook",
  },
];

const contactDetails = [
  { icon: <IoMdCall />, label: "+971 50 123 4567" },
  { icon: <MdOutlineEmail />, label: "hello@kebabscrib.com" },
];

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/10 bg-gradient-to-br from-DeepSea via-KebabGreen to-KebabGreenDark text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image
              src="https://res.cloudinary.com/dpqto9jrm/image/upload/v1750239647/KC_Logo_Combination_stacked_green_epqs9c.png"
              alt="Kebabscrib"
              width={150}
              height={50}
              className="h-14 w-auto"
            />
            <p className="mt-4 text-sm text-KC_PEACH/80">
              Serving the best kebabs in town since 2011. Crafted with authentic French Lebanese passion.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-KC_PEACH">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/90 transition hover:text-KC_Yellow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-KC_PEACH">
              Visit & Connect
            </h3>
            <p className="mt-4 text-sm text-white/80">
              Seaside Avenue, Dubai Marina<br />Dubai, UAE
            </p>
            <div className="mt-4 space-y-2 text-sm text-white/80">
              {contactDetails.map((item) => (
                <p key={item.label} className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </p>
              ))}
            </div>
            <div className="mt-4 flex gap-4 text-2xl text-KC_Yellow">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-4 text-center text-xs text-white/70">
          © {new Date().getFullYear()} Kebabscrib. All rights reserved.
        </div>
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
