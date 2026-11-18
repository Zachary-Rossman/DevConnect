"use client";

import { useMemo, useState } from "react";
import PostCard from "./PostCard";
import type { Post } from "@/types/Post";

type PostListProps = {
    posts?: Post[];
    loading?: boolean;
    currentUserId?: string;
}

export default function PostList({
    posts,
    loading = false,
    currentUserId,
}: PostListProps) {
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
                <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
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
        <section className="mx-auto w-full max-w-2xl space-y-8 text-[#172653]" aria-label="Post list">
            {/* Search + Filter Controls */}
            <div className="rounded-3xl border border-[#dce2f7] bg-white/95 p-5 shadow-[0_12px_35px_rgba(35,50,104,0.07)] sm:p-6">
                <div className="grid gap-6 md:grid-cols-[1fr_250px]">
                    {/* Search Input */}
                    <div>
                        <label htmlFor="search" className="mb-2 block text-sm font-bold text-[#243b73]">
                            Search Posts
                        </label>

                        <input
                            id="search"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title or content..."
                            autoComplete="off"
                            className="min-h-12 w-full rounded-xl border border-[#c8d5ef] bg-[#fcfdff] px-4 py-3 text-[#172653] shadow-sm outline-none transition-colors placeholder:text-[#7785a2] focus:border-[#a32972] focus:ring-2 focus:ring-[#f2b7df]"
                        />
                    </div>
                </div>
            </div>

            {/* Results Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dce2f7] pb-4">
                <h2 className="text-2xl font-black tracking-tight text-[#172653]">
                    Posts
                </h2>

                <p className="rounded-full border border-[#e5d5f5] bg-[#fff1fa] px-4 py-2 text-sm font-semibold text-[#923774]" aria-live="polite">
                    {filteredPosts.length} result
                    {filteredPosts.length !== 1 ? "s" : ""}
                </p>
            </div>

            {/* Post Grid */}
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-6" aria-live="polite">
                {noResults ? (
                    <div className="col-span-full rounded-3xl border border-[#e5d5f5] bg-[linear-gradient(135deg,#ffffff_0%,#fff1fa_100%)] p-8 text-center shadow-[0_12px_35px_rgba(35,50,104,0.07)] sm:p-12">
                        <h2 className="text-2xl font-black tracking-tight text-[#172653]">
                            Nothing matched your search
                        </h2>

                        <p className="mt-3 leading-7 text-[#536382]">
                            Try another keyword
                        </p>
                    </div>
                ) : (
                    filteredPosts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                            currentUserId={currentUserId}
                        />
                    ))
                )}
            </div>
        </section>
    );
}