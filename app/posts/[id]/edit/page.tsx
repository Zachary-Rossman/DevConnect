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
               className="min-h-[calc(100vh-4rem)] bg-gray-50 px-6 py-12"
               aria-labelledby="edit-post-heading"
            >
                <div className="space-y-2 text-center">
                    {/* Page Header */}
                    <header className="space-y-2 text-center">
                        <h1
                           id="edit-post-heading"
                           className="text-4xl font-bold tracking-tight text-gray-900"
                        >
                            Edit Post
                        </h1>

                        <p className="text-gray-600">
                            Update your post and save your changes.
                        </p>
                    </header>

                    {/* Edit Form */}
                    <section
                       className="rounded-2xl border bg-white p-6 shadow-sm"
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
        )
}
