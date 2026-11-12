import Comment from "@/models/Comment";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Post from "@/models/Post";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

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

        //Read The Request Body Sent By Frontend
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

        // Get Post ID From Request Body
        const { postId } = body;

        // Get User ID From Verified JWT
        const userId = payload.userId;

        // Validate ID
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

        // Define Comment 
        const {
            content,
            image,
        } = body;

        // Verify Content Has Content
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

        // Handle Invalid JSON Requests
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { error: "Invalid JSON Body" },
                { status: 400 }
            );
        }

        // Handle Unexpected Server Errors
        return NextResponse.json(
            { error: "Failed To Create Comment" },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        //Connect To MongoDB
        await connectDB();

        // Read The PostID From The Query String
        const { searchParams } = new URL(req.url);

        const postId = searchParams.get("postId");

        // Verify Post ID 
        if (
            !postId ||
            !mongoose.isObjectIdOrHexString(postId)
        ) {
            return NextResponse.json(
                { error: "postId Is Required" },
                { status: 400 }
            );
        }

        // Retrieve Every Comment For This Post
        const comments = await Comment.find({
            postId,
        }).sort({
            createdAt: -1,
        });

        // Collect Every User ID
        const userIds = comments.map(
            (comment) => comment.userId
        );

        // Fetch Every Referenced User In One Database Query
        const users = await User.find({
            _id: {
                $in: userIds,
            },
        }).select("Username");

        // Fast Lookup Table
        const userMap = new Map(
            users.map((user) => [
                user._id.toString(),
                user,
            ])
        );

        // Merge Each Comment With Corresponding User
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

        // Return The Completed Comment List
        return NextResponse.json(enriched);
    } catch (error) {
        console.error("GET /comments error:", error);

        // Handle Unexpected Server Errors
        return NextResponse.json(
            { error: "Failed To Fetch Comments" },
            { status: 500 }
        );
    }
}