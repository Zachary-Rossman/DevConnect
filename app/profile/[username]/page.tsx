import Bio from "@/components/profile/Bio";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Post from "@/models/Post";
import type { Post as PostType } from "@/types/Post";
import PostFeedProfile from "@/components/profile/PostFeedProfile";
import type { Profile } from "@/types/Profile";
import profileModel from "@/models/Profile";
import TechStack from "@/components/profile/TechStack";
import User from "@/models/User";
import UserInfo from "@/components/profile/UserInfo";
import { verifyToken } from "@/lib/auth";
import ProfileActions from "@/components/profile/ProfileActions";

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

    // Fetch Posts Belonging To This User
    const userPosts = await Post.find({
        authorId: user._id,
    })
        .sort({ createdAt: -1 })
        .lean();

    // Convert MongoDB Posts Into Plain Objects
    const posts: PostType[] = userPosts.map((post) => ({
        _id: String(post._id),
        title: post.title,
        body: post.body,
        image: post.image,
        likes: post.likes,
        comments: post.comments,
        author: user.username,
        authorId: {
            _id: String(user._id),
            username: user.username,
        },
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt.toISOString(),
    }));

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

    // Read Auth Cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // Verify Auth Token
    const decoded = token ? verifyToken(token) : null;

    // Check Profile Ownership
    const isOwner = Boolean(
        decoded && String(decoded.userId) === String(user._id)
    );

    // Pass Profile Data Into UserInfo
    return (
        <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
            {isOwner && (
                <ProfileActions username={profile.username} />
            )}
            <UserInfo profile={profile} />
            <Bio bio={profile.bio} />
            <TechStack techStack={profile.techStack} />
            <PostFeedProfile posts={posts} />
        </main>
    );
}