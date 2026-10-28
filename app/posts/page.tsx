import { cookies } from "next/headers";
import { getPosts } from "@/lib/posts";
import Link from "next/link";
import PostList from "@/components/posts/PostList";
import { verifyToken } from "@/lib/auth";

export default async function PostsPage() {
    // Serer-Side Cookie Access
    const cookieStore = await cookies();

    const token = cookieStore.get("auth_token")?.value;

    // Auth State Check
    const isLoggedIn = !!(token && verifyToken(token));

    // Posts Fetch (Server Rendered)
    const posts = await getPosts();

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
                {/* Page Header Section */}
                <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    {/* Title Block */}
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            Community Posts
                        </h1>

                        <p className="text-gray-600">
                            Connect with other developers around the world and discover insights, ideas, and tutorials. 
                        </p>
                    </div>

                    {/* Conditional CTA */}
                    {isLoggedIn && (
                        <Link
                            href="/posts/new"
                            className="inline-flex items-center justify-center rounded-lg bg-black px-5 py-3 text-white font-medium transition hover:bg-gray-800"
                        >
                            + New Post
                        </Link>
                    )}
                </header>

                {/* Posts Feed Container */}
                <section
                    className="bg-white border rounded-2xl shadow-sm p-6"
                    aria-label="Posts feed"
                >
                    <PostList posts={posts} />
                </section>
            </div>
        </main>
    )
}