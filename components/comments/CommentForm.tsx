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
            className="space-y-5 rounded-2xl border border-[#dce2f7] bg-white p-5 shadow-[0_10px_30px_rgba(35,50,104,0.06)] sm:p-6"
            aria-describedby={error ? "comment-error" : undefined}
        >
            {/* Error Message */}
            {error && (
                <div
                    id="comment-error"
                    role="alert"
                    aria-live="polite"
                    className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm font-medium leading-6 text-rose-800"
                >
                    {error}
                </div>
            )}

            {/* Comment Field */}
            <div className="space-y-2">
                <label
                    htmlFor="comment"
                    className="text-sm font-bold text-[#243b73]"
                >
                    Comment
                </label>

                <textarea
                    id="comment"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    disabled={loading}
                    className="w-full rounded-xl border border-[#c8d5ef] bg-[#fcfdff] px-4 py-3 text-[#172653] shadow-sm outline-none transition-colors placeholder:text-[#7785a2] focus:border-[#a32972] focus:ring-2 focus:ring-[#f2b7df] disabled:cursor-not-allowed disabled:bg-[#f3f5fa] disabled:opacity-70"
                    placeholder="Write your comment..."
                />
            </div>

            {/* Optional Image */}
            <div className="space-y-2">
                <label
                    htmlFor="image"
                    className="text-sm font-bold text-[#243b73]"
                >
                    URL For Image (optional)
                </label>

                <input
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    disabled={loading}
                    className="min-h-12 w-full rounded-xl border border-[#c8d5ef] bg-[#fcfdff] px-4 py-3 text-[#172653] shadow-sm outline-none transition-colors placeholder:text-[#7785a2] focus:border-[#a32972] focus:ring-2 focus:ring-[#f2b7df] disabled:cursor-not-allowed disabled:bg-[#f3f5fa] disabled:opacity-70"
                    placeholder="https://..."
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    className="mt-4 inline-flex min-h-12 items-center justify-center rounded-xl bg-[linear-gradient(110deg,#243f8f_0%,#59429c_55%,#923774_100%)] px-6 py-3 font-bold text-white shadow-[0_8px_22px_rgba(66,55,145,0.15)] transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Posting..." : "Post Comment"}
                </button>
            </div>
        </form>
    );
}