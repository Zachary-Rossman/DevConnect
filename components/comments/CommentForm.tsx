"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type CommentFormProps = {
    postId: string;
    onCommentAdded?: () => void;
};

export default function CommentForm({
    postId,
    onCommentAdded,
}: CommentFormProps) {
    const router = useRouter();

    // Component State
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle Submit On Form Submission
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (loading) return;

        setError("");

        // Validate Comment Content Before Sending Request
        if (!content.trim()) {
            setError("Comment Cannot Be Empty");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/comments", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    postId,
                    content,
                    image: image || undefined,
                }),
            });

            const data = await res.json();

            // Handle API Errors
            if (!res.ok) {
                setError(data?.error || "Failed To Post Comment");
                return;
            }

            // Reset Form After Successful Creation
            setContent("");
            setImage("");

            // Notify Parent Component If It Needs To React
            onCommentAdded?.();

            // Refresh Server Components
            router.refresh();
        } catch {
            setError("Network Error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
           onSubmit={handleSubmit}
           className="rounded-2xl border bg-white p-6 shadow-sm space-y-4"
           aria-describedby={error ? "comment-error" : undefined}
        >
            {/* Error Message */}
            {error && (
                <div
                   id="comment-error"
                   role="alert"
                   aria-live="polite"
                   className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                    {error}
                </div>
            )}

            {/* Comment Field */}
            <div className="space-y-1">
                <label
                   htmlFor="comment"
                   className="text-sm font-medium text-gray-700"
                >
                    Comment
                </label>

                <textarea
                   id="comment"
                   value={content}
                   onChange={(e) => setContent(e.target.value)}
                   rows={4}
                   disabled={loading}
                   className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                   placeholder="Write your comment..."
                />
            </div>

            {/* Optional Image */}
            <div className="space-y-1">
                <label
                   htmlFor="image"
                   className="text-sm font-medium text-gray-700"
                >
                    URL For Image (optional)
                </label>

                <input
                   id="image"
                   value={image}
                   onChange={(e) => setImage(e.target.value)}
                   disabled={loading}
                   className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                   placeholder="https://..."
                />

                {/* Submit Button */}
                <button
                   type="submit"
                   disabled={loading}
                   aria-busy={loading}
                   className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Posting..." : "Post Comment"}
                </button>
            </div>
        </form>
    )
}