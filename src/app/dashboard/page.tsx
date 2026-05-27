"use client";

import StatsCard from "@/src/components/dashboard/ui/StatsCard";
import DashboardSkeleton from "@/src/components/skeleton/Dashboard";
import { useGetDashboardStatsQuery } from "@/src/redux/features/user/userApi";
import { useAppSelector } from "@/src/redux/store/hooks";
import { DollarSign, Package, TrendingUp, Users } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function DashboardMainPage() {
  const { data, isLoading } = useGetDashboardStatsQuery();

  const user = useAppSelector((state) => state.auth.user);

  if (isLoading) {
    return <DashboardSkeleton />;
  }
  return (
    <div className="space-y-8 ">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-xl mb-2 font-semibold text-black">{user?.role}</p>
        <p className="text-gray-500">
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Products"
          value={data?.totalOrders || 0}
          icon={Package}
        />
        <StatsCard
          title="Total Revenue"
          value={`$${data?.totalRevenue || 0}`}
          icon={DollarSign}
        />
        <StatsCard
          title="Monthly Orders"
          value={`${data?.salesData?.length || 0} Months`}
          icon={TrendingUp}
          change="+18%"
        />
        <StatsCard
          title="Active Customers"
          value={data?.totalUsers || 0}
          icon={Users}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-4 bg-white text-black border border-gray-100 rounded-3xl p-8">
          <div className="flex justify-between mb-8">
            <div>
              <h3 className="text-xl font-semibold">Revenue Trend</h3>
              <p className="text-gray-500 text-sm">Last 5 months</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data?.salesData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="natural"
                dataKey="sales"
                stroke="#0ea5e9"
                strokeWidth={4}
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-3 bg-white text-black border-gray-100 rounded-3xl p-8">
          <h3 className="text-xl font-semibold mb-6">Top Selling Keyboards</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data?.salesData || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="sales" fill="#0ea5e9" radius={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
