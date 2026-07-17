import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },

    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        minLength: 8,
        required: true,
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
    },

    birthday: {
        type: Date,
        required: true,
    },

    city: {
        type: String,
        trim: true,
        required: true,
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

const User = 
    mongoose.models.User ||
    mongoose.model("User", UserSchema);

export default User;