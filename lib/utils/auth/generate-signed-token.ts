import { JWTPayload, SignJWT } from "jose";

export default async function generateSignedToken(payload?: JWTPayload, subject?: string) {
    const jwt = new SignJWT(payload).setProtectedHeader({ alg: "HS512" }).setIssuedAt().setExpirationTime("7 days");

    if (subject) jwt.setSubject(subject);

    const token = await jwt.sign(new TextEncoder().encode(process.env.JWT_SECRET));

    return token;
}
