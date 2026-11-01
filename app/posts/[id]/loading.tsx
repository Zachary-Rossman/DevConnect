// Post Detail Loading UI
export default function Loading() {
    return (
        <main className="min-h-screen bg-gray-50">
            <article className="max-w-4xl mx-auto px-6 py-14 space-y-10 animate-pulse">
                {/* Title Skeleton */}
                <header className="space-y-5">
                    <div className="h-12 w-3/4 rounded-lg bg-gray-200" />

                    {/* Author Skeleton */}
                    <div className="h-5 w-48 rounded bg-gray-200" />

                    {/* Image Skeleton */}
                    <div className="w-full aspect-[16/9] rounded-2xl bg-gray-200" />
                </header>

                {/* Content Skeleton */}
                <section className="rounded-2xl border bg-white p-8 shadow-sm space-y-4">
                    <div className="h-4 w-full rounded bg-gray-200" />
                    <div className="h-4 w-full rounded bg-gray-200" />
                    <div className="h-4 w-5/6 rounded bg-gray-200" />
                    <div className="h-4 w-4/6 rounded bg-gray-200" />
                </section>
            </article>
        </main>
    )
}