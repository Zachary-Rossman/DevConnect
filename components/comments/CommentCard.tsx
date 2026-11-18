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
        <section className="space-y-5 rounded-2xl border border-[#dce2f7] bg-white p-5 shadow-[0_10px_30px_rgba(35,50,104,0.06)] transition-colors hover:border-[#e5b5df] sm:p-6">

            {/* Author & Date */}
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e8e8f5] pb-4">
                <span className="break-words font-bold text-[#243f8f]">
                    {comment.user?.username ?? "Unknown User"}
                </span>

                <time
                    dateTime={comment.createdAt}
                    className="text-sm font-medium text-[#66738f]"
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
                <div className="space-y-4">
                    <label
                        htmlFor={`edit-${comment._id}`}
                        className="block text-sm font-bold text-[#243b73]"
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
                        className="w-full rounded-xl border border-[#c8d5ef] bg-[#fcfdff] p-4 text-[#172653] shadow-sm outline-none transition-colors focus:border-[#a32972] focus:ring-2 focus:ring-[#f2b7df] disabled:cursor-not-allowed disabled:bg-[#f3f5fa] disabled:opacity-70"
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
                        className="w-full rounded-xl border border-[#c8d5ef] bg-[#fcfdff] p-3 text-[#172653] shadow-sm outline-none transition-colors placeholder:text-[#7785a2] focus:border-[#a32972] focus:ring-2 focus:ring-[#f2b7df] disabled:cursor-not-allowed disabled:bg-[#f3f5fa] disabled:opacity-70"
                    />

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => void handleSave()}
                            disabled={busy}
                            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[linear-gradient(110deg,#243f8f_0%,#59429c_55%,#923774_100%)] px-5 py-2 font-bold text-white shadow-[0_8px_22px_rgba(66,55,145,0.15)] transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972] disabled:cursor-not-allowed disabled:opacity-50"
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
                            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#a8bff1] bg-white px-5 py-2 font-bold text-[#243f8f] transition-colors hover:bg-[#edf3ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {/* Comment Content */}
                    <p className="whitespace-pre-wrap break-words leading-7 text-[#465577]">
                        {comment.content}
                    </p>

                    {/* Optional Image */}
                    {comment.image?.trim() && (
                        <img
                            src={comment.image}
                            alt="Image attached to comment"
                            loading="lazy"
                            className="max-h-80 w-full rounded-xl border border-[#dce3f7] bg-[#f3f5ff] object-contain shadow-sm"
                        />
                    )}
                </>
            )}

            {/* Errors */}
            {error && (
                <p role="alert" className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">
                    {error}
                </p>
            )}

            {/* Ownership Controls */}
            {!editing && (isCommentAuthor || canDelete) && (
                <div className="flex flex-wrap items-center gap-3 border-t border-[#e8e8f5] pt-4">

                    {isCommentAuthor && (
                        <button
                            type="button"
                            onClick={startEditing}
                            disabled={busy}
                            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#b9cafa] bg-[#edf3ff] px-4 py-2 text-sm font-bold text-[#243f8f] transition-colors hover:bg-[#dce8ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Edit
                        </button>
                    )}

                    {canDelete && (
                        <button
                            type="button"
                            onClick={() => void handleDelete()}
                            disabled={busy}
                            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700 transition-colors hover:bg-rose-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#be123c] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {busy ? "Deleting..." : "Delete"}
                        </button>
                    )}
                </div>
            )}
        </section>
    );
}
