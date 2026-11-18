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

    // Render Page
    return(
        <main
            className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[linear-gradient(135deg,#09183f_0%,#243d87_52%,#783b87_100%)] px-4 py-12 sm:px-6 sm:py-16"
            aria-labelledby="create-post-title"
        >
            <div className="mx-auto w-full max-w-2xl space-y-8 rounded-3xl border border-[#b8c6ff]/30 bg-white/95 p-6 shadow-[0_25px_70px_rgba(6,17,55,0.30)] sm:p-10">
                {/* Page Header */}
                <header className="space-y-3 text-center">
                    <h1
                        id="create-post-title"
                        className="bg-[linear-gradient(90deg,#172653_0%,#354b97_45%,#a32972_100%)] bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl"
                    >
                        Create New Post
                    </h1>

                    <p className="text-base leading-7 text-[#536382]">
                        Share your thoughts and ideas with the community.
                    </p>
                </header>

                {/* Form Container */}
                <section
                    className="rounded-2xl border border-[#eed7ec] bg-[linear-gradient(145deg,#ffffff_0%,#fff4fb_100%)] p-6 shadow-[0_8px_30px_rgba(35,50,104,0.05)] sm:p-8"
                    aria-label="Create Post Form"
                >
                    <CreatePostForm />
                </section>
            </div>
        </main>
    );
}