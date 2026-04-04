"use client";

import type { ElementType } from "react";
import { Download, Plus, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { cn, formatCurrency, formatDateTime } from "@/lib/utils";

const invoices = [
    { id: "FC-0001-00245", client: "María García", type: "B", total: 35500, date: "2026-03-28T09:45:00", status: "issued", cae: "71234567890123" },
    { id: "FC-0001-00244", client: "Lucía Martínez", type: "A", total: 52000, date: "2026-03-28T14:00:00", status: "issued", cae: "71234567890122" },
    { id: "FC-0001-00243", client: "Carlos Rodríguez", type: "B", total: 12500, date: "2026-03-28T11:30:00", status: "issued", cae: "71234567890121" },
    { id: "FC-0001-00242", client: "Valentina López", type: "B", total: 18700, date: "2026-03-27T16:30:00", status: "pending", cae: "" },
    { id: "FC-0001-00241", client: "Consumidor Final", type: "B", total: 23300, date: "2026-03-27T12:15:00", status: "issued", cae: "71234567890120" },
];

const statusMeta: Record<string, { label: string; color: string; icon: ElementType }> = {
    issued: { label: "Emitida", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle },
    pending: { label: "Pendiente", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
    error: { label: "Error", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400", icon: AlertCircle },
};

export default function FacturacionPage() {
    return (
        <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-sm text-slate-500 dark:text-slate-400">{invoices.length} comprobantes este período</p>
                <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium self-start">
                    <Plus size={15} /> Nueva factura
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Facturado hoy", value: formatCurrency(invoices.filter(i => i.date.startsWith("2026-03-28")).reduce((s, i) => s + i.total, 0)), color: "text-emerald-600 dark:text-emerald-400" },
                    { label: "Emitidas", value: invoices.filter(i => i.status === "issued").length, color: "text-sky-600 dark:text-sky-400" },
                    { label: "Pendientes AFIP", value: invoices.filter(i => i.status === "pending").length, color: "text-amber-600" },
                    { label: "Comprobante Nº", value: "FC-0001-00245", color: "text-slate-600 dark:text-slate-300", small: true },
                ].map((k) => (
                    <div key={k.label} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                        <p className="text-xs text-slate-400 mb-1">{k.label}</p>
                        <p className={cn("font-bold", (k as any).small ? "text-sm mt-1" : "text-xl", k.color)}>{k.value}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-start gap-3 bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 rounded-xl px-4 py-3.5">
                <div className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">🏛️</span>
                </div>
                <div>
                    <p className="text-sm font-semibold text-sky-700 dark:text-sky-400">Conectado a AFIP · Argentina</p>
                    <p className="text-xs text-sky-600 dark:text-sky-400 mt-0.5">CUIT: 20-12345678-9 · Punto de venta: 0001 · Monotributista Categoría H · CAE automático activo</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Comprobantes</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full data-table">
                        <thead>
                            <tr><th>Comprobante</th><th>Tipo</th><th>Cliente</th><th>Fecha</th><th>Monto</th><th>CAE</th><th>Estado</th><th>PDF</th></tr>
                        </thead>
                        <tbody>
                            {invoices.map((inv) => {
                                const sm = statusMeta[inv.status];
                                return (
                                    <tr key={inv.id}>
                                        <td className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">{inv.id}</td>
                                        <td>
                                            <span className={cn("badge text-xs font-bold", inv.type === "A" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300")}>
                                                Fact. {inv.type}
                                            </span>
                                        </td>
                                        <td className="font-medium text-slate-800 dark:text-slate-200 text-sm">{inv.client}</td>
                                        <td className="text-slate-500 dark:text-slate-400 text-xs">{formatDateTime(inv.date)}</td>
                                        <td className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(inv.total)}</td>
                                        <td className="font-mono text-xs text-slate-400">{inv.cae || "—"}</td>
                                        <td>
                                            <span className={cn("badge text-xs", sm.color)}>
                                                <sm.icon size={11} className="mr-1" />{sm.label}
                                            </span>
                                        </td>
                                        <td>
                                            {inv.status === "issued" && (
                                                <button className="flex items-center gap-1 text-xs text-sky-500 hover:text-sky-600 font-medium">
                                                    <Download size={12} /> PDF
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
