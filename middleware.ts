import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getToken } from "next-auth/jwt";
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";

  const payload = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log("Access token : ", payload);

  if (path.startsWith("/admin") && payload?.role !== "admin"){
    return NextResponse.json({
      status : 401,
      error : "only admins"
    })
  }


  // Redirect logged-in users away from public paths
  if (isPublicPath && payload) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!isPublicPath && !payload) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/profile/:path*", "/admin/:path*"],
};
