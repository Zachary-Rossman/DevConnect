type TechStackProps = {
    techStack: string[];
};

export default function TechStack({ techStack }: TechStackProps) {
    return (
        <section
           className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
           aria-label="Developer tech stack"
        >
            <h2 className="mb-4 text-xl font-bold text-gray-900">
                Tech Stack
            </h2>

            {/* Check If Tech Stack Is Empty */}
            {techStack.length === 0 ? (
                <p className="text-sm italic text-gray-400">
                    No technologies added yet.</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {techStack.map((technology, index) => (
                        <span 
                           key={index}
                           className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                        >
                            {technology}
                    </span>
                ))}
                </div>
            )}
        </section>
    );
}