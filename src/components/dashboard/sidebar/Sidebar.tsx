"use client";
import { Heart, Home, Menu, Package, Plus, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/all-product", label: "All Products", icon: Package },
  { href: "/dashboard/add-product", label: "Add Product", icon: Plus },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
  { href: "/dashboard/all-orders", label: "All Orders", icon: Package },
  { href: "/dashboard/my-orders", label: "My Orders", icon: Package },
];

export default function Sidebar() {
  const { open, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  return (
    <div
      className={`h-full bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${open ? "w-64" : "w-20"}`}
    >
      <Link href="/" className="p-6 flex items-center gap-3 border-b">
        <div className="w-10 h-10 bg-(--primary) rounded-xl flex items-center justify-center text-white font-bold text-2xl">
          K
        </div>
        {open && (
          <span className="font-semibold text-xl tracking-tight text-(--primary)">
            KeyCraft
          </span>
        )}
      </Link>

      <button
        onClick={toggleSidebar}
        className="absolute right-3 top-8 bg-white border border-gray-200 rounded-full p-1.5 shadow-md"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-(--primary) text-white shadow-sm"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <item.icon size={20} />
                  {open && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50">
          <div className="w-9 h-9 bg-gray-200 rounded-full" />
          {open && (
            <div>
              <p className="font-medium text-sm">Admin User</p>
              <p className="text-xs text-gray-500">admin@keyforge.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
