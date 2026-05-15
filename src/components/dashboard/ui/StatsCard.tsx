import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  color?: string;
}

export default function StatsCard({ title, value, change, icon: Icon, color = '#0ea5e9' }: StatsCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 hover:shadow-xl transition-all">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-4xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <Icon size={28} style={{ color }} />
        </div>
      </div>
      {change && (
        <p className="text-sm mt-4 text-emerald-600 flex items-center gap-1">
          ↑ {change} from last month
        </p>
      )}
    </div>
  );
}