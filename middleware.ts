import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login"];

const ROLE_ROUTES: Record<string, string[]> = {
    admin: [
        "/dashboard", "/agenda", "/clientes", "/pacientes", "/historia-clinica",
        "/vacunas", "/pos", "/inventario", "/proveedores", "/facturacion",
        "/caja", "/fidelizacion", "/campanas", "/reportes", "/configuracion",
    ],
    secretaria: [
        "/dashboard", "/agenda", "/clientes", "/pacientes", "/historia-clinica",
        "/vacunas", "/pos", "/inventario", "/proveedores", "/facturacion",
        "/caja", "/fidelizacion", "/configuracion",
    ],
    mostrador: [
        "/agenda", "/pos", "/caja", "/inventario",
    ],
};

function canAccess(role: string, pathname: string): boolean {
    const routes = ROLE_ROUTES[role];
    if (!routes) return false;
    return routes.some((r) => pathname.startsWith(r));
}

function getDefaultRoute(role: string): string {
    return ROLE_ROUTES[role]?.[0] ?? "/login";
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Always allow public paths
    if (PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.next();
    }

    // Allow Next.js internals
    if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname === "/favicon.ico") {
        return NextResponse.next();
    }

    const authCookie = request.cookies.get("petcore_auth");

    if (!authCookie?.value) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const user = JSON.parse(decodeURIComponent(authCookie.value));
        const role: string = user?.role ?? "";

        // Root redirect
        if (pathname === "/") {
            return NextResponse.redirect(new URL(getDefaultRoute(role), request.url));
        }

        if (!canAccess(role, pathname)) {
            return NextResponse.redirect(new URL(getDefaultRoute(role), request.url));
        }
    } catch {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
