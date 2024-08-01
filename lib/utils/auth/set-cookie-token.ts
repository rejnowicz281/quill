import { cookies } from "next/headers";

export default function setCookieToken(token: string) {
    cookies().set({
        name: "token",
        secure: true,
        value: token,
        httpOnly: true,
        sameSite: "strict"
    });
}
