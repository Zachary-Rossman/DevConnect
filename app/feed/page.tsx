import { cookies } from "next/headers";
import { getFeedPosts } from "@/lib/feed";
import { notFound, redirect } from "next/navigation";
import PostList from "@/components/posts/PostList";
import { verifyToken } from "@/lib/auth";

export default async function FeedPage() {
    // Read Authentication Cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // Verify Auth Token
    const decoded = token ? verifyToken(token) : null;

    // Redirect Unauthenticated Users To Login
    if (!decoded) {
        redirect("/login");
    }
    
    // Fetch All Posts (Later To Be Followed Users)
    const posts = await getFeedPosts(decoded.userId);

    // Render Page
    return (
        <main className="min-h-screen bg-[linear-gradient(180deg,#edf3ff_0%,#fff1fa_50%,#eef2ff_100%)] px-4 py-10 text-[#172653] sm:px-6 sm:py-14">
            <PostList
                posts={posts}
                currentUserId={decoded.userId}
            />
        </main>
    );
}
