import { UserTokenPayload } from "@/lib/types/auth";
import { decodeJwt, jwtVerify } from "jose";
import { cookies } from "next/headers";
import redis from "../db/redis";

export async function verifyToken(token?: string): Promise<UserTokenPayload | null> {
    if (!token) return null;

    try {
        await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    } catch (error) {
        return null;
    }

    const payload = decodeJwt(token);

    const tokenVersion = await redis.get(`userTokenVersion:${payload.id}`);

    if (tokenVersion && tokenVersion !== payload.version) return null;

    return payload as UserTokenPayload;
}

export default async function verifyUserToken() {
    return await verifyToken(cookies().get("token")?.value);
}
