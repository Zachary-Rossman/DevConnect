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

const learningSteps = [
    "Understand the problem",
    "Plan the implementation",
    "Build the feature",
    "Test and identify issues",
    "Debug and improve",
    "Apply what was learned",
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#f6f8ff_0%,#fff4fb_52%,#f2f6ff_100%)] text-[#142047]">
            {/* About Hero */}
            <section className="relative isolate overflow-hidden bg-[linear-gradient(120deg,#07183b_0%,#243b87_54%,#963e92_100%)] text-white">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-20 h-96 w-96 rounded-full bg-[#fbc0e8]/20 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[#8dc5ff]/20 blur-3xl"
                />

                <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
                    <span className="inline-flex rounded-full border border-[#b1d7ff]/40 bg-white/10 px-4 py-2 text-sm font-semibold text-[#e4eeff]">
                        The story behind DevConnect
                    </span>

                    <h1 className="mt-7 max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                        Built to learn.
                        <span className="mt-2 block bg-gradient-to-r from-[#b3d9ff] via-[#ffd2ed] to-[#ffa5dc] bg-clip-text text-transparent">
                            Designed to evolve.
                        </span>
                    </h1>

                    <p className="mt-7 max-w-3xl text-lg leading-8 text-[#edf2ff]">
                        DevConnect is an independent full-stack
                        development project created through curiosity,
                        experimentation, and the belief that one of
                        the best ways to learn software engineering
                        is to build something real.
                    </p>

                    <p className="mt-4 max-w-3xl leading-7 text-[#d7e3ff]">
                        What began as a learning experience is
                        growing into a functional developer-focused
                        social platform, with new technical
                        challenges shaping every stage of its
                        development.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-3 text-sm">
                        {[
                            "Independent Project",
                            "Full-Stack Development",
                            "Pre-Alpha",
                        ].map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[#f7f3ff]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Behind The Work: Engineering, Not A Location Biography */}
            <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
                <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#992968]">
                        The story behind the work
                    </p>
                    <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
                        From learning the pieces to understanding the system.
                    </h2>
                    <p className="mt-6 leading-8 text-[#455472]">
                        DevConnect grew from a desire to understand how an entire
                        application works, not just how individual components are
                        written. After working on a smaller Blog project, the next
                        challenge was connecting authentication, data relationships,
                        API routes, and React interfaces in a more complex system.
                    </p>
                    <p className="mt-4 leading-8 text-[#455472]">
                        Building profiles, posts, reactions, and comments has meant
                        thinking carefully about where data comes from, who can
                        change it, and what happens when something goes wrong.
                        Each working feature reflects the planning, testing, and
                        debugging needed to make all those pieces fit together.
                    </p>
                </div>

                <div className="rounded-[1.75rem] border border-[#6e82c1]/30 bg-[linear-gradient(145deg,#10265d_0%,#343783_58%,#712e74_100%)] p-7 text-white shadow-[0_24px_60px_rgba(28,31,84,0.2)] sm:p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffc5e7]">
                        What the project teaches
                    </p>
                    <div className="mt-7 space-y-5">
                        {[
                            { number: "01", title: "Follow the data", detail: "From database models and APIs to the interface." },
                            { number: "02", title: "Protect the system", detail: "Authentication, ownership, and authorization." },
                            { number: "03", title: "Improve the implementation", detail: "Debugging, testing, and refining real features." },
                        ].map((item) => (
                            <div key={item.number} className="flex gap-4 border-b border-white/15 pb-5 last:border-0 last:pb-0">
                                <span className="shrink-0 font-mono text-lg font-black text-[#ffc5e7]">
                                    {item.number}
                                </span>
                                <div>
                                    <h3 className="font-bold text-white">{item.title}</h3>
                                    <p className="mt-1 text-sm leading-6 text-[#e0e8ff]">
                                        {item.detail}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Project Mission: Original Text Preserved */}
            <section className="border-y border-[#e0e4f7] bg-white/90">
                <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
                    <div className="max-w-3xl">
                        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#992968]">
                            The Mission
                        </p>
                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            More than just another project.
                        </h2>
                        <p className="mt-6 leading-8 text-[#455472]">
                            DevConnect was created to explore how
                            full-stack applications actually work,
                            from database design and server-side
                            logic to APIs, frontend components,
                            and the movement of data throughout
                            an application.
                        </p>
                        <p className="mt-4 leading-8 text-[#455472]">
                            The goal was never simply to finish
                            a tutorial or produce a working screen.
                            It was to develop a deeper understanding
                            of the decisions, relationships, and
                            systems that make real software function.
                        </p>
                        <p className="mt-4 leading-8 text-[#455472]">
                            Every feature creates an opportunity to
                            strengthen engineering skills and build
                            toward delivering professional software
                            solutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Development Philosophy: Original Text Preserved */}
            <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-24">
                <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#992968]">
                        The Development Process
                    </p>
                    <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                        Build. Break. Debug. Learn.
                    </h2>
                    <p className="mt-6 leading-8 text-[#455472]">
                        The development of DevConnect has
                        never been a perfectly straight path.
                        Features are planned, implemented,
                        tested, broken, investigated, and
                        improved.
                    </p>
                    <p className="mt-4 leading-8 text-[#455472]">
                        Errors are part of the learning
                        experience. Working through them
                        develops a better understanding
                        of application architecture,
                        data relationships, and how
                        different systems communicate.
                    </p>
                    <p className="mt-4 leading-8 text-[#455472]">
                        Each challenge is an opportunity
                        to become a more capable and
                        independent developer.
                    </p>
                </div>

                <div className="rounded-[1.75rem] border border-[#d8def6] bg-white p-7 shadow-[0_20px_55px_rgba(35,45,109,0.08)] sm:p-8">
                    <h3 className="text-xl font-black">The Learning Cycle</h3>
                    <ol className="mt-6 space-y-4">
                        {learningSteps.map((step, index) => (
                            <li key={step} className="flex items-center gap-4">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fbe1f0] font-black text-[#822057]">
                                    {index + 1}
                                </span>
                                <span className="font-semibold text-[#27365b]">
                                    {step}
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Current Application: Original Text Preserved */}
            <section className="border-y border-[#e0e4f7] bg-white/90">
                <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
                    <div className="max-w-3xl">
                        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#992968]">
                            What DevConnect Has Become
                        </p>
                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            From concept to functioning application.
                        </h2>
                        <p className="mt-5 leading-8 text-[#455472]">
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
                                className="rounded-[1.5rem] border border-[#dfe4f5] bg-[linear-gradient(145deg,#ffffff_25%,#fff0f9_100%)] p-7 shadow-sm"
                            >
                                <div className="mb-5 h-1 w-12 rounded-full bg-gradient-to-r from-[#4163d9] to-[#c64e91]" />
                                <h3 className="text-xl font-black">{feature.title}</h3>
                                <p className="mt-3 leading-7 text-[#455472]">
                                    {feature.description}
                                </p>
                            </article>
                        ))}
                    </div>
                    <p className="mt-8 text-sm leading-7 text-[#596783]">
                        DevConnect remains an evolving pre-alpha
                        project. Additional community and networking
                        features are possibilities for future
                        development, not currently completed
                        functionality.
                    </p>
                </div>
            </section>

            {/* AI Development Philosophy: Original Text Preserved */}
            <section className="relative isolate overflow-hidden bg-[linear-gradient(120deg,#0b1d53_0%,#343b91_56%,#7a357c_100%)] text-white">
                <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#ffafd9]/15 blur-3xl" />
                <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-24">
                    <div className="max-w-3xl">
                        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#c0ddff]">
                            AI & Modern Development
                        </p>
                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            AI as a mentor,
                            <span className="mt-2 block text-[#ffc2e5]">
                                not a shortcut.
                            </span>
                        </h2>
                        <p className="mt-6 leading-8 text-[#e7eeff]">
                            Artificial intelligence has played a meaningful
                            role in my development journey, but not as a
                            replacement for independent thinking,
                            problem-solving, or writing code. I approach
                            AI much like I would an experienced mentor,
                            technical lead, or code reviewer in a
                            professional development environment.
                        </p>
                        <p className="mt-4 leading-8 text-[#e7eeff]">
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
                        <p className="mt-4 leading-8 text-[#e7eeff]">
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
                        <p className="mt-4 leading-8 text-[#e7eeff]">
                            When I encounter an unfamiliar concept or a
                            particularly challenging problem, AI provides
                            an opportunity to learn from the experience
                            rather than bypass it. Its explanations,
                            suggestions, and occasional code examples are
                            resources I can evaluate, question, adapt,
                            and test, not substitutes for developing my
                            own technical judgment.
                        </p>
                        <p className="mt-4 leading-8 text-[#e7eeff]">
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

            {/* Future Direction: Original Text Preserved */}
            <section className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
                <div className="max-w-3xl">
                    <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#992968]">
                        Looking Forward
                    </p>
                    <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                        The next chapter.
                    </h2>
                    <p className="mt-6 leading-8 text-[#455472]">
                        One of the next major goals for
                        DevConnect is exploring a new backend
                        architecture using Python and a
                        relational SQL database.
                    </p>
                    <p className="mt-4 leading-8 text-[#455472]">
                        This transition will create an
                        opportunity to revisit data modeling,
                        relationships, API design, and the
                        separation of frontend and backend
                        responsibilities from a different
                        technical perspective.
                    </p>
                    <p className="mt-4 leading-8 text-[#455472]">
                        Future possibilities also include
                        richer developer collaboration,
                        additional social features, and
                        exploring how AI-powered functionality
                        can provide useful experiences
                        within software applications.
                    </p>
                    <p className="mt-4 leading-8 text-[#455472]">
                        DevConnect may eventually become
                        a community used by developers to
                        share their work and collaborate.
                        For now, its primary purpose remains
                        learning, experimentation, and
                        continued growth.
                    </p>
                </div>
            </section>

            {/* Developer & Repository: Original Text Preserved */}
            <section className="border-t border-[#dee4f7] bg-white">
                <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl font-black tracking-tight">
                            Built by an independent developer.
                        </h2>
                        <p className="mt-3 leading-7 text-[#455472]">
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
                            className="inline-flex items-center justify-center rounded-xl bg-[#23398c] px-5 py-3 font-bold text-white transition hover:bg-[#384fb0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#992968]"
                        >
                            View on GitHub
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-xl border border-[#9cacd9] px-5 py-3 font-bold text-[#142047] transition hover:bg-[#f9ebf6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#992968]"
                        >
                            Explore DevConnect
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
