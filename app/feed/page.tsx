import { cookies } from "next/headers";
import { getPosts } from "@/lib/posts";
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
    const posts = await getPosts();

    // Render Page
    return (
        <main>
            <PostList posts={posts}/>
        </main>
    )
}