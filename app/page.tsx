import Link from "next/link";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

// Features that already exist in the current pre-alpha application.
const features = [
    {
        number: "01",
        title: "Make it yours.",
        description:
            "Create a public developer profile, introduce yourself, and share your skills.",
        accent: "bg-[#4d83ff]",
    },
    {
        number: "02",
        title: "Show your progress.",
        description:
            "Publish posts and share what you're building, learning, or figuring out.",
        accent: "bg-[#f38ccd]",
    },
    {
        number: "03",
        title: "Keep the conversation going.",
        description:
            "Explore the feed, react to posts, and exchange ideas through comments.",
        accent: "bg-[#a79aff]",
    },
];

export default async function HomePage() {
    // Keep the landing page public, but adapt actions to the viewer's session.
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const isLoggedIn = Boolean(token && verifyToken(token));

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#f7f8ff_0%,#fff3fc_58%,#f1f6ff_100%)] text-[#142047]">
            {/* Blue and pink gradient hero, built with CSS only. */}
            <section className="relative isolate overflow-hidden bg-[linear-gradient(125deg,#07183b_0%,#243b8a_51%,#813a91_100%)] text-white">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#4d98ff]/15 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-20 h-96 w-96 rounded-full bg-[#f48bcf]/20 blur-3xl"
                />

                <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
                    <div>
                        <p className="inline-flex rounded-full border border-[#a5cbff]/40 bg-[#a5cbff]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#b8dcff]">
                            A place for developers who build
                        </p>

                        <h1 className="mt-7 text-5xl font-black leading-[1.06] tracking-tight sm:text-6xl lg:text-7xl">
                            Build something.
                            <span className="mt-2 block bg-gradient-to-r from-[#a9d6ff] via-[#fbc0e8] to-[#ff9bd7] bg-clip-text text-transparent">
                                Share the journey.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-xl text-lg leading-8 text-[#edf2ff]">
                            DevConnect is a developing community space for people who
                            write code, solve problems, and learn by building. Share
                            your progress, find a conversation, and keep moving forward.
                        </p>

                        <div className="mt-9 flex flex-wrap gap-3">
                            <Link
                                href={isLoggedIn ? "/feed" : "/register"}
                                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#ffc0e3] px-6 py-3 font-bold text-[#142047] transition hover:bg-[#ffd8ec] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffc0e3]"
                            >
                                {isLoggedIn ? "Enter the Feed" : "Join DevConnect"}
                            </Link>
                            <Link
                                href={isLoggedIn ? "/account" : "/login"}
                                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                            >
                                {isLoggedIn ? "My Account" : "Log in"}
                            </Link>
                        </div>

                        <p className="mt-8 text-sm text-[#c1d1f1]">
                            Currently in pre-alpha. Built to learn, designed to evolve.
                        </p>
                    </div>

                    {/* Retro coastline scene made from basic shapes and gradients. */}
                    <div className="relative mx-auto w-full max-w-lg">
                        <div className="absolute -inset-3 rounded-[2.25rem] border border-white/15" aria-hidden="true" />
                        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/25 bg-[linear-gradient(180deg,#5a8aff_0%,#d390ed_45%,#f5add5_57%,#3557a7_75%,#0a2250_100%)] shadow-[0_25px_85px_rgba(9,12,35,0.35)]">
                            <div className="relative h-[365px] sm:h-[420px]" aria-hidden="true">
                                {/* Sun */}
                                <div className="absolute right-[15%] top-[13%] h-44 w-44 rounded-full bg-[#ffc6e9] shadow-[0_0_75px_rgba(255,219,152,0.6)] sm:h-52 sm:w-52" />
                                {/* Art Deco silhouette */}
                                <div className="absolute bottom-[28%] left-[8%] h-[28%] w-[15%] rounded-t-lg bg-[#344c96]" />
                                <div className="absolute bottom-[28%] left-[25%] h-[48%] w-[17%] rounded-t-[2rem] bg-[#182e72]" />
                                <div className="absolute bottom-[28%] left-[45%] h-[36%] w-[13%] rounded-t-md bg-[#263d84]" />
                                <div className="absolute bottom-[28%] right-[8%] h-[52%] w-[23%] rounded-t-3xl bg-[#162d70]" />
                                <div className="absolute bottom-[28%] right-[19%] h-[60%] w-1 bg-[#162d70]" />
                                {/* Water and reflections */}
                                <div className="absolute inset-x-0 bottom-0 h-[28%] border-t border-[#ffe0f6]/60 bg-[linear-gradient(180deg,#395ea4,#091c48)]" />
                                <div className="absolute bottom-[22%] left-[21%] h-px w-[55%] bg-[#d8dbff]/75" />
                                <div className="absolute bottom-[17%] left-[37%] h-px w-[35%] bg-[#d8dbff]/55" />
                                <div className="absolute bottom-[12%] left-[27%] h-px w-[54%] bg-[#ffa6de]/40" />
                            </div>
                            <div className="border-t border-white/15 bg-[#0c1e50] px-6 py-5">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#a3d4ff]">
                                        DEVCONNECT / COMMUNITY
                                    </span>
                                    <span className="text-xs font-medium tracking-wide text-[#f6c8e8]">
                                        BUILD • BREAK • DEBUG • GROW
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Accent stripe connects the hero to the rest of the page. */}
            <div className="bg-[linear-gradient(90deg,#bdd8ff_0%,#f4b3e1_50%,#c4c8ff_100%)] px-6 py-3 text-center text-xs font-extrabold uppercase tracking-[0.22em] text-[#182858]">
                Creative energy. Real engineering. Constant progress.
            </div>

            {/* What users can actually do today. */}
            <section className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
                <div className="max-w-3xl">
                    <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#a32972]">
                        The community, in progress
                    </p>
                    <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                        A place for the work behind the work.
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-[#495779]">
                        Great ideas take experiments, mistakes, and conversations.
                        DevConnect is being built around those moments.
                    </p>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {features.map((feature) => (
                        <article
                            key={feature.number}
                            className="overflow-hidden rounded-[1.5rem] border border-[#dfe5f8] bg-white shadow-[0_12px_35px_rgba(39,40,78,0.05)]"
                        >
                            <div className={`h-2 ${feature.accent}`} />
                            <div className="p-7">
                                <p className="text-sm font-black tracking-widest text-[#a32972]">
                                    {feature.number} / COMMUNITY
                                </p>
                                <h3 className="mt-5 text-xl font-black">
                                    {feature.title}
                                </h3>
                                <p className="mt-3 leading-7 text-[#495779]">
                                    {feature.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Invitation to learn about the project, not an unbuilt feature. */}
            <section className="bg-[linear-gradient(110deg,#0a1c51_0%,#263e8d_55%,#7e367f_100%)] px-6 py-16 text-white">
                <div className="mx-auto flex max-w-6xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffc0e3]">
                            The story behind the platform
                        </p>
                        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                            Started with curiosity. Built with persistence.
                        </h2>
                        <p className="mt-4 leading-7 text-[#d4d9ed]">
                            This project grew from a desire to understand full-stack
                            development, and from a city that helped turn ambition
                            into consistency.
                        </p>
                    </div>
                    <Link
                        href="/about"
                        className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#ffc0e3] px-6 py-3 font-bold text-[#192657] transition hover:bg-[#ffdaed] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                        Read the story
                    </Link>
                </div>
            </section>
        </div>
    );
}
