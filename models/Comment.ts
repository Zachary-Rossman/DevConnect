import mongoose, { Schema, model, models, Document, Types, } from "mongoose";

interface CommentDocument extends Document {
    postId: Types.ObjectId;
    userId: Types.ObjectId;
    image?: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema = new Schema<CommentDocument>(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        image: {
            type: String,
            required: false,
        },

        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Comment = models.Comment || model<CommentDocument>("Comment", CommentSchema);

export default Comment;