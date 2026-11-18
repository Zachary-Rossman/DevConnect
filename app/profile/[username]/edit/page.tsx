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
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[linear-gradient(135deg,#09183f_0%,#243d87_52%,#783b87_100%)] px-4 py-12 sm:px-6 sm:py-16">
            <div className="mx-auto w-full max-w-5xl space-y-8 rounded-3xl border border-[#b8c6ff]/30 bg-white/95 p-6 shadow-[0_25px_70px_rgba(6,17,55,0.30)] sm:p-10">
                <h1 className="bg-[linear-gradient(90deg,#172653_0%,#354b97_45%,#a32972_100%)] bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
                    Edit Profile
                </h1>

                <EditProfileForm profile={profile} />
            </div>
        </main>
    );
}