"use client";

import { Bell, Search, Moon, Sun, Menu } from "lucide-react";

interface TopbarProps {
    title: string;
    onMenuClick: () => void;
    isDark: boolean;
    onToggleDark: () => void;
}

export default function Topbar({ title, onMenuClick, isDark, onToggleDark }: TopbarProps) {
    const today = new Date().toLocaleDateString("es-AR", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    return (
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
                >
                    <Menu size={20} />
                </button>
                <h1 className="text-lg font-semibold text-slate-900 dark:text-white hidden sm:block">{title}</h1>
            </div>

            <div className="flex items-center gap-2">
                {/* Search desktop */}
                <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg w-64">
                    <Search size={15} className="text-slate-400 flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="Buscar paciente, cliente, producto..."
                        className="bg-transparent text-sm text-slate-600 dark:text-slate-300 placeholder-slate-400 outline-none w-full"
                    />
                </div>

                {/* Dark mode toggle */}
                <button
                    onClick={onToggleDark}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                    title={isDark ? "Modo claro" : "Modo oscuro"}
                >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Notifications */}
                <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* Date badge */}
                <div className="hidden sm:flex items-center gap-1.5 text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full text-slate-600 dark:text-slate-300 font-medium capitalize">
                    {today}
                </div>
            </div>
        </header>
    );
}
