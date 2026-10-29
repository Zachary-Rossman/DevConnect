"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MessagesPage() {

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
            aria-labelledby="my-account-title"
        >
            <section className="space-y-2">
                <h1
                    id="my-account-title"
                    className="text-4xl font-bold tracking-tight"
                >
                    Messages
                </h1>
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
                </div>
            </section>

            {/* Future Section For Messages */}
            <section className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                    My Messages
                </h2>
            </section>
        </main>
    );
}