import { JWT_EXPIRY_TIME_STRING } from "@/lib/constants/jwt";
import { JWTPayload, SignJWT } from "jose";
import setCookieToken from "./set-cookie-token";

export default async function generateSignedToken(payload: JWTPayload, subject: string, set = true) {
    const jwt = new SignJWT(payload)
        .setProtectedHeader({ alg: "HS512" })
        .setIssuedAt()
        .setExpirationTime(JWT_EXPIRY_TIME_STRING);

    if (subject) jwt.setSubject(subject);

    const token = await jwt.sign(new TextEncoder().encode(process.env.JWT_SECRET));

    if (set) setCookieToken(token);

    return token;
}
