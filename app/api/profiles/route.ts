import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Profile from "@/models/Profile";
import User from "@/models/User";

// GET Route
export async function GET() {
    try {
        await connectDB();

        // Fetch Profiles
        const profiles = await Profile.find();

        if (profiles.length === 0) {
            return NextResponse.json(
                { error: "No Profiles Found" },
                { status: 404 }
            );
        }

        // Attach Username
        const profilesWithUsername = await Promise.all(
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
                    username: user ? user.username : "Unknown User",
                };
            })
        );

        return NextResponse.json(profilesWithUsername,
            { status: 200 }
        );
    } catch (error) {
        // Backend Logging Preserved For Debugging
        console.error("GET /profiles error:", error);

        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 },
        );
    }
};