import Bio from "@/components/profile/Bio";
import { connectDB } from "@/lib/mongodb";
import { notFound } from "next/navigation";
import type { Profile } from "@/types/Profile";
import profileModel from "@/models/Profile";
import TechStack from "@/components/profile/TechStack";
import User from "@/models/User";
import UserInfo from "@/components/profile/UserInfo";

type ProfilePageProps = {
    params: Promise<{ username: string }>;
};

export default async function ProfileIndividualPage({
    params,
}: ProfilePageProps) {
    // Get Username From URL
    const { username } = await params;

    // Connect To MongoDB
    await connectDB();

    // Find User By Username
    const user = await User.findOne({ username });

    if (!user) {
        notFound();
    }

    // Find Profile Belonging To User
    const profileDocument = await profileModel.findOne({
        userId: user._id,
    });

    if (!profileDocument) {
        notFound();
    }

    // Build Public Profile Object
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

    // Pass Profile Data Into UserInfo
    return (
        <main className="mx-auto max-w-5xl px-4 py-8">
            <UserInfo profile={profile} />
            <Bio bio={profile.bio} />
            <TechStack techStack={profile.techStack} />
        </main>
    );
}