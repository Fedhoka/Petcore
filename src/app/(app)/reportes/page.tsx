"use client";

import {
    BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { mockSalesChart, mockTopProducts } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const monthlyTrend = [
    { month: "Oct", ingresos: 680000, egresos: 280000 },
    { month: "Nov", ingresos: 720000, egresos: 310000 },
    { month: "Dic", ingresos: 950000, egresos: 380000 },
    { month: "Ene", ingresos: 780000, egresos: 295000 },
    { month: "Feb", ingresos: 840000, egresos: 320000 },
    { month: "Mar", ingresos: 892000, egresos: 342000 },
];

const serviceBreakdown = [
    { name: "Consultas", value: 38, color: "#0ea5e9" },
    { name: "Vacunaciones", value: 22, color: "#10b981" },
    { name: "Cirugías", value: 12, color: "#8b5cf6" },
    { name: "Pet Shop", value: 20, color: "#f59e0b" },
    { name: "Estética", value: 8, color: "#ef4444" },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 shadow-lg text-sm">
                <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
                {payload.map((p) => (
                    <div key={p.name} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                        <span className="text-slate-500 dark:text-slate-400">{p.name}:</span>
                        <span className="font-medium">{formatCurrency(p.value)}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function ReportesPage() {
    return (
        <div className="space-y-6">
            {/* Period selector */}
            <div className="flex items-center gap-2 flex-wrap">
                {["Hoy", "Esta semana", "Este mes", "Últimos 3 meses", "Este año"].map((p, i) => (
                    <button
                        key={p}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${i === 2
                            ? "bg-sky-500 text-white"
                            : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-sky-300"}`}
                    >
                        {p}
                    </button>
                ))}
            </div>

            {/* Top KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Ingresos totales", value: "$892,000", sub: "↑ 6.2% vs mes anterior", pos: true },
                    { label: "Ticket promedio", value: "$18,400", sub: "↑ 3.1%", pos: true },
                    { label: "Consultas realizadas", value: "127", sub: "↑ 8 vs mes anterior", pos: true },
                    { label: "Clientes nuevos", value: "23", sub: "↓ 2 vs mes anterior", pos: false },
                ].map((k) => (
                    <div key={k.label} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
                        <p className="text-xs text-slate-400 mb-1">{k.label}</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{k.value}</p>
                        <p className={`text-xs font-medium ${k.pos ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>{k.sub}</p>
                    </div>
                ))}
            </div>

            {/* Main bar chart */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">Ingresos vs Egresos</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Últimos 6 meses</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-sky-500 inline-block" />Ingresos</div>
                        <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-400 inline-block" />Egresos</div>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlyTrend} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="ingresos" name="Ingresos" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="egresos" name="Egresos" fill="#f87171" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Bottom charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Top productos por revenue</h3>
                    <div className="space-y-3">
                        {mockTopProducts.map((p, i) => (
                            <div key={p.name}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">{p.name}</span>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="text-slate-400">{p.sales} unid.</span>
                                        <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(p.revenue)}</span>
                                    </div>
                                </div>
                                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${(p.revenue / mockTopProducts[0].revenue) * 100}%`,
                                            background: ["#0ea5e9", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444"][i],
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Distribución servicios</h3>
                    <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                            <Pie data={serviceBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                                {serviceBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                            </Pie>
                            <Tooltip formatter={(v) => `${v}%`} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-1.5 mt-1">
                        {serviceBreakdown.map((s) => (
                            <div key={s.name} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: s.color }} />
                                    <span className="text-slate-500 dark:text-slate-400">{s.name}</span>
                                </div>
                                <span className="font-semibold text-slate-700 dark:text-slate-300">{s.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Weekly area chart */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Ventas por día — Semana actual</h3>
                <ResponsiveContainer width="100%" height={160}>
                    <AreaChart data={mockSalesChart} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                        <Tooltip formatter={(v: number) => [formatCurrency(v), "Ventas"]} />
                        <Area type="monotone" dataKey="ventas" stroke="#0ea5e9" strokeWidth={2} fill="url(#colorVentas)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
