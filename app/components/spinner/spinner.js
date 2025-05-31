export default function Spinner() {
    return (
        <div className="fixed z-50 top-0 left-0 h-full w-full flex items-center justify-center bg-black/75">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-600 border-r-pink-500 border-b-amber-400 animate-spin"></div>
            </div>
        </div>
    )
}