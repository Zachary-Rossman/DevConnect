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

    authorId: {
        _id: string;
        username: string;
    } | null;
    author: string;

    createdAt: string;
    updatedAt: string;
    
    likes: number;
    comments: number;

    likedByMe?: boolean;

    latestComment?: {
        username: string;
        content: string;
    } | null;
}
