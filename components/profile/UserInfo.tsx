import type { Profile } from "@/types/Profile";

type UserInfoProps = {
    profile: Profile;
};

export default function UserInfo({profile}: UserInfoProps) {
    // Destructure Needed Properties From Profile
    const { firstName, lastName, username, city, country } = profile;

    // Format Location
    const location = [city, country].filter(Boolean).join(", ");

    return (
        <section
            className="rounded-3xl border border-[#dce2f7] bg-white p-6 shadow-[0_12px_35px_rgba(35,50,104,0.07)] transition-colors hover:border-[#e5b5df] sm:p-8"
            aria-label="Developer information"
        >
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-8 sm:text-left">
                {/* Profile Photo Placeholder */}
                <div
                    className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#dce8ff_0%,#e9ddfa_55%,#f9d9ed_100%)] shadow-[0_8px_25px_rgba(66,55,145,0.12)] ring-4 ring-[#edf3ff] sm:h-32 sm:w-32"
                    aria-hidden="true"
                >
                    <svg
                        viewBox="0 0 64 64"
                        className="h-16 w-16 text-[#59429c] sm:h-20 sm:w-20"
                        fill="currentColor"
                    >
                        <circle cx="32" cy="22" r="12" />
                        <path d="M10 58c0-13 9-21 22-21s22 8 22 21H10z" />
                    </svg>
                </div>

                {/* User Details */}
                <div className="min-w-0 space-y-3">
                    {/* Full Name */}
                    <h1 className="break-words text-2xl font-black tracking-tight text-[#172653] sm:text-3xl">
                        {firstName} {lastName}
                    </h1>

                    {/* Username */}
                    <p className="break-words text-sm font-bold text-[#a32972] sm:text-base">
                        @{username}
                    </p>

                    {/* Location */}
                    {location && (
                        <p className="break-words text-sm font-medium text-[#66738f]">
                            {location}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}