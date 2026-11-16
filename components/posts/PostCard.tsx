"use client";

import Link from "next/link";
import PostOptions from "./PostOptions";
import PostReactionButton from "./PostReactionButton";
import type { Post } from "@/types/Post";

type PostCardProps = {
    post?: Post;
    loading?: boolean;
    currentUserId?: string;
};

export default function PostCard({
    post,
    loading = false,
    currentUserId,
}: PostCardProps) {
    // Loading State
    if (loading) {
        return (
            <div
                className="animate-pulse rounded-2xl border bg-white p-6 shadow-sm"
                aria-hidden="true"
            >
                <div className="mb-6 h-8 w-36 rounded bg-gray-200" />
                <div className="mb-3 h-6 w-3/4 rounded bg-gray-200" />
                <div className="h-24 rounded bg-gray-200" />
            </div>
        );
    }

    // Safety Check
    if (!post) return null;

    // Determine Post Ownership
    const isOwner = Boolean(
        currentUserId &&
        post.authorId?._id === currentUserId
    );

    // Format Creation Date
    const createdAt = new Date(post.createdAt).toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
        }
    );

    return (
        <article className="rounded-2xl border bg-white shadow-sm">

            {/* Author Information & Post Options */}
            <header className="flex items-start justify-between gap-4 p-6 pb-3">
                <div className="space-y-1">
                    {post.authorId?.username ? (
                        <Link
                            href={`/profile/${encodeURIComponent(post.authorId.username)}`}
                            className="font-semibold text-gray-900 hover:text-blue-600"
                        >
                            @{post.authorId.username}
                        </Link>
                    ) : (
                        <span className="font-semibold text-gray-900">
                            Unknown User
                        </span>
                    )}

                    <time
                        dateTime={post.createdAt}
                        className="block text-xs text-gray-500"
                    >
                        {createdAt}
                    </time>
                </div>

                {/* Owner Only Three-Dot Menu */}
                {isOwner && (
                    <details className="relative">
                        <summary
                            aria-label="Post options"
                            className="cursor-pointer list-none rounded-lg px-3 py-1 text-xl hover:bg-gray-100"
                        >
                            ⋯
                        </summary>

                        <div className="absolute right-0 z-10 mt-2 w-48 rounded-xl border bg-white p-3 shadow-lg">
                            <PostOptions postId={post._id} />
                        </div>
                    </details>
                )}
            </header>

            {/* Post Content */}
            <div className="space-y-3 px-6 pb-5">
                <h2 className="text-xl font-bold text-gray-900">
                    <Link
                        href={`/posts/${post._id}`}
                        className="hover:text-blue-600"
                    >
                        {post.title}
                    </Link>
                </h2>

                <p className="line-clamp-5 whitespace-pre-wrap leading-7 text-gray-700">
                    {post.body}
                </p>

                <Link
                    href={`/posts/${post._id}`}
                    className="inline-block text-sm font-medium text-blue-600 hover:underline"
                >
                    Read more
                </Link>
            </div>

            {/* Optional Image */}
            {post.image?.trim() && (
                <img
                    src={post.image}
                    alt={`${post.title} featured image`}
                    loading="lazy"
                    className="max-h-96 w-full object-contain bg-gray-50"
                />
            )}

            {/* Social Actions */}
            <footer className="flex flex-wrap items-center gap-4 border-t px-6 py-4">
                {/* Interactive Like Button */}
                {post.likedByMe !== undefined && (
                    <PostReactionButton
                       postId={post._id}
                       initialLiked={post.likedByMe ?? false}
                       initialCount={post.likes} 
                    />
                )}

                {/* Navigate To Full Comment Discussion */}
                <Link
                   href={`/posts/${post._id}`}
                   className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                    💬 Comment
                    {post.latestComment !== undefined
                        ? `(${post.comments})`
                        : ""}
                </Link>
            </footer>

            {/* Latest Comment Preview */}
            {post.latestComment && (
                <div className="border-t bg-gray-50 px-6 py-4">
                    <span className="font-semibold text-gray-900">
                        Comments
                    </span>
                    
                    <p className="line-clamp-2 text-sm text-gray-700">
                        <span className="font-semibold text-gray-900">
                            {post.latestComment.username}:{" "}
                        </span>
                        {post.latestComment.content}
                    </p>

                    <Link
                       href={`/posts/${post._id}`}
                       className="mt-2 inline-block text-xs font-medium text-blue-600 hover:underline"
                    >
                        View discussion
                    </Link>
                </div>
            )}
        </article>
    );
}
