import { decodeJwt, jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (!token) return NextResponse.redirect(new URL("/login", request.url));

    try {
        jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    } catch (error) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const currentUser = decodeJwt(token);

    if (
        (request.nextUrl.pathname.startsWith("/admin") &&
            currentUser.role !== "ROLE_ADMIN" &&
            currentUser.role !== "ROLE_ROOT") ||
        (request.nextUrl.pathname.startsWith("/root") && currentUser.role !== "ROLE_ROOT")
    )
        return NextResponse.redirect(new URL("/", request.url));

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
