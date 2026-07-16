export type CreateUserInput = {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    birthday: string;
    city: string;
    country: string;
};

export type LoginInput = {
    username: string;
    password: string;
};

export type User = {
    _id: string;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    birthday: string;
    city: string;
    country: string;
    techStack: string[];
    accountCreatedDate: string;
};