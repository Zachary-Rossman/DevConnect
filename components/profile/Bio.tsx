type BioProps = {
    bio: string;
};

export default function Bio({ bio }: BioProps) {
    return (
        <section
           className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
           aria-label="Developer biography"
        >
            <h2 className="mb-4 text-xl font-bold text-gray-900">
                About
            </h2>

            {bio.trim() ? (
                <p className="whitespace-pre-wrap-break-word text-gray-600 leading-relaxed">
                    {bio}
                </p>
            ): (
                <p className="text-sm italic text-gray-400">
                    This developer hasn't added a bio yet.
                </p>
            )}
        </section>
    )
}