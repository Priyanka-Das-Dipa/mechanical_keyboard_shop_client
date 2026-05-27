/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/src/redux/features/user/userApi";
import toast from "react-hot-toast";

export default function AllOrdersPage() {
  const { data, isLoading, error } = useGetAllOrdersQuery({});

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const orders = data || [];

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus({
        orderId,
        status,
      }).unwrap();

      toast.success("Order status updated");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update status");
    }
  };

  if (isLoading) {
    return <div className="p-10">Loading Orders...</div>;
  }

  if (error) {
    return <div className="p-10">Failed to load orders</div>;
  }

  return (
    <div className=" text-black">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">All Orders</h1>

        <p className="text-gray-500 mt-2">Manage all customer orders</p>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full">
          <thead className="bg-blue-400 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left">No</th>
              <th className="px-6 py-4 text-left">Customer</th>

              <th className="px-6 py-4 text-left">Phone</th>

              <th className="px-6 py-4 text-left">Address</th>

              <th className="px-6 py-4 text-left">Amount</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order: any, index: number) => (
              <tr
                key={order?._id}
                className="border-b border-b-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <div>
                    <h3 className="font-semibold">{order?.customerName}</h3>

                    <p className="text-sm text-gray-500">
                      {order?.customerEmail}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4">{order?.customerPhone}</td>

                <td className="px-6 py-4 max-w-[250px]">
                  {order?.deliveryAddress}
                </td>

                <td className="px-6 py-4 font-semibold">
                  USD {order?.totalAmount}
                </td>

                <td className="px-6 py-4">
                  <select
                    value={order?.paymentStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="pending">Pending</option>

                    <option value="paid">Paid</option>

                    <option value="shipped">Shipped</option>

                    <option value="delivered">Delivered</option>

                    <option value="failed">Failed</option>
                  </select>
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(order?.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
