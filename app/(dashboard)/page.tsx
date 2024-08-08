import getCurrentUser from "@/lib/utils/auth/get-current-user";

export default function HomePage() {
    const currentUser = getCurrentUser();

    if (!currentUser) return null;

    return (
        <div className="flex items-center flex-col flex-1 gap-6 justify-center">
            <h1 className="text-9xl font-semibold tracking-wide">quill</h1>
            <p>
                Welcome, {currentUser.name}. Your role is {currentUser.role}.
            </p>
        </div>
    );
}
