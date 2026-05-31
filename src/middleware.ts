// import { NextRequest, NextResponse } from "next/server";
// import { jwtDecode } from "jwt-decode";

// interface DecodedToken {
//   userId: string;
//   email: string;
//   role: "user" | "admin";
// }

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("token")?.value;

//   const pathname = request.nextUrl.pathname;

//   // =========================
//   // PROTECT DASHBOARD
//   // =========================

//   if (pathname.startsWith("/dashboard")) {
//     // NO TOKEN
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     try {
//       const decoded: DecodedToken = jwtDecode(token);

//       // =========================
//       // ADMIN ROUTES
//       // =========================

//       const adminRoutes = [
//         "/dashboard/all-users",
//         "/dashboard/all-product",
//         "/dashboard/add-product",
//         "/dashboard/all-orders",
//       ];

//       const isAdminRoute = adminRoutes.some((route) =>
//         pathname.startsWith(route),
//       );

//       // USER TRYING TO ACCESS ADMIN PAGE
//       if (isAdminRoute && decoded.role !== "admin") {
//         return NextResponse.redirect(new URL("/dashboard", request.url));
//       }
//     } catch (error) {
//       console.log(error);

//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

import { NextRequest, NextResponse } from "next/server";

interface DecodedToken {
  userId: string;
  email: string;
  role: "user" | "admin";
}

// Safer JWT decode for Edge runtime
function decodeJWT(token: string): DecodedToken | null {
  try {
    const base64Payload = token.split(".")[1];
    if (!base64Payload) return null;

    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // =========================
  // PROTECT DASHBOARD ROUTES
  // =========================
  if (pathname.startsWith("/dashboard")) {
    // ❌ No token → redirect login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const decoded = decodeJWT(token);

    // ❌ Invalid token → force login
    if (!decoded) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const adminRoutes = [
      "/dashboard/all-users",
      "/dashboard/all-product",
      "/dashboard/add-product",
      "/dashboard/all-orders",
    ];

    const isAdminRoute = adminRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    );

    // ❌ User trying to access admin route
    if (isAdminRoute && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
