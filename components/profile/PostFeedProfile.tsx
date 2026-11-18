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
            className="rounded-3xl border border-[#dce2f7] bg-white p-6 shadow-[0_12px_35px_rgba(35,50,104,0.07)] transition-colors hover:border-[#e5b5df] sm:p-8"
            aria-label="Developer posts in their profile"
        >
            <h2 className="mb-6 border-b border-[#e8e8f5] pb-4 text-2xl font-black tracking-tight text-[#a32972]">
                Posts
            </h2>

            {/* Check If User Has Any Posts */}
            {posts.length === 0 ? (
                <p className="rounded-2xl border border-[#e5d5f5] bg-[linear-gradient(135deg,#edf3ff_0%,#fff1fa_100%)] px-6 py-8 text-center text-sm italic leading-7 text-[#66738f]">
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