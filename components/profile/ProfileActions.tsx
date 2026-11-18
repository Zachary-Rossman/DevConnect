import Link from "next/link";

type ProfileOptionsProps = {
    username: string;
};

export default function ProfileActions({ 
    username, 
}: ProfileOptionsProps) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <Link
                href={`/profile/${username}/edit`}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[linear-gradient(110deg,#243f8f_0%,#59429c_55%,#923774_100%)] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_26px_rgba(66,55,145,0.20)] transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972]"
            >
                Edit Profile
            </Link>
        </div>
    );
}