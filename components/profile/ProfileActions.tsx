import Link from "next/link";

type ProfileOptionsProps = {
    username: string;
};

export default function ProfileActions({ 
    username, 
}: ProfileOptionsProps) {
    return (
        <div className="flex items-center gap-3">
            <Link
               href={`/profile/${username}/edit`}
               className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
                Edit Profile
            </Link>
        </div>
    );
}