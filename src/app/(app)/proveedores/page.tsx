"use client";

import { Plus, Phone, Mail, Package, ShoppingCart } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const suppliers = [
    { id: "1", name: "Royal Canin Argentina", contact: "Juan Pérez", phone: "11-4890-1234", email: "ventas@royalcanin.com.ar", category: "Alimentos", lastOrder: "2026-03-10", balance: 0, orders: 12 },
    { id: "2", name: "Boehringer Ingelheim", contact: "Ana García", phone: "11-5678-9012", email: "vet@boehringer.com.ar", category: "Medicamentos", lastOrder: "2026-03-05", balance: 45000, orders: 8 },
    { id: "3", name: "MSD Animal Health", contact: "Carlos López", phone: "11-6543-2109", email: "msd@animalhealth.com.ar", category: "Vacunas", lastOrder: "2026-02-28", balance: 0, orders: 5 },
    { id: "4", name: "Distribuidora Pet & Co", contact: "Sofía Martínez", phone: "11-7890-3456", email: "pedidos@petandco.com.ar", category: "Accesorios", lastOrder: "2026-03-18", balance: 12000, orders: 24 },
];

const purchaseOrders = [
    { id: "OC-0041", supplier: "Royal Canin Argentina", items: 5, total: 180000, date: "2026-03-27", status: "received" },
    { id: "OC-0040", supplier: "Boehringer Ingelheim", items: 3, total: 95000, date: "2026-03-20", status: "sent" },
    { id: "OC-0039", supplier: "MSD Animal Health", items: 2, total: 68000, date: "2026-03-15", status: "received" },
];

const statusColor: Record<string, string> = {
    draft: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    sent: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    received: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    cancelled: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};
const statusLabel: Record<string, string> = { draft: "Borrador", sent: "Enviada", received: "Recibida", cancelled: "Cancelada" };

export default function ProveedoresPage() {
    return (
        <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-sm text-slate-500 dark:text-slate-400">{suppliers.length} proveedores activos</p>
                <div className="flex gap-2 self-start">
                    <button className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 py-2.5 rounded-lg text-sm font-medium">
                        <ShoppingCart size={15} /> Nueva O/C
                    </button>
                    <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium">
                        <Plus size={15} /> Nuevo proveedor
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suppliers.map((s) => (
                    <div key={s.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 card-hover">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-slate-200">{s.name}</h3>
                                <p className="text-xs text-slate-400 mt-0.5">{s.contact} · {s.category}</p>
                            </div>
                            {s.balance > 0 && (
                                <span className="badge bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs">
                                    Deuda: {formatCurrency(s.balance)}
                                </span>
                            )}
                        </div>
                        <div className="space-y-1.5 text-xs">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><Phone size={11} />{s.phone}</div>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><Mail size={11} />{s.email}</div>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><Package size={11} />Última O/C: {formatDate(s.lastOrder)} · {s.orders} órdenes totales</div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button className="flex-1 py-2 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">Ver historial</button>
                            <button className="flex-1 py-2 text-xs font-medium bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900/30">Nueva O/C</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Órdenes de Compra recientes</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full data-table">
                        <thead><tr><th>Nº O/C</th><th>Proveedor</th><th>Items</th><th>Total</th><th>Fecha</th><th>Estado</th></tr></thead>
                        <tbody>
                            {purchaseOrders.map((po) => (
                                <tr key={po.id}>
                                    <td className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">{po.id}</td>
                                    <td className="font-medium text-slate-800 dark:text-slate-200 text-sm">{po.supplier}</td>
                                    <td className="text-slate-500 dark:text-slate-400 text-sm">{po.items} productos</td>
                                    <td className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(po.total)}</td>
                                    <td className="text-slate-400 text-sm">{formatDate(po.date)}</td>
                                    <td><span className={`badge text-xs ${statusColor[po.status]}`}>{statusLabel[po.status]}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
