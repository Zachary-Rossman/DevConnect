type TechStackProps = {
    techStack: string[];
};

export default function TechStack({ techStack }: TechStackProps) {
    return (
        <section
            className="rounded-3xl border border-[#dce2f7] bg-white p-6 shadow-[0_12px_35px_rgba(35,50,104,0.07)] transition-colors hover:border-[#e5b5df] sm:p-8"
            aria-label="Developer tech stack"
        >
            <h2 className="mb-6 border-b border-[#e8e8f5] pb-4 text-2xl font-black tracking-tight text-[#a32972]">
                Tech Stack
            </h2>

            {/* Check If Tech Stack Is Empty */}
            {techStack.length === 0 ? (
                <p className="rounded-2xl border border-[#e5d5f5] bg-[linear-gradient(135deg,#edf3ff_0%,#fff1fa_100%)] px-6 py-8 text-center text-sm italic leading-7 text-[#66738f]">
                    No technologies added yet.</p>
            ) : (
                <div className="flex flex-wrap gap-3">
                    {techStack.map((technology, index) => (
                        <span
                            key={index}
                            className="max-w-full break-words rounded-full border border-[#c7c9f1] bg-[linear-gradient(120deg,#edf3ff_0%,#fff1fa_100%)] px-4 py-2 text-sm font-bold text-[#243f8f] shadow-[0_3px_10px_rgba(35,50,104,0.05)] transition-colors hover:border-[#d99ac9] hover:text-[#923774]"
                        >
                            {technology}
                        </span>
                    ))}
                </div>
            )}
        </section>
    );
}