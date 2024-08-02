import logout from "@/action/auth/modify/logout";
import SubmitButton from "@/components/general/submit-button";
import { Button } from "@/components/ui/button";
import authorize from "@/lib/utils/auth/authorize";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import { AuthProvider } from "@/providers/auth-provider";
import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const user = getCurrentUser();

    if (!user) return null;

    return (
        <AuthProvider user={user}>
            <div className="flex flex-col flex-1">
                <div className="flex gap-4 p-4 justify-center">
                    <form action={logout}>
                        <Button asChild>
                            <SubmitButton content="Logout" />
                        </Button>
                    </form>
                    <Button asChild>
                        <Link href="/">Home</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/posts">Posts</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/posts/create">Create Post</Link>
                    </Button>
                    {authorize("ADMIN") && (
                        <Button asChild>
                            <Link href="/admin">Admin Dashboard</Link>
                        </Button>
                    )}
                    {authorize("ROOT") && (
                        <Button asChild>
                            <Link href="/root">ROOT Dashboard</Link>
                        </Button>
                    )}
                </div>
                {children}
            </div>
        </AuthProvider>
    );
}
