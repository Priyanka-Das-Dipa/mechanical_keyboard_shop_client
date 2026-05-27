"use client";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div>
        <div className="h-12 w-80 bg-gray-200 rounded-xl mb-4" />

        <div className="h-5 w-96 bg-gray-100 rounded-lg" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white border border-gray-100 rounded-3xl p-7"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-4 flex-1">
                <div className="h-5 w-28 bg-gray-200 rounded-lg" />

                <div className="h-10 w-24 bg-gray-300 rounded-lg" />

                {item === 3 && (
                  <div className="h-4 w-36 bg-gray-100 rounded-lg" />
                )}
              </div>

              <div className="w-14 h-14 rounded-2xl bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-8">
          <div className="mb-8">
            <div className="h-7 w-52 bg-gray-200 rounded-lg mb-3" />

            <div className="h-4 w-32 bg-gray-100 rounded-lg" />
          </div>

          {/* Fake Chart */}
          <div className="relative h-[320px] overflow-hidden rounded-2xl bg-gray-50">
            <div className="absolute inset-0 flex items-end gap-3 p-6">
              {[120, 80, 140, 110, 160, 90, 130].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gray-200 rounded-t-xl"
                  style={{ height }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="lg:col-span-3 bg-white border border-gray-100 rounded-3xl p-8">
          <div className="h-7 w-64 bg-gray-200 rounded-lg mb-8" />

          <div className="flex items-end justify-between h-[320px] gap-4">
            {[150, 230, 90, 180, 110, 260, 140].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-gray-200 rounded-t-2xl"
                style={{ height }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
