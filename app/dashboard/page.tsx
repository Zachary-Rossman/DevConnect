"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

export default function DashboardPage() {
    // Dashboard State
    const { user, loading } = useAuth();
    const router = useRouter();

    // UI State
    const [error, setError] = useState("");

    // Auth Guard
    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    // Loading State
    if (loading) {
        return (
            <main
                className="max-w-6xl mx-auto px-6 py-12"
                aria-busy="true"
                aria-live="polite"
            >
                <p className="text-gray-500">
                    Loading Dashboard...
                </p>
            </main>
        );
    }

    if (!user) return null;

    return (
        <main
            className="max-w-6xl mx-auto px-6 py-12 space-y-10"
            aria-labelledby="dashboard-title"
        >
            <section className="space-y-2">
                <h1
                    id="dashboard-title"
                    className="text-4xl font-bold tracking-tight"
                >
                    Dashboard
                </h1>

                <p className="text-gray-500">
                    Welcome Back{" "}
                    <span className="font-medium text-gray-700">
                        {user.username}
                    </span>
                </p>
            </section>

            {error && (
                <section
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
                >
                    {error}
                </section>
            )}

            <section
                className="rounded-2xl border bg-white p-6 shadow-sm"
                aria-label="User profile summary"
            >
                <div className="grid gap-6 md:grid-cols-3">
                    <div>
                        <p className="text-sm text-gray-500">
                            Username
                        </p>

                        <p className="font-semibold">
                            {user.username}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Email
                        </p>

                        <p className="font-semibold">
                            {user.email}
                        </p>
                    </div>
                </div>
            </section>

            {/* Future Section To Manage Posts */}
            <section className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                    My Posts
                </h2>
                
                <button
                    onClick={() =>
                        router.push("/posts/new")
                    }
                    className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Create Post
                </button>
            </section>
        </main>
    );
}