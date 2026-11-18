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
        <form onSubmit={handleUpdate} className="space-y-6 text-[#172653]">
            {/* Error Display */}
            {error && (
                <div
                    id="form-error"
                    className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm font-medium leading-6 text-rose-800"
                    role="alert"
                >
                    {error}
                </div>
            )}

            {/* Title Input */}
            <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-bold text-[#243b73]">
                    Title
                </label>

                <input
                    id="title"
                    type="text"
                    className="min-h-12 w-full rounded-xl border border-[#c8d5ef] bg-white px-4 py-3 text-[#172653] shadow-sm outline-none transition-colors focus:border-[#a32972] focus:ring-2 focus:ring-[#f2b7df] disabled:cursor-not-allowed disabled:bg-[#f3f5fa] disabled:opacity-70"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={saving}
                    aria-describedby={error ? "form-error" : undefined}
                />
            </div>

            {/* Image Input */}
            <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-bold text-[#243b73]">
                    URL Link For Image
                </label>

                <input
                    id="image"
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="min-h-12 w-full rounded-xl border border-[#c8d5ef] bg-white px-4 py-3 text-[#172653] shadow-sm outline-none transition-colors focus:border-[#a32972] focus:ring-2 focus:ring-[#f2b7df] disabled:cursor-not-allowed disabled:bg-[#f3f5fa] disabled:opacity-70"
                    disabled={saving}
                />
            </div>

            {/* Body Text Area */}
            <div className="space-y-2">
                <label htmlFor="body" className="text-sm font-bold text-[#243b73]">
                    Body
                </label>

                <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={10}
                    className="w-full rounded-xl border border-[#c8d5ef] bg-white px-4 py-3 text-[#172653] shadow-sm outline-none transition-colors focus:border-[#a32972] focus:ring-2 focus:ring-[#f2b7df] disabled:cursor-not-allowed disabled:bg-[#f3f5fa] disabled:opacity-70"
                    disabled={saving}
                    aria-describedby={error ? "form-error" : undefined}
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={saving}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[linear-gradient(110deg,#243f8f_0%,#59429c_55%,#923774_100%)] px-5 py-3 font-bold text-white shadow-[0_10px_26px_rgba(66,55,145,0.20)] transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972] disabled:cursor-not-allowed disabled:opacity-50"
            >
                {saving ? "Saving..." : "Update Post"}
            </button>
        </form>
    );
}