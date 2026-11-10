import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Post from "@/models/Post";
import Reaction from "@/models/Reaction";
import { verifyToken } from "@/lib/auth";

// Toggle Reaction (POST)
export async function POST(req: Request) {
    try {
        // Connect To MongoDB
        await connectDB();

        //Read Auth Cookie
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

        // Read The Request Body Sent By Frontend 
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

        // Validate Required Values
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

        // Verify If User Has Already Reacted
        const existingReaction = await Reaction.findOne({
            postId,
            userId,
        });

        let liked = false;

        // Toggle The Reaction
        if (existingReaction) {
            // Remove Like If Already Liked
            await Reaction.deleteOne({
                _id: existingReaction._id,
            });

            liked = false;
        } else {
            // Create Like If New Reaction
            await Reaction.create({
                postId,
                userId,
            });

            liked = true;
        }

        // Count Every Reaction Currently Attached To Post
        const count = await Reaction.countDocuments({
            postId,
        });

        // Return Updated State So React Can Immediately Update UI
        return NextResponse.json({
            liked,
            count,
        });
    } catch (error) {
        console.error("POST /reactions error:", error);

        // Handle Invalid JSON Requests
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { error: "Invalid JSON Body" },
                { status: 400 }
            );
        }

        // Handle Unexpected Server Errors
        return NextResponse.json(
            { error: "Failed To Toggle Reaction" },
            { status: 500 }
        );
    }
}

// GET Reactions
export async function GET(req: Request) {
    try {
        // Connect To MongoDB
        await connectDB();

        // Read Auth Cookie
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        let userId: string | null = null;

        if (token) {
            const payload = verifyToken(token);

            if (!payload) {
                return NextResponse.json(
                    { error: "Unauthorized" },
                    { status: 401 }
                );
            }

            if (payload) {
                userId = payload.userId;
            }
        }

        // Read The Requested ID From The Query String
        const { searchParams } = new URL(req.url);

        // Validate Requested Post
        const postId = searchParams.get("postId");

        if (
            !postId ||
            !mongoose.isObjectIdOrHexString(postId)
        ) {
            return NextResponse.json(
                { error: "Invalid Post ID" },
                { status: 400 }
            );
        }

        // Count Every Reaction On Post
        const count = await Reaction.countDocuments({
            postId,
        });

        // Check If Authenticated User Already Reacted
        const existingReaction = userId
            ? await Reaction.findOne({ postId, userId })
            : null;

        const liked = Boolean(existingReaction);

        // Initialize Reaction Button
        return NextResponse.json({
            count,
            liked,
        });
    } catch (error) {
        console.error("GET /reactoins error:", error);

        // Handle Unexpected Server Errors
        return NextResponse.json(
            { error: "Failed To Fetch Reactions" },
            { status: 500 }
        );
    }
}