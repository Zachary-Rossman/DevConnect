import mongoose from "mongoose";

const ReactionSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
            required: true,
        },

        userId: {
            type: String,
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