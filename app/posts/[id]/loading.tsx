// Post Detail Loading UI
export default function Loading() {
    return (
        <main className="min-h-screen bg-[linear-gradient(180deg,#edf3ff_0%,#fff2fa_55%,#f4f6ff_100%)]">
            <article className="mx-auto max-w-4xl space-y-10 px-6 py-14 motion-safe:animate-pulse">
                {/* Title Skeleton */}
                <header className="space-y-5">
                    <div className="h-12 w-3/4 rounded-lg bg-[#becdf4]" />

                    {/* Author Skeleton */}
                    <div className="h-5 w-48 rounded bg-[#e9b7da]" />

                    {/* Image Skeleton */}
                    <div className="aspect-[16/9] w-full rounded-2xl border border-[#dce3f7] bg-[linear-gradient(135deg,#d8e6ff_0%,#f4d3eb_100%)]" />
                </header>

                {/* Content Skeleton */}
                <section className="space-y-4 rounded-2xl border border-[#dce3f7] bg-white p-8 shadow-[0_15px_45px_rgba(35,50,104,0.08)]">
                    <div className="h-4 w-full rounded bg-[#d8e6ff]" />
                    <div className="h-4 w-full rounded bg-[#e7d6f4]" />
                    <div className="h-4 w-5/6 rounded bg-[#d8e6ff]" />
                    <div className="h-4 w-4/6 rounded bg-[#f1d0e7]" />
                </section>
            </article>
        </main>
    );
}