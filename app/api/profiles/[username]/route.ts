import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Profile from "@/models/Profile";
import type { UpdateProfileInput } from "@/types/Profile";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

// GET Profile By Username
export async function GET(_request: Request, { params }: { params: Promise<{username: string}> }
) {
    try {
        // Extract Route Parameter
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

// PATCH Profile Owned By Authenticated User
export async function PATCH(
    _request: Request,
    { params }: { params: Promise<{ username: string }> }
) {
    try {
        // Extract Username From URL
        const { username } = await params;

        // Connect DB
        await connectDB();

        // Read Auth Cookie
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Verify Token
        const payload = verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Fetch User
        const user = await User.findOne({ username });

        // Verify User Exists
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

        // Verify Profile Exists
        if (!profile) {
            return NextResponse.json(
                { error: "Profile Not Found" },
                { status: 404 } 
            );
        }

        // Verify Profile Ownership
        if (String (payload.userId) !== String(user._id)) {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        // Read Update Payload
        const body = await _request.json();

        if (!body || typeof body !== "object" || Array.isArray(body)) {
            return NextResponse.json(
                { error: "Invalid Request Body" },
                { status: 400 }
            );
        }

        // Whitelist Editables (Prevent Ownership Change)
        const updates: Partial<UpdateProfileInput> = {};

        // Validate Submitted First Name
        if (body.firstName !== undefined) {
            if (typeof body.firstName !== "string" || !body.firstName.trim()) {
                return NextResponse.json(
                    { error: "First Name Cannot Be Empty" },
                    { status: 400 }
                );
            }
            updates.firstName = body.firstName.trim();
        }

        // Validate Submitted Last Name
        if (body.lastName !== undefined) {
            if (typeof body.lastName !== "string" || !body.lastName.trim()) {
                return NextResponse.json(
                    { error: "Last Name Cannot Be Empty" },
                    { status: 400 }
                );
            }
            updates.lastName = body.lastName.trim();
        }

        // Validate Submitted Country
        if (body.country !== undefined) {
            if (typeof body.country !== "string" || !body.country.trim()) {
                return NextResponse.json(
                    { error: "Country Cannot Be Empty" },
                    { status: 400 }
                );
            }
            updates.country = body.country.trim();
        }

        // Validate Submitted Bio
        if (body.bio !== undefined) {
            if (typeof body.bio !== "string") {
                return NextResponse.json(
                    { error: "Bio Must Be A String" },
                    { status: 400 }
                );
            }
            updates.bio = body.bio.trim();
        }

        // Validate Submitted City
        if (body.city !== undefined) {
            if (typeof body.city !== "string") {
                return NextResponse.json(
                    { error: "City Must Be A String" },
                    { status: 400 }
                );
            }
            updates.city = body.city.trim();
        }

        // Validate Submitted Tech Stack
        if (body.techStack !== undefined) {
            // Verify Tech Stack Is An Array Of Strings
            if (
                !Array.isArray(body.techStack) || 
                !body.techStack.every(
                    (skill: unknown) => typeof skill === "string"
                )
            ) {
                return NextResponse.json(
                    { error: "Tech Stack Must Be An Array Of Strings" },
                    { status: 400 }
                );
            }

            // Clean Tech Stack Before Updating
            updates.techStack = (body.techStack as string[])
                .map((skill) => skill.trim())
                .filter((skill) => skill.length > 0);
        }

        // Verify Changes Are Being Submitted
        if (Object.keys(updates).length === 0) {
            return NextResponse.json(
                { error: "No Valid Fields Provided To Update" },
                { status: 400 }
            );
        }

        // Update Profile Document
        const updatedProfile = await Profile.findOneAndUpdate(
            { userId: user._id },
            { $set: updates },
            { new: true, runValidators: true }
        );

        // Handles Unlikely Case Where Profile Was Removed Between Check And Update
        if (!updatedProfile) {
            return NextResponse.json(
                { error: "Profile Not Found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Profile Updated Successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("PATCH /profiles/[username] error:", error);

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { error: "Invalid JSON Body" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Server Error" },
            { status: 500 }
        );
    }
}