import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import CreatePostForm from "@/components/posts/CreatePostForm";
import User from "@/models/User";

export default async function NewPostPage() {
    // Server-Side Cookie Access
    const cookieStore = await cookies();

    const token = cookieStore.get("auth_token")?.value;

    // Auth Guard
    if (!token) {
        redirect("/login");
    }

    // JWT Verification
    const payload = verifyToken(token);

    if (!payload) {
        redirect("/login");
    }

    // Vefity Authenticated User
    await connectDB();

    const user = await User.findById(payload.userId);

    if (!user) {
        redirect("/login");
    }

    // Success Path
    return(
        <main
            className="min-h-[calc(100vh-4rem)] bg-gray-50 px-6 py-12"
            aria-labelledby="create-post-title"
        >
            <div className="max-w-2xl mx-auto space-y-8">
                {/* Page Header */}
                <header className="space-y-2 text-center">
                    <h1
                        id="create-post-title"
                        className="text-4xl font-bold tracking-tight text-gray-900"
                    >
                        Create New Post
                    </h1>

                    <p className="text-gray-600">
                        Share your thoughts and ideas with the community.
                    </p>
                </header>

                {/* Form Container */}
                <section
                    className="bg-white border rounded-2xl shadow-sm p-6"
                    aria-label="Create Post Form"
                >
                    <CreatePostForm />
                </section>
            </div>
        </main>
    )
}