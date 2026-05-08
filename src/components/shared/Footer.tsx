"use client";

import Link from "next/link";
import { BiPhone } from "react-icons/bi";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaFacebook, FaMailBulk } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";
import { SiGooglemaps } from "react-icons/si";

export default function Footer() {
  const quickLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "About Us",
      path: "/about-us",
    },
    {
      name: "Contact Us",
      path: "/contact-us",
    },
    {
      name: "Login",
      path: "/login",
    },
  ];

  const customerLinks = [
    {
      name: "Cart",
      path: "/cart",
    },
    {
      name: "Checkout",
      path: "/checkout",
    },
    {
      name: "Privacy Policy",
      path: "/privacy-policy",
    },
    {
      name: "Terms & Conditions",
      path: "/terms-and-conditions",
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebook size={18} />,
      path: "https://facebook.com",
    },
    {
      icon: <BsInstagram size={18} />,
      path: "https://instagram.com",
    },
    {
      icon: <BsTwitter size={18} />,
      path: "https://twitter.com",
    },
    {
      icon: <LiaLinkedin size={18} />,
      path: "https://linkedin.com",
    },
    {
      icon: <BsYoutube size={18} />,
      path: "https://youtube.com",
    },
  ];

  return (
    <footer className="mt-20 bg-[#2f2f30] text-white">
      <div className="container mx-auto px-5 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-5 text-3xl font-bold text-sky-600">KeyCraft</h2>

            <p className="leading-7 text-gray-300">
              Premium mechanical keyboards for gamers, developers, and keyboard
              enthusiasts. Experience smooth typing with modern customizable
              keyboards.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold">Quick Links</h3>

            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="transition-all duration-300 hover:pl-2 hover:text-sky-500"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold">Customer Support</h3>

            <ul className="space-y-3">
              {customerLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="transition-all duration-300 hover:pl-2 hover:text-sky-500"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold">Contact Info</h3>

            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-3">
                <SiGooglemaps size={18} />
                <p>Bangladesh</p>
              </div>

              <a
                href="tel:+6588888888"
                className="flex items-center gap-3 transition-all duration-300 hover:text-sky-600"
              >
                <BiPhone size={18} />
                <span>+88 8888 8888</span>
              </a>

              <a
                href="mailto:support@keycraft.com"
                className="flex items-center gap-3 transition-all duration-300 hover:text-sky-600"
              >
                <FaMailBulk size={18} />
                <span>support@keycraft.com</span>
              </a>
            </div>

            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full border border-gray-600 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:bg-sky-600"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-while-800 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} KeyCraft. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
