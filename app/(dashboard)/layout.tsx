import { Button } from "@/components/ui/button";
import { shallowAuthorize } from "@/lib/utils/auth/authorize";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import { AuthProvider } from "@/providers/auth-provider";
import QueryClientProvider from "@/providers/query-provider";
import { StompProvider } from "@/providers/stomp-provider";
import { Home, MessageCircleMore, Settings, ShieldCheck, ShieldPlus, User } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const user = getCurrentUser();

    if (!user) return null;

    const isAdmin = shallowAuthorize("ROLE_ADMIN", user.role);
    const isRoot = shallowAuthorize("ROLE_ROOT", user.role);

    return (
        <AuthProvider user={user}>
            <StompProvider>
                <QueryClientProvider>
                    <div className="flex flex-col py-4 gap-6 flex-1 max-w-[900px] w-full mx-auto">
                        <div className="flex gap-4 justify-center">
                            <Button variant="ghost" asChild>
                                <Link href="/posts">
                                    <Home />
                                </Link>
                            </Button>
                            <Button variant="ghost" asChild>
                                <Link href="/chats">
                                    <MessageCircleMore />
                                </Link>
                            </Button>
                            <Button variant="ghost" asChild>
                                <Link href="/settings">
                                    <Settings />
                                </Link>
                            </Button>
                            <Button variant="ghost" asChild>
                                <Link href={`/users/${user.id}`}>
                                    <User />
                                </Link>
                            </Button>
                            {isAdmin && (
                                <Button variant="ghost" asChild>
                                    <Link href="/admin">
                                        <ShieldCheck />
                                    </Link>
                                </Button>
                            )}
                            {isRoot && (
                                <Button variant="ghost" asChild>
                                    <Link href="/root">
                                        <ShieldPlus />
                                    </Link>
                                </Button>
                            )}
                        </div>
                        {children}
                    </div>
                </QueryClientProvider>
            </StompProvider>
        </AuthProvider>
    );
}
