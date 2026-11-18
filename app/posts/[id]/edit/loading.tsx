export default function Loading() {
    return (
        <main
            className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[linear-gradient(135deg,#09183f_0%,#243d87_52%,#783b87_100%)] px-4 py-12 sm:px-6 sm:py-16"
            aria-busy="true"
            aria-live="polite"
        >
            <div className="mx-auto w-full max-w-2xl rounded-3xl border border-[#b8c6ff]/30 bg-white/95 px-8 py-12 text-center shadow-[0_25px_70px_rgba(6,17,55,0.30)]">

                <div
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#d9e6ff] border-t-[#e76bb5] motion-reduce:animate-none"
                />

                <p className="mt-6 text-lg font-bold text-[#172653]">
                    Loading Editor....
                </p>
            </div>
        </main>
    );
}