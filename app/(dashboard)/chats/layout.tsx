import { RefreshBroadcastProvider } from "@/providers/refresh-broadcast-provider";
import { ReactNode } from "react";

export default function ChatsLayout({ children }: { children: ReactNode }) {
    return <RefreshBroadcastProvider>{children}</RefreshBroadcastProvider>;
}
