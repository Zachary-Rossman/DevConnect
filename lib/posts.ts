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

    return posts.map((post) => ({
        _id: post._id.toString(),
        title: post.title,
        body: post.body,
        image: post.image,

        authorId: post.authorId 
        ? {
            _id: post.authorId._id.toString(),
            username: post.authorId.username,
          }
        : null,

        author: post.authorId?.username ?? "Unknown",

        likes: post.likes,
        comments: post.comments,

        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
    }));
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