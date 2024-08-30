import Menubar from "@/components/menubar";
import getCurrentUser from "@/lib/utils/auth/get-current-user";
import { AuthProvider } from "@/providers/auth-provider";
import QueryClientProvider from "@/providers/query-provider";
import { StompProvider } from "@/providers/stomp-provider";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const user = getCurrentUser();

    return (
        <AuthProvider user={user}>
            <StompProvider>
                <QueryClientProvider>
                    <div className="flex-1 md:flex-row-reverse flex-col flex">
                        <div className="relative flex-1">
                            <div className="absolute overflow-y-auto inset-0 flex flex-col">
                                <div className="flex-1 flex justify-center">
                                    <div className="max-w-[900px] flex flex-col w-full">{children}</div>
                                </div>
                            </div>
                        </div>

                        <div className="md:basis-[80px] md:relative flex-col flex">
                            <div className="md:absolute md:overflow-y-auto md:inset-0 flex flex-col">
                                <Menubar />
                            </div>
                        </div>
                    </div>
                </QueryClientProvider>
            </StompProvider>
        </AuthProvider>
    );
}
