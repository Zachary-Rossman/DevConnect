import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import User from "@/models/User";

// Get All Posts
export async function getPosts() {
    await connectDB();

    // Fetch Posts & Populate Username
    const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate({
            path: "authorId",
            select: "username",
            model: User,
        })
        .lean();

    return posts;
}

// Get Single Post
export async function getPost(id: string) {
    await connectDB();

    // Reject Malformed MongoDB ObjectIds
    if(!mongoose.isObjectIdOrHexString(id)) {
        return null;
    }

    // Fetch Post & Populate Author Username
    return await Post.findById(id).populate({
        path: "authorId",
        select: "username",
        model: User,
    });
}