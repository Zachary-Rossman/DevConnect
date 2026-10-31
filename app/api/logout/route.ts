import { NextResponse } from "next/server";

// LOGOUT ROUTE
export async function POST(request: Request) {
  // Create redirect response to login page
  const response = NextResponse.redirect(
    new URL("/login", request.url)
  );

  // Remove authentication cookie to invalidate session
  response.cookies.delete("auth_token");

  return response;
}