import { JWT_EXPIRY_TIME_DATE } from "@/lib/constants/jwt";
import { cookies } from "next/headers";

export default function setCookieToken(token: string) {
    cookies().set({
        name: "token",
        secure: true,
        value: token,
        httpOnly: true,
        sameSite: "strict",
        expires: JWT_EXPIRY_TIME_DATE
    });
}
