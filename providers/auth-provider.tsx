"use client";

import { User } from "@/lib/types/user";
import { ReactNode, createContext, useContext } from "react";

const AuthContext = createContext<{ user: User } | null>(null);

export function AuthProvider({ children, user }: { children: ReactNode; user: User }) {
    return (
        <AuthContext.Provider
            value={{
                user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuthContext must be used within a AuthContext Provider");

    return context;
}
