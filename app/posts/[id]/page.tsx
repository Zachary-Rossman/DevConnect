import Link from "next/link";
import { cookies } from "next/headers";

import { getPost } from "@/lib/posts";

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

    // Auth Cookie Access
    const cookieStore = await cookies();

    const authCookie = cookieStore.toString();

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

    return (
        <main
           className="min-h-screen bg-gray-50"
           aria-labelledby="post-title"
        >
            <article className="max-w-4xl mx-auto px-6 py-14 space-y-10">
                <header className="space-y-5">
                    <h1
                       id="post-title"
                       className="text-5xl font-bold tracking-tight text-gray-900"
                    >
                        {post.title}
                    </h1>

                    <p className="text-gray-500">
                        Written by {" "}
                        <span className="font-medium text-gray-700">
                            {post.authorId}
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
            </article>
        </main>
    );
}