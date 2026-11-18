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
        <article className="overflow-visible rounded-3xl border border-[#dce2f7] bg-white shadow-[0_12px_35px_rgba(35,50,104,0.07)] transition-all duration-200 hover:border-[#e5b5df] hover:shadow-[0_18px_45px_rgba(35,50,104,0.11)]">

            {/* Author Information & Post Options */}
            <header className="flex items-start justify-between gap-4 p-6 pb-4">
                <div className="min-w-0 space-y-2">
                    {post.authorId?.username ? (
                        <Link
                            href={`/profile/${encodeURIComponent(post.authorId.username)}`}
                            className="break-words font-bold text-[#243f8f] transition-colors hover:text-[#a32972] hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972]"
                        >
                            @{post.authorId.username}
                        </Link>
                    ) : (
                        <span className="font-bold text-[#243f8f]">
                            Unknown User
                        </span>
                    )}

                    <time
                        dateTime={post.createdAt}
                        className="block text-xs font-medium text-[#66738f]"
                    >
                        {createdAt}
                    </time>
                </div>

                {/* Owner Only Three-Dot Menu */}
                {isOwner && (
                    <details className="relative shrink-0">
                        <summary
                            aria-label="Post options"
                            className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border border-[#e5d5f5] bg-[#fff1fa] text-xl font-bold text-[#a32972] transition-colors hover:bg-[#f9d9ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972]"
                        >
                            ⋯
                        </summary>

                        <div className="absolute right-0 z-10 mt-2 w-48 rounded-2xl border border-[#e5d5f5] bg-white p-3 shadow-[0_15px_40px_rgba(35,50,104,0.18)]">
                            <PostOptions postId={post._id} />
                        </div>
                    </details>
                )}
            </header>

            {/* Post Content */}
            <div className="space-y-4 px-6 pb-6">
                <h2 className="break-words text-xl font-black leading-snug tracking-tight text-[#172653] sm:text-2xl">
                    <Link
                        href={`/posts/${post._id}`}
                        className="transition-colors hover:text-[#a32972] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972]"
                    >
                        {post.title}
                    </Link>
                </h2>

                <p className="line-clamp-5 whitespace-pre-wrap break-words leading-7 text-[#465577]">
                    {post.body}
                </p>

                <Link
                    href={`/posts/${post._id}`}
                    className="inline-block rounded-sm text-sm font-bold text-[#923774] transition-colors hover:text-[#243f8f] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972]"
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
                    className="max-h-96 w-full border-y border-[#dce2f7] bg-[linear-gradient(135deg,#edf3ff_0%,#fff1fa_100%)] object-contain"
                />
            )}

            {/* Social Actions */}
            <footer className="flex flex-wrap items-center gap-4 border-t border-[#e7e8f5] bg-[#fcfbff] px-6 py-4">
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
                    className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#e5d5f5] bg-[#fff1fa] px-4 py-2 text-sm font-bold text-[#923774] transition-colors hover:bg-[#f9d9ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972]"
                >
                    💬 Comment
                    {post.latestComment !== undefined
                        ? `(${post.comments})`
                        : ""}
                </Link>
            </footer>

            {/* Latest Comment Preview */}
            {post.latestComment && (
                <div className="space-y-3 rounded-b-3xl border-t border-[#e5d5f5] bg-[linear-gradient(120deg,#edf3ff_0%,#fff1fa_100%)] px-6 py-5">
                    <span className="font-bold text-[#172653]">
                        Comments
                    </span>

                    <p className="line-clamp-2 break-words text-sm leading-6 text-[#465577]">
                        <span className="font-bold text-[#923774]">
                            {post.latestComment.username}:{" "}
                        </span>
                        {post.latestComment.content}
                    </p>

                    <Link
                        href={`/posts/${post._id}`}
                        className="mt-2 inline-block rounded-sm text-xs font-bold text-[#243f8f] transition-colors hover:text-[#a32972] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972]"
                    >
                        View discussion
                    </Link>
                </div>
            )}
        </article>
    );
}
