import { cookies } from "next/headers";
import EditPostForm from "@/components/posts/EditPostForm";
import { getPost } from "@/lib/posts";
import mongoose from "mongoose";
import { notFound, redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

// Edit Post Page ID Prop
type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditPostPage({ params }: Props) {
    // Read The Route Parameter
    const { id } = await params;
    
    // Reject Malformed MongoDB IDs
    if (!mongoose.isValidObjectId(id)) {
        notFound();
    }

    // Read The Authentication Cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // Redirect Visitors Without A Token
    if (!token) {
        redirect("/login");
    }

    // Verify The Authentication Token
    const payload = verifyToken(token);

    if (!payload) {
        redirect("/login");
    }

    // Fetch The Post
    const post = await getPost(id);

    // Handle Missing Posts
    if (!post) {
        notFound();
    }

    // Verify Post Ownership Before Rendering Post Editor
    if (post.authorId._id.toString() !== payload.userId) {
        notFound();
    }

    // Render Edit Page
    
        return (
            <main
                className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[linear-gradient(135deg,#09183f_0%,#243d87_52%,#783b87_100%)] px-4 py-12 sm:px-6 sm:py-16"
                aria-labelledby="edit-post-heading"
            >
                <div className="w-full max-w-3xl space-y-8 rounded-3xl border border-[#b8c6ff]/30 bg-white/95 p-6 shadow-[0_25px_70px_rgba(6,17,55,0.30)] sm:p-10">
                    {/* Page Header */}
                    <header className="space-y-3 text-center">
                        <h1
                            id="edit-post-heading"
                            className="bg-[linear-gradient(90deg,#172653_0%,#354b97_45%,#a32972_100%)] bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl"
                        >
                            Edit Post
                        </h1>

                        <p className="text-base leading-7 text-[#536382]">
                            Update your post and save your changes.
                        </p>
                    </header>

                    {/* Edit Form */}
                    <section
                        className="rounded-2xl border border-[#eed7ec] bg-[linear-gradient(145deg,#ffffff_0%,#fff4fb_100%)] p-6 shadow-[0_8px_30px_rgba(35,50,104,0.05)] sm:p-8"
                        aria-label="Edit post form"
                    >
                        <EditPostForm
                            id={post._id.toString()}
                            initialTitle={post.title}
                            initialBody={post.body}
                            initialImage={post.image ?? ""}
                        />
                    </section>
                </div>
            </main>
        );
}
