"use client";

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Edit Post Form Props
type EditPostFormProps = {
    id: string;
    initialTitle: string;
    initialBody: string;
    initialImage: string;
};

export default function EditPostForm({
    id,
    initialTitle,
    initialBody,
    initialImage,
}: EditPostFormProps) {
    const router = useRouter();

    // Local Form State
    const [title, setTitle] = useState(initialTitle);
    const [body, setBody] = useState(initialBody);
    const [image, setImage] = useState(initialImage);

    // UI State
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Handle Update - Submission Logic
    async function handleUpdate(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (saving) return;

        setError("");

        // Validation Layer
        if (!title.trim()) {
            setError("Title Is Required");
            return;
        }

        if (!body.trim()) {
            setError("Body Is Required");
            return;
        }

        setSaving(true);

        try {
            // API Update Request
            const res = await fetch(`/api/posts/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title.trim(),
                    body: body.trim(),
                    image: image.trim(),
                }),
            });

            const data = await res.json();

            // Error Handling
            if (!res.ok) {
                setError(data?.error || "Failed To Update Post");
                return;
            }

            // Success Flow
            router.push(`/posts/${id}`);
        } catch {
            // Network Error Handling
            setError("Network error. Please try again.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <form onSubmit={handleUpdate} className="space-y-5">
            {/* Error Display */}
            {error && (
                <div
                   id="form-error"
                   className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-700 text-sm"
                   role="alert"
                >
                    {error}
                </div>
            )}

            {/* Title Input */}
            <div className="space-y-1">
                <label htmlFor="title" className="text-sm font-medium">
                    Title
                </label>

                <input
                   id="title"
                   type="text"
                   className="w-full rounded-md border px-3 py-2"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   disabled={saving}
                   aria-describedby={error ? "form-error" : undefined}
                />
            </div>

            {/* Image Input */}
            <div className="space-y-1">
                <label htmlFor="image" className="text-sm font-medium">
                    URL Link For Image
                </label>

                <input
                   id="image"
                   type="url"
                   value={image}
                   onChange={(e) => setImage(e.target.value)}
                   className="w-full rounded-md border px-3 py-2"
                   disabled={saving}
                />
            </div>

            {/* Body Text Area */}
            <div className="space-y-1">
                <label htmlFor="body" className="text-sm font-medium">
                    Body
                </label>

                <textarea
                   id="body"
                   value={body}
                   onChange={(e) => setBody(e.target.value)}
                   rows={10}
                   className="w-full rounded-md border px-3 py-2"
                   disabled={saving}
                   aria-describedby={error ? "form-error" : undefined}
                />
            </div>

            {/* Submit Button */}
            <button
               type="submit"
               disabled={saving}
               className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
            >
                {saving ? "Saving..." : "Update Post"}
            </button>
        </form>
    );
}