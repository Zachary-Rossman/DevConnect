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

            const data = await response.json();

            // API-Level Errors
            if (!response.ok) {
                setError(data?.error || "Failed to create post");
                return;
            }

            // Successful Creation
            router.push("/posts");
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
            className="space-y-5 max-w-md"
            aria-describedby={error ? "form-error" : undefined}
        >
            {/* Error Display */}
            {error && (
                <div
                    id="form-error"
                    role="alert"
                    className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-700"
                >
                    {error}
                </div>
            )}

            {/* Title Input */}
            <div
                className="space-y-1"
            >
                <label htmlFor="title" className="text-sm font-medium">
                    Title
                </label>

                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a title"
                    className="w-full rounded-md border px-3 py-2"
                    disabled={loading}
                    aria-invalid={!!error}
                    autoComplete="off"
                />
            </div>

            {/* Optional Image URL */}
            <div className="space-y-1">
                <label htmlFor="image" className="text-sm font-medium">
                    Image URL (optional)
                </label>

                <input
                    id="image"
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Enter URL for image"
                    className="w-full rounded-md border px-3 py-2"
                    disabled={loading}
                    autoComplete="off"
                />
            </div>

            {/* Post Body */}
            <div className="space-y-1">
                <label htmlFor="body" className="text-sm font-medium">
                    Body
                </label>

                <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="What would you like to share?"
                    rows={10}
                    className="w-full rounded-md border px-3 py-2"
                    disabled={loading}
                    aria-invalid={!!error}
                    autoComplete="off"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
                aria-busy={loading}
            >
                {loading ? "Creating..." : "Create Post"}
            </button>
        </form>
    );
}