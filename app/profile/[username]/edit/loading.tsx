
export default function Loading() {
    return (
        <main
            className="mx-auto max-w-5xl px-4 py-8"
            aria-busy="true"
        >
            <div className="animate-pulse space-y-6">
                <div className="h-8 w-48 rounded bg-gray-200" />

                <div className="rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="space-y-4">
                        <div className="h-5 w-32 rounded bg-gray-200" />
                        <div className="h-12 rounded bg-gray-100" />
                        <div className="h-12 rounded bg-gray-100" />
                        <div className="h-32 rounded bg-gray-100" />
                    </div>
                </div>
            </div>
        </main>
    );
}
