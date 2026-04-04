"use client";

import { useState } from "react";
import { Search, Plus, Minus, Trash2, ShoppingCart, CheckCircle, User } from "lucide-react";
import { mockProducts, mockClients } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

type CartItem = { id: string; name: string; price: number; qty: number };

const categories = ["Todos", "Alimentos", "Antiparasitarios", "Medicamentos", "Servicios"];

const payMethods = [
    { id: "cash", label: "💵 Efectivo" },
    { id: "card_debit", label: "💳 Débito" },
    { id: "card_credit", label: "💳 Crédito" },
    { id: "mercadopago", label: "📱 MercadoPago" },
    { id: "transfer", label: "🏦 Transferencia" },
];

export default function POSPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Todos");
    const [selectedClient, setSelectedClient] = useState<string>("");
    const [payMethod, setPayMethod] = useState("cash");
    const [discount, setDiscount] = useState(0);
    const [completed, setCompleted] = useState(false);

    const filtered = mockProducts.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === "Todos" || p.category === category;
        const hasStock = p.stock > 0;
        return matchSearch && matchCat && hasStock;
    });

    const addToCart = (product: typeof mockProducts[0]) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === product.id);
            if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
        });
    };

    const updateQty = (id: string, delta: number) => {
        setCart((prev) =>
            prev.map((i) => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
                .filter((i) => i.qty > 0)
        );
    };

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal - discountAmount;

    const handleComplete = () => {
        if (cart.length === 0) return;
        setCompleted(true);
        setTimeout(() => {
            setCart([]);
            setSelectedClient("");
            setDiscount(0);
            setPayMethod("cash");
            setCompleted(false);
        }, 2500);
    };

    return (
        <div className="flex gap-5 h-[calc(100vh-9rem)]">
            {/* Left: Product grid */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Search and filters */}
                <div className="flex flex-col gap-3 mb-4">
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5">
                        <Search size={16} className="text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar producto o servicio..."
                            className="flex-1 text-sm bg-transparent text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setCategory(c)}
                                className={cn(
                                    "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                                    category === c
                                        ? "bg-sky-500 text-white"
                                        : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-sky-300"
                                )}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products */}
                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {filtered.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => addToCart(product)}
                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-left hover:border-sky-400 hover:shadow-md transition-all group"
                            >
                                <div className="text-2xl mb-2">
                                    {product.category === "Alimentos" ? "🍖"
                                        : product.category === "Antiparasitarios" ? "💊"
                                            : product.category === "Servicios" ? "🩺"
                                                : product.category === "Medicamentos" ? "💉"
                                                    : "📦"}
                                </div>
                                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug line-clamp-2 mb-2">{product.name}</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-bold text-sky-600 dark:text-sky-400">{formatCurrency(product.price)}</p>
                                    {product.category !== "Servicios" && (
                                        <span className="text-xs text-slate-400">{product.stock} u.</span>
                                    )}
                                </div>
                                <div className="mt-2 w-full flex items-center justify-center gap-1 text-xs text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plus size={12} /> Agregar
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right: Cart */}
            <div className="w-80 flex-shrink-0 flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                {/* Cart header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <ShoppingCart size={16} className="text-sky-500" />
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Ticket actual</h3>
                    </div>
                    <span className="text-xs text-slate-400">{cart.length} items</span>
                </div>

                {/* Client selector */}
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 flex items-center gap-1"><User size={11} /> Cliente (opcional)</label>
                    <select
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                        className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-sky-500"
                    >
                        <option value="">Consumidor Final</option>
                        {mockClients.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>

                {/* Cart items */}
                <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs gap-2">
                            <ShoppingCart size={28} className="opacity-30" />
                            Agregá productos al ticket
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-2 px-4 py-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">{item.name}</p>
                                    <p className="text-xs text-slate-400">{formatCurrency(item.price)} c/u</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700">
                                        <Minus size={11} />
                                    </button>
                                    <span className="w-6 text-center text-sm font-bold text-slate-800 dark:text-slate-200">{item.qty}</span>
                                    <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700">
                                        <Plus size={11} />
                                    </button>
                                </div>
                                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 w-16 text-right">{formatCurrency(item.price * item.qty)}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Totals & payment */}
                <div className="border-t border-slate-100 dark:border-slate-800 p-4 space-y-3">
                    {/* Discount */}
                    <div className="flex items-center gap-2">
                        <label className="text-xs text-slate-400 flex-shrink-0">Descuento</label>
                        <div className="flex items-center gap-1 flex-1">
                            <input
                                type="number"
                                min={0}
                                max={100}
                                value={discount}
                                onChange={(e) => setDiscount(Math.min(100, Math.max(0, Number(e.target.value))))}
                                className="w-16 text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none text-center"
                            />
                            <span className="text-sm text-slate-400">%</span>
                            {discount > 0 && <span className="text-xs text-red-500 font-medium ml-1">-{formatCurrency(discountAmount)}</span>}
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center py-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Total</span>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(total)}</span>
                    </div>

                    {/* Payment method */}
                    <div className="grid grid-cols-2 gap-1.5">
                        {payMethods.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setPayMethod(m.id)}
                                className={cn(
                                    "py-2 rounded-lg text-xs font-medium transition-all text-center",
                                    payMethod === m.id
                                        ? "bg-sky-500 text-white"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                )}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>

                    {/* Complete button */}
                    {completed ? (
                        <div className="w-full py-3 bg-emerald-500 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                            <CheckCircle size={16} /> ¡Venta completada!
                        </div>
                    ) : (
                        <button
                            onClick={handleComplete}
                            disabled={cart.length === 0}
                            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-all"
                        >
                            Cobrar {formatCurrency(total)}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
