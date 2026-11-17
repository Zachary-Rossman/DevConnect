
import Link from "next/link";
import type { Metadata } from "next";

// Page-Specific Metadata
export const metadata: Metadata = {
    title: "About DevConnect",
    description:
        "Discover why DevConnect was created, the engineering journey behind it, and how the project continues to evolve.",
};

// Current Application Capabilities
const capabilities = [
    {
        title: "Authentication & Authorization",
        description:
            "User registration, login sessions, protected routes, and ownership-based permissions.",
    },
    {
        title: "Developer Profiles",
        description:
            "Public profiles, personal biographies, and technology skills.",
    },
    {
        title: "Posts & Community Feed",
        description:
            "Create, read, edit, and delete posts in an interactive developer-focused feed.",
    },
    {
        title: "Reactions & Comments",
        description:
            "Like posts, participate in discussions, and manage comments with appropriate permissions.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">

            {/* About Hero */}
            <section className="relative overflow-hidden bg-slate-950 text-white">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"
                />

                <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
                    <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-200">
                        The story behind DevConnect
                    </span>

                    <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        Built to learn.
                        <span className="mt-2 block text-blue-400">
                            Designed to evolve.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                        DevConnect is an independent full-stack
                        development project created through curiosity,
                        experimentation, and the belief that one of
                        the best ways to learn software engineering
                        is to build something real.
                    </p>

                    <p className="mt-4 max-w-3xl leading-7 text-slate-400">
                        What began as a learning experience is
                        growing into a functional developer-focused
                        social platform, with new technical
                        challenges shaping every stage of its
                        development.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3 text-sm">
                        <span className="rounded-full border border-slate-700 px-4 py-2 text-slate-300">
                            Independent Project
                        </span>

                        <span className="rounded-full border border-slate-700 px-4 py-2 text-slate-300">
                            Full-Stack Development
                        </span>

                        <span className="rounded-full border border-slate-700 px-4 py-2 text-slate-300">
                            Pre-Alpha
                        </span>
                    </div>
                </div>
            </section>

            {/* Project Mission */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        The Mission
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        More than just another project.
                    </h2>

                    <p className="mt-6 leading-8 text-slate-600">
                        DevConnect was created to explore how
                        full-stack applications actually work,
                        from database design and server-side
                        logic to APIs, frontend components,
                        and the movement of data throughout
                        an application.
                    </p>

                    <p className="mt-4 leading-8 text-slate-600">
                        The goal was never simply to finish
                        a tutorial or produce a working screen.
                        It was to develop a deeper understanding
                        of the decisions, relationships, and
                        systems that make real software function.
                    </p>

                    <p className="mt-4 leading-8 text-slate-600">
                        Every feature creates an opportunity to
                        strengthen engineering skills and build
                        toward delivering professional software
                        solutions.
                    </p>
                </div>
            </section>

            {/* Development Philosophy */}
            <section className="border-y border-slate-200 bg-white">
                <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">

                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                            The Development Process
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Build. Break. Debug. Learn.
                        </h2>

                        <p className="mt-6 leading-8 text-slate-600">
                            The development of DevConnect has
                            never been a perfectly straight path.
                            Features are planned, implemented,
                            tested, broken, investigated, and
                            improved.
                        </p>

                        <p className="mt-4 leading-8 text-slate-600">
                            Errors are part of the learning
                            experience. Working through them
                            develops a better understanding
                            of application architecture,
                            data relationships, and how
                            different systems communicate.
                        </p>

                        <p className="mt-4 leading-8 text-slate-600">
                            Each challenge is an opportunity
                            to become a more capable and
                            independent developer.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                        <h3 className="text-xl font-bold">
                            The Learning Cycle
                        </h3>

                        <ol className="mt-6 space-y-5">
                            {[
                                "Understand the problem",
                                "Plan the implementation",
                                "Build the feature",
                                "Test and identify issues",
                                "Debug and improve",
                                "Apply what was learned",
                            ].map((step, index) => (
                                <li
                                    key={step}
                                    className="flex items-center gap-4"
                                >
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                                        {index + 1}
                                    </span>

                                    <span className="font-medium text-slate-700">
                                        {step}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* Current Application */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        What DevConnect Has Become
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        From concept to functioning application.
                    </h2>

                    <p className="mt-5 leading-8 text-slate-600">
                        DevConnect has evolved into a working
                        pre-alpha social application with
                        interconnected features, database
                        relationships, and user-specific
                        permissions.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {capabilities.map((feature) => (
                        <article
                            key={feature.title}
                            className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
                        >
                            <div className="mb-4 h-1 w-12 rounded-full bg-blue-600" />

                            <h3 className="text-xl font-bold">
                                {feature.title}
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                {feature.description}
                            </p>
                        </article>
                    ))}
                </div>

                <p className="mt-8 text-sm leading-7 text-slate-500">
                    DevConnect remains an evolving pre-alpha
                    project. Additional community and networking
                    features are possibilities for future
                    development, not currently completed
                    functionality.
                </p>
            </section>

            {/* AI Development Philosophy */}
            <section className="bg-slate-950 text-white">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                            AI & Modern Development
                        </p>
                        
                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            AI as a mentor,
                            <span className="mt-2 block text-blue-400">
                                not a shortcut.
                            </span>
                        </h2>

                        <p className="mt-6 leading-8 text-slate-300">
                            Artificial intelligence has played a meaningful
                            role in my development journey, but not as a
                            replacement for independent thinking,
                            problem-solving, or writing code. I approach
                            AI much like I would an experienced mentor,
                            technical lead, or code reviewer in a
                            professional development environment.
                        </p>

                        <p className="mt-4 leading-8 text-slate-300">
                            My workflow typically begins with exploring a
                            problem, planning an approach, and working
                            through the implementation myself. Once I have
                            something to review, I may turn to AI for
                            feedback, clarification, or a different
                            perspective. From there, I return to the code,
                            make adjustments, test my changes, and repeat
                            the process when necessary. The goal is not
                            simply to arrive at working code, but to
                            understand why it works.
                        </p>

                        <p className="mt-4 leading-8 text-slate-300">
                            Debugging has become one of the most important
                            parts of this journey. Through practice and
                            guided learning, I&apos;ve developed a more
                            structured approach to identifying problems,
                            interpreting error messages, tracing application
                            behavior, implementing error handling, and
                            using targeted console logs to isolate issues.
                            Many problems throughout DevConnect have been
                            investigated and resolved independently,
                                without AI assistance.
                        </p>

                        <p className="mt-4 leading-8 text-slate-300">
                            When I encounter an unfamiliar concept or a
                            particularly challenging problem, AI provides
                            an opportunity to learn from the experience
                            rather than bypass it. Its explanations,
                            suggestions, and occasional code examples are
                            resources I can evaluate, question, adapt,
                            and test, not substitutes for developing my
                            own technical judgment.
                        </p>

                        <p className="mt-4 leading-8 text-slate-300">
                            Ultimately, DevConnect represents an approach
                            to modern software development that embraces
                            powerful tools while preserving personal
                            responsibility for the work. My goal is to
                            become a developer who can think independently,
                            solve problems confidently, collaborate
                            effectively, and use AI thoughtfully to become
                            more capable, not more dependent.
                        </p>
                    </div>
                </div>
            </section>

            {/* Future Direction */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Looking Forward
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        The next chapter.
                    </h2>

                    <p className="mt-6 leading-8 text-slate-600">
                        One of the next major goals for
                        DevConnect is exploring a new backend
                        architecture using Python and a
                        relational SQL database.
                    </p>

                    <p className="mt-4 leading-8 text-slate-600">
                        This transition will create an
                        opportunity to revisit data modeling,
                        relationships, API design, and the
                        separation of frontend and backend
                        responsibilities from a different
                        technical perspective.
                    </p>

                    <p className="mt-4 leading-8 text-slate-600">
                        Future possibilities also include
                        richer developer collaboration,
                        additional social features, and
                        exploring how AI-powered functionality
                        can provide useful experiences
                        within software applications.
                    </p>

                    <p className="mt-4 leading-8 text-slate-600">
                        DevConnect may eventually become
                        a community used by developers to
                        share their work and collaborate.
                        For now, its primary purpose remains
                        learning, experimentation, and
                        continued growth.
                    </p>
                </div>
            </section>

            {/* Developer & Repository */}
            <section className="border-t border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl font-bold">
                            Built by an independent developer.
                        </h2>

                        <p className="mt-3 leading-7 text-slate-600">
                            DevConnect is a continuing journey
                            in full-stack engineering,
                            problem-solving, and preparing
                            to build real-world software
                            solutions for clients.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="https://github.com/Zachary-Rossman/DevConnect"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            View on GitHub
                        </Link>

                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
                        >
                            Explore DevConnect
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
