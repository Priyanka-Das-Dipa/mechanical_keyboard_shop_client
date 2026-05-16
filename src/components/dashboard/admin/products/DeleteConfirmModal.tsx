import { Product } from "@/src/utilities/types/product.type";

interface Props {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onConfirm: (id: string | number) => void;
}

export default function DeleteConfirmModal({ isOpen, product, onClose, onConfirm }: Props) {
  if (!isOpen || !product) return null;

  const handleDelete = async () => {
    await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
    onConfirm(product.id);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <h3 className="text-2xl font-semibold text-red-600 mb-2">Delete Product</h3>
        <p className="text-gray-600 mb-8">
          Are you sure you want to delete <strong>{product.name}</strong>? 
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}