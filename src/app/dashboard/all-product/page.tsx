/* eslint-disable react-hooks/immutability */
"use client";
import DeleteConfirmModal from "@/src/components/dashboard/admin/products/DeleteConfirmModal";
import EditProductModal from "@/src/components/dashboard/admin/products/EditProductModal";
import ProductTable from "@/src/components/dashboard/admin/products/ProductTable";
import AllProductTableSkeleton from "@/src/components/skeleton/AllProductTableSkeleton";
import { Product } from "@/src/redux/features/product/product.type";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "@/src/redux/features/product/productApi";
import { useState } from "react";

export default function AllProductPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading, error } = useGetAllProductsQuery({ limit: 50 });
  console.log(data, "admin all data");

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const products = data?.data || []; // IMPORTANT FIX

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  // UPDATE PRODUCT
  const handleUpdateSuccess = async (updated: Product) => {
    try {
      await updateProduct({
        id: updated?._id,
        data: updated,
      }).unwrap();

      setIsEditModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE PRODUCT
  const handleDeleteSuccess = async (id: string | number) => {
    try {
      await deleteProduct(String(id)).unwrap();

      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <AllProductTableSkeleton />;
  if (error)
    return <div className="p-8">Error occurred while fetching products.</div>;

  return (
    <div className="min-h-screen px-4">
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
