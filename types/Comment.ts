export type CreateCommentInput = {
    postId: string;
    image?: string;
    content: string;
}

export type Comment = {
    _id: string;
    postId: string;
    userId: string;
    image?: string;
    content: string;
    createdAt: string;
    updatedAt: string;

    user?: {
        _id: string;
        username: string;
    } | null;
}