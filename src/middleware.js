import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/signin";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/admin", request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
};

// see matching paths below
export const config = {
  matcher: ["/", "/admin", "/signin"],
};
