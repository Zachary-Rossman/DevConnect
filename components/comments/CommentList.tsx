"use client";

import type { Comment } from "@/types/Comment";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { useCallback, useEffect, useState } from "react";

type CommentListProps = {
    postId: string;
    currentUserId?: string;
    postOwnerId?: string;
}
export default function CommentList({
    postId,
    currentUserId,
    postOwnerId,
}: CommentListProps) {
    // Component State
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get Comments For Post ID
    const fetchComments = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch(
                `/api/comments?postId=${encodeURIComponent(postId)}`
            );

            // Convert Response To JSON
            const data = await res.json();

            // Check If Request Succeeded
            if (!res.ok) {
                setError(data?.error || "Failed To Fetch Comments");
                return
            }

            // Update Comments State
            setComments(data);
        } catch (error) {
            // Handle Failed Requests
            console.error("Failed To Fetch Comments:", error);
            setError("Network Error. Please try again.");
        } finally {
            // Reset Loading State
            setLoading(false);
        }
    }, [postId]);

    // useEffect To Load Comments
    useEffect(() => {
        void fetchComments();
    }, [fetchComments]);
    
    // Render Component
    return (
        <section className="space-y-8">

            {/* Have Form To Leave Comment */}
            <CommentForm
                postId={postId}
                onCommentAdded={fetchComments}
            />

            {/* Display Comments */}
            <div className="space-y-5">
                {loading ? (
                    <p className="rounded-2xl border border-[#dce2f7] bg-white px-6 py-5 text-sm font-medium text-[#536382] shadow-[0_10px_30px_rgba(35,50,104,0.06)]">
                        Loading comments...
                    </p>
                ) : error ? (
                    <p
                        role="alert"
                        className="rounded-2xl border border-rose-300 bg-rose-50 px-6 py-5 text-sm font-medium text-rose-800 shadow-sm"
                    >
                        {error}
                    </p>
                ) : comments.length === 0 ? (
                    <p className="rounded-2xl border border-[#e5d5f5] bg-[linear-gradient(135deg,#edf3ff_0%,#fff1fa_100%)] px-6 py-8 text-center font-medium text-[#536382] shadow-sm">
                        No comments yet. Be the first to comment!
                    </p>
                ) : (
                    comments.map((comment) => (
                        <CommentCard
                            key={comment._id}
                            comment={comment}
                            currentUserId={currentUserId}
                            postOwnerId={postOwnerId}
                            onChanged={fetchComments}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
