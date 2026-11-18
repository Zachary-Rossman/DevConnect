"use client";

import { useAuth } from "../auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PostReactionButtonProps = {
    postId: string;
    initialLiked: boolean;
    initialCount: number;
};

export default function PostReactionButton({
    postId,
    initialLiked,
    initialCount,
}: PostReactionButtonProps) {
    const router = useRouter();

    // Auth Context
    const { user, loading: authLoading } = useAuth();

    // Local UI State
    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(initialCount);
    const [loading, setLoading] = useState(false);

    // Toggle Reaction 
    async function handleReaction() {
        if (loading) return;

        // Auth Guard
        if (!user) {
            router.push("/login");
            return;
        }
        
        setLoading(true);

        try {
            const res = await fetch("/api/reactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Reaction API Error:", data.error);
                return;
            }

            // Server Is Source Of Truth
            setLiked(data.liked);
            setCount(data.count);
        } catch (error) {
            console.error("Reaction Failed:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            type="button"
            onClick={handleReaction}
            disabled={loading || authLoading}
            aria-pressed={liked}
            aria-label={
                liked
                    ? "Remove like from this post"
                    : "Like this post"
            }
            className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972] disabled:cursor-not-allowed disabled:opacity-50
                ${
                    liked
                        ? "border-[#923774] bg-[#923774] text-white hover:bg-[#762a5e]"
                        : "border-[#b9cafa] bg-[#edf3ff] text-[#243f8f] hover:bg-[#dce8ff]"
                }
            `}
        >
            {/* Loading State */}
            {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none" />
            ) : (
                <span aria-hidden="true">
                    👍
                </span>
            )}

            {/* Count Display */}
            <span>{count}</span>
        </button>
    );
}