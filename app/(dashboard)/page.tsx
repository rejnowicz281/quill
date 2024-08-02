import getCurrentUser from "@/lib/utils/auth/get-current-user";

export default function HomePage() {
    const currentUserRole = getCurrentUser()?.role;

    if (!currentUserRole) return null;

    return (
        <div className="flex items-center flex-col flex-1 gap-6 justify-center">
            <h1 className="text-9xl font-semibold tracking-wide">quill</h1>
            <p>{currentUserRole}.</p>
        </div>
    );
}
