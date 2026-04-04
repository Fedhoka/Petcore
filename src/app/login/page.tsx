"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { getDefaultRoute } from "@/lib/auth";
import { cn } from "@/lib/utils";

const demoCredentials = [
    { role: "Administrador", email: "admin@petcore.ar", password: "admin123", color: "bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300" },
    { role: "Secretaria", email: "secretaria@petcore.ar", password: "sec123", color: "bg-sky-50 border-sky-200 text-sky-700 dark:bg-sky-900/20 dark:border-sky-800 dark:text-sky-300" },
    { role: "Mostrador", email: "mostrador@petcore.ar", password: "mos123", color: "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300" },
];

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const ok = await login(email.trim().toLowerCase(), password);
        setLoading(false);
        if (!ok) {
            setError("Email o contraseña incorrectos.");
            return;
        }
        // Determine redirect from cookie (already set by login())
        const match = document.cookie.match(/petcore_auth=([^;]+)/);
        if (match) {
            try {
                const user = JSON.parse(decodeURIComponent(match[1]));
                router.push(getDefaultRoute(user.role));
            } catch {
                router.push("/dashboard");
            }
        } else {
            router.push("/dashboard");
        }
    };

    const fillDemo = (cred: typeof demoCredentials[0]) => {
        setEmail(cred.email);
        setPassword(cred.password);
        setError("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl flex gap-8 items-center">

                {/* Branding side */}
                <div className="hidden lg:flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            P
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">PetCore</h1>
                            <p className="text-sm text-slate-400">Gestión Veterinaria</p>
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                        Todo tu negocio,<br />
                        <span className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
                            en un solo lugar.
                        </span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                        Agenda, historia clínica, inventario, facturación, caja y marketing. Diseñado para clínicas veterinarias y pet shops de Latinoamérica.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        {["🐾 Historia clínica digital", "💊 Vacunas y recordatorios", "🏪 Punto de venta", "📊 Reportes en tiempo real"].map((f) => (
                            <div key={f} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/50 rounded-lg px-3 py-2 border border-slate-200 dark:border-slate-700">
                                {f}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Login card */}
                <div className="w-full max-w-md">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
                        {/* Mobile logo */}
                        <div className="flex items-center gap-2 mb-7 lg:hidden">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center text-white font-bold">P</div>
                            <span className="font-bold text-slate-900 dark:text-white">PetCore</span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Iniciar sesión</h3>
                        <p className="text-sm text-slate-400 mb-6">Ingresá con tus credenciales de acceso</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="usuario@petcore.ar"
                                    required
                                    className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Contraseña</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition pr-11"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                            >
                                {loading ? (
                                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <LogIn size={16} />
                                )}
                                {loading ? "Ingresando..." : "Ingresar"}
                            </button>
                        </form>

                        {/* Demo credentials */}
                        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Accesos de demo</p>
                            <div className="space-y-2">
                                {demoCredentials.map((c) => (
                                    <button
                                        key={c.role}
                                        onClick={() => fillDemo(c)}
                                        className={cn(
                                            "w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium transition-all hover:opacity-80",
                                            c.color
                                        )}
                                    >
                                        <span className="font-semibold">{c.role}</span>
                                        <span className="opacity-70 font-mono">{c.email}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
