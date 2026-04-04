"use client";

import { Star, Gift } from "lucide-react";
import { mockClients } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

const tiers = [
    { name: "Bronze", min: 0, max: 199, color: "from-amber-700 to-amber-500", icon: "🥉", benefits: ["5% descuento en accesorios", "Recordatorio de vacunas"] },
    { name: "Silver", min: 200, max: 499, color: "from-slate-400 to-slate-300", icon: "🥈", benefits: ["10% descuento", "Baño gratis en cumpleaños", "Recordatorio WhatsApp"] },
    { name: "Gold", min: 500, max: 999, color: "from-amber-400 to-yellow-300", icon: "🥇", benefits: ["15% descuento", "Consulta gratis x mes", "Puntos dobles en vacunas"] },
    { name: "Platinum", min: 1000, max: Infinity, color: "from-sky-400 to-indigo-400", icon: "💎", benefits: ["20% descuento", "Prioridad de agenda", "Evaluación gratis anual"] },
];

const getTier = (pts: number) => tiers.find(t => pts >= t.min && pts <= t.max) || tiers[0];

const transactions = [
    { id: "1", client: "Lucía Martínez", type: "earn", points: 58, concept: "Compra $58,000", date: "2026-03-28" },
    { id: "2", client: "María García", type: "earn", points: 35, concept: "Compra $35,000", date: "2026-03-28" },
    { id: "3", client: "Valentina López", type: "redeem", points: 100, concept: "Descuento $500", date: "2026-03-27" },
    { id: "4", client: "Carlos Rodríguez", type: "earn", points: 12, concept: "Compra $12,500", date: "2026-03-27" },
];

export default function FidelizacionPage() {
    return (
        <div className="space-y-5">
            {/* Program overview */}
            <div className="bg-gradient-to-r from-sky-500 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-bold mb-1">Programa PetPoints</h2>
                        <p className="text-sm opacity-90">1 punto = $1,000 de compra · 100 puntos = $500 de descuento</p>
                    </div>
                    <Star size={40} className="opacity-30" />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-5">
                    {[
                        { label: "Clientes activos", value: mockClients.length },
                        { label: "Puntos totales", value: mockClients.reduce((s, c) => s + c.points, 0).toLocaleString("es-AR") },
                        { label: "Canjes este mes", value: "3" },
                    ].map((k) => (
                        <div key={k.label} className="text-center">
                            <p className="text-2xl font-bold">{k.value}</p>
                            <p className="text-xs opacity-80 mt-0.5">{k.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tiers */}
            <div>
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Niveles del programa</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {tiers.map((tier) => (
                        <div key={tier.name} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 overflow-hidden relative">
                            <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", tier.color)} />
                            <div className="flex items-center gap-2 mb-3 mt-1">
                                <span className="text-2xl">{tier.icon}</span>
                                <div>
                                    <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">{tier.name}</p>
                                    <p className="text-xs text-slate-400">{tier.max === Infinity ? `${tier.min}+ pts` : `${tier.min}–${tier.max} pts`}</p>
                                </div>
                            </div>
                            <ul className="space-y-1">
                                {tier.benefits.map((b) => (
                                    <li key={b} className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                                        <span className="text-emerald-500 mt-0.5">✓</span>{b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Client ranking */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Ranking de clientes</h3>
                    <button className="flex items-center gap-1.5 text-xs text-sky-500 font-medium border border-sky-200 dark:border-sky-700 px-3 py-1.5 rounded-lg">
                        <Gift size={11} /> Enviar cupones
                    </button>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {[...mockClients].sort((a, b) => b.points - a.points).map((client, i) => {
                        const tier = getTier(client.points);
                        const nextTier = tiers[tiers.indexOf(tier) + 1];
                        const progress = nextTier
                            ? ((client.points - tier.min) / (nextTier.min - tier.min)) * 100
                            : 100;
                        return (
                            <div key={client.id} className="px-5 py-4 flex items-center gap-4">
                                <span className="text-lg font-bold text-slate-300 dark:text-slate-600 w-6 text-center">{i + 1}</span>
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                    {client.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{client.name}</p>
                                        <span className="text-base">{tier.icon}</span>
                                        <span className="text-xs text-slate-400 font-medium">{tier.name}</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full w-48 overflow-hidden">
                                        <div className={cn("h-full rounded-full bg-gradient-to-r", tier.color)} style={{ width: `${progress}%` }} />
                                    </div>
                                    {nextTier && (
                                        <p className="text-xs text-slate-400 mt-0.5">{nextTier.min - client.points} pts para {nextTier.name}</p>
                                    )}
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="font-bold text-amber-500 text-lg">{client.points}</p>
                                    <p className="text-xs text-slate-400">puntos</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Transactions */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Últimas transacciones de puntos</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {transactions.map((t) => (
                        <div key={t.id} className="px-5 py-3 flex items-center gap-3">
                            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold", t.type === "earn" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600" : "bg-purple-50 dark:bg-purple-900/20 text-purple-600")}>
                                {t.type === "earn" ? "+" : "−"}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{t.client}</p>
                                <p className="text-xs text-slate-400">{t.concept} · {t.date}</p>
                            </div>
                            <span className={cn("font-bold text-sm flex-shrink-0", t.type === "earn" ? "text-emerald-600 dark:text-emerald-400" : "text-purple-600 dark:text-purple-400")}>
                                {t.type === "earn" ? "+" : "−"}{t.points} pts
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
