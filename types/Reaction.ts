export type ReactionType = "like";

export type CreateReactionInput = {
    postId: string;
    userId: string;
    type: ReactionType;
};

export type Reaction = {
    _id: string;
    postId: string;
    userId: string;
    type: ReactionType;
    createdAt: string;
    updatedAt: string;
}