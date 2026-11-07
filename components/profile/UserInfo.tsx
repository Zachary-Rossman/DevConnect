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
           className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
           aria-label="Developer information"
        >
            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
                {/* Profile Photo Placeholder */}
                <div
                   className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gray-100 ring-1 ring-gray-200"
                   aria-hidden="true"
                >
                    <svg
                       viewBox="0 0 64 64"
                       className="h-16 w-16 text-gray-400"
                       fill="currentColor"
                    >
                        <circle cx="32" cy="22" r="12" />
                        <path d="M10 58c0-13 9-21 22-21s22 8 22 21H10z" />
                    </svg>
                </div>

                {/* User Details */}
                <div className="space-y-2">
                    {/* Full Name */}
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        {firstName} {lastName}
                    </h1>

                    {/* Username */}
                    <p className="text-sm font-medium text-blue-600">
                        @{username}
                    </p>

                    {/* Location */}
                    {location && (
                        <p className="text-sm text-gray-500">
                            {location}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}