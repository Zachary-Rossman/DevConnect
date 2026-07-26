"use client";

import { useMemo, useState } from "react";
import PostCard from "./PostCard";
import type { Post } from "@/types/Post";

export default function PostList({
    posts,
    loading = false,
}: {
    posts?: Post[];
    loading?: boolean;
}) {
    const [search, setSearch] = useState("");
    
    // Filtering Logic
    const filteredPosts = useMemo(() => {
        if (!posts) return [];

        const query = search.trim().toLowerCase();

        return posts.filter((post) => {
            const title = post.title.toLowerCase();
            const body = post.body.toLowerCase();

            return (
                title.includes(query) ||
                body.includes(query)
            );
        });
    }, [posts, search]);

    const noResults = filteredPosts.length === 0;

    // Loading State
    if (loading) {
        return (
            <section aria-busy="true" aria-live="polite" aria-label="Loading posts">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <PostCard key={i} loading />
                    ))}
                </div>
            </section>
        );
    }

    // Empty State (If there are no posts in DB)
    if (!posts || posts.length === 0) {
        return (
            <section className="rounded-2xl border bg-white p-12 text-center shadow-sm">
                <h2 className="text-2xl font-bold">
                    No posts yet
                </h2>

                <p className="mt-3 text-gray-500">
                    Be the first to publish something
                </p>
            </section>
        );
    }

    return (
        <section className="space-y-8" aria-label="Post list">
            {/* Search + Filter Controls */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <div className="grid gap-6 md:grid-cols-[1fr_250px]">
                    {/* Search Input */}
                    <div>
                        <label htmlFor="search" className="mb-2 block text-sm font-semibold text-gray-700">
                            Search Posts
                        </label>

                        <input
                            id="search"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title or content..."
                            autoComplete="off"
                            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Posts</h2>

                <p className="text-sm text-gray-500" aria-live="polite">
                    {filteredPosts.length} result
                    {filteredPosts.length !== 1 ? "s" : ""}
                </p>
            </div>

            {/* Post Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
                {noResults ? (
                    <div className="col-span-full rounded-2xl border bg-white p-12 text-center shadow-sm">
                        <h2 className="text-2xl font-bold">
                            Nothing matched your search
                        </h2>

                        <p className="mt-3 text-gray-500">
                            Try another keyword
                        </p>
                    </div>
                ) : (
                    filteredPosts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                        />
                    ))
                )}
            </div>
        </section>
    );
}