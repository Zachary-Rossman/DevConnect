import mongoose from "mongoose";

const ReactionSchema = new mongoose.Schema(
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

        type: {
            type: String,
            enum: ["like"],
            default: "like",
        },
    },
    {
        timestamps: true,
    }
);

// Limit To Only One User And One Post Allowed In A Reaction
ReactionSchema.index(
    {
        postId: 1,
        userId: 1,
    },
    {
        unique: true,
    }
);

const Reaction =
    mongoose.models.Reaction ||
    mongoose.model("Reaction", ReactionSchema);

export default Reaction;