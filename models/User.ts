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
        minLength: [8, "Password must be at least 8 characters long"],
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
},
{
    timestamps: true,
},
);

const User = 
    mongoose.models.User ||
    mongoose.model("User", UserSchema);

export default User;