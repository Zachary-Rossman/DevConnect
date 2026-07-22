export type CreatePostInput = {
    title: string;
    body: string;
    image?: string;
}

export type Post = {
    _id: string;
    title: string;
    body: string;
    image?: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    likes: number;
    comments: number;
}