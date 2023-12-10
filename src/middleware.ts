// solution for authentication because jwttoken has crypto module which cannot be used in middleware
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./app/_lib/auth";

export async function middleware(request: NextRequest) {
  let token = request.cookies.get("jwt")?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const verifiedToken = await verifyAuth(token).catch((err) => {
    console.log(err);
  });

  if (!verifiedToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
