"use client";

import { useState } from "react";
import { Plus, Send, Clock, CheckCircle } from "lucide-react";
import { mockVaccinationAlerts } from "@/lib/data";
import { cn, formatDate } from "@/lib/utils";

const vaccineSchedule = [
    { name: "Óctuple canina", species: "dog", frequency: "Anual" },
    { name: "Antirrábica", species: "dog", frequency: "Anual" },
    { name: "Triple felina", species: "cat", frequency: "Anual" },
    { name: "Leucemia felina", species: "cat", frequency: "Anual" },
    { name: "Desparasitación interna", species: "both", frequency: "Trimestral" },
    { name: "Desparasitación externa", species: "both", frequency: "Mensual" },
];

const allVaccinations = [
    { id: "1", petName: "Luna", clientName: "María García", vaccine: "Óctuple canina", appliedDate: "2025-03-15", nextDate: "2026-03-15", vet: "Dr. García", reminderSent: true },
    { id: "2", petName: "Max", clientName: "Carlos Rodríguez", vaccine: "Antirrábica", appliedDate: "2025-03-25", nextDate: "2026-03-25", vet: "Dr. García", reminderSent: false },
    { id: "3", petName: "Luna", clientName: "María García", vaccine: "Antirrábica", appliedDate: "2025-04-01", nextDate: "2026-04-01", vet: "Dra. Pérez", reminderSent: false },
    { id: "4", petName: "Nala", clientName: "Lucía Martínez", vaccine: "Triple felina", appliedDate: "2025-05-20", nextDate: "2026-05-20", vet: "Dr. García", reminderSent: false },
    { id: "5", petName: "Rocky", clientName: "Valentina López", vaccine: "Óctuple canina", appliedDate: "2025-04-12", nextDate: "2026-04-12", vet: "Dr. García", reminderSent: false },
];

export default function VacunasPage() {
    const [activeTab, setActiveTab] = useState<"alerts" | "history" | "schedule">("alerts");

    return (
        <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex gap-2">
                    {(["alerts", "history", "schedule"] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setActiveTab(t)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                activeTab === t
                                    ? "bg-sky-500 text-white"
                                    : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-sky-300"
                            )}
                        >
                            {t === "alerts" ? "⚠️ Alertas" : t === "history" ? "📋 Historial" : "📅 Calendario"}
                        </button>
                    ))}
                </div>
                <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium self-start">
                    <Plus size={15} /> Registrar vacuna
                </button>
            </div>

            {/* KPI strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: "Vencidas", value: 0, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
                    { label: "Próximas 7 días", value: 1, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
                    { label: "Próximas 30 días", value: 3, color: "text-sky-600", bg: "bg-sky-50 dark:bg-sky-900/20" },
                    { label: "Recordatorios hoy", value: 2, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                ].map((k) => (
                    <div key={k.label} className={cn("rounded-xl p-4 border border-transparent", k.bg)}>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{k.label}</p>
                        <p className={cn("text-2xl font-bold", k.color)}>{k.value}</p>
                    </div>
                ))}
            </div>

            {activeTab === "alerts" && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="font-semibold text-slate-900 dark:text-white">Vacunas próximas a vencer</h3>
                        <button className="flex items-center gap-1.5 text-xs text-sky-500 hover:text-sky-600 font-medium border border-sky-200 dark:border-sky-700 px-3 py-1.5 rounded-lg">
                            <Send size={12} /> Enviar todos los recordatorios
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full data-table">
                            <thead>
                                <tr><th>Paciente</th><th>Propietario</th><th>Vacuna</th><th>Vence</th><th>Días</th><th>Estado</th><th>Acción</th></tr>
                            </thead>
                            <tbody>
                                {mockVaccinationAlerts.map((alert, i) => {
                                    const days = alert.daysLeft;
                                    const urgency = days <= 0 ? "vencida" : days <= 7 ? "urgente" : days <= 30 ? "próxima" : "ok";
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xl">🐕</span>
                                                    <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">{alert.petName}</span>
                                                </div>
                                            </td>
                                            <td className="text-slate-500 dark:text-slate-400 text-sm">{alert.clientName}</td>
                                            <td className="text-slate-700 dark:text-slate-300 text-sm">{alert.vaccine}</td>
                                            <td className="text-slate-500 dark:text-slate-400 text-sm">{formatDate(alert.dueDate)}</td>
                                            <td>
                                                <span className={cn("font-bold text-sm",
                                                    urgency === "vencida" ? "text-red-500" :
                                                    urgency === "urgente" ? "text-amber-500" : "text-sky-500"
                                                )}>
                                                    {days <= 0 ? "VENCIDA" : `${days}d`}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={cn("badge text-xs", {
                                                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400": urgency === "vencida",
                                                    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400": urgency === "urgente",
                                                    "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400": urgency === "próxima",
                                                })}>
                                                    {urgency === "vencida" ? "⛔ Vencida" : urgency === "urgente" ? "⚠️ Urgente" : "📅 Próxima"}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="flex items-center gap-1 text-xs text-sky-500 hover:text-sky-600 font-medium bg-sky-50 dark:bg-sky-900/20 px-2.5 py-1 rounded-lg">
                                                    <Send size={11} /> WhatsApp
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === "history" && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="font-semibold text-slate-900 dark:text-white">Historial de vacunaciones</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full data-table">
                            <thead>
                                <tr><th>Paciente</th><th>Propietario</th><th>Vacuna</th><th>Aplicada</th><th>Próxima</th><th>Veterinario</th><th>Recordatorio</th></tr>
                            </thead>
                            <tbody>
                                {allVaccinations.map((v) => (
                                    <tr key={v.id}>
                                        <td className="font-medium text-slate-800 dark:text-slate-200 text-sm">{v.petName}</td>
                                        <td className="text-slate-500 dark:text-slate-400 text-sm">{v.clientName}</td>
                                        <td className="text-slate-700 dark:text-slate-300 text-sm">{v.vaccine}</td>
                                        <td className="text-slate-500 dark:text-slate-400 text-sm">{formatDate(v.appliedDate)}</td>
                                        <td className="text-slate-500 dark:text-slate-400 text-sm">{formatDate(v.nextDate)}</td>
                                        <td className="text-slate-400 text-sm">{v.vet}</td>
                                        <td>
                                            {v.reminderSent
                                                ? <span className="flex items-center gap-1 text-xs text-emerald-600"><CheckCircle size={12} /> Enviado</span>
                                                : <span className="flex items-center gap-1 text-xs text-slate-400"><Clock size={12} /> Pendiente</span>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === "schedule" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vaccineSchedule.map((v) => (
                        <div key={v.name} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
                            <div className="flex items-start justify-between mb-3">
                                <span className="text-2xl">{v.species === "dog" ? "🐕" : v.species === "cat" ? "🐈" : "🐾"}</span>
                                <span className="text-xs bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 px-2 py-1 rounded-full font-medium">{v.frequency}</span>
                            </div>
                            <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{v.name}</h3>
                            <p className="text-xs text-slate-400 mt-1 capitalize">
                                {v.species === "both" ? "Perros y Gatos" : v.species === "dog" ? "Perros" : "Gatos"}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
