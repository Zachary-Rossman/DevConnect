import CommentList from "@/components/comments/CommentList";
import { cookies } from "next/headers";
import { getPost } from "@/lib/posts";
import Link from "next/link";
import PostOptions from "@/components/posts/PostOptions";
import PostReactionButton from "@/components/posts/PostReactionButton";
import Reaction from "@/models/Reaction";
import { verifyToken } from "@/lib/auth";

// Post Detail Page
export default async function PostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // Read Dynamic Router Parameter
    const { id } = await params;

    // Fetch Post From Database
    const post = await getPost(id);
    
    // Not Found State
    if (!post) {
        return (
            <main className="max-w-3xl mx-auto px-6 py-20 text-center space-y-4">
                <h1 className="text-gray-500">
                    Post not found
                </h1>

                <p className="text-gray-500">
                    The post you're looking for doesn't exist 
                    or may have been removed.
                </p>

                <Link
                   href="/posts"
                   className="inline-flex rounded-lg bg-blue-600 px-5 py-3 text-white"
                >
                    Back To Posts
                </Link>
            </main>
        );
    }

    // Convert MongoDb Post ID To String
    const postId = String(post._id);

    // Find Current Like Count
    const initialCount = await Reaction.countDocuments({
        postId,
    });

    // Read Auth Cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // Verify Auth Token
    const decoded = token ? verifyToken(token) : null;

    // Check Post Ownership
    const isOwner = Boolean(
        decoded && post.authorId && String(decoded.userId) === String(post.authorId._id)
    );

    // Check If Post Has A Reaction
    const initialLiked = decoded
        ? Boolean(
            await Reaction.exists({
                postId,
                userId: decoded.userId,
            })
        )
        : false;

    // Render Post
    return (
        <main
           className="min-h-screen bg-gray-50"
           aria-labelledby="post-title"
        >
            <article className="max-w-4xl mx-auto px-6 py-14 space-y-10">
                <header className="space-y-5">
                    {isOwner && (
                        <PostOptions postId={String(post._id)} />
                    )}
                    <h1
                       id="post-title"
                       className="text-5xl font-bold tracking-tight text-gray-900"
                    >
                        {post.title}
                    </h1>

                    <p className="text-gray-500">
                        Written by {" "}
                        <span className="font-medium text-gray-700">
                            {post.authorId?.username ?? "Unknown"}
                        </span>
                    </p>

                    {post.image?.trim() && (
                        <img
                           src={post.image}
                           alt={`${post.title} featured image`}
                           className="w-full aspect-[16/9] object-contain rounded-2xl border bg-gray-100"
                        />
                    )}
                </header>

                <section
                   className="rounded-2xl border bg-white p-8 shadow-sm"
                   aria-label="Post content"
                >
                    <p className="whitespace-pre-wrap leading-8 text-gray-700">
                        {post.body}
                    </p>
                </section>

                <PostReactionButton
                   postId={postId}
                   initialLiked={initialLiked}
                   initialCount={initialCount}
                />

                <CommentList
                   postId={postId}
                />
            </article>
        </main>
    );
}