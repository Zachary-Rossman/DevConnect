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
        <main className="min-h-screen bg-gray-50 px-4 py-10">
            <PostList 
               posts={posts}
               currentUserId={decoded.userId}
            />
        </main>
    )
}
