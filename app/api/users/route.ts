import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

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

        // Create New User Document
        const newUser = await User.create({
            email,
            username,
            password: hashedPassword,
            firstName,
            lastName,
            birthday,
            city,
            country,
        });

        // Success Response
        return Response.json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                username: newUser.username,
            },
        },
        {
            status: 201,
        }
    );
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