export type UserRole = "admin" | "secretaria" | "mostrador";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar: string;
}

export const mockUsers = [
    { id: "1", name: "Dr. Martín García", email: "admin@petcore.ar", password: "admin123", role: "admin" as UserRole, avatar: "MG" },
    { id: "2", name: "Valeria López", email: "secretaria@petcore.ar", password: "sec123", role: "secretaria" as UserRole, avatar: "VL" },
    { id: "3", name: "Carlos Mostrador", email: "mostrador@petcore.ar", password: "mos123", role: "mostrador" as UserRole, avatar: "CM" },
];

export const roleLabels: Record<UserRole, string> = {
    admin: "Administrador",
    secretaria: "Secretaria",
    mostrador: "Mostrador",
};

export const roleBadgeColors: Record<UserRole, string> = {
    admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    secretaria: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
    mostrador: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

// Routes each role can access
export const roleRoutes: Record<UserRole, string[]> = {
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

export function canAccess(role: UserRole, pathname: string): boolean {
    return roleRoutes[role].some((r) => pathname.startsWith(r));
}

export function getDefaultRoute(role: UserRole): string {
    return roleRoutes[role][0];
}
