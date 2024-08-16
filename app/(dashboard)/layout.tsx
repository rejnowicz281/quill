import { Button } from "@/components/ui/button";
import authorize from "@/lib/utils/auth/authorize";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import { AuthProvider } from "@/providers/auth-provider";
import QueryClientProvider from "@/providers/query-provider";
import { StompProvider } from "@/providers/stomp-provider";
import { Home, MessageCircleMore, Settings, ShieldCheck, ShieldPlus } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const user = getCurrentUser();

    if (!user) return null;

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
                            {authorize("ADMIN") && (
                                <Button variant="ghost" asChild>
                                    <Link href="/admin">
                                        <ShieldCheck />
                                    </Link>
                                </Button>
                            )}
                            {authorize() && (
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
