
import Link from "next/link";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

// Completed Features To Highlight
const features = [
    {
        number: "01",
        title: "Create your identity",
        description:
            "Build a public developer profile, introduce yourself, and showcase your technical skills.",
    },
    {
        number: "02",
        title: "Share what you build",
        description:
            "Publish posts, share progress, and explore what other developers are working on.",
    },
    {
        number: "03",
        title: "Join the conversation",
        description:
            "Like posts, leave comments, and exchange ideas with the developer community.",
    },
];

export default async function HomePage() {
    // Read Authentication Cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // Verify Authenticated User
    const decoded = token ? verifyToken(token) : null;
    const isLoggedIn = Boolean(decoded);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-950 text-white">

                {/* Decorative Background */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"
                />

                <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">

                    {/* Hero Introduction */}
                    <div>
                        <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-200">
                            A community built for developers
                        </span>

                        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Build in public.
                            <span className="mt-2 block text-blue-400">
                                Grow together.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                            DevConnect is a place for developers to
                            share projects, exchange knowledge,
                            discuss ideas, and grow their skills
                            alongside others.
                        </p>

                        {/* Authentication-Based Navigation */}
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href={isLoggedIn ? "/feed" : "/register"}
                                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
                            >
                                {isLoggedIn
                                    ? "Go to Feed"
                                    : "Join DevConnect"}
                            </Link>

                            <Link
                                href={isLoggedIn ? "/account" : "/login"}
                                className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
                            >
                                {isLoggedIn
                                    ? "My Account"
                                    : "Log In"}
                            </Link>
                        </div>
                    </div>

                    {/* Feature Preview Panel */}
                    <div className="rounded-2xl border border-slate-700 bg-slate-900/90 p-6 shadow-2xl sm:p-8">

                        <div className="mb-6 flex items-center gap-3">
                            <div className="h-3 w-3 rounded-full bg-green-400" />

                            <p className="text-sm font-medium text-slate-300">
                                Explore DevConnect
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
                                <p className="text-sm font-medium text-blue-300">
                                    Developer Profiles
                                </p>

                                <p className="mt-2 text-sm text-slate-300">
                                    Introduce yourself and showcase
                                    the technologies you know.
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
                                <p className="text-sm font-medium text-blue-300">
                                    Community Feed
                                </p>

                                <p className="mt-2 text-sm text-slate-300">
                                    Discover posts, development
                                    updates, and shared experiences.
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
                                <p className="text-sm font-medium text-blue-300">
                                    Discussions
                                </p>

                                <p className="mt-2 text-sm text-slate-300">
                                    Participate through comments
                                    and reactions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="mx-auto max-w-6xl px-6 py-20">
                <div className="mb-10 max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        What you can do
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        Your development journey,
                        shared with others.
                    </h2>

                    <p className="mt-4 text-slate-600">
                        Whether you're learning something new
                        or sharing your latest project,
                        DevConnect gives you a place to contribute.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {features.map((feature) => (
                        <article
                            key={feature.number}
                            className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
                        >
                            <span className="text-sm font-bold text-blue-600">
                                {feature.number}
                            </span>

                            <h3 className="mt-4 text-xl font-bold">
                                {feature.title}
                            </h3>

                            <p className="mt-3 leading-7 text-slate-600">
                                {feature.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            {/* About Preview */}
            <section className="border-t border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl font-bold">
                            Built to learn. Designed to grow.
                        </h2>

                        <p className="mt-3 leading-7 text-slate-600">
                            DevConnect began as a full-stack
                            development project and is evolving
                            into a developer-focused community
                            platform. Discover the story behind it.
                        </p>
                    </div>

                    <Link
                        href="/about"
                        className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
                    >
                        About DevConnect
                    </Link>
                </div>
            </section>
        </div>
    );
}
