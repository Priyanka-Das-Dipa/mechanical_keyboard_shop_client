/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import logo from "@/public/logo.jpg";

export default function Navbar() {
  const pathname = usePathname();
  const [dropdownState, setDropdownState] = useState(false);
  const dropDownMenuRef = useRef<HTMLDivElement | undefined | any>(null);
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
  return (
    <>
      <section className="sticky top-0 z-50 bg-white px-2 pt-2 pb-1 shadow-lg">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between">
            {/* ======================Logo====================== */}

            <Link
              href="/"
              className="rounded-2xl px-3 py-2 transition-all duration-300 hover:scale-110"
            >
              <Image src={logo} alt="logo" className="w-8" />
            </Link>

            {/* ======================Desktop Menu====================== */}

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
                        className={`mt-0.5 h-0.75 rounded-full bg-sky-600 transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* ====================== Mobile Hamburger====================== */}

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

            {/* ======================Mobile Sidebar====================== */}

            <div
              className={`fixed inset-0 z-50 bg-black/40 transition-all duration-300 ${
                dropdownState ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <div
                ref={dropDownMenuRef}
                className={`absolute top-0 right-0 h-screen w-50 bg-white p-6 shadow-lg transition-transform duration-300 ${
                  dropdownState ? "translate-x-0" : "translate-x-full"
                }`}
              >
                {/* Sidebar Header */}

                <div className="mb-10 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Menu</h2>

                  <button
                    onClick={() => setDropdownState(false)}
                    className="text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Mobile Links */}

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
                            className={`mt-0.5 h-0.75 rounded-full bg-sky-600 transition-all duration-300 ${
                              isActive ? "w-full" : "w-0 group-hover:w-full"
                            }`}
                          ></span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}
