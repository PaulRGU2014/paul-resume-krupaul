import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const [AUTH_USER, AUTH_PASS] = (process.env.HTTP_BASIC_AUTH || ":").split(":");

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Skip authentication if HTTP_BASIC_AUTH is not set
  if (!process.env.HTTP_BASIC_AUTH) {
    return response;
  }

  // Step 1. HTTP Basic Auth Proxy for Challenge
  if (!isAuthenticated(request)) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }

  return response;
}

// Step 2. Check HTTP Basic Auth header if present
function isAuthenticated(req: NextRequest) {
  const authheader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (!authheader) {
    return false;
  }

  const auth = Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  const user = auth[0];
  const pass = auth[1];

  return user === AUTH_USER && pass === AUTH_PASS;
}

// Step 3. Configure "Matching Paths" below to protect routes with HTTP Basic Auth
export const config = {
  matcher: "/:path*",
};
