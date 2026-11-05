import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import Profile from "@/models/Profile";
import User from "@/models/User";

// POST Route (CREATE USER (REGISTER))

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const {
            email,
            username,
            password,
            firstName,
            lastName,
            birthday,
            city,
            country,
            techStack = [],
        } = body;

        // Validate Required Fields

        // Email Validation
        if (!email?.trim()) {
            return Response.json(
                { error: "Email is required" }, 
                { status: 400 }
            );
        }

        // Username Validation
        if (!username?.trim()) {
            return Response.json(
                { error: "Username is required" }, 
                { status: 400 }
            );
        }

        // Password Validation
        if (!password?.trim()) {
            return Response.json(
                { error: "Password is required" }, 
                { status: 400 }
            );
        }

        // First Name Validation
        if (!firstName?.trim()) {
            return Response.json(
                { error: "First Name is required" }, 
                { status: 400 }
            );
        }

        // Last Name Validation
        if (!lastName?.trim()) {
            return Response.json(
                { error: "Last Name is required" }, 
                { status: 400 }
            );
        }

        // Birthday Validation
        if (!birthday?.trim()) {
            return Response.json(
                { error: "Birthday is required" }, 
                { status: 400 }
            );
        }

        // City Validation
        if (!city?.trim()) {
            return Response.json(
                { error: "City is required" }, 
                { status: 400 }
            );
        }

        // Country Validation
        if (!country?.trim()) {
            return Response.json(
                { error: "Country is required" }, 
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return Response.json(
                {
                    error: "Please enter a valid email address",
                },
                {
                    status: 400,
                }
            )
        }

        // Check password length to make sure user creates password at least 8 characters in length
        if (password.length < 8) {
            return Response.json(
                {
                    error: "Password must be at least 8 characters",
                },
                {
                    status: 400,
                }
            );
        }

        // Validate Tech Stack
        if (
            !Array.isArray(techStack) ||
            !techStack.every(
                (skill: unknown) => 
                    typeof skill === "string" && skill.trim().length > 0
            )
        ) {
            return Response.json(
                { error: "Tech stack must be an array of non-empty strings" },
                { status: 400 }
            );
        }

        // Check for an existing user to prevent duplicate accounts
        const existingUser = await User.findOne({
            $or: [
                { email },
                { username },
            ],
        });

        if (existingUser) {
            return Response.json(
                {
                    error: "User already exists",
                },
                {
                    status: 409,
                }
            );
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User And Profile In A Single Transaction
        const { newUser, newProfile } = await mongoose.connection.transaction(async (session) => {
            // Create New User Document
            const [newUser] = await User.create(
                [{
                    email,
                    username,
                    password: hashedPassword,
                    birthday,
                }],
                { session }
            );
            // Create New Profile Document
            const [newProfile] = await Profile.create(
                [{
                    userId: newUser._id,
                    firstName,
                    lastName,
                    city,
                    country,
                    techStack,
                }],
                { session }
            );
            
            return { newUser, newProfile };
        });
        return Response.json({
            message: "User and profile created successfully.",
            user: {
                id: String(newUser._id),
                email: newUser.email,
                username: newUser.username,
            },
            profile: {
                id: String(newProfile._id),
                firstName: newProfile.firstName,
                lastName: newProfile.lastName,
                city: newProfile.city,
                country: newProfile.country,
                techStack: newProfile.techStack,
            },
        }, { status: 201 });
    } catch (error) {
        console.error("POST /users error:", error);

        return Response.json(
            {
                error: "Something went wrong",
            },
            {
                status: 500,
            }
        );
    }
}