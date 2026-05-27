"use client";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/src/redux/features/user/userApi";
import toast from "react-hot-toast";

export default function AllUserPage() {
  const { data: users, isLoading } = useGetAllUsersQuery();

  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleRoleChange = async (userId: string, role: "user" | "admin") => {
    try {
      await updateUserRole({
        userId,
        role,
      }).unwrap();

      toast.success("Role updated successfully");
    } catch (error) {
      toast.error("Failed to update role");
      console.error(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="text-gray-700">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Name</th>

              <th className="border p-3 text-left">Email</th>

              <th className="border p-3 text-left">Role</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user) => (
              <tr key={user?._id}>
                <td className="border p-3">{user?.name}</td>

                <td className="border p-3">{user?.email}</td>

                <td className="border p-3">
                  <select
                    value={user?.role}
                    onChange={(e) =>
                      handleRoleChange(
                        user._id,
                        e.target.value as "user" | "admin",
                      )
                    }
                    className="border px-3 py-2 rounded"
                  >
                    <option value="user">User</option>

                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
