"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
    DollarSign, Calendar, TrendingUp, AlertTriangle,
    Syringe, Package, ArrowRight, CheckCircle, Clock
} from "lucide-react";
import {
    mockDashboardStats, mockAppointments, mockVaccinationAlerts, mockSalesChart, statusColors, statusLabels
} from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
    const { user } = useAuth();
    const s = mockDashboardStats;
    const todayAppts = mockAppointments.filter((a) => a.startAt.startsWith("2026-03-21"));

    const greeting = () => {
        const h = new Date().getHours();
        if (h < 12) return "Buenos días";
        if (h < 18) return "Buenas tardes";
        return "Buenas noches";
    };

    return (
        <div className="space-y-5">
            {/* Welcome */}
            <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {greeting()}, {user?.name.split(" ")[0]} 👋
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Resumen del día — Clínica Veterinaria del Parque
                </p>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Ventas hoy", value: formatCurrency(s.todaySales), sub: `↑ ${s.todaySalesChange}% vs ayer`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20", pos: true },
                    { label: "Turnos hoy", value: `${s.todayAppointments} / ${s.todayAppointmentsTotal}`, sub: "confirmados / totales", icon: Calendar, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-900/20", pos: true },
                    { label: "Saldo en caja", value: formatCurrency(s.cashBalance), sub: "al momento", icon: DollarSign, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20", pos: true },
                    { label: "Rev. mensual", value: formatCurrency(s.monthRevenue), sub: `Meta: ${formatCurrency(s.monthRevenueGoal)}`, icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20", pos: true },
                ].map((k) => (
                    <div key={k.label} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0 mr-3">
                                <p className="text-xs text-slate-400 mb-1">{k.label}</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white truncate">{k.value}</p>
                                <p className={cn("text-xs font-medium mt-0.5", k.pos ? "text-emerald-600 dark:text-emerald-400" : "text-red-500")}>{k.sub}</p>
                            </div>
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", k.bg)}>
                                <k.icon size={20} className={k.color} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Monthly goal progress */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Meta mensual</span>
                    <span className="text-sm font-bold text-sky-600 dark:text-sky-400">
                        {Math.round((s.monthRevenue / s.monthRevenueGoal) * 100)}%
                    </span>
                </div>
                <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-700"
                        style={{ width: `${Math.min((s.monthRevenue / s.monthRevenueGoal) * 100, 100)}%` }}
                    />
                </div>
                <div className="flex justify-between mt-1.5 text-xs text-slate-400">
                    <span>{formatCurrency(s.monthRevenue)} alcanzado</span>
                    <span>Meta: {formatCurrency(s.monthRevenueGoal)}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Today appointments */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="font-semibold text-slate-900 dark:text-white">Turnos de hoy</h3>
                        <Link href="/agenda" className="text-xs text-sky-500 hover:text-sky-600 font-medium flex items-center gap-1">
                            Ver agenda <ArrowRight size={12} />
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {todayAppts.map((appt) => (
                            <div key={appt.id} className="flex items-center gap-4 px-5 py-3">
                                <div
                                    className="w-1 self-stretch rounded-full flex-shrink-0"
                                    style={{ backgroundColor: appt.color }}
                                />
                                <div className="text-xs font-mono text-slate-400 w-16 flex-shrink-0">
                                    {appt.startAt.split("T")[1].slice(0, 5)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                                        {appt.petName} · {appt.clientName}
                                    </p>
                                    <p className="text-xs text-slate-400 truncate">{appt.service} · {appt.vetName}</p>
                                </div>
                                <span className={cn("badge text-xs flex-shrink-0", statusColors[appt.status])}>
                                    {statusLabels[appt.status]}
                                </span>
                            </div>
                        ))}
                        {todayAppts.length === 0 && (
                            <div className="px-5 py-8 text-center text-sm text-slate-400">
                                No hay turnos para hoy
                            </div>
                        )}
                    </div>
                </div>

                {/* Alerts */}
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="font-semibold text-slate-900 dark:text-white">Alertas</h3>
                    </div>
                    <div className="p-4 space-y-3">
                        {s.expiredVaccinesCount > 0 && (
                            <Link href="/vacunas" className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg hover:opacity-80 transition-opacity">
                                <Syringe size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">Vacunas próximas</p>
                                    <p className="text-xs text-amber-600 dark:text-amber-500">{s.expiredVaccinesCount} pacientes necesitan atención</p>
                                </div>
                            </Link>
                        )}
                        {s.lowStockCount > 0 && (
                            <Link href="/inventario" className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:opacity-80 transition-opacity">
                                <Package size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-red-700 dark:text-red-400">Stock bajo</p>
                                    <p className="text-xs text-red-600 dark:text-red-500">{s.lowStockCount} productos por reponer</p>
                                </div>
                            </Link>
                        )}
                        {s.pendingInvoices > 0 && (
                            <Link href="/facturacion" className="flex items-start gap-3 p-3 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-lg hover:opacity-80 transition-opacity">
                                <AlertTriangle size={16} className="text-sky-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-sky-700 dark:text-sky-400">Facturas pendientes</p>
                                    <p className="text-xs text-sky-600 dark:text-sky-500">{s.pendingInvoices} sin enviar a AFIP</p>
                                </div>
                            </Link>
                        )}
                        {s.birthdaysToday > 0 && (
                            <div className="flex items-start gap-3 p-3 bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg">
                                <span className="text-base flex-shrink-0">🎂</span>
                                <div>
                                    <p className="text-sm font-semibold text-pink-700 dark:text-pink-400">Cumpleaños hoy</p>
                                    <p className="text-xs text-pink-600 dark:text-pink-500">{s.birthdaysToday} mascota cumple años</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sales chart */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">Ventas — Semana actual</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Ingresos por día</p>
                    </div>
                    <Link href="/reportes" className="text-xs text-sky-500 hover:text-sky-600 font-medium flex items-center gap-1">
                        Ver reportes <ArrowRight size={12} />
                    </Link>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={mockSalesChart} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                        <defs>
                            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                        <Tooltip formatter={(v: number) => [formatCurrency(v), "Ventas"]} />
                        <Area type="monotone" dataKey="ventas" stroke="#0ea5e9" strokeWidth={2} fill="url(#grad)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Quick actions */}
            <div>
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Accesos rápidos</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { href: "/agenda", label: "Nuevo turno", icon: "📅", color: "bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800" },
                        { href: "/pos", label: "Nueva venta", icon: "🛒", color: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800" },
                        { href: "/pacientes", label: "Ver pacientes", icon: "🐾", color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800" },
                        { href: "/caja", label: "Ver caja", icon: "💰", color: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800" },
                    ].map((a) => (
                        <Link
                            key={a.href}
                            href={a.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border card-hover text-center",
                                a.color
                            )}
                        >
                            <span className="text-2xl">{a.icon}</span>
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{a.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
