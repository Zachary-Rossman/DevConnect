"use client";

export default function Error({
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <main className="min-h-[calc(100vh-4rem)] px-6 py-12">
            <div className="mx-auto max-w-2xl space-y-4 text-center">
                <h1 className="text-3xl font-bold">
                    Something Went Wrong
                </h1>

                <p className="text-gray-600">
                    We couldn't load the editor.
                </p>

                <button
                   onClick={reset}
                   className="rounded-lg bg-black px-5 py-2 text-white"
                >
                    Try Again
                </button>
            </div>
        </main>
    );
}