import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// GET /api/me: This is the "source of truth" for authentication state on the frontend
export async function GET() {
    // Step 1: Read Auth Cookie
    const cookieStore = await cookies();

    const token = cookieStore.get("auth_token")?.value;

    // No Token = User is not authenticated
    if (!token) {
        return NextResponse.json(null, { status: 401 });
    }

    // Step 2: Verify JWT Token
    const payload = verifyToken(token);

    if (!payload) {
        return NextResponse.json(null, { status: 401 });
    }

    // Step 3: Connect To Database
    await connectDB();

    // Step 4: Fetch User From Database
    const user = await User.findById(payload.userId)
        .select("_id username email");

    if (!user) {
        return NextResponse.json(null, { status: 401 });
    }

    // Step 5: Return Safe User Data: NEVER RETURN PASSWORD OR SENSITIVE FIELDS
    return NextResponse.json({
        id: user._id,
        username: user.username,
        email: user.email,
    });
}