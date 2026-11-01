"use client";

import type { Post } from "@/types/Post";
import PostOptions from "@/components/posts/PostOptions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

export default function DashboardPage() {
    // Auth And Router
    const { user, loading } = useAuth();
    const router = useRouter();

    // UI State
    const [posts, setPosts] = useState<Post[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [error, setError] = useState("");

    // Auth Guard
    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    // Fetch Current Authorized User's Posts
    useEffect(() => {
        async function fetchPosts() {
            try {
                setError("");

                const res = await fetch("/api/posts/mine");

                const data = await res.json()

                if (!res.ok) {
                    throw new Error(
                        data.error || "Failed To Load Posts"
                    );
                }

                setPosts(
                    Array.isArray(data) ? data : []
                );
            } catch (err) {
                console.error("Account post loading error:", err);

                setError("Unable to load your posts. Please try again.");
            } finally {
                setLoadingPosts(false);
            }
        }

        if (user) {
            fetchPosts();
        }
    }, [user]);

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

    // Loading State
    if (loading || loadingPosts) {
        return (
            <main
               className="max-w-6xl mx-auto px-6 py-12"
               aria-busy="true"
               aria-live="polite"
            >
                <p className="text-gray-500">
                    Loading Your Account...
                </p>
            </main>
        );
    }

    if (!user) return null;

    return (
        <main
            className="max-w-6xl mx-auto px-6 py-12 space-y-10"
            aria-labelledby="account-title"
        >
            <section className="space-y-2">
                <h1
                    id="account-title"
                    className="text-4xl font-bold tracking-tight"
                >
                    {`Your Account, ${user.username}`}
                </h1>

                <p className="text-gray-500">
                    Welcome Back{" "}
                    <span className="font-medium text-gray-700">
                        {user.username}
                    </span>
                    . Manage your posts and account from one place.
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
                aria-label="User account summary"
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

                    <div>
                        <p className="text-sm text-gray-500">
                            Posts Written
                        </p>

                        <p className="text-3xl font-bold text-blue-600">
                            {posts.length}
                        </p>
                    </div>
                </div>
            </section>

            {/* Section To Manage Posts */}
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

            {posts.length === 0 ? (
                <section
                   className="rounded-2xl border bg-white p-12 text-center shadow-sm"
                >
                    <h3 className="text-xl font-semibold">
                        No Posts Yet
                    </h3>

                    <p className="mt-3 text-gray-500">
                        Your published posts will appear here.
                    </p>

                    <button
                       onClick={() =>
                        router.push("/posts/new")
                       }
                       className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
                    >
                        Create Your First Post
                    </button>
                </section>
            ) : (
                <section
                    className="space-y-4"
                    aria-label="User posts list"
                >
                    {posts.map((post) => (
                        <article
                           key={post._id}
                           className="rounded-2xl border bg-white p-6 shadow-sm"
                        >
                            <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
                                <div>
                                    <h3 className="text-xl font-semibold">
                                        {post.title}
                                    </h3>
                                </div>

                                <div className="flex gap-3">
                                    <PostOptions postId={post._id} />
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            )
                }
        </main>
    );
}