/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import logo from "@/public/logo.png";
import { useAppSelector } from "@/src/redux/store/hooks";
import { Heart, ShoppingCart } from "lucide-react";
import CartSidebar from "./CartSidebar";
import { useGetCartQuery } from "@/src/redux/features/user/userApi";

export default function Navbar() {
  const pathname = usePathname();
  const [dropdownState, setDropdownState] = useState(false);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const dropDownMenuRef = useRef<HTMLDivElement | null>(null);
  const { data: cartItems = [], isLoading } = useGetCartQuery({});
  const wishlistItems = useAppSelector((state) => state.wishlist?.items ?? []);

  const cartCount = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0,
  );

  const wishlistCount = wishlistItems.length;

  const navLinks = [
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

  // Close Sidebar on Outside Click
  useEffect(() => {
    const closeDropDown = (e: MouseEvent) => {
      if (
        dropDownMenuRef.current &&
        !dropDownMenuRef.current.contains(e.target as Node)
      ) {
        setDropdownState(false);
      }
    };

    document.addEventListener("mousedown", closeDropDown);

    return () => {
      document.removeEventListener("mousedown", closeDropDown);
    };
  }, []);

  // scroll off when modal is open
  useEffect(() => {
    if (dropdownState) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [dropdownState]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <section className="sticky py-4 top-0 z-50 border-b border-slate-800 bg-slate-950/80 px-2 pt-3 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between">
            {/* ================= LOGO ================= */}
            <Link href="/">
              <Image src={logo} alt="logo" className="w-full h-full" />
            </Link>

            {/* ================= DESKTOP MENU ================= */}
            <ul className="hidden items-center gap-10 md:flex">
              {navLinks.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`link group ${isActive ? "active" : ""}`}
                    >
                      {item.name}

                      <span
                        className={`mt-0.5 block h-0.75 rounded-full bg-cyan-400 transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-5">
              {/* Wishlist */}
              <Link
                href="/dashboard/wishlist"
                className="relative hover:text-cyan-400 transition"
              >
                <Heart size={24} />

                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartSidebarOpen(true)}
                className="relative hover:text-cyan-400 transition"
              >
                <ShoppingCart size={24} />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* ================= MOBILE BUTTON ================= */}
            <button
              onClick={() => setDropdownState(true)}
              className="md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </nav>
        </div>
      </section>

      {/* ================= MOBILE OVERLAY + SIDEBAR ================= */}
      <div
        className={`fixed inset-0 z-9999 transition-all duration-100 ${
          dropdownState ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* BACKDROP */}
        <div
          onClick={() => setDropdownState(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* SIDEBAR */}
        <div
          ref={dropDownMenuRef}
          className={`absolute top-0 right-0 h-screen w-65 border-l border-slate-800 bg-slate-950 p-6 shadow-2xl transition-transform duration-300 ${
            dropdownState ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* HEADER */}
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-sky-400">Menu</h2>

            <button
              onClick={() => setDropdownState(false)}
              className="text-2xl text-white hover:text-sky-400"
            >
              ✕
            </button>
          </div>
          <div className="flex items-center gap-6 mb-10">
            <Link
              href="/wishlist"
              onClick={() => setDropdownState(false)}
              className="relative"
            >
              <Heart size={26} />

              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              onClick={() => setDropdownState(false)}
              className="relative"
            >
              <ShoppingCart size={26} />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* LINKS */}
          <ul className="space-y-7">
            {navLinks.map((item) => {
              const isActive = pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setDropdownState(false)}
                    className={`link group w-fit text-lg ${
                      isActive ? "active" : ""
                    }`}
                  >
                    {item.name}

                    <span
                      className={`mt-0.5 block h-0.75 rounded-full bg-cyan-400 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <CartSidebar
        isOpen={cartSidebarOpen}
        onClose={() => setCartSidebarOpen(false)}
        cartItems={cartItems}
      />
    </>
  );
}
