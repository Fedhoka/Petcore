"use client";

import type { ElementType } from "react";
import { Megaphone, Send, Mail, MessageSquare, Plus, Eye, MousePointer } from "lucide-react";
import { cn } from "@/lib/utils";

const campaigns = [
    { id: "1", name: "Recordatorio vacuna antirrábica Marzo", channel: "whatsapp", status: "sent", sent: 23, opened: 19, clicked: 12, date: "2026-03-21" },
    { id: "2", name: "Promo Bravecto verano", channel: "email", status: "sent", sent: 89, opened: 54, clicked: 23, date: "2026-03-15" },
    { id: "3", name: "Cumpleaños de mascotas — Marzo", channel: "whatsapp", status: "sent", sent: 7, opened: 7, clicked: 5, date: "2026-03-01" },
    { id: "4", name: "Newsletter mensual Royal Canin", channel: "email", status: "draft", sent: 0, opened: 0, clicked: 0, date: "" },
    { id: "5", name: "Descuento Día del Animal", channel: "whatsapp", status: "scheduled", sent: 0, opened: 0, clicked: 0, date: "2026-04-29" },
];

const templates = [
    { id: "1", name: "🎂 Cumpleaños de mascota", desc: "Mensaje automático el día del cumpleaños con cupón", type: "automatic" },
    { id: "2", name: "💉 Vacuna próxima", desc: "Recordatorio 7 días antes con link de turno", type: "automatic" },
    { id: "3", name: "🔄 Post-consulta", desc: "Seguimiento 24h después de la visita", type: "automatic" },
    { id: "4", name: "🎁 Promoción estacional", desc: "Template genérico para promociones", type: "manual" },
    { id: "5", name: "📣 Newsletter mensual", desc: "Novedades, tips y productos destacados", type: "manual" },
];

const channelMeta: Record<string, { label: string; color: string; icon: ElementType }> = {
    whatsapp: { label: "WhatsApp", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", icon: MessageSquare },
    email: { label: "Email", color: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400", icon: Mail },
};

const statusColor: Record<string, string> = {
    sent: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    draft: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    scheduled: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};
const statusLabel: Record<string, string> = { sent: "Enviada", draft: "Borrador", scheduled: "Programada" };

export default function CampanasPage() {
    return (
        <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-sm text-slate-500 dark:text-slate-400">Marketing automatizado y campañas manuales</p>
                <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium self-start">
                    <Plus size={15} /> Nueva campaña
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: "Mensajes enviados", value: "129", sub: "este mes", icon: Send, color: "text-sky-500" },
                    { label: "Tasa de apertura", value: "84%", sub: "WhatsApp promedio", icon: Eye, color: "text-emerald-500" },
                    { label: "Clics", value: "40", sub: "en enlaces", icon: MousePointer, color: "text-purple-500" },
                    { label: "Automáticas activas", value: "3", sub: "campañas", icon: Megaphone, color: "text-amber-500" },
                ].map((k) => (
                    <div key={k.label} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-slate-400">{k.label}</p>
                            <k.icon size={15} className={k.color} />
                        </div>
                        <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{k.value}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{k.sub}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Campañas</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full data-table">
                        <thead><tr><th>Campaña</th><th>Canal</th><th>Estado</th><th>Enviados</th><th>Abiertos</th><th>Clics</th><th>Fecha</th><th></th></tr></thead>
                        <tbody>
                            {campaigns.map((c) => {
                                const ch = channelMeta[c.channel];
                                return (
                                    <tr key={c.id}>
                                        <td className="font-medium text-slate-800 dark:text-slate-200 text-sm max-w-[220px] truncate">{c.name}</td>
                                        <td>
                                            <span className={cn("badge text-xs flex items-center gap-1 w-fit", ch.color)}>
                                                <ch.icon size={10} />{ch.label}
                                            </span>
                                        </td>
                                        <td><span className={cn("badge text-xs", statusColor[c.status])}>{statusLabel[c.status]}</span></td>
                                        <td className="text-slate-600 dark:text-slate-300 text-sm font-medium">{c.sent || "—"}</td>
                                        <td>{c.sent > 0 ? <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">{Math.round((c.opened / c.sent) * 100)}%</span> : "—"}</td>
                                        <td>{c.sent > 0 ? <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">{Math.round((c.clicked / c.sent) * 100)}%</span> : "—"}</td>
                                        <td className="text-slate-400 text-sm">{c.date || "—"}</td>
                                        <td><button className="text-xs text-sky-500 hover:text-sky-600 font-medium">{c.status === "draft" ? "Editar" : "Ver"}</button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Plantillas disponibles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {templates.map((t) => (
                        <div key={t.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-start gap-3 hover:border-sky-300 transition-colors cursor-pointer">
                            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base", t.type === "automatic" ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-sky-50 dark:bg-sky-900/20")}>
                                {t.name.split(" ")[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">{t.name.slice(2)}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{t.desc}</p>
                                <span className={cn("badge text-xs mt-2", t.type === "automatic" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400")}>
                                    {t.type === "automatic" ? "🤖 Automática" : "✉️ Manual"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
