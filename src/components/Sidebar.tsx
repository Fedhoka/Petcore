"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard, Calendar, Users, PawPrint, Stethoscope,
    ShoppingCart, Package, Receipt, DollarSign, BarChart3,
    Settings, ChevronDown, X,
    Syringe, Truck, Star, Megaphone, LogOut
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { roleLabels, roleBadgeColors, roleRoutes } from "@/lib/auth";

const allNavItems = [
    {
        label: "Principal",
        items: [
            { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { href: "/agenda", icon: Calendar, label: "Agenda" },
        ],
    },
    {
        label: "Clínica",
        items: [
            { href: "/clientes", icon: Users, label: "Clientes" },
            { href: "/pacientes", icon: PawPrint, label: "Pacientes" },
            { href: "/historia-clinica", icon: Stethoscope, label: "Historia Clínica" },
            { href: "/vacunas", icon: Syringe, label: "Vacunas" },
        ],
    },
    {
        label: "Ventas",
        items: [
            { href: "/pos", icon: ShoppingCart, label: "Punto de Venta" },
            { href: "/inventario", icon: Package, label: "Inventario" },
            { href: "/proveedores", icon: Truck, label: "Proveedores" },
            { href: "/facturacion", icon: Receipt, label: "Facturación" },
            { href: "/caja", icon: DollarSign, label: "Caja" },
        ],
    },
    {
        label: "Marketing",
        items: [
            { href: "/fidelizacion", icon: Star, label: "Fidelización" },
            { href: "/campanas", icon: Megaphone, label: "Campañas" },
        ],
    },
    {
        label: "Análisis",
        items: [
            { href: "/reportes", icon: BarChart3, label: "Reportes" },
        ],
    },
    {
        label: "Sistema",
        items: [
            { href: "/configuracion", icon: Settings, label: "Configuración" },
        ],
    },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const allowed = user ? new Set(roleRoutes[user.role]) : new Set<string>();

    // Filter nav groups and items based on role
    const navItems = allNavItems
        .map((group) => ({
            ...group,
            items: group.items.filter((item) => allowed.has(item.href)),
        }))
        .filter((group) => group.items.length > 0);

    return (
        <aside className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 w-64">
            {/* Logo */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
                <Link href={user ? roleRoutes[user.role][0] : "/dashboard"} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                        P
                    </div>
                    <div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">PetCore</span>
                        <span className="block text-xs text-slate-400 leading-none">VetClinic Martín García</span>
                    </div>
                </Link>
                {onClose && (
                    <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-600 lg:hidden">
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Role badge */}
            {user && (
                <div className="px-4 pt-3 pb-1">
                    <span className={cn("badge text-xs font-semibold", roleBadgeColors[user.role])}>
                        {roleLabels[user.role]}
                    </span>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-2 px-3">
                {navItems.map((group) => (
                    <div key={group.label} className="mb-4">
                        <p className="px-3 mb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            {group.label}
                        </p>
                        <ul className="space-y-0.5">
                            {group.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={cn("sidebar-item", isActive && "active")}
                                            onClick={onClose}
                                        >
                                            <item.icon size={17} />
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            {/* User */}
            {user && (
                <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                            {user.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user.name}</p>
                            <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                        <LogOut size={15} />
                        Cerrar sesión
                    </button>
                </div>
            )}
        </aside>
    );
}
