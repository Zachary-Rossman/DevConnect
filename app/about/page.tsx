import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About DevConnect",
    description:
        "The story of DevConnect: learning full-stack engineering through building and debugging, finding consistency in Miami, and exploring what comes next.",
};

const capabilities = [
    {
        number: "01",
        title: "Authentication & ownership",
        description:
            "Registration, login sessions, protected routes, and server-enforced permissions.",
    },
    {
        number: "02",
        title: "Developer identities",
        description:
            "Public profiles, personal bios, and technical skills.",
    },
    {
        number: "03",
        title: "Posts & feed",
        description:
            "Create, read, edit, and delete posts in a shared developer feed.",
    },
    {
        number: "04",
        title: "Discussion & reactions",
        description:
            "Likes, comments, editing, and moderation with ownership-aware controls.",
    },
];

const process = [
    "Get curious about a problem",
    "Plan the data and code flow",
    "Build the first implementation",
    "Read errors and trace behavior",
    "Debug, test, and improve",
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#f7f8ff_0%,#fff5fc_55%,#f1f6ff_100%)] text-[#142047]">
            {/* Shared blue and pink gradient hero. */}
            <section className="relative isolate overflow-hidden bg-[linear-gradient(120deg,#07183b_0%,#243b87_54%,#963e92_100%)] text-white">
                <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-[#fbc0e8]/20 blur-3xl" />
                <div aria-hidden="true" className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#789cff]/15 blur-3xl" />
                <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
                    <p className="inline-flex rounded-full border border-[#b1d7ff]/40 bg-[#b1d7ff]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#b8dcff]">
                        The story behind DevConnect
                    </p>
                    <h1 className="mt-7 max-w-5xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                        Built to learn.
                        <span className="mt-2 block bg-gradient-to-r from-[#a9d6ff] via-[#ffabd9] to-[#ff93d1] bg-clip-text text-transparent">
                            Driven to evolve.
                        </span>
                    </h1>
                    <p className="mt-7 max-w-3xl text-lg leading-8 text-[#eef2ff]">
                        DevConnect began as a way to understand how a full-stack
                        application really works. Along the way, it became a record
                        of experimentation, persistence, and the value of learning
                        to solve problems independently.
                    </p>
                    <div className="mt-9 flex flex-wrap gap-2">
                        {[
                            "Independent project",
                            "Pre-alpha",
                            "Learning by building",
                        ].map((tag) => (
                            <span key={tag} className="rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm text-white/90">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Personal connection to place, without turning the page into a biography. */}
            <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:py-24">
                <div className="rounded-[1.75rem] bg-[#101f58] p-8 text-white shadow-[0_20px_60px_rgba(31,36,73,0.14)]">
                    <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#b1d7ff]">
                        The journey
                    </p>
                    <div className="mt-6 space-y-6">
                        <div className="border-l-2 border-[#f5b1dc] pl-5">
                            <p className="text-sm font-bold uppercase tracking-widest text-[#ffd2ec]">
                                Chicago
                            </p>
                            <p className="mt-2 text-xl font-bold">Where it started.</p>
                        </div>
                        <div className="border-l-2 border-[#94b7ff] pl-5">
                            <p className="text-sm font-bold uppercase tracking-widest text-[#bcd6ff]">
                                Miami
                            </p>
                            <p className="mt-2 text-xl font-bold">Where consistency took hold.</p>
                        </div>
                        <div className="border-l-2 border-[#f993cf] pl-5">
                            <p className="text-sm font-bold uppercase tracking-widest text-[#ffc3e5]">
                                What's next
                            </p>
                            <p className="mt-2 text-xl font-bold">Keep building and growing.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#a32972]">
                        The story behind the work
                    </p>
                    <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                        From Chicago beginnings to a Miami state of mind.
                    </h2>
                    <p className="mt-6 leading-8 text-[#495779]">
                        My development journey started in Chicago, but living in
                        Miami is where I became more consistent about showing up
                        and putting in the work. The city can be demanding, and
                        that's part of what pushed me to take my goals seriously.
                    </p>
                    <p className="mt-4 leading-8 text-[#495779]">
                        There is something about Miami&apos;s energy, architecture,
                        colors, and coastline that makes me want to keep creating.
                        The colors and creative energy behind DevConnect are a nod to the place that
                        helped shape my discipline, while the project itself is
                        built for developers anywhere.
                    </p>
                </div>
            </section>

            {/* Engineering mission. */}
            <section className="border-y border-[#e5e8f7] bg-white">
                <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
                    <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#a32972]">
                        Why it exists
                    </p>
                    <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
                        Not just a finished screen. An understanding of the whole system.
                    </h2>
                    <div className="mt-7 grid gap-6 text-[#495779] md:grid-cols-2">
                        <p className="leading-8">
                            I wanted to become familiar with full-stack development
                            by following data from beginning to end: how it should
                            be structured, how records relate, how APIs work, and
                            how the frontend turns information into experiences.
                        </p>
                        <p className="leading-8">
                            The purpose of DevConnect is to learn by building,
                            breaking, testing, and debugging. It&apos;s also preparation
                            for professional freelance work, where being able to
                            understand and maintain what I build really matters.
                        </p>
                    </div>
                </div>
            </section>

            {/* Process and real capabilities. */}
            <section className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
                <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
                    <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#a32972]">
                            How I learn
                        </p>
                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            Build. Break. Debug. Repeat.
                        </h2>
                        <p className="mt-5 leading-8 text-[#495779]">
                            I plan the work, write code, investigate failures,
                            and revisit decisions until the behavior makes sense.
                            Debugging isn&apos;t an interruption; it&apos;s a skill I am
                            deliberately practicing.
                        </p>
                    </div>
                    <ol className="space-y-3 rounded-[1.75rem] border border-[#dfe4fb] bg-white p-7 shadow-sm">
                        {process.map((step, index) => (
                            <li key={step} className="flex items-center gap-4 rounded-xl bg-[#f6f4ff] px-4 py-3">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#152a69] font-black text-[#c2dcff]">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="font-semibold">{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="mt-20">
                    <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#a32972]">
                        What works today
                    </p>
                    <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                        A real pre-alpha application, still evolving.
                    </h2>
                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                        {capabilities.map((item) => (
                            <article key={item.number} className="rounded-[1.5rem] border border-[#dfe5f8] bg-white p-7 shadow-sm">
                                <p className="text-sm font-extrabold tracking-widest text-[#a32972]">
                                    {item.number} / BUILT
                                </p>
                                <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                                <p className="mt-3 leading-7 text-[#495779]">{item.description}</p>
                            </article>
                        ))}
                    </div>
                    <p className="mt-5 text-sm leading-7 text-[#66738f]">
                        DevConnect is not yet a fully launched community. These are
                        implemented features, not a claim of a production-ready service.
                    </p>
                </div>
            </section>

            {/* AI: an accurate description of the user's independent workflow. */}
            <section className="relative overflow-hidden bg-[linear-gradient(120deg,#0b1d53_0%,#433b92_100%)] text-white">
                <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#fa8cd0]/15 blur-3xl" />
                <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:py-24">
                    <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#b3d8ff]">
                            AI & modern development
                        </p>
                        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                            AI as a mentor,
                            <span className="mt-2 block text-[#ffc0e3]">not a shortcut.</span>
                        </h2>
                    </div>
                    <div className="space-y-5 leading-8 text-[#eef1ff]">
                        <p>
                            Artificial intelligence has played a meaningful role in
                            my development journey, but not as a replacement for
                            independent thinking, problem-solving, or writing code.
                            I approach AI much like an experienced mentor, technical
                            lead, or code reviewer.
                        </p>
                        <p>
                            My workflow begins with curiosity. I investigate a problem,
                            plan an approach, and work through my own implementation.
                            When a review or new perspective would help, I ask for
                            feedback, go back to the code, revise, test, and repeat.
                            The goal is to understand why a solution works, not just
                            to make an error disappear.
                        </p>
                        <p>
                            I&apos;ve put particular focus on debugging: reading errors,
                            tracing code and data flow, adding targeted console logs,
                            and implementing useful error handling. Many issues in
                            DevConnect have been identified and resolved independently,
                            without involving AI at all.
                        </p>
                        <p>
                            For unfamiliar concepts, AI-assisted explanations,
                            examples, and reviews can accelerate learning. But those
                            suggestions still need to be understood, challenged,
                            adapted, and tested. I want these tools to make me more
                            capable, not more dependent.
                        </p>
                    </div>
                </div>
            </section>

            {/* What's next, framed as exploration rather than promises. */}
            <section className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#a32972]">
                    The next chapter
                </p>
                <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
                    A new backend. A deeper understanding.
                </h2>
                <div className="mt-6 grid gap-8 leading-8 text-[#495779] md:grid-cols-2">
                    <p>
                        The next big learning milestone is a move toward Python and
                        a relational SQL database, likely PostgreSQL. It will be a
                        chance to rethink the same application through different
                        models, queries, and API responsibilities.
                    </p>
                    <p>
                        Beyond that, I want to explore practical AI integrations
                        and richer ways for developers to connect. If DevConnect
                        eventually becomes a place where people genuinely share
                        work and collaborate, that would be a wonderful outcome.
                        For now, the focus stays on learning and building well.
                    </p>
                </div>
            </section>

            {/* Project and developer links. */}
            <section className="border-t border-[#dfe5f8] bg-white">
                <div className="mx-auto flex max-w-6xl flex-col gap-7 px-6 py-16 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#a32972]">
                            Follow the build
                        </p>
                        <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
                            The journey is part of the project.
                        </h2>
                        <p className="mt-3 leading-7 text-[#495779]">
                            Explore the repository, follow the changes, and see how
                            DevConnect develops from here.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="https://github.com/Zachary-Rossman/DevConnect"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-xl bg-[#152a69] px-5 py-3 font-bold text-white transition hover:bg-[#2c4190] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972]"
                        >
                            View on GitHub
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-xl border border-[#a0b4e6] px-5 py-3 font-bold text-[#152a69] transition hover:bg-[#f2efff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972]"
                        >
                            Back to home
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
