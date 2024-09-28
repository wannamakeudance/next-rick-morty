import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  // Check cookies or user data (mocked here for demonstration)
  const username = request.cookies.get("username")?.value;
  const jobTitle = request.cookies.get("jobTitle")?.value;

  // Redirect if the user is missing required data and is not on the root path
  if ((currentPath !== "/" && !username) || !jobTitle) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Apply middleware only to specific paths
export const config = {
  matcher: ["/info/:path*"],
};
