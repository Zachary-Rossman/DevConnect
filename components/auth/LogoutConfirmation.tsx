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
            className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[linear-gradient(135deg,#09183f_0%,#243d87_52%,#783b87_100%)] px-4 py-12 sm:px-6 sm:py-16"
            aria-labelledby="logout-title"
        >
            {/* Centered Container */}
            <div className="w-full max-w-md space-y-6 rounded-3xl border border-[#b8c6ff]/30 bg-white/95 p-6 shadow-[0_25px_70px_rgba(6,17,55,0.30)] sm:p-10">
                {/* Header Section */}
                <header className="space-y-3 text-center">
                    <h1
                        id="logout-title"
                        className="bg-[linear-gradient(90deg,#172653_0%,#354b97_45%,#a32972_100%)] bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl"
                    >
                        Are you sure you want to logout?
                    </h1>

                    <p className="text-sm leading-7 text-[#536382]">
                        You will need to log in again to access your account.
                    </p>
                </header>

                {/* Logout Confirmation Container */}
                <section className="space-y-5 rounded-2xl border border-[#eed7ec] bg-[linear-gradient(145deg,#ffffff_0%,#fff4fb_100%)] p-6 shadow-[0_8px_30px_rgba(35,50,104,0.05)]">
                    {/* Error Message */}
                    {error && (
                        <p
                            role="alert"
                            className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-center text-sm font-medium text-rose-800"
                        >
                            {error}
                        </p>
                    )}

                    {/* Confirmation Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={loading}
                            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#b42347] px-6 py-3 font-bold text-white shadow-[0_8px_22px_rgba(180,35,71,0.18)] transition-colors hover:bg-[#921b39] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Logging out..." : "Log Out"}
                        </button>

                        <Link
                            href="/feed"
                            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#a8bff1] bg-white px-6 py-3 font-bold text-[#243f8f] transition-colors hover:bg-[#edf3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972]"
                        >
                            Cancel
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}