import Comment from "@/models/Comment";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Post from "@/models/Post";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

// CREATE Comment
export async function POST(req: Request) {
    try {
        // Connect To MongoDB
        await connectDB();

        // Read Auth Cookie
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        // Verify Authenticated User
        const payload = token ? verifyToken(token) : null;

        if (!payload) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Read Request Body
        const body = await req.json();

        // Validate Request Body Structure
        if (
            !body ||
            typeof body !== "object" ||
            Array.isArray(body)
        ) {
            return NextResponse.json(
                { error: "Invalid Request Body" },
                { status: 400 }
            );
        }

        // Extract Post ID
        const { postId } = body;

        // Authenticated User ID
        const userId = payload.userId;

        // Validate Post ID
        if (
            typeof postId !== "string" ||
            !mongoose.isObjectIdOrHexString(postId)
        ) {
            return NextResponse.json(
                { error: "Invalid Post ID" },
                { status: 400 }
            );
        }

        // Verify Post Exists
        const postExists = await Post.exists({
            _id: postId,
        });

        if (!postExists) {
            return NextResponse.json(
                { error: "Post Not Found" },
                { status: 404 }
            );
        }

        // Extract Comment Fields
        const { content, image } = body;

        // Validate Comment Content
        if (
            typeof content !== "string" ||
            !content.trim()
        ) {
            return NextResponse.json(
                { error: "Comment Content Is Required" },
                { status: 400 }
            );
        }

        // Validate Optional Image
        if (
            image !== undefined &&
            typeof image !== "string"
        ) {
            return NextResponse.json(
                { error: "Image Must Be A String" },
                { status: 400 }
            );
        }

        // Create Comment
        const comment = await Comment.create({
            postId,
            userId,
            content: content.trim(),
            image: image || undefined,
        });

        return NextResponse.json(comment, {
            status: 201,
        });
    } catch (error) {
        console.error("POST /comments error:", error);

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { error: "Invalid JSON Body" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed To Create Comment" },
            { status: 500 }
        );
    }
}

// READ Comments For A Post
export async function GET(req: Request) {
    try {
        // Connect To MongoDB
        await connectDB();

        // Extract Post ID From URL
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get("postId");

        // Validate Post ID
        if (
            !postId ||
            !mongoose.isObjectIdOrHexString(postId)
        ) {
            return NextResponse.json(
                { error: "postId Is Required" },
                { status: 400 }
            );
        }

        // Retrieve Comments (Newest First)
        const comments = await Comment.find({
            postId,
        }).sort({
            createdAt: -1,
        });

        // Collect Comment Author IDs
        const userIds = comments.map(
            (comment) => comment.userId
        );

        // Fetch Referenced Users
        const users = await User.find({
            _id: {
                $in: userIds,
            },
        }).select("username");

        // Create Username Lookup
        const userMap = new Map(
            users.map((user) => [
                user._id.toString(),
                user,
            ])
        );

        // Attach Author Information
        const enriched = comments.map((comment) => {
            const user = userMap.get(
                comment.userId.toString()
            );

            return {
                ...comment.toObject(),

                user: user
                    ? {
                        _id: user._id.toString(),
                        username: user.username,
                    }
                    : null,
            };
        });

        // Return Comments
        return NextResponse.json(enriched);
    } catch (error) {
        console.error("GET /comments error:", error);

        return NextResponse.json(
            { error: "Failed To Fetch Comments" },
            { status: 500 }
        );
    }
}