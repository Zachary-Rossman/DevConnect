
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Post from "@/models/Post";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

// CREATE Post
export async function POST(request: Request) {
    try {
        // Read Authentication Cookie
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        // Verify JWT
        const payload = token ? verifyToken(token) : null;

        if (!payload) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Read Request Body
        const data = await request.json();

        // Validate Request Structure
        if (
            !data ||
            typeof data !== "object" ||
            Array.isArray(data)
        ) {
            return NextResponse.json(
                { error: "Invalid Request Body" },
                { status: 400 }
            );
        }

        const { title, body, image } = data;

        // Validate Title
        if (
            typeof title !== "string" ||
            !title.trim()
        ) {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            );
        }

        // Validate Post Body
        if (
            typeof body !== "string" ||
            !body.trim()
        ) {
            return NextResponse.json(
                { error: "Body is required" },
                { status: 400 }
            );
        }

        // Validate Optional Image
        if (
            image !== undefined &&
            typeof image !== "string"
        ) {
            return NextResponse.json(
                { error: "Image must be a string" },
                { status: 400 }
            );
        }

        const cleanedImage = image?.trim() ?? "";

        if (cleanedImage) {
            try {
                const url = new URL(cleanedImage);

                if (
                    url.protocol !== "http:" &&
                    url.protocol !== "https:"
                ) {
                    return NextResponse.json(
                        { error: "Image must use HTTP or HTTPS" },
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

        // Connect To Database
        await connectDB();

        // Verify Authenticated User Exists
        const user = await User.findById(payload.userId);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Create Post With Server-Side Ownership
        const post = await Post.create({
            title: title.trim(),
            body: body.trim(),
            image: cleanedImage,
            authorId: user._id,
        });

        // Return Successful Creation
        return NextResponse.json(
            {
                message: "Post created successfully",
                post,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST /api/posts error:", error);

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { error: "Invalid JSON Body" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}
