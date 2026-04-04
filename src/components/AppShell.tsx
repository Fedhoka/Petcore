"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/agenda": "Agenda",
    "/clientes": "Clientes",
    "/pacientes": "Pacientes",
    "/historia-clinica": "Historia Clínica",
    "/vacunas": "Vacunas & Desparasitación",
    "/pos": "Punto de Venta",
    "/inventario": "Inventario",
    "/proveedores": "Proveedores",
    "/facturacion": "Facturación",
    "/caja": "Caja",
    "/fidelizacion": "Fidelización",
    "/campanas": "Campañas",
    "/reportes": "Reportes y Analítica",
    "/configuracion": "Configuración",
};

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const pathname = usePathname();
    const title = pageTitles[pathname] ?? "PetCore";

    // Persist dark mode in localStorage
    useEffect(() => {
        const saved = localStorage.getItem("petcore_dark");
        if (saved === "1") {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleDark = () => {
        const next = !isDark;
        setIsDark(next);
        localStorage.setItem("petcore_dark", next ? "1" : "0");
        if (next) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar mobile */}
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 lg:hidden",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Sidebar desktop */}
            <div className="hidden lg:flex">
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar
                    title={title}
                    onMenuClick={() => setSidebarOpen(true)}
                    isDark={isDark}
                    onToggleDark={toggleDark}
                />
                <main className="flex-1 overflow-y-auto">
                    <div className="animate-fade-in p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
