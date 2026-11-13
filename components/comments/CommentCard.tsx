import type { Comment } from "@/types/Comment";

export default function CommentCard({
    comment,
    loading = false,
} : {
    comment?: Comment;
    loading?: boolean;
}) {
    // Loading State
    if (loading) {
        return (
            <div
               className="overflow-hidden rounded-2xl border bg-white shadow-sm animate-pulse"
               aria-hidden="true"
            >
                <div className="h-52 bg-gray-200" />
                
                <div className="space-y-4 p-6">
                    <div className="h-4 w-24 rounded bg-gray-200" />
                    <div className="h-4 w-24 rounded bg-gray-200" />
                </div>
            </div>
        )
    }

    // Safety Check
    if (!comment) return null;

    return (
        <section className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
            {/* Comment Author & Creation Date */}
            <header className="flex items-center justify-between gap-4">
                <span className="font-semibold text-gray-900">
                    {comment.user?.username ?? "Unknown User"}
                </span>

                <time
                   dateTime={comment.createdAt}
                   className="text-sm text-gray-500"
                >
                    {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        timeZone: "UTC",
                    })}
                </time>
            </header>

            {/* Comment Content */}
            <p className="whitespace-pre-wrap text-gray-700">
                {comment.content}
            </p>

            {/* Optional Comment Image */}
            {comment.image?.trim() && (
                <img
                   src={comment.image}
                   alt="Image attached to comment"
                   loading="lazy"
                   className="max-h-80 w-full rounded-xl object-contain"
                />
            )}
        </section>
    );
}