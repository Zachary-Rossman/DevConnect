import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import Post from "@/models/Post";
import User from "@/models/User";

// GET Route
export async function GET() {
    try {
        await connectDB();

        // Fetch Posts (Newest First)
        const posts = await Post.find().sort({ createdAt: -1 });

        // Attach Author Usernames
        const postsWithUsers = await Promise.all(
            posts.map(async (post) => {
                const user = await User.findById(post.authorId);
                return {
                    _id: post._id,
                    title: post.title,
                    body: post.body,
                    image: post.image,
                    createdAt: post.createdAt,
                    updatedAt: post.updatedAt,
                    likes: post.likes,
                    comments: post.comments,

                    // Human-Readable Author Field
                    author: user ? user.username : "Unknown",

                    authorId: post.authorId,
                };
            })
        );
        
        return NextResponse.json(postsWithUsers);
    } catch (error) {
        // Backend Logging Preserved For Debugging
        console.error("GET /posts error:", error);
        
        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}

// POST Route
export async function POST(request: Request) {
    try {
        await connectDB();

        // Get Token From Cookies
        const cookieStore = await cookies();
        
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Verify JWT
        const payload = verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Validate User Exists
        const user = await User.findById(payload.userId);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Read Request Body
        const body = await request.json();

        // Validate Request Body
        if (!body.title?.trim()) {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            );
        }

        if (!body.body?.trim()) {
            return NextResponse.json(
                { error: "Body is required" },
                { status: 400 }
            );
        }

        // Create Post
        const post = await Post.create({
            title: body.title.trim(),
            body: body.body.trim(),
            image: body.image?.trim() || "",

            // Server-Side Ownership Enforcement
            authorId: user._id,
        });

        return NextResponse.json(
            {
                message: "Post created successfully",
                post,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        // Backend Logging Preserved For Debugging
        console.error("POST /posts error:", error);

        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}