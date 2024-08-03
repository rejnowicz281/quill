"use client";

import { AuthUser } from "@/lib/types/auth/auth-user";
import { ReactNode, createContext, useContext } from "react";

const AuthContext = createContext<{ user: AuthUser } | null>(null);

export function AuthProvider({ children, user }: { children: ReactNode; user: AuthUser }) {
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
