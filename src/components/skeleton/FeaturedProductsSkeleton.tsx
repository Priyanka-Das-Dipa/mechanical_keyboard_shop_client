export default function FeaturedProductsSkeleton() {
  return (
    <section className="container mx-auto bg-[#020817] px-6 py-10 animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="h-8 w-64 bg-slate-800 rounded-md mb-3" />
          <div className="h-4 w-44 bg-slate-800 rounded-md" />
        </div>

        <div className="h-5 w-32 bg-slate-800 rounded-md mt-2" />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-cyan-900/40 bg-[#071224] overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-52 bg-slate-800">
              {/* Badge */}
              <div className="absolute top-3 right-3 h-6 w-16 rounded-full bg-green-900/40" />

              {/* Optional Floating Buttons */}
              {item === 2 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                  <div className="h-9 w-24 rounded-full bg-slate-700" />
                  <div className="h-9 w-28 rounded-full bg-cyan-900/60" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Brand */}
              <div className="h-3 w-16 bg-slate-700 rounded mb-4" />

              {/* Product Name */}
              <div className="space-y-2 mb-4">
                <div className="h-5 w-52 bg-slate-700 rounded" />
              </div>

              {/* Rating */}
              <div className="flex gap-2 mb-5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className="w-4 h-4 rounded-full bg-slate-700"
                  />
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-800 mb-4" />

              {/* Price + Left */}
              <div className="flex items-center justify-between mb-5">
                <div className="h-7 w-24 bg-slate-700 rounded" />
                <div className="h-4 w-10 bg-slate-800 rounded" />
              </div>

              {/* Button */}
              <div className="h-11 w-full rounded-xl bg-cyan-950/60 border border-cyan-900/50" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Button */}
      <div className="flex justify-center mt-12">
        <div className="h-12 w-52 rounded-2xl bg-slate-800" />
      </div>
    </section>
  );
}
