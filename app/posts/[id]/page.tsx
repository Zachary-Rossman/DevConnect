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
            <div className="flex min-h-[70vh] items-center justify-center bg-[linear-gradient(135deg,#f2f5ff,#fff0fa)] px-6 py-16">
                <section className="w-full max-w-lg rounded-3xl border border-[#e5d8f4] bg-white p-10 text-center shadow-xl">
                    <p className="text-sm font-bold uppercase tracking-widest text-[#ad3982]">
                        Post Unavailable
                    </p>

                    <h1 className="mt-4 text-3xl font-bold text-[#142557]">
                        Post not found
                    </h1>

                    <p className="mt-4 leading-7 text-slate-600">
                        This post may have been removed,
                        or the link may no longer be valid.
                    </p>

                    <Link
                        href="/"
                        className="mt-8 inline-flex rounded-xl bg-[#243f8f] px-6 py-3 font-semibold text-white transition hover:bg-[#3559b0]"
                    >
                        Return to Home
                    </Link>
                </section>
            </div>
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

        // Format Post Date
        const createdAt = new Date(
            post.createdAt
        ).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
        });

        // Navigate Back Accoring To Authentication State
        const backHref = decoded ? "/feed" : "/";
        
        // Render Post
         return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#edf3ff_0%,#fff2fa_55%,#f4f6ff_100%)] text-[#172653]">

            {/* Post Header */}
            <section className="bg-[linear-gradient(120deg,#0b1c4d_0%,#29448e_58%,#773c89_100%)] px-6 py-12 text-white sm:py-16">
                <div className="mx-auto max-w-4xl">

                    <Link
                        href={backHref}
                        className="inline-flex items-center rounded-lg border border-white/25 px-4 py-2 text-sm font-medium text-[#f9d1ed] transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
                    >
                        ← {decoded ? "Back to Feed" : "Back to Home"}
                    </Link>

                    <p className="mt-10 text-sm font-bold uppercase tracking-widest text-[#f7b3e0]">
                        Community Post
                    </p>

                    <h1 className="mt-4 break-words text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                        {post.title}
                    </h1>

                    <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#dbe6ff]">
                        {post.authorId?.username ? (
                            <Link
                                href={`/profile/${encodeURIComponent(post.authorId.username)}`}
                                className="font-semibold text-[#ffd1ec] hover:underline"
                            >
                                @{post.authorId.username}
                            </Link>
                        ) : (
                            <span>Unknown User</span>
                        )}

                        <span aria-hidden="true">•</span>

                        <time dateTime={post.createdAt.toISOString()}>
                            {createdAt}
                        </time>
                    </div>
                </div>
            </section>

            {/* Post Content And Interactions */}
            <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6">

                {/* Post Content */}
                <article className="overflow-hidden rounded-3xl border border-[#dce3f7] bg-white shadow-[0_15px_45px_rgba(35,50,104,0.08)]">

                    {post.image?.trim() && (
                        <img
                            src={post.image}
                            alt={`${post.title} featured image`}
                            className="max-h-[520px] w-full bg-[#f3f5ff] object-contain"
                        />
                    )}

                    <div className="p-6 sm:p-9">
                        <p className="whitespace-pre-wrap break-words text-base leading-8 text-slate-700">
                            {post.body}
                        </p>
                    </div>
                </article>

                {/* Post Owner Controls */}
                {isOwner && (
                    <div className="rounded-2xl border border-[#e8d9f4] bg-white p-5 shadow-sm">
                        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#a52d79]">
                            Manage Your Post
                        </p>

                        <PostOptions postId={postId} />
                    </div>
                )}

                {/* Reactions */}
                <section className="rounded-2xl border border-[#dce3f7] bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-bold text-[#172653]">
                        Reactions
                    </h2>

                    <PostReactionButton
                        postId={postId}
                        initialLiked={initialLiked}
                        initialCount={initialCount}
                    />
                </section>

                {/* Comments */}
                <section
                    aria-labelledby="discussion-title"
                    className="space-y-6"
                >
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#a52d79]">
                            Community Discussion
                        </p>

                        <h2
                            id="discussion-title"
                            className="mt-2 text-2xl font-bold text-[#172653]"
                        >
                            Join the conversation
                        </h2>
                    </div>

                    <CommentList
                        postId={postId}
                        currentUserId={decoded?.userId}
                        postOwnerId={
                            post.authorId
                                ? String(post.authorId._id)
                                : undefined
                        }
                    />
                </section>
            </div>
        </div>
    );
}
