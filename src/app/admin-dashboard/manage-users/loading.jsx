export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}