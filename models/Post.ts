import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },

    body: {
        type: String,
        trim: true,
        required: true,
    },

    image: {
        type: String,
        trim: true,
        default: "",
        required: false,
    },

    authorId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: "User",
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },

    likes: {
        type: Number,
        default: 0,
        required: true,
    },

    comments: {
        type: Number,
        default: 0,
        required: true,
    },
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post; 