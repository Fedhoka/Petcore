"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, CheckCircle, Plus, ArrowDownLeft, ArrowUpRight, Lock } from "lucide-react";
import { mockSales } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

const payMethodLabel: Record<string, string> = {
    cash: "💵 Efectivo",
    card_debit: "💳 Débito",
    card_credit: "💳 Crédito",
    mercadopago: "📱 MercadoPago",
    transfer: "🏦 Transferencia",
};

const expenseCategories = ["Insumos", "Servicios", "Retiro", "Proveedores", "Otro"];

const initialExpenses = [
    { id: "1", concept: "Insumos veterinarios", amount: 45000, date: "2026-03-28T10:00:00", category: "Insumos" },
    { id: "2", concept: "Servicio de limpieza", amount: 8000, date: "2026-03-28T09:00:00", category: "Servicios" },
    { id: "3", concept: "Retiro dueño", amount: 50000, date: "2026-03-27T18:00:00", category: "Retiro" },
];

export default function CajaPage() {
    const [cajaOpen, setCajaOpen] = useState(true);
    const [showCloseModal, setShowCloseModal] = useState(false);
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [expenses, setExpenses] = useState(initialExpenses);
    const [newExpense, setNewExpense] = useState({ concept: "", amount: "", category: "Insumos" });

    const totalIngresos = mockSales.reduce((s, v) => s + v.total, 0);
    const totalEgresos = expenses.reduce((s, e) => s + e.amount, 0);
    const saldoCaja = 15000 + totalIngresos - totalEgresos;

    const allMovements = [
        ...mockSales.map(s => ({ id: s.id, type: "ingreso" as const, concept: `Venta — ${s.client}`, amount: s.total, date: s.date, method: s.method })),
        ...expenses.map(e => ({ id: e.id, type: "egreso" as const, concept: e.concept, amount: e.amount, date: e.date, method: "cash" })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const handleAddExpense = () => {
        if (!newExpense.concept || !newExpense.amount) return;
        setExpenses(prev => [...prev, {
            id: String(Date.now()),
            concept: newExpense.concept,
            amount: Number(newExpense.amount),
            date: new Date().toISOString(),
            category: newExpense.category,
        }]);
        setNewExpense({ concept: "", amount: "", category: "Insumos" });
        setShowExpenseModal(false);
    };

    return (
        <div className="space-y-5">
            {/* Caja status banner */}
            <div className={cn("rounded-xl px-6 py-4 flex items-center justify-between", cajaOpen ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white" : "bg-gradient-to-r from-slate-500 to-slate-600 text-white")}>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium opacity-90">{cajaOpen ? "Caja abierta · Sáb 28/03/2026 — 07:00hs" : "Caja cerrada"}</p>
                        <p className="text-2xl font-bold">{formatCurrency(saldoCaja)}</p>
                        <p className="text-xs opacity-80">Apertura: $15,000 · Operador: Valeria López</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setShowExpenseModal(true)} className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium">
                        <Plus size={14} /> Egreso
                    </button>
                    {cajaOpen ? (
                        <button onClick={() => setShowCloseModal(true)} className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium">
                            <Lock size={14} /> Cerrar caja
                        </button>
                    ) : (
                        <button onClick={() => setCajaOpen(true)} className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium">
                            Abrir caja
                        </button>
                    )}
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Ingresos del día", value: formatCurrency(totalIngresos), icon: ArrowDownLeft, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Egresos del día", value: formatCurrency(totalEgresos), icon: ArrowUpRight, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
                    { label: "Neto del día", value: formatCurrency(totalIngresos - totalEgresos), icon: TrendingUp, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-900/20" },
                    { label: "Ventas", value: mockSales.length.toString(), icon: CheckCircle, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
                ].map((k) => (
                    <div key={k.label} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs text-slate-400 mb-1">{k.label}</p>
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{k.value}</p>
                            </div>
                            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", k.bg)}>
                                <k.icon size={18} className={k.color} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Movements */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Movimientos del día</h3>
                    <span className="text-xs text-slate-400">{allMovements.length} registros</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full data-table">
                        <thead>
                            <tr><th>Hora</th><th>Concepto</th><th>Tipo</th><th>Método</th><th className="text-right">Monto</th></tr>
                        </thead>
                        <tbody>
                            {allMovements.map((m) => (
                                <tr key={m.id + m.type}>
                                    <td className="font-mono text-xs text-slate-400">{m.date.split("T")[1]?.slice(0, 5)}</td>
                                    <td className="font-medium text-slate-800 dark:text-slate-200 text-sm">{m.concept}</td>
                                    <td>
                                        <span className={cn("badge text-xs", m.type === "ingreso" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400")}>
                                            {m.type === "ingreso" ? "↓ Ingreso" : "↑ Egreso"}
                                        </span>
                                    </td>
                                    <td className="text-slate-500 dark:text-slate-400 text-sm">{payMethodLabel[m.method] || m.method}</td>
                                    <td className={cn("text-right font-bold text-sm", m.type === "ingreso" ? "text-emerald-600 dark:text-emerald-400" : "text-red-500")}>
                                        {m.type === "ingreso" ? "+" : "-"}{formatCurrency(m.amount)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4} className="text-right px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200">Saldo final</td>
                                <td className="text-right px-4 py-3 font-bold text-base text-emerald-600 dark:text-emerald-400">{formatCurrency(saldoCaja)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Expense Modal */}
            {showExpenseModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm animate-fade-in p-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Registrar egreso</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Concepto</label>
                                <input type="text" value={newExpense.concept} onChange={e => setNewExpense({ ...newExpense, concept: e.target.value })} placeholder="Ej: Compra insumos" className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-sky-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Monto ($)</label>
                                <input type="number" value={newExpense.amount} onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })} placeholder="0" className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-sky-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Categoría</label>
                                <select value={newExpense.category} onChange={e => setNewExpense({ ...newExpense, category: e.target.value })} className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-sky-500">
                                    {expenseCategories.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowExpenseModal(false)} className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">Cancelar</button>
                            <button onClick={handleAddExpense} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold">Registrar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Close Caja Modal */}
            {showCloseModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in p-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Cierre de caja</h2>
                        <div className="space-y-3 mb-6">
                            {[
                                { label: "Saldo de apertura", value: formatCurrency(15000) },
                                { label: "Total ingresos", value: formatCurrency(totalIngresos), color: "text-emerald-600" },
                                { label: "Total egresos", value: formatCurrency(totalEgresos), color: "text-red-500" },
                                { label: "Saldo esperado en caja", value: formatCurrency(saldoCaja), bold: true },
                            ].map((row) => (
                                <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-b-0">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">{row.label}</span>
                                    <span className={cn("text-sm font-medium text-slate-800 dark:text-slate-200", (row as any).color, (row as any).bold && "text-base font-bold")}>{row.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-slate-500 mb-1.5">Efectivo contado</label>
                            <input type="number" placeholder="0" className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-sky-500" />
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setShowCloseModal(false)} className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">Cancelar</button>
                            <button onClick={() => { setShowCloseModal(false); setCajaOpen(false); }} className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-semibold">Cerrar caja</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
