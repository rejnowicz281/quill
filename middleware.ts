import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (!token) return NextResponse.redirect(new URL("/login", request.url));

    try {
        jwtVerify(
            token,
            new TextEncoder().encode(
                "dDP0Pky0LqNWs/YvpEYsjZetDuivDh3289HRYeAFMsg+NNYBMd5Cj7cXEiQZYpg6JEQsHxgzbmxb34QkPNZ/o0B7WEdJTes3Wkgky41RBQCiVJczBFETed1AIp52JfZiHYGwvB7XxM6NRsVpJ+Fx6/XskNYOhn731Rljq5Xz0Jp2"
            )
        );
    } catch (error) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

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
