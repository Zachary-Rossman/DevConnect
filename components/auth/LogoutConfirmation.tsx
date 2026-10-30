"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutConfirmation() {
    // Next.js Navigation
    const router = useRouter();

    // Authentication State
    const { refreshUser } = useAuth();

    // Logout State
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState("");

    // Handle Logout
    async function handleLogout() {
        try {
            setLoading(true);
            setError("");

            const response = await fetch("/api/logout", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Unable to log out. Please try again.");
            }

            // Update Authentication State
            await refreshUser();

            // Redirect After Successful Logout
            router.replace("/login");
        } catch (error) {
            console.error("Logout error:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while logging out."
            );
            setLoading(false);
        }
    }

    return (
        <main
           className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6 py-12 bg-gray-50"
           aria-labelledby="logout-title"
        >
            {/* Centered Container */}
            <div className="w-full max-w-md space-y-6">
                {/* Header Section */}
                <header className="text-center space-y-2">
                    <h1
                       id="logout-title"
                       className="text-3xl font-bold tracking-tight text-gray-900"
                    >
                        Are you sure you want to logout?
                    </h1>

                    <p className="text-sm text-gray-600">
                        You will need to log in again to access your account.
                    </p>
                </header>

                {/* Logout Confirmation Container */}
                <section className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
                    {/* Error Message */}
                    {error && (
                        <p
                           role="alert"
                           className="text-sm text-red-600 text-center"
                        >
                            {error}
                        </p>
                    )}

                    {/* Confirmation Buttons */}
                    <div className="flex items-center justify-center gap-4">
                        <button
                           type="button"
                           onClick={handleLogout}
                           disabled={loading}
                           className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Logging out..." : "Log Out"}
                        </button>

                        <Link
                           href="/feed"
                           className="rounded-lg border px-5 py-2 text-gray-600 transition hover:bg-gray-100"
                        >
                            Cancel
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}