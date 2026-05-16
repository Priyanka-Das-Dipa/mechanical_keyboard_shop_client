import { Product } from "@/src/utilities/types/product.type";
import { SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Brand
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product, index) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {index + 1}
              </td>
              <td className="px-6 py-4 text-gray-800 whitespace-nowrap font-medium">
                {product.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-16 h-16 relative rounded-md overflow-hidden border">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4 text-gray-800 whitespace-nowrap">
                {product.brand}
              </td>
              <td className="px-6 text-gray-800 py-4 whitespace-nowrap">
                {product.quantity}
              </td>
              <td className="px-6 text-gray-800 py-4 whitespace-nowrap font-medium">
                {product.currency} {product.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition"
                  title="Edit"
                >
                  <SquarePen />
                </button>
                <button
                  onClick={() => onDelete(product)}
                  className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition"
                  title="Delete"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
