"use client";

import Link from "next/link";
import type { Post } from "@/types/Post";


export default function PostCard({
    post,
    loading = false,
}: {
    post?: Post;
    loading?: boolean;
}) {
    // Loading State (Skeleton UI)
    if (loading) {
        return (
            <div
                className="overflow-hidden rounded-2xl border bg-white shadow-sm animate-pulse"
                aria-hidden="true"
            >
                <div className="h-52 bg-gray-200" />

                <div className="space-y-4 p-6">
                    <div className="h-4 w-24 rounded bg-gray-200" />
                    <div className="h-6 w-3/4 rounded bg-gray-200" />
                    <div className="h-4 w-full rounded bg-gray-200" />
                    <div className="h-4 w-5/6 rounded bg-gray-200" />
                </div>
            </div>
        );
    }

    // Safety Check (If No Post Is Passed, Render Nothing)
    if (!post) return null;

    return (
        <article>
            {/* Link Wrapper */}
            <Link
                href={`/posts/${post._id}`}
                aria-label={`Read post: ${post.title}`}
                className="
                    block
                    overflow-hidden
                    rounded-2xl
                    border
                    bg-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-600
                "
            >
                <div className="space-y-4 p-6">
                    {/* Title */}
                    <h2 className="text-2xl font-bold leading-tight text-gray-900">
                        {post.title}
                    </h2>

                    {/* Body Preview */}
                    <p className="line-clamp-3 text-gray-600">
                        {post.body}
                    </p>

                    {/* Image */}
                    {post.image?.trim() && (
                        <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                            className="w-full aspect-[16/9] object-cover"
                        />
                    )}

                    {/* Footer Section */}
                    <div className="flex items-center justify-between pt-2 text-sm text-gray-500">
                        <span>
                            By <strong>{post.author}</strong>
                        </span>

                        {/* CTA */}
                        <span className="font-medium text-blue-600">
                            Read Post →
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    )
}