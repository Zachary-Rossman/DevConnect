import type { Post } from "@/types/Post";
import PostCard from "../posts/PostCard";

type PostFeedProfileProps = {
    posts: Post[];
};

export default function PostFeedProfile({ 
    posts, 
}: PostFeedProfileProps) {
    return (
        <section
           className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
           aria-label="Developer posts in their profile"
        >
            <h2 className="mb-4 text-xl font-bold text-gray-900">
                Posts
            </h2>

            {/* Check If User Has Any Posts */}
            {posts.length === 0 ? (
                <p className="text-sm italic text-gray-400">
                    This developer hasn't published any posts yet.
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            )}
        </section>
    );
}