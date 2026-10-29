"use client";

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

export default function Navbar() {

  // Next.js Navigation
  const pathname = usePathname();
  const router = useRouter();

  // Authentication State
  const {
    user,
    loading,
    refreshUser
  } = useAuth();

  // Active Navigation Styling
  function navLinkClasses(path: string) {
    const active = pathname === path;

    return `
      px-3
      py-2
      rounded-lg
      transition-colors
      ${
        active
          ? "bg-blue-600 text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }
    `;
  }

  // Handle Logout
    async function handleLogout() {
      await fetch("/api/logout", {
        method: "POST",
      });

      await refreshUser();

      router.push("/login");
    }

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <nav
         aria-label="Main navigation"
         className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4"
      >
        {/* Left Side */}
        <div className="flex items-center gap-10">
          {/* Application Logo */}
          <Link
             href="/"
             className="text-xl font-bold tracking-tight"
          >
            DevConnect
          </Link>

          {/* Primary Navigation */}
          <ul
             role="list"
             className="flex items-center gap-2"
          >
            <li>
              <Link
                 href="/"
                 className={navLinkClasses("/")}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                 href="/about"
                 className={navLinkClasses("/about")}
              >
                About
              </Link>
            </li>

            <li>
              <Link
                 href="/posts"
                 className={navLinkClasses("/posts")}
              >
                Discover
              </Link>
            </li>

            {/* Messages Only Visible For Authenticated Users */}
            {user && (
              <li>
                <Link
                   href="/messages"
                   className={navLinkClasses("/account/messages")}
                >
                  Messages
                </Link>
              </li>
            )}

            {/* Logged In User's Profile Only Visible For Authenticated Users */}
            {user && (
              <li>
                <Link
                   href="/myprofile"
                   className={navLinkClasses("/profile/[id]")}
                >
                  My Profile
                </Link>
              </li>
            )}

            {/* Logged In User's Account Only Visible For Authenticated Users */}
            {user && (
              <li>
                <Link
                   href="/account"
                   className={navLinkClasses("/account")}
                >
                  My Account
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Right Side */}
        <div>
          {/* Authentication Still Loading */}
          {loading ? (
            <p className="text-sm text-gray-500">
              Loading...
            </p>
          ) : user ? (
            // Logged In Navigation
            <div className="flex items-center gap-4">
              <span
                 className="rounded-full bg-gray-1000 px-3 py-1 text-sm font-medium"
                 aria-label={`Logged in as ${user.username}`}
              >
                {user.username}
              </span>

              <button
                 onClick={handleLogout}
                 className="rounded-lg border border-red-300 px-4 py-2 text-red-600 transition hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          ) : (
            // Guest Navigation
            <div className="flex items-center gap-3">
              <Link
                 href="/login"
                 className="rounded-lg px-4 py-2 text-gray-600 transition hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                 href="/register"
                 className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}