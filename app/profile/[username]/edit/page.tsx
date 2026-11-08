import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import EditProfileForm from "@/components/profile/EditProfileForm";
import { notFound, redirect } from "next/navigation";
import type { Profile } from "@/types/Profile";
import ProfileModel from "@/models/Profile";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

type EditProfilePageProps = {
    params: Promise<{ username: string }>;
};

export default async function EditProfilePage({
    params,
}: EditProfilePageProps) {
    // Get Username From URL
    const { username } = await params;

    // Read Auth Cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // Verify Auth Token
    const decoded = token ? verifyToken(token) : null;

    // Redirect Unauthenticated Visitors
    if (!decoded) {
        redirect("/login");
    }

    // Connect To MongoDB
    await connectDB();

    // Find User By Username
    const user = await User.findOne({ username });

    // Verify User Exists
    if (!user) {
        notFound();
    }

    // Verify Profile Ownership
    if (String(decoded.userId) !== String(user._id)) {
        notFound();
    }

    // Find Profile Belonging To User
    const profileDocument = await ProfileModel.findOne({
        userId: user._id,
    });

    // Check If Profile Exists
    if (!profileDocument) {
        notFound();
    }

    // Convert Profile Document Into Plain Object
    const profile: Profile = {
        _id: String(profileDocument._id),
        username: user.username,
        firstName: profileDocument.firstName,
        lastName: profileDocument.lastName,
        bio: profileDocument.bio ?? "",
        city: profileDocument.city,
        country: profileDocument.country,
        techStack: profileDocument.techStack ?? [],
    };

    // Render Protected Edit Page
    return (
        <main className="mx-auto max-w-5xl px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900">
                Edit Profile
            </h1>

            <EditProfileForm profile={profile} />
        </main>
    );
}