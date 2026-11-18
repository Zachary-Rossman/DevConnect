"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CreatePostInput } from "@/types/Post";

// Create Post Form

export default function CreatePostForm() {
    const router = useRouter();

    // Form State
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");

    // UI State
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle Form Submission
    async function handleSubmit(e?: React.FormEvent) {
        e?.preventDefault();

        if (loading) return;

        setError("");

        // Client-Side Validation
        if (!title.trim()) {
            setError("Title is required");
            return;
        }

        if (!body.trim()) {
            setError("Body is required");
            return;
        }

        setLoading(true);

        // New Post Object Expected By API
        const newPost: CreatePostInput = {
            title: title.trim(),
            body: body.trim(),
            image: image.trim() || undefined,
        };

        try {
            // Send The New Post To The API
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });

            const data = await response.json().catch(() => null);

            // API-Level Errors
            if (!response.ok) {
                setError(data?.error || `Failed to create post (HTTP ${response.status})`);
                return;
            }

            // Successful Creation
            router.push("/feed");
        } catch {
            // Network-Level Errors
            setError("Network error. Please try again.");
        } finally {
            // Always Restore The Button State Regardless Of Success Or Failure
            setLoading(false);
        }
    }
    
    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-md space-y-6 text-[#172653]"
            aria-describedby={error ? "form-error" : undefined}
        >
            {/* Error Display */}
            {error && (
                <div
                    id="form-error"
                    role="alert"
                    className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm font-medium leading-6 text-rose-800"
                >
                    {error}
                </div>
            )}

            {/* Title Input */}
            <div
                className="space-y-2"
            >
                <label htmlFor="title" className="text-sm font-bold text-[#243b73]">
                    Title
                </label>

                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title"
                    className="min-h-12 w-full rounded-xl border border-[#c8d5ef] bg-white px-4 py-3 text-[#172653] shadow-sm outline-none transition-colors placeholder:text-[#7785a2] focus:border-[#a32972] focus:ring-2 focus:ring-[#f2b7df] disabled:cursor-not-allowed disabled:bg-[#f3f5fa] disabled:opacity-70"
                    disabled={loading}
                    aria-invalid={!!error}
                    autoComplete="off"
                />
            </div>

            {/* Optional Image URL */}
            <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-bold text-[#243b73]">
                    Image URL (optional)
                </label>

                <input
                    id="image"
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Enter URL for image"
                    className="min-h-12 w-full rounded-xl border border-[#c8d5ef] bg-white px-4 py-3 text-[#172653] shadow-sm outline-none transition-colors placeholder:text-[#7785a2] focus:border-[#a32972] focus:ring-2 focus:ring-[#f2b7df] disabled:cursor-not-allowed disabled:bg-[#f3f5fa] disabled:opacity-70"
                    disabled={loading}
                    autoComplete="off"
                />
            </div>

            {/* Post Body */}
            <div className="space-y-2">
                <label htmlFor="body" className="text-sm font-bold text-[#243b73]">
                    Body
                </label>

                <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="What would you like to share?"
                    rows={10}
                    className="w-full rounded-xl border border-[#c8d5ef] bg-white px-4 py-3 text-[#172653] shadow-sm outline-none transition-colors placeholder:text-[#7785a2] focus:border-[#a32972] focus:ring-2 focus:ring-[#f2b7df] disabled:cursor-not-allowed disabled:bg-[#f3f5fa] disabled:opacity-70"
                    disabled={loading}
                    aria-invalid={!!error}
                    autoComplete="off"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[linear-gradient(110deg,#243f8f_0%,#59429c_55%,#923774_100%)] px-5 py-3 font-bold text-white shadow-[0_10px_26px_rgba(66,55,145,0.20)] transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972] disabled:cursor-not-allowed disabled:opacity-50"
                aria-busy={loading}
            >
                {loading ? "Creating..." : "Create Post"}
            </button>
        </form>
    );
}