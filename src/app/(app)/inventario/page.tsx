"use client";

import { useState } from "react";
import { Plus, Search, AlertTriangle, TrendingDown, Package, Edit2, ChevronUp, ChevronDown } from "lucide-react";
import { mockProducts } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

type SortKey = "name" | "stock" | "price";

const categoryEmoji: Record<string, string> = {
    Alimentos: "🍖",
    Antiparasitarios: "💊",
    Servicios: "🩺",
    Medicamentos: "💉",
};

// Moved outside component to avoid re-creation on every render
function SortIcon({ sortKey, currentKey, asc }: { sortKey: SortKey; currentKey: SortKey; asc: boolean }) {
    if (sortKey !== currentKey) return null;
    return asc ? <ChevronUp size={13} /> : <ChevronDown size={13} />;
}

export default function InventarioPage() {
    const [search, setSearch] = useState("");
    const [sortKey, setSortKey] = useState<SortKey>("name");
    const [sortAsc, setSortAsc] = useState(true);
    const [filterLow, setFilterLow] = useState(false);

    const sorted = [...mockProducts]
        .filter((p) => {
            const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.barcode.includes(search);
            const matchLow = filterLow ? p.stock <= p.minStock && p.category !== "Servicios" : true;
            return matchSearch && matchLow;
        })
        .sort((a, b) => {
            let cmp = 0;
            if (sortKey === "name") cmp = a.name.localeCompare(b.name);
            if (sortKey === "stock") cmp = a.stock - b.stock;
            if (sortKey === "price") cmp = a.price - b.price;
            return sortAsc ? cmp : -cmp;
        });

    const toggleSort = (key: SortKey) => {
        if (sortKey === key) setSortAsc(!sortAsc);
        else { setSortKey(key); setSortAsc(true); }
    };

    const lowStockProducts = mockProducts.filter(p => p.stock > 0 && p.stock <= p.minStock && p.category !== "Servicios");
    const outOfStock = mockProducts.filter(p => p.stock === 0 && p.category !== "Servicios");

    return (
        <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-sm text-slate-500 dark:text-slate-400">{mockProducts.length} productos registrados</p>
                <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium self-start">
                    <Plus size={15} /> Nuevo producto
                </button>
            </div>

            {/* Alert strip */}
            {(lowStockProducts.length > 0 || outOfStock.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {outOfStock.length > 0 && (
                        <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                            <div className="w-9 h-9 bg-red-100 dark:bg-red-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Package size={18} className="text-red-500" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-red-700 dark:text-red-400">{outOfStock.length} productos agotados</p>
                                <p className="text-xs text-red-500">{outOfStock.map(p => p.name.split(" ").slice(0, 2).join(" ")).join(", ")}</p>
                            </div>
                        </div>
                    )}
                    {lowStockProducts.length > 0 && (
                        <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3">
                            <div className="w-9 h-9 bg-amber-100 dark:bg-amber-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                                <AlertTriangle size={18} className="text-amber-500" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">{lowStockProducts.length} con stock bajo</p>
                                <p className="text-xs text-amber-600">{lowStockProducts.map(p => p.name.split(" ").slice(0, 2).join(" ")).join(", ")}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: "Total productos", value: mockProducts.length, color: "text-sky-600 dark:text-sky-400" },
                    { label: "Valor en stock", value: formatCurrency(mockProducts.reduce((s, p) => s + p.stock * p.cost, 0)), color: "text-emerald-600 dark:text-emerald-400", small: true },
                    { label: "Stock bajo", value: lowStockProducts.length, color: "text-amber-600 dark:text-amber-400" },
                    { label: "Agotados", value: outOfStock.length, color: "text-red-500" },
                ].map((k) => (
                    <div key={k.label} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                        <p className="text-xs text-slate-400 mb-1">{k.label}</p>
                        <p className={cn("font-bold", (k as any).small ? "text-lg" : "text-2xl", k.color)}>{k.value}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5">
                    <Search size={16} className="text-slate-400" />
                    <input
                        type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por nombre o código de barras..."
                        className="flex-1 text-sm bg-transparent text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none"
                    />
                </div>
                <button
                    onClick={() => setFilterLow(!filterLow)}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all",
                        filterLow ? "bg-amber-500 text-white border-amber-500" : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-amber-400"
                    )}
                >
                    <TrendingDown size={15} /> Stock bajo
                </button>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full data-table">
                        <thead>
                            <tr>
                                <th>
                                    <button onClick={() => toggleSort("name")} className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200">
                                        Producto <SortIcon sortKey={sortKey} currentKey="name" asc={sortAsc} />
                                    </button>
                                </th>
                                <th>Categoría</th>
                                <th>Código</th>
                                <th>
                                    <button onClick={() => toggleSort("price")} className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200">
                                        Precio <SortIcon sortKey={sortKey} currentKey="price" asc={sortAsc} />
                                    </button>
                                </th>
                                <th>Costo</th>
                                <th>
                                    <button onClick={() => toggleSort("stock")} className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200">
                                        Stock <SortIcon sortKey={sortKey} currentKey="stock" asc={sortAsc} />
                                    </button>
                                </th>
                                <th>Mín.</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sorted.map((product) => {
                                const stockStatus =
                                    product.category === "Servicios" ? "service" :
                                        product.stock === 0 ? "out" :
                                            product.stock <= product.minStock ? "low" : "ok";
                                return (
                                    <tr key={product.id}>
                                        <td>
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-xl">{categoryEmoji[product.category] || "📦"}</span>
                                                <div>
                                                    <p className="font-medium text-slate-800 dark:text-slate-200 text-sm leading-snug">{product.name}</p>
                                                    <p className="text-xs text-slate-400">{product.unit}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="font-mono text-xs text-slate-400">{product.barcode || "—"}</td>
                                        <td className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(product.price)}</td>
                                        <td className="text-slate-500 dark:text-slate-400 text-sm">{product.cost > 0 ? formatCurrency(product.cost) : "—"}</td>
                                        <td>
                                            <span className={cn("font-bold text-sm",
                                                stockStatus === "out" ? "text-red-500" :
                                                stockStatus === "low" ? "text-amber-500" :
                                                stockStatus === "service" ? "text-slate-400" :
                                                "text-emerald-600 dark:text-emerald-400"
                                            )}>
                                                {stockStatus === "service" ? "∞" : product.stock}
                                            </span>
                                        </td>
                                        <td className="text-slate-400 text-sm">{product.minStock > 0 ? product.minStock : "—"}</td>
                                        <td>
                                            <span className={cn("badge text-xs", {
                                                "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400": stockStatus === "ok",
                                                "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400": stockStatus === "low",
                                                "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400": stockStatus === "out",
                                                "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400": stockStatus === "service",
                                            })}>
                                                {stockStatus === "ok" ? "OK" : stockStatus === "low" ? "Stock bajo" : stockStatus === "out" ? "Agotado" : "Servicio"}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                                                <Edit2 size={14} />
                                            </button>
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
