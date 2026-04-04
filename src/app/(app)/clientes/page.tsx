"use client";

import { useState } from "react";
import { Plus, Search, Phone, Star, PawPrint, ChevronRight } from "lucide-react";
import { mockClients } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

const tagColors: Record<string, string> = {
    vip: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    frecuente: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
    moroso: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function ClientesPage() {
    const [search, setSearch] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const filtered = mockClients.filter((c) => {
        const matchSearch =
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.phone.includes(search) ||
            c.email.toLowerCase().includes(search.toLowerCase());
        const matchTag = selectedTag ? c.tags.includes(selectedTag) : true;
        return matchSearch && matchTag;
    });

    return (
        <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-sm text-slate-500 dark:text-slate-400">{mockClients.length} clientes registrados</p>
                <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium self-start sm:self-auto">
                    <Plus size={15} /> Nuevo cliente
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: "Total clientes", value: mockClients.length, color: "text-sky-600 dark:text-sky-400" },
                    { label: "VIP", value: mockClients.filter(c => c.tags.includes("vip")).length, color: "text-amber-600 dark:text-amber-400" },
                    { label: "Frecuentes", value: mockClients.filter(c => c.tags.includes("frecuente")).length, color: "text-emerald-600 dark:text-emerald-400" },
                    { label: "Activos este mes", value: 4, color: "text-purple-600 dark:text-purple-400" },
                ].map((s) => (
                    <div key={s.label} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                        <p className="text-xs text-slate-400 mb-1">{s.label}</p>
                        <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2">
                    <Search size={16} className="text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por nombre, teléfono o email..."
                        className="flex-1 text-sm bg-transparent text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none"
                    />
                </div>
                <div className="flex items-center gap-2">
                    {["vip", "frecuente"].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                            className={cn("badge cursor-pointer", selectedTag === tag ? tagColors[tag] : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400")}
                        >
                            {tag === "vip" ? "⭐ VIP" : "🔁 Frecuente"}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full data-table">
                        <thead>
                            <tr>
                                <th>Cliente</th><th>Contacto</th><th>Mascotas</th>
                                <th>Última visita</th><th>Total gastado</th><th>Puntos</th><th>Tags</th><th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((client) => (
                                <tr key={client.id} className="cursor-pointer">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                {client.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">{client.name}</p>
                                                <p className="text-xs text-slate-400">{client.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                            <Phone size={11} />{client.phone}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1 text-sm text-slate-700 dark:text-slate-300">
                                            <PawPrint size={13} className="text-slate-400" />{client.pets}
                                        </div>
                                    </td>
                                    <td className="text-sm text-slate-500 dark:text-slate-400">
                                        {new Date(client.lastVisit).toLocaleDateString("es-AR")}
                                    </td>
                                    <td className="font-medium text-slate-800 dark:text-slate-200 text-sm">{formatCurrency(client.totalSpent)}</td>
                                    <td>
                                        <div className="flex items-center gap-1 text-sm">
                                            <Star size={13} className="text-amber-400" />
                                            <span className="text-slate-700 dark:text-slate-300">{client.points}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-wrap gap-1">
                                            {client.tags.map((tag) => (
                                                <span key={tag} className={cn("badge text-xs", tagColors[tag])}>{tag}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                                            <ChevronRight size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
