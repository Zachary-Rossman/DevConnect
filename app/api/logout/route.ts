import { NextResponse } from "next/server";

// ======================================================
// LOGOUT ROUTE
// ======================================================
// This API route handles logging a user out of the system.
//
// What it does:
// 1. Redirects the user to /login
// 2. Deletes the authentication cookie ("auth_token")
//
// This effectively ends the user's session on the client
// because all protected routes rely on this cookie.
//
// IMPORTANT:
// - No database interaction is needed here
// - No JWT verification is needed here
// - We simply remove the session token
// ======================================================

export async function POST(request: Request) {
  // Create redirect response to login page
  const response = NextResponse.redirect(
    new URL("/login", request.url)
  );

  // Remove authentication cookie to invalidate session
  response.cookies.delete("auth_token");

  return response;
}