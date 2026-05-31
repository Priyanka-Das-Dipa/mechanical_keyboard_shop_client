import { Product } from "@/src/redux/features/product/product.type";
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
          {products.map((product, index) => {
            const imageUrl =
              product?.images?.length > 0
                ? `https://mechanical-keyboard-shop-server-ea2u.onrender.com${product?.images[0]}`
                : "/b3.png";

            return (
              <tr key={product?._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>

                <td className="px-6 py-4 font-medium text-gray-800">
                  {product?.name}
                </td>

                {/* IMAGE COLUMN (ONLY FIRST IMAGE) */}
                <td className="px-6 py-4">
                  <Image
                    src={imageUrl}
                    alt={product?.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-cover rounded-md border"
                    unoptimized
                  />
                </td>

                <td className="px-6 py-4 text-gray-800">{product?.brand}</td>

                <td className="px-6 py-4 text-gray-800">{product?.quantity}</td>

                <td className="px-6 py-4 font-medium text-gray-800">
                  {product?.currency} {product?.price}
                </td>

                <td className="px-6 py-4 text-right space-x-3">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <SquarePen />
                  </button>

                  <button
                    onClick={() => onDelete(product)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
