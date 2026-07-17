import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        minLength: 8,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    displayName: {
        type: String,
    },

    birthday: {
        type: Date,
        required: true,
    },

    city: {
        type: String,
        required: true,
    },

    country: {
        type: String,
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