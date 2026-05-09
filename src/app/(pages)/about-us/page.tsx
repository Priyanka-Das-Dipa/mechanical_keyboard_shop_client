export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="pt-24 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0ea5e920_0%,transparent_60%)]" />

        <div className="relative max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight mb-6">
            We don’t just sell keyboards.
            <br />
            <span className="text-(--primary)">We craft experiences.</span>
          </h1>
          <p className="text-2xl text-(--muted-text) max-w-2xl mx-auto">
            Premium mechanical keyboards for those who understand the difference
            between typing and feeling.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="glass p-12 md:p-16 rounded-3xl">
          <h2 className="text-4xl font-semibold mb-8">Our Story</h2>
          <div className="space-y-6 text-lg text-(--muted-text) leading-relaxed">
            <p>
              Founded by keyboard enthusiasts in 2024, we noticed a gap in the
              market — a lack of transparency, quality curation, and genuine
              passion in the mechanical keyboard space.
            </p>
            <p>
              So we decided to build something better. A destination where every
              product is handpicked, every switch is tested, and every customer
              is treated like a fellow builder.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-6xl mx-auto px-6 pb-28">
        <h2 className="text-4xl font-semibold text-center mb-12">Our Values</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "⌨️",
              title: "Typing Experience First",
              desc: "Sound, feel, and feedback are non-negotiable.",
            },
            {
              icon: "🔍",
              title: "Radical Transparency",
              desc: "We show you exactly what’s inside every board.",
            },
            {
              icon: "👥",
              title: "Community First",
              desc: "Built by enthusiasts, for enthusiasts.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="glass p-10 rounded-3xl hover:border-sky-400/30 transition-all group"
            >
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-(--muted-text)">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
