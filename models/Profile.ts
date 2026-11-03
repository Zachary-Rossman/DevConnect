import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },

    firstName: {
        type: String,
        trim: true,
        required: true,
    },

    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    displayName: {
        type: String,
        trim: true,
        required: true,
    },
    city: {
        type: String,
        trim: true,
        required: false,
    },
    country: {
        type: String,
        trim: true,
        required: true,
    },
    techStack: {
        type: [String],
        default: [],
    },
},
{
    timestamps: true,
},
);

const Profile = 
    mongoose.models.Profile ||
    mongoose.model("Profile", ProfileSchema);

export default Profile