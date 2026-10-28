import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

// Get All Posts
export async function getPosts() {
    await connectDB();

    const posts = await Post.find()
        .sort({ createdAt: -1 })
        .lean();

    return posts;
}

// Get Single Post
export async function getPost(id: string) {
    await connectDB();

    return await Post.findById(id);
}