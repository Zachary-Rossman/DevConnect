import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Post from "@/models/Post";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

// GET Posts From Authenticated User
export async function GET() {
    try {
        // Connect DB
        await connectDB();

        // Retrieve Cookie Store (Server-Side)
        const cookieStore = cookies();
        
        // Extract JWT From Auth Cookie
        const token = (await cookieStore).get("auth_token")?.value;

        // If No Token -> User Not Authenticated
        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Validate JWT And Extract Payload
        const payload = verifyToken(token);

        // If Invalid Token -> Reject Request
        if (!payload) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Find User In DB (Ensure Account Still Exists)
        const user = await User.findById(payload.userId).select(
            "_id username"
        );

        if (!user) {
            return NextResponse.json(
                { error: "User Not Found" },
                { status: 404 }
            );
        }

        // Fetch Posts Belonging To This User, Newest First
        const posts = await Post.find({
            authorId: user._id,
        }).sort({
            publishedDate: -1,
        });

        // Attach The Authenticated User's Username To Each Post
        const postsWithUsers = posts.map((post) => ({
            _id: post._id,
                    title: post.title,
                    body: post.body,
                    image: post.image,
                    likes: post.likes,
                    comments: post.comments,
                    author: user.username,
                    authorId: post.authorId,
                    publishedDate: post.publishedDate,
        }));

        // Return Final Enriched Dataset
        return NextResponse.json(postsWithUsers);
    } catch (error) {
        // Backend Error Logging (Kept Intentionally For Debugging)
        console.error("GET /api/posts/mine error:", error);

        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}
