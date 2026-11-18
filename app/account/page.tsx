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
                className="flex min-h-[60vh] items-center justify-center bg-[linear-gradient(135deg,#edf3ff_0%,#fff0fa_50%,#eaf0ff_100%)] px-6 py-12"
                aria-busy="true"
                aria-live="polite"
            >
                <div className="w-full max-w-md rounded-3xl border border-[#e5d5f5] bg-white/90 px-8 py-12 text-center shadow-[0_20px_60px_rgba(35,50,104,0.10)]">

                    {/* Loading Spinner */}
                    <div
                        aria-hidden="true"
                        className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#d9e6ff] border-t-[#e76bb5] motion-reduce:animate-none"
                    />

                    <p className="mt-6 text-lg font-bold text-[#172653]">
                        Loading Account...
                    </p>
                </div>
            </main>
        );
    }

    // Loading State
    if (loading || loadingPosts) {
        return (
            <main
                className="flex min-h-[60vh] items-center justify-center bg-[linear-gradient(135deg,#edf3ff_0%,#fff0fa_50%,#eaf0ff_100%)] px-6 py-12"
                aria-busy="true"
                aria-live="polite"
            >
                <div className="w-full max-w-md rounded-3xl border border-[#e5d5f5] bg-white/90 px-8 py-12 text-center shadow-[0_20px_60px_rgba(35,50,104,0.10)]">

                    {/* Loading Spinner */}
                    <div
                        aria-hidden="true"
                        className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#d9e6ff] border-t-[#e76bb5] motion-reduce:animate-none"
                    />

                    <p className="mt-6 text-lg font-bold text-[#172653]">
                        Loading Your Account...
                    </p>
                </div>
            </main>
        );
    }


    if (!user) return null;

    // Render Page
    return (
        <main
            className="min-h-screen bg-[linear-gradient(180deg,#edf3ff_0%,#fff1fa_52%,#eef2ff_100%)] px-4 py-10 text-[#172653] sm:px-6 sm:py-14"
            aria-labelledby="account-title"
        >
            <div className="mx-auto max-w-6xl space-y-10">

                {/* Account Welcome Header */}
                <section className="relative overflow-hidden rounded-3xl border border-[#b6b8ec]/30 bg-[linear-gradient(120deg,#09183f_0%,#243d87_55%,#813a85_100%)] px-6 py-12 text-white shadow-[0_20px_60px_rgba(23,38,83,0.18)] sm:px-10 sm:py-16">

                    {/* Decorative Gradient Accents */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#ffafd8]/20 blur-3xl"
                    />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-[#77b7ff]/15 blur-3xl"
                    />

                    <div className="relative max-w-3xl space-y-5">

                        <h1
                            id="account-title"
                            className="break-words text-4xl font-black leading-tight tracking-tight sm:text-5xl"
                        >
                            {`Your Account, ${user.username}`}
                        </h1>

                        <p className="max-w-2xl text-base leading-8 text-[#e5eaff] sm:text-lg">
                            Welcome Back{" "}
                            <span className="font-bold text-[#ffc1e6]">
                                {user.username}
                            </span>
                            . Manage your posts and account from one place.
                        </p>
                    </div>

                    {/* Decorative Bottom Accent */}
                    <div
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-1 w-full bg-[linear-gradient(90deg,#89c5ff_0%,#ffabd8_55%,#b5a3ff_100%)]"
                    />
                </section>

                {/* Account Error State */}
                {error && (
                    <section
                        role="alert"
                        className="rounded-2xl border border-rose-300 bg-rose-50 px-6 py-5 font-medium text-rose-800 shadow-sm"
                    >
                        {error}
                    </section>
                )}

                {/* Account Summary */}
                <section
                    className="rounded-3xl border border-[#dce2f8] bg-white/90 p-6 shadow-[0_15px_45px_rgba(35,50,104,0.07)] sm:p-8"
                    aria-label="User account summary"
                >
                    <div className="grid gap-5 md:grid-cols-3">

                        {/* Username */}
                        <div className="rounded-2xl border border-[#d5e4ff] bg-[linear-gradient(135deg,#edf4ff_0%,#e8eeff_100%)] p-6">
                            <div className="mb-5 h-1 w-12 rounded-full bg-[#527cdb]" />

                            <p className="text-sm font-semibold text-[#53668f]">
                                Username
                            </p>

                            <p className="mt-3 break-words text-xl font-bold text-[#172653]">
                                {user.username}
                            </p>
                        </div>

                        {/* Email */}
                        <div className="rounded-2xl border border-[#f1d4ea] bg-[linear-gradient(135deg,#fff0f9_0%,#f9edff_100%)] p-6">
                            <div className="mb-5 h-1 w-12 rounded-full bg-[#d653a6]" />

                            <p className="text-sm font-semibold text-[#785776]">
                                Email
                            </p>

                            <p className="mt-3 break-all text-lg font-bold text-[#172653]">
                                {user.email}
                            </p>
                        </div>

                        {/* Posts Written */}
                        <div className="rounded-2xl border border-[#e3dbfa] bg-[linear-gradient(135deg,#f2edff_0%,#fceefd_100%)] p-6">
                            <div className="mb-5 h-1 w-12 rounded-full bg-[#9863d8]" />

                            <p className="text-sm font-semibold text-[#65577f]">
                                Posts Written
                            </p>

                            <p className="mt-3 text-4xl font-black text-[#a32972]">
                                {posts.length}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section To Manage Posts */}
                <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <h2 className="text-3xl font-black tracking-tight text-[#172653] sm:text-4xl">
                        My Posts
                    </h2>

                    <button
                        type="button"
                        onClick={() =>
                            router.push("/posts/new")
                        }
                        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#243f8f] px-6 py-3 font-bold text-white shadow-[0_8px_22px_rgba(36,63,143,0.20)] transition-colors hover:bg-[#3456ad] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972]"
                    >
                        Create Post
                    </button>
                </section>

                {/* Empty Posts State */}
                {posts.length === 0 ? (
                    <section className="relative overflow-hidden rounded-3xl border border-[#e6d8f4] bg-white px-6 py-16 text-center shadow-[0_15px_45px_rgba(35,50,104,0.08)] sm:px-12">

                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#ffc7e8]/30 blur-3xl"
                        />

                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#a8cfff]/25 blur-3xl"
                        />

                        <div className="relative mx-auto max-w-lg">

                            {/* Decorative Icon */}
                            <div
                                aria-hidden="true"
                                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#f2c5e3] bg-[#fff0f9]"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-8 w-8 text-[#a32972]"
                                >
                                    <path d="M8 6h11M8 11h11M8 16h7" />
                                    <path d="M4 6h.01M4 11h.01M4 16h.01" />
                                </svg>
                            </div>

                            <h3 className="mt-6 text-2xl font-black text-[#172653]">
                                No Posts Yet
                            </h3>

                            <p className="mt-4 leading-7 text-[#586681]">
                                Your published posts will appear here.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    router.push("/posts/new")
                                }
                                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#f6b9df] px-6 py-3 font-bold text-[#172653] shadow-[0_8px_24px_rgba(214,83,166,0.15)] transition-colors hover:bg-[#ffceec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972]"
                            >
                                Create Your First Post
                            </button>
                        </div>
                    </section>
                ) : (

                    /* User Posts List */
                    <section
                        className="space-y-5"
                        aria-label="User posts list"
                    >
                        {posts.map((post) => (
                            <article
                                key={post._id}
                                className="group overflow-hidden rounded-2xl border border-[#dce2f7] bg-white shadow-[0_10px_30px_rgba(35,50,104,0.06)] transition-all duration-200 hover:border-[#e5b5df] hover:shadow-[0_15px_40px_rgba(35,50,104,0.10)]"
                            >
                                {/* Pastel Top Accent */}
                                <div
                                    aria-hidden="true"
                                    className="h-1 w-full bg-[linear-gradient(90deg,#77b7ff_0%,#ffabd8_65%,#b5a3ff_100%)]"
                                />

                                <div className="flex flex-col gap-6 p-6 sm:p-7 md:flex-row md:items-center md:justify-between">

                                    {/* Post Title */}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="break-words text-xl font-bold leading-snug text-[#172653] transition-colors group-hover:text-[#983774]">
                                            {post.title}
                                        </h3>
                                    </div>

                                    {/* Post Management Controls */}
                                    <div className="flex shrink-0 flex-wrap gap-3">
                                        <PostOptions postId={post._id} />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                )}
            </div>
        </main>
    );
}