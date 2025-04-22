import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";
// import { protectedRoutes } from "./constant";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
    customer: [
        /^\/cart/,
        /^\/checkout/,
        /^\/orders/,
        /^\/profile/,
        /^\/orders/,
    ],
    admin: [/^\/admin/, /^\/profile/, /^\/checkout/, /^\/cart/, /^\/orders/],
};

export const middleware = async (req: NextRequest) => {
    const { pathname } = req.nextUrl;
    const userInfo = await getCurrentUser();
    if (!userInfo) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(
                new URL(
                    `${process.env.NEXT_PUBLIC_CLIENT_API}/login?redirectPath=${pathname}`,
                    req.url
                )
            );
        }
    }

    if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
        const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }
    }

    return NextResponse.redirect(new URL("/", req.url));
};

export const config = {
    matcher: [
        "/cart",
        "/admin",
        "/admin/:page",
        "/checkout",
        "/orders",
        "/profile",
    ],
};
