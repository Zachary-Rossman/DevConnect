import bcrypt from "bcrypt";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import User from "@/models/User";

export async function POST(request: Request) {
    try {
        // Step 1: Connect to database
        await connectDB(); 

        // Step 2: Extract login credentials
        const { username, password } = await request.json();

        // Validate username
        if (!username?.trim()) {
            return NextResponse.json(
                { error: "Username is required" },
                { status: 400 }
            );
        }

        if (!password?.trim()) {
            return NextResponse.json(
                { error: "Password is required" },
                { status: 400 }
            );
        }

        // Step 3: Find user by username
        const user = await User.findOne({ 
            username: username.trim(),
        });

        // If no user exists, reject login
        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Step 4: Verify Password
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Step 5: Create JWT token
        const token = signToken(user._id.toString());

        // Step 6: Build response
        const response = NextResponse.json(
            { 
                message: "Login Successful",
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                },
            },
            {
                status: 200
            }
        );

        // Step 7: Set HTTP-Only auth cookie
        response.cookies.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        // Error Handling (Server-Side)
        console.error("POST /login error:", error);

        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}