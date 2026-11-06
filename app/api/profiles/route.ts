import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Profile from "@/models/Profile";
import User from "@/models/User";

// GET Route
export async function GET() {
    try {
        await connectDB();

        // Fetch Profile
        const profiles = await Profile.find();

        // Attach Author Username
        const profileWithDetails = await Promise.all(
            profiles.map(async (profile) => {
                const user = await User.findById(profile.userId);
                return {
                    _id: String(profile._id),
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    city: profile.city,
                    country: profile.country,
                    techStack: profile.techStack,

                    // Human-Readable Username Field
                    username: user ? user.username : "Unknown",
                };
            })
        );

        return NextResponse.json(profileWithDetails);
    } catch (error) {
        // Backend Logging Preserved For Debugging
        console.error("GET /profile error:", error);

        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 },
        );
    }
};