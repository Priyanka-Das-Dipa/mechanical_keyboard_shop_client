/* eslint-disable react-hooks/immutability */
"use client";
import DeleteConfirmModal from "@/src/components/dashboard/admin/products/DeleteConfirmModal";
import EditProductModal from "@/src/components/dashboard/admin/products/EditProductModal";
import ProductTable from "@/src/components/dashboard/admin/products/ProductTable";
import { Product } from "@/src/utilities/types/product.type";
import { useEffect, useState } from "react";

import img1 from "../../../../public/b1.png";
import img2 from "../../../../public/b2.webp";
import img3 from "../../../../public/b3.png";

const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Feroz Keyboard",
    brand: "Feroz",
    price: 100,
    currency: "INR",
    quantity: 28,
    rating: 4.5,
    reviewCount: 124,
    description: "High quality mechanical keyboard with RGB lighting",
    features: ["Mechanical Switches", "RGB Backlit", "Aluminum Frame"],
    image: img1.src || "/b1.png",
  },
  {
    id: "2",
    name: "White Keyboard Eye Catchy",
    brand: "Logitech",
    price: 2100,
    currency: "INR",
    quantity: 21,
    rating: 4.7,
    reviewCount: 89,
    description: "Premium white mechanical keyboard with sleek design",
    features: ["Low Profile Keys", "Wireless", "Ergonomic"],
    image: img2.src || "/b2.webp",
  },
  {
    id: "3",
    name: "Logitech POP KEYS",
    brand: "Logitech",
    price: 1600,
    currency: "INR",
    quantity: 22,
    rating: 4.6,
    reviewCount: 203,
    description: "Colorful and fun mechanical keyboard",
    features: ["Customizable Keys", "Emoji Keys", "Bluetooth"],
    image: img1.src || "/b1.png",
  },
  {
    id: "4",
    name: "Razer Huntsman Elite",
    brand: "Razer",
    price: 3000,
    currency: "INR",
    quantity: 27,
    rating: 4.8,
    reviewCount: 156,
    description: "Premium gaming keyboard with optical switches",
    features: ["Optical Switches", "RGB Chroma", "Media Controls"],
    image: img3.src || "/b1.png",
  },
  {
    id: "5",
    name: "Extream Craft",
    brand: "Extream",
    price: 2500,
    currency: "INR",
    quantity: 26,
    rating: 4.4,
    reviewCount: 67,
    description: "Custom mechanical keyboard for enthusiasts",
    features: ["Hot Swappable", "Gasket Mount", "South Facing LEDs"],
    image: img2.src || "/b2.webp",
  },
  {
    id: "6",
    name: "TechMaster Programmable",
    brand: "A4 Tech",
    price: 2400,
    currency: "INR",
    quantity: 29,
    rating: 4.3,
    reviewCount: 45,
    description: "Fully programmable macro keyboard",
    features: ["Macro Keys", "Durable Build", "USB Passthrough"],
    image: img1.src || "/b1.png",
  },
];
export default function AllProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Fetch products
  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const fetchProducts = async () => {
  //   try {
  //     const res = await fetch("/api/products");
  //     const data = await res.json();
  //     setProducts(data);
  //   } catch (error) {
  //     console.error("Failed to fetch products:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      setProducts(dummyProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateSuccess = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteSuccess = (id: string | number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  if (loading) return <div className="p-8">Loading products...</div>;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="container mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">All Products</h1>
          <p className="text-gray-600 mt-2">Fill all required information</p>
        </div>
      </div>

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* Modals */}
      <EditProductModal
        isOpen={isEditModalOpen}
        product={selectedProduct}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        onSuccess={handleUpdateSuccess}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        product={productToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={handleDeleteSuccess}
      />
    </div>
  );
}
