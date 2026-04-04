"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import { mockAppointments, statusColors, statusLabels } from "@/lib/data";
import { cn } from "@/lib/utils";

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8am to 7pm

const vets = ["Todos", "Dr. García", "Dra. Pérez"];

const days = [
    { label: "Lun 18", date: "2026-03-18" },
    { label: "Mar 19", date: "2026-03-19" },
    { label: "Mié 20", date: "2026-03-20" },
    { label: "Jue 21", date: "2026-03-21" },
    { label: "Vie 22", date: "2026-03-22" },
    { label: "Sáb 23", date: "2026-03-23" },
];

const newApptInit = { petName: "", clientName: "", service: "", vetName: "Dr. García", time: "09:00", date: "2026-03-21" };

export default function AgendaPage() {
    const [selectedDay, setSelectedDay] = useState("2026-03-21");
    const [selectedVet, setSelectedVet] = useState("Todos");
    const [showModal, setShowModal] = useState(false);
    const [newAppt, setNewAppt] = useState(newApptInit);

    const filtered = mockAppointments.filter((a) => {
        const matchDay = a.startAt.startsWith(selectedDay);
        const matchVet = selectedVet === "Todos" || a.vetName === selectedVet;
        return matchDay && matchVet;
    });

    const getApptForHour = (hour: number) =>
        filtered.filter((a) => {
            const h = parseInt(a.startAt.split("T")[1].split(":")[0]);
            return h === hour;
        });

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    {vets.map((v) => (
                        <button
                            key={v}
                            onClick={() => setSelectedVet(v)}
                            className={cn(
                                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                                selectedVet === v
                                    ? "bg-sky-500 text-white"
                                    : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-sky-300"
                            )}
                        >
                            {v}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium self-start"
                >
                    <Plus size={15} /> Nuevo turno
                </button>
            </div>

            {/* Day selector */}
            <div className="flex gap-2 overflow-x-auto pb-1">
                {days.map((d) => (
                    <button
                        key={d.date}
                        onClick={() => setSelectedDay(d.date)}
                        className={cn(
                            "flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium border transition-all",
                            selectedDay === d.date
                                ? "bg-sky-500 text-white border-sky-500"
                                : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-sky-300"
                        )}
                    >
                        {d.label}
                    </button>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="grid" style={{ gridTemplateColumns: "64px 1fr" }}>
                    {HOURS.map((hour) => {
                        const appts = getApptForHour(hour);
                        return [
                            /* Hour label */
                            <div
                                key={`h-${hour}`}
                                className="border-b border-r border-slate-100 dark:border-slate-800 px-3 py-3 text-xs font-mono text-slate-400 text-right flex-shrink-0"
                            >
                                {hour}:00
                            </div>,
                            /* Slot */
                            <div
                                key={`s-${hour}`}
                                className="border-b border-slate-100 dark:border-slate-800 min-h-[56px] p-2 flex flex-wrap gap-2"
                            >
                                {appts.map((appt) => (
                                    <div
                                        key={appt.id}
                                        className="flex items-start gap-2 rounded-lg px-3 py-2 text-white text-xs font-medium flex-shrink-0 max-w-xs"
                                        style={{ backgroundColor: appt.color + "dd" }}
                                    >
                                        <div className="min-w-0">
                                            <p className="font-semibold truncate">{appt.petName} · {appt.clientName}</p>
                                            <p className="opacity-90 truncate">{appt.service}</p>
                                            <div className="flex items-center gap-1 mt-0.5 opacity-80">
                                                <Clock size={10} />
                                                {appt.startAt.split("T")[1].slice(0, 5)} — {appt.endAt.split("T")[1].slice(0, 5)}
                                                <span className="mx-1">·</span>
                                                <User size={10} />
                                                {appt.vetName}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>,
                        ];
                    })}
                </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: "Total turnos", value: filtered.length, color: "text-sky-600 dark:text-sky-400" },
                    { label: "Confirmados", value: filtered.filter(a => a.status === "confirmed").length, color: "text-emerald-600 dark:text-emerald-400" },
                    { label: "En atención", value: filtered.filter(a => a.status === "in_progress").length, color: "text-amber-600 dark:text-amber-400" },
                    { label: "Programados", value: filtered.filter(a => a.status === "scheduled").length, color: "text-slate-600 dark:text-slate-300" },
                ].map((k) => (
                    <div key={k.label} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 text-center">
                        <p className="text-xs text-slate-400 mb-1">{k.label}</p>
                        <p className={cn("text-2xl font-bold", k.color)}>{k.value}</p>
                    </div>
                ))}
            </div>

            {/* New appointment modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in p-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Nuevo turno</h2>
                        <div className="space-y-4">
                            {[
                                { label: "Nombre del paciente", key: "petName", placeholder: "Ej: Luna" },
                                { label: "Propietario", key: "clientName", placeholder: "Ej: María García" },
                                { label: "Servicio", key: "service", placeholder: "Ej: Vacunación anual" },
                            ].map(({ label, key, placeholder }) => (
                                <div key={key}>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
                                    <input
                                        type="text"
                                        placeholder={placeholder}
                                        value={(newAppt as any)[key]}
                                        onChange={(e) => setNewAppt({ ...newAppt, [key]: e.target.value })}
                                        className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                            ))}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Fecha</label>
                                    <input
                                        type="date"
                                        value={newAppt.date}
                                        onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
                                        className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Hora</label>
                                    <input
                                        type="time"
                                        value={newAppt.time}
                                        onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
                                        className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-sky-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Veterinario</label>
                                <select
                                    value={newAppt.vetName}
                                    onChange={(e) => setNewAppt({ ...newAppt, vetName: e.target.value })}
                                    className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-sky-500"
                                >
                                    <option>Dr. García</option>
                                    <option>Dra. Pérez</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => { setShowModal(false); setNewAppt(newApptInit); }} className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">Cancelar</button>
                            <button onClick={() => { setShowModal(false); setNewAppt(newApptInit); }} className="flex-1 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm font-semibold">Guardar turno</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
