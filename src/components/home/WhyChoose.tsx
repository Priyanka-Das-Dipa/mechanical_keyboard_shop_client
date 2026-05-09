export default function WhyChoose() {
  const whyChooseData = [
    {
      icon: "⚡",
      title: "Unmatched Feel",
      desc: "Each keypress delivers satisfying tactile feedback and a distinctive sound that membrane keyboards simply can't match.",
      highlight: "Faster & more accurate typing",
      gradient: "from-sky-500 to-indigo-500",
    },
    {
      icon: "🏗️",
      title: "Built to Last",
      desc: "Mechanical switches are rated for 50–100 million keystrokes — 10x longer than typical membrane keyboards.",
      highlight: "Investment that lasts years",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: "🎨",
      title: "Endless Customization",
      desc: "From switches and keycaps to lighting and layouts — make your keyboard truly yours.",
      highlight: "Reflect your unique style",
      gradient: "from-emerald-500 to-cyan-500",
    },
  ];

 
  return (
    <>
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-sky-500/10 to-indigo-500/10 text-sky-400 text-sm font-medium px-6 py-2.5 rounded-full border border-sky-500/20 mb-6">
              <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
              PREMIUM TYPING EXPERIENCE
            </div>

            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter bg-linear-to-br from-white via-sky-100 to-slate-300 bg-clip-text text-transparent">
              Why Choose Mechanical Keyboards?
            </h2>

            <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto">
              Experience the superior feel, durability, and precision that only
              mechanical switches can deliver.
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseData.map((item, index) => (
              <div
                key={index}
                className="group bg-linear-to-br from-slate-900/80 to-slate-950/80 border border-slate-700/50 hover:border-sky-500/30 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-500/10"
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center bg-linear-to-br ${item.gradient} text-white rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-3xl">{item.icon}</span>
                </div>

                <h3 className="text-2xl font-semibold mb-3 text-white">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>

                <div className="mt-8 pt-6 border-t border-slate-700 text-sm text-sky-400 flex items-center gap-2 font-medium">
                  <span>→</span> {item.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Gradient */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>
    </>
  );
}
