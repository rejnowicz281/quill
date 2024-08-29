import { NextResponse, type NextRequest } from "next/server";
import { verifyToken } from "./lib/utils/auth/verify-token";

export async function middleware(request: NextRequest) {
    const handleRedirect = (path: string) => NextResponse.redirect(new URL(path, request.url));

    const token = request.cookies.get("token")?.value;

    const userPayload = await verifyToken(token);

    if (!userPayload) return handleRedirect("/login?message=Your session has expired. Please log in again.");

    if (
        (request.nextUrl.pathname.startsWith("/admin") &&
            userPayload.role !== "ROLE_ADMIN" &&
            userPayload.role !== "ROLE_ROOT") ||
        (request.nextUrl.pathname.startsWith("/root") && userPayload.role !== "ROLE_ROOT") ||
        (request.nextUrl.pathname.startsWith("/posts/create") &&
            userPayload.role !== "ROLE_AUTHOR" &&
            userPayload.role !== "ROLE_ROOT" &&
            userPayload.role !== "ROLE_ADMIN") ||
        (request.nextUrl.pathname.startsWith("/author-requests") &&
            userPayload.role !== "ROLE_USER" &&
            userPayload.role !== "ROLE_ROOT" &&
            userPayload.role !== "ROLE_ADMIN")
    )
        return handleRedirect("/");

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - /login (login page)
         * - /register (register page)
         * - /auth/callback
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|login|register|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
    ]
};
