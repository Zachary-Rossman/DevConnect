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
               className="rounded-lg border px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
            >
                Edit
            </button>

            {/* Delete Post Button */}
            <button
               type="button"
               onClick={handleDelete}
               disabled={deleting}
               className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
            >
                {deleting ? "Deleting..." : "Delete"}
            </button>

            {/* Display Deletion Error */}
            {error && (
                <p role="alert" className="w-full text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}