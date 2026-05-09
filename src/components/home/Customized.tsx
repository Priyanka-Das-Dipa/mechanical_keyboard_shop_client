export default function Customized() {
  const customizableOptions = [
    {
      emoji: "🔄",
      title: "Switches",
      subtitle: "Linear • Tactile • Clicky",
      desc: "Gateron, Cherry, Kailh, and more — choose your perfect feel and sound profile.",
      color: "sky",
      gradient: "from-violet-900/80 to-fuchsia-900/80",
    },
    {
      emoji: "⌨️",
      title: "Keycaps",
      subtitle: "Premium Profiles",
      desc: "PBT, doubleshot, artisan — hundreds of colors, legends & materials.",
      color: "amber",
      gradient: "from-amber-900/80 to-orange-900/80",
    },
    {
      emoji: "🌈",
      title: "Lighting",
      subtitle: "Per-Key RGB",
      desc: "Stunning animations, reactive effects, and full software control.",
      color: "cyan",
      gradient: "from-emerald-900/80 to-cyan-900/80",
    },
    {
      emoji: "📐",
      title: "Layout & Case",
      subtitle: "75% • TKL • 65% • 60%",
      desc: "Choose your ideal size, case material, and color theme.",
      color: "violet",
      gradient: "from-rose-900/80 to-purple-900/80",
    },
  ];
  return (
    <div>
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
              Make It{" "}
              <span className="bg-linear-to-r from-sky-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Uniquely Yours
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-lg mx-auto">
              From switches to aesthetics — every detail is fully customizable
            </p>
          </div>

          {/* Customizable Options Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customizableOptions.map((option, index) => (
              <div
                key={index}
                className="group bg-slate-900/70 border border-slate-700 hover:border-sky-400/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/50"
              >
                {/* Visual Header */}
                <div
                  className={`h-56 bg-linear-to-br ${option.gradient} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="text-7xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {option.emoji}
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(at_center,#0ea5e950_10%,transparent_70%)]" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div
                    className={`uppercase text-xs tracking-widest text-${option.color}-400 mb-2 font-medium`}
                  >
                    {option.title}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">
                    {option.subtitle}
                  </h3>
                  <p className="text-slate-400 text-[15px] leading-relaxed">
                    {option.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
