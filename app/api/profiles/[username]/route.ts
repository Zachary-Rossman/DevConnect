import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Profile from "@/models/Profile";
import User from "@/models/User";

// GET Profile By Username
export async function GET(_request: Request, { params }: { params: Promise<{username: string}> }
) {
    try {
        // Extract Route Parameter (Profile ID)
        const { username } = await params;

        // Connect DB
        await connectDB();

        // Fetch User
        const user = await User.findOne({ username });

        // Check If User Exists
        if (!user) {
            return NextResponse.json(
                { error: "User Not Found" },
                { status: 404 }
            );
        }
        
        // Fetch Profile
        const profile = await Profile.findOne({
            userId: user._id,
        });

        if (!profile) {
            return NextResponse.json(
                { error: "Profile Not Found" },
                { status: 404 }
            );
        }

        // Build Object For Profille From Profile And User
        const responseData = {
            _id: String(profile._id),
            username: user.username,
            firstName: profile.firstName,
            lastName: profile.lastName,
            bio: profile.bio ?? "",
            city: profile.city,
            country: profile.country,
            techStack: profile.techStack,
        };

        // Success Message And Send Combined Data Back
        return NextResponse.json(responseData,
            { status: 200 }
        );
    } catch (error) {
        // Backend Logging Preserved For Debugging
        console.error("GET /profiles/[username] error:", error);

        return NextResponse.json(
            { error: "Server Error" },
            { status: 500},
        );
    }
};