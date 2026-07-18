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

        // Check password length to make sure user creates password at least 8 characters in length
        if (password.length < 8) {
            return Response.json(
                {
                    error: "Password must be at least 8 characters.",
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
                    status: 400,
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