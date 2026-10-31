import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Post from "@/models/Post";
import { verifyToken } from "@/lib/auth";

// DELETE Post Owned By Authenticated User
export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Extract Route Parameter (post ID)
        const { id } = await params;

        // Reject Malformed MongoDB IDs Before Querying DB
        if (!mongoose.isValidObjectId(id)) {
            return NextResponse.json(
                { error: "Invalid Post ID" },
                { status: 400 }
            );
        }
        
        // Connect To DB
        await connectDB();

        // Read Auth Cookie
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        // If No Token -> User Not Logged In
        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Verify JWT Integrity
        const payload = verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Find The Post In DB And Verify Post Exists
        const post = await Post.findById(id);

        if (!post) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }

        // Ownership Check (CRITICAL SECURITY STEP) : Only Owner Can Delete Post
        if (
            post.authorId.toString() !== payload.userId
        ) {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        // Delete Post After Passing All Checks
        const deletedPost = await Post.findOneAndDelete({
            _id: id,
            authorId: payload.userId,
        });

        // Handles Unlikely Case Where Post Was Removed Between Ownership Check and Deletion Of Post
        if (!deletedPost) {
            return NextResponse.json(
                { error: "Post Not Found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Post Deleted",
        });
    } catch (error) {
        console.error("DELETE /api/posts/[id] error:", error);

        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}

// UPDATE Post Owned By Authenticated User
export async function PUT(
    request: Request,
    { params }: {params: Promise<{ id: string }> }
) {
    try {
        // Extract Post ID
        const { id } = await params;

        if (!mongoose.isValidObjectId(id)) {
            return NextResponse.json(
                { error: "Invalid Post ID" },
                { status: 400 }
            );
        }

        // Connect To DB
        await connectDB();

        // Read Auth Cookie
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Verify Token
        const payload = verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Fetch Post
        const post = await Post.findById(id);

        if (!post) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }

        // Ownership Check
        if (
            post.authorId.toString() !== payload.userId
        ) {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        // Read Update Payload
        const body = await request.json();

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

        // Whitelist Editable Fields So Users Cannot Change Ownership
        const updates: {
            title?: string,
            body?: string;
            image?: string;
        } = {};

        if (body.title !== undefined) {
            if (typeof body.title !== "string" || !body.title.trim()) {
                return NextResponse.json(
                    { error: "Title Cannot Be Empty" },
                    { status: 400 }
                );
            }

            updates.title = body.title.trim();
        }

        if (body.body !== undefined) {
            if (typeof body.body !== "string" || !body.body.trim()) {
                return NextResponse.json(
                    { error: "Body Cannot Be Empty" },
                    { status: 400}
                );
            }

            updates.body = body.body.trim();
        }

        if (body.image !== undefined) {
            if (typeof body.image !== "string") {
                return NextResponse.json(
                    { error: "Image Must Be A String" },
                    { status: 400}
                );
            }

            updates.image = body.image.trim();
        }

        if (Object.keys(updates).length === 0) {
            return NextResponse.json(
                { error: "No Valid Fields Provided To Update" },
                { status: 400 }
            );
        }

        // Apply Updates
        const updatedPost = await Post.findOneAndUpdate(
            { _id: id, authorId: payload.userId },
            { $set: updates },
            { new: true, runValidators: true }
        );

        // Handles Unlikely Case Where Post Was Removed Between Ownership Check And Update
        if (!updatedPost) {
            return NextResponse.json(
                { error: "Post Not Found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error("PUT /api/posts/[id] error:", error);

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { error: "Invalid JSON Body" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}