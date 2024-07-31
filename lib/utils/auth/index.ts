import { cookies } from "next/headers";

export function setCookieToken(token: string) {
    cookies().set({
        name: "token",
        secure: true,
        value: token,
        httpOnly: true
    });
}
