"use client";

import type { Comment } from "@/types/Comment";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { useCallback, useEffect, useState } from "react";

type CommentListProps = {
    postId: string;
}
export default function CommentList({
    postId,
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
        <section className="space-y-6">

            {/* Have Form To Leave Comment */}
            <CommentForm
                postId={postId}
                onCommentAdded={fetchComments}
            />

            {/* Display Comments */}
            <div className="space-y-4">
                {loading ? (
                    <p>Loading comments...</p>
                ) : error ? (
                    <p role="alert">{error}</p>
                ) : comments.length === 0 ? (
                    <p>No comments yet. Be the first to comment!</p>
                ) : (
                    comments.map((comment) => (
                        <CommentCard
                            key={comment._id}
                            comment={comment}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
