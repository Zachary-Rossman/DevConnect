type BioProps = {
    bio: string;
};

export default function Bio({ bio }: BioProps) {
    return (
        <section
            className="rounded-3xl border border-[#dce2f7] bg-white p-6 shadow-[0_12px_35px_rgba(35,50,104,0.07)] transition-colors hover:border-[#e5b5df] sm:p-8"
            aria-label="Developer biography"
        >
            <h2 className="mb-5 border-b border-[#e8e8f5] pb-4 text-2xl font-black tracking-tight text-[#a32972]">
                About
            </h2>

            {bio.trim() ? (
                <p className="whitespace-pre-wrap break-words leading-relaxed text-[#465577]">
                    {bio}
                </p>
            ): (
                <p className="text-sm italic leading-7 text-[#66738f]">
                    This developer hasn't added a bio yet.
                </p>
            )}
        </section>
    );

}