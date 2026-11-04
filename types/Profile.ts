export type Profile = {
    _id: string;
    firstName: string;
    lastName: string;
    city?: string;
    country: string;
    techStack: string[];

    userId: {
        _id: string;
        username: string;
    } | null;

    createdAt: string;
    updatedAt: string;
};