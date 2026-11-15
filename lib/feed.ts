import Comment from "@/models/Comment";
import { getPosts } from "./posts";
import mongoose from "mongoose";
import Reaction from "@/models/Reaction";
import User from "@/models/User";
import { stat } from "fs";

type ReactionStat = {
    _id: mongoose.Types.ObjectId;
    count: number;
    liked: number;
};

type CommentStat = {
    _id: mongoose.Types.ObjectId;
    count: number;
    latest: {
        userId: mongoose.Types.ObjectId;
        content: string;
    };
};

export async function getFeedPosts(userId: string) {
    // Reuse Existing Post Retrieval
    const posts = await getPosts();

    if (posts.length === 0) return [];

    // Convert Post IDs For MongoDB Queries
    const postIds = posts.map(
        (post) => new mongoose.Types.ObjectId(post._id)
    );

    const viewerId = new mongoose.Types.ObjectId(userId);

    // Retrieve Reactions And Comments
    const [reactionResults, commentResults] = await Promise.all([
        Reaction.aggregate([
            {
                $match: {
                    postId: { $in: postIds },
                },
            },
            {
                $group: {
                    _id: "$postId",
                    count: { $sum: 1 },
                    liked: {
                        $max: {
                            $cond: [
                                { $eq: ["userId", viewerId] },
                                1,
                                0,
                            ],
                        },
                    },
                },
            },
        ]),

        Comment.aggregate([
            {
                $match: {
                    postId: { $in: postIds },
                },
            },
            {
                $sort: {
                    createdAt: -1,
                    _id: -1,
                },
            },
            {
                $group: {
                    _id: "$postId",
                    count: { $sum: 1 },
                    latest: {
                        $first: {
                            userId: "$userId",
                            content: "$content",
                        },
                    },
                },
            },
        ]),
    ]);

    const reactionStats = reactionResults as ReactionStat [];
    const commentStats = commentResults as CommentStat[];

    // Retrieve Authors Of Latest Comments
    const commentAuthors = await User.find({
        _id: {
            $in: commentStats.map(
                (stat) => stat.latest.userId
            ),
        },
    })

        .select("username")
        .lean();

    // Create Fast Lookup Maps
    const reactionMap = new Map(
        reactionStats.map((stat) => [
            String(stat._id),
            stat,
        ])
    );

    const commentMap = new Map(
        commentStats.map((stat) => [
            String(stat._id),
            stat,
        ])
    );

    const usernameMap = new Map(
        commentAuthors.map((user) => [
            String(user._id),
            user.username,
        ])
    );

    // Merge Socail Data With Serialized Posts
    return posts.map((post) => {
        const reaction = reactionMap.get(post._id);
        const comment = commentMap.get(post._id);

        return {
            ...post,

            likes: reaction?.count ?? 0,
            likedByMe: Boolean(reaction?.liked),

            comments: comment?.count ?? 0,

            latestComment: comment
                ? {
                    username:
                        usernameMap.get(
                            String(comment.latest.userId)
                        ) ?? "Unknown User",
                    content: comment.latest.content,
                }
                : null,
        };
    });
}
