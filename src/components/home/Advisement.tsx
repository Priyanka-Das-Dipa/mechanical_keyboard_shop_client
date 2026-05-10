import {
  Coins,
  Headset,
  Lock,
  RefreshCw,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";

const tickerItems = [
  { icon: Truck, label: "Free Shipping on $49+", color: "text-sky-400" },
  { icon: Headset, label: "24/7 Expert Support", color: "text-amber-400" },
  { icon: ShieldCheck, label: "2-Year Warranty", color: "text-violet-400" },
  { icon: RefreshCw, label: "30-Day Returns", color: "text-rose-400" },
  { icon: Coins, label: "Lowest Delivery Charge", color: "text-emerald-400" },
  { icon: Lock, label: "Secure Checkout", color: "text-teal-400" },
  { icon: Star, label: "Top-Rated Store", color: "text-sky-400" },
];

export default function Advisement() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <>
      <div className="overflow-hidden w-full relative pt-26">
        <div className="bg-gradient-to-r from-[#020617] via-[#0f172a] to-[#020617] border-y border-white/5 py-8">
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#020617] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#020617] to-transparent pointer-events-none" />

          <div className="flex w-max gap-6 animate-ticker hover:[animation-play-state:paused]">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <span
                  key={i}
                  className="flex items-center gap-2 px-7 whitespace-nowrap text-sm font-semibold text-[#94a3b8]"
                >
                  <Icon size={16} className={item.color} />
                  {item.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
