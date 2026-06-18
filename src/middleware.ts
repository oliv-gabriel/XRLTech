import { auth } from "@/auth"

export default auth((req) => {
  const isAdmin = req.auth?.user?.role === "ADMIN";
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminPage && !isAdmin) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  if (isAuthPage && isAdmin) {
    return Response.redirect(new URL("/admin", req.nextUrl));
  }
})

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
