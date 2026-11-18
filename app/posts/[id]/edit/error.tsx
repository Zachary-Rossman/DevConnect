"use client";

export default function Error({
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[linear-gradient(135deg,#09183f_0%,#243d87_52%,#783b87_100%)] px-4 py-12 sm:px-6 sm:py-16">
            <div className="mx-auto w-full max-w-2xl space-y-4 rounded-3xl border border-[#b8c6ff]/30 bg-white/95 p-8 text-center shadow-[0_25px_70px_rgba(6,17,55,0.30)] sm:p-12">
                <h1 className="text-3xl font-black tracking-tight text-[#172653] sm:text-4xl">
                    Something Went Wrong
                </h1>

                <p className="text-base leading-7 text-[#536382]">
                    We couldn't load the editor.
                </p>

                <button
                    onClick={reset}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#243f8f] px-6 py-3 font-bold text-white shadow-[0_8px_22px_rgba(36,63,143,0.20)] transition-colors hover:bg-[#3559b0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76bb5]"
                >
                    Try Again
                </button>
            </div>
        </main>
    );
}