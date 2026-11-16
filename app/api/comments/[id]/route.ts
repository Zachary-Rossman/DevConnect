import Comment from "@/models/Comment";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Post from "@/models/Post";
import { verifyToken } from "@/lib/auth";

type RouteContext = {
    params: Promise<{ id: string }>;
};

// Retrieve Authenticated User ID
async function getViewerId(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) return null;

    const payload = verifyToken(token);

    return payload?.userId ?? null;
}

// UPDATE Comment
export async function PATCH(
    request: Request,
    { params }: RouteContext
) {
    try {
        // Extract Comment ID
        const { id } = await params;

        // Validate Comment ID
        if (!mongoose.isObjectIdOrHexString(id)) {
            return NextResponse.json(
                { error: "Invalid Comment ID" },
                { status: 400 }
            );
        }

        // Authenticate User
        const userId = await getViewerId();

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Connect To MongoDB
        await connectDB();

        // Find Comment
        const comment = await Comment.findById(id);

        if (!comment) {
            return NextResponse.json(
                { error: "Comment Not Found" },
                { status: 404 }
            );
        }

        // Only Comment Author Can Edit
        if (String(comment.userId) !== userId) {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        // Read Request Body
        const body = await request.json();

        // Validate Request Body
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

        // Extract Editable Fields
        const { content, image } = body;

        // Validate Content
        if (
            typeof content !== "string" ||
            !content.trim()
        ) {
            return NextResponse.json(
                { error: "Comment Cannot Be Empty" },
                { status: 400 }
            );
        }

        // Whitelist Editable Fields
        const updates: {
            content: string;
            image?: string;
        } = {
            content: content.trim(),
        };

        // Validate Optional Image
        if (image !== undefined) {
            if (typeof image !== "string") {
                return NextResponse.json(
                    { error: "Image Must Be A String" },
                    { status: 400 }
                );
            }

            const cleanedImage = image.trim();

            if (cleanedImage) {
                try {
                    const url = new URL(cleanedImage);

                    if (
                        url.protocol !== "http:" &&
                        url.protocol !== "https:"
                    ) {
                        return NextResponse.json(
                            { error: "Invalid Image URL" },
                            { status: 400 }
                        );
                    }
                } catch {
                    return NextResponse.json(
                        { error: "Invalid Image URL" },
                        { status: 400 }
                    );
                }
            }

            updates.image = cleanedImage;
        }

        // Update Comment With Ownership Enforcement
        const updated = await Comment.findOneAndUpdate(
            {
                _id: id,
                userId,
            },
            {
                $set: updates,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updated) {
            return NextResponse.json(
                { error: "Comment Not Found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Comment Updated Successfully",
        });
    } catch (error) {
        console.error("PATCH comment error:", error);

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { error: "Invalid JSON Body" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed To Update Comment" },
            { status: 500 }
        );
    }
}

// DELETE Comment
export async function DELETE(
    _request: Request,
    { params }: RouteContext
) {
    try {
        // Extract Comment ID
        const { id } = await params;

        // Validate Comment ID
        if (!mongoose.isObjectIdOrHexString(id)) {
            return NextResponse.json(
                { error: "Invalid Comment ID" },
                { status: 400 }
            );
        }

        // Authenticate User
        const userId = await getViewerId();

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Connect To MongoDB
        await connectDB();

        // Find Comment
        const comment = await Comment.findById(id);

        if (!comment) {
            return NextResponse.json(
                { error: "Comment Not Found" },
                { status: 404 }
            );
        }

        // Check If User Wrote Comment
        const isCommentAuthor =
            String(comment.userId) === userId;

        // Check If User Owns Parent Post
        let isPostOwner = false;

        if (!isCommentAuthor) {
            const post = await Post.findById(
                comment.postId
            ).select("authorId");

            isPostOwner = Boolean(
                post &&
                String(post.authorId) === userId
            );
        }

        // Reject Unauthorized Deletion
        if (!isCommentAuthor && !isPostOwner) {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        // Delete Comment
        const result = await Comment.deleteOne({
            _id: id,
            userId: comment.userId,
            postId: comment.postId,
        });

        // Verify Deletion
        if (result.deletedCount !== 1) {
            return NextResponse.json(
                { error: "Comment Not Found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Comment Deleted Successfully",
        });
    } catch (error) {
        console.error("DELETE comment error:", error);

        return NextResponse.json(
            { error: "Failed To Delete Comment" },
            { status: 500 }
        );
    }
}