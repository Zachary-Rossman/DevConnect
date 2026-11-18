"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PostOptionsProps = {
    postId: string;
};

export default function PostOptions({ postId }: PostOptionsProps) {
    const router = useRouter();

    // UI State
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    // Delete Post
    async function handleDelete() {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post? This action cannot be undone."
        );

        if (!confirmDelete) return;

        try {
            setDeleting(true);
            setError("");

            const res = await fetch(`/api/posts/${postId}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to delete post.");
            }

            // Refresh Server Components After Successful Deletion
            router.refresh();
        } catch (error) {
            console.error("Failed to delete post:", error);

            setError(
                error instanceof Error ? error.message : "Something went wrong while deleting the post."
            );
        } finally {
            setDeleting(false);
        }
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            {/* Edit Post Button */}
            <button
                type="button"
                onClick={() => router.push(`/posts/${postId}/edit`)}
                disabled={deleting}
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#b9cafa] bg-[#edf3ff] px-4 py-2 text-sm font-bold text-[#243f8f] transition-colors hover:bg-[#dce8ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972] disabled:cursor-not-allowed disabled:opacity-50"
            >
                Edit
            </button>

            {/* Delete Post Button */}
            <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700 transition-colors hover:bg-rose-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#be123c] disabled:cursor-not-allowed disabled:opacity-50"
            >
                {deleting ? "Deleting..." : "Delete"}
            </button>

            {/* Display Deletion Error */}
            {error && (
                <p role="alert" className="w-full rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm font-medium leading-6 text-rose-800">
                    {error}
                </p>
            )}
        </div>
    );
}