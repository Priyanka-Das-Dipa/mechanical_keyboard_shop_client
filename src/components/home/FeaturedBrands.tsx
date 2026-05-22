// import { brands } from "@/src/utilities/fakeData/ProductData";
// import Image from "next/image";

// export default function FeaturedBrands() {
//   return (
//     <section className="py-24 bg-[#0f172a]">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl font-bold text-center mb-12">
//           Top Keyboard Brands
//         </h2>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
//           {brands.map((brand) => (
//             <a
//               key={brand.name}
//               href={brand.url}
//               className="group flex flex-col items-center justify-center p-8 bg-(--card-bg) border border-[var(--border-color)] rounded-3xl hover:border-primary/40 hover:scale-105 transition-all duration-300"
//             >
//               <div className="relative h-16 w-40 mb-6">
//                 <Image
//                   src={brand.logo}
//                   alt={brand.name}
//                   fill
//                   className="object-contain opacity-90 group-hover:opacity-100 transition"
//                 />
//               </div>
//               <p className="font-medium text-lg">{brand.name}</p>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import React from 'react'

export default function FeaturedBrands() {
  return (
    <div>FeaturedBrands</div>
  )
}
