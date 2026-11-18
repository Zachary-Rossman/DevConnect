
export default function Loading() {
    return (
        <main
            className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[linear-gradient(135deg,#09183f_0%,#243d87_52%,#783b87_100%)] px-4 py-12 sm:px-6 sm:py-16"
            aria-busy="true"
        >
            <div className="w-full max-w-5xl animate-pulse space-y-6 rounded-3xl border border-[#b8c6ff]/30 bg-white/95 p-6 shadow-[0_25px_70px_rgba(6,17,55,0.30)] motion-reduce:animate-none sm:p-10">
                <div className="h-8 w-48 rounded bg-[#e9b7da]" />

                <div className="rounded-2xl border border-[#eed7ec] bg-[linear-gradient(145deg,#ffffff_0%,#fff4fb_100%)] p-6">
                    <div className="space-y-4">
                        <div className="h-5 w-32 rounded bg-[#becdf4]" />
                        <div className="h-12 rounded bg-[#e3eaff]" />
                        <div className="h-12 rounded bg-[#f3ddec]" />
                        <div className="h-32 rounded bg-[#e3eaff]" />
                    </div>
                </div>
            </div>
        </main>
    );
}
