export type Profile = {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    bio: string;
    city?: string;
    country: string;
    techStack: string[];
};