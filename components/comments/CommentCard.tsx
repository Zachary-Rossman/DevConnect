"use client";

import { useState } from "react";
import type { Comment } from "@/types/Comment";

type CommentCardProps = {
    comment?: Comment;
    loading?: boolean;
    currentUserId?: string;
    postOwnerId?: string;
    onChanged?: () => Promise<void>;
};

export default function CommentCard({
    comment,
    loading = false,
    currentUserId,
    postOwnerId,
    onChanged,
}: CommentCardProps) {
    // UI State
    const [editing, setEditing] = useState(false);
    const [draftContent, setDraftContent] = useState("");
    const [draftImage, setDraftImage] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    // Start Editing
    function startEditing() {
        if (!comment) return;

        setDraftContent(comment.content);
        setDraftImage(comment.image ?? "");
        setError("");
        setEditing(true);
    }

    // Save Updated Comment
    async function handleSave() {
        if (!comment || busy) return;

        if (!draftContent.trim()) {
            setError("Comment Cannot Be Empty");
            return;
        }

        setBusy(true);
        setError("");

        try {
            const res = await fetch(
                `/api/comments/${comment._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content: draftContent,
                        image: draftImage,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.error || "Failed To Update Comment"
                );
            }

            setEditing(false);
            await onChanged?.();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed To Update Comment"
            );
        } finally {
            setBusy(false);
        }
    }

    // Delete Comment
    async function handleDelete() {
        if (!comment || busy) return;

        const confirmed = window.confirm(
            "Delete this comment permanently?"
        );

        if (!confirmed) return;

        setBusy(true);
        setError("");

        try {
            const res = await fetch(
                `/api/comments/${comment._id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.error || "Failed To Delete Comment"
                );
            }

            await onChanged?.();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed To Delete Comment"
            );
        } finally {
            setBusy(false);
        }
    }

    // Loading State
    if (loading) {
        return (
            <div
                className="animate-pulse rounded-2xl border bg-white p-6 shadow-sm"
                aria-hidden="true"
            >
                <div className="mb-4 h-4 w-32 rounded bg-gray-200" />
                <div className="h-16 rounded bg-gray-200" />
            </div>
        );
    }

    // Safety Check
    if (!comment) return null;

    // Authorization For UI Controls
    const isCommentAuthor = Boolean(
        currentUserId &&
        comment.userId === currentUserId
    );

    const canDelete = Boolean(
        currentUserId &&
        (isCommentAuthor || postOwnerId === currentUserId)
    );

    return (
        <section className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">

            {/* Author & Date */}
            <header className="flex items-center justify-between gap-4">
                <span className="font-semibold text-gray-900">
                    {comment.user?.username ?? "Unknown User"}
                </span>

                <time
                    dateTime={comment.createdAt}
                    className="text-sm text-gray-500"
                >
                    {new Date(comment.createdAt).toLocaleDateString(
                        "en-US",
                        {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            timeZone: "UTC",
                        }
                    )}
                </time>
            </header>

            {/* Editing Form Or Comment Content */}
            {editing ? (
                <div className="space-y-3">
                    <label
                        htmlFor={`edit-${comment._id}`}
                        className="block text-sm font-medium"
                    >
                        Edit Comment
                    </label>

                    <textarea
                        id={`edit-${comment._id}`}
                        value={draftContent}
                        onChange={(e) =>
                            setDraftContent(e.target.value)
                        }
                        rows={3}
                        disabled={busy}
                        className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="url"
                        aria-label="Comment image URL (optional)"
                        placeholder="Image URL (optional)"
                        value={draftImage}
                        onChange={(e) =>
                            setDraftImage(e.target.value)
                        }
                        disabled={busy}
                        className="w-full rounded-lg border p-3"
                    />

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => void handleSave()}
                            disabled={busy}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                        >
                            {busy ? "Saving..." : "Save"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setEditing(false);
                                setError("");
                            }}
                            disabled={busy}
                            className="rounded-lg border px-4 py-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {/* Comment Content */}
                    <p className="whitespace-pre-wrap text-gray-700">
                        {comment.content}
                    </p>

                    {/* Optional Image */}
                    {comment.image?.trim() && (
                        <img
                            src={comment.image}
                            alt="Image attached to comment"
                            loading="lazy"
                            className="max-h-80 w-full rounded-xl object-contain"
                        />
                    )}
                </>
            )}

            {/* Errors */}
            {error && (
                <p role="alert" className="text-sm text-red-600">
                    {error}
                </p>
            )}

            {/* Ownership Controls */}
            {!editing && (isCommentAuthor || canDelete) && (
                <div className="flex items-center gap-3 border-t pt-3">

                    {isCommentAuthor && (
                        <button
                            type="button"
                            onClick={startEditing}
                            disabled={busy}
                            className="text-sm font-medium text-blue-600 hover:underline"
                        >
                            Edit
                        </button>
                    )}

                    {canDelete && (
                        <button
                            type="button"
                            onClick={() => void handleDelete()}
                            disabled={busy}
                            className="text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
                        >
                            {busy ? "Deleting..." : "Delete"}
                        </button>
                    )}
                </div>
            )}
        </section>
    );
}
