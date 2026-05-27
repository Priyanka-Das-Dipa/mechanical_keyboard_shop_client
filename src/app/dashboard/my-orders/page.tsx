/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetMyOrdersQuery } from "@/src/redux/features/user/userApi";

export default function MyOrderPage() {
  const { data, isLoading, error } = useGetMyOrdersQuery({});

  const orders = data || [];

  if (isLoading) {
    return <div className="p-10">Loading Orders...</div>;
  }

  if (error) {
    return <div className="p-10">Failed to load orders</div>;
  }

  return (
    <section className="text-gray-700">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">My Orders</h1>

        <p className="text-gray-500 mt-2">
          Track your purchases and delivery status
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order: any,) => (
          <div key={order?._id} className="border  border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <h2 className="text-2xl font-semibold">
                  Order #{order?._id.slice(-6)}
                </h2>

                <p className="text-gray-500 mt-1">
                  {new Date(order?.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium
                  ${
                    order?.paymentStatus === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order?.paymentStatus === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order?.paymentStatus === "paid"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order?.paymentStatus}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {order?.products?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-b-gray-300 pb-3"
                >
                  <div>
                    <p className="font-medium">
                      Product ID:
                      {item?.productId}
                    </p>

                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <div className="font-semibold">USD {item?.price}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="font-medium">Delivery Address</p>

                <p className="text-gray-500">{order?.deliveryAddress}</p>
              </div>

              <div className="text-2xl font-bold">USD {order?.totalAmount}</div>
            </div>
          </div>
        ))}

        {orders?.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-semibold">No Orders Yet</h2>

            <p className="text-gray-500 mt-3">
              Your purchased products will appear here
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
