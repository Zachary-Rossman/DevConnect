export default function Loading() {
    return (
        <main
           className="min-h-[calc(100vh-4rem)] bg-gray-50 px-6 py-12"
           aria-busy="true"
           aria-live="polite"
        >
            <div className="mx-auto max-w-2xl">
                <p className="text-gray-500">Loading Editor....</p>
            </div>
        </main>
    );
}