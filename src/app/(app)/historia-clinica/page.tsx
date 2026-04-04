"use client";

import { useState } from "react";
import { Plus, Search, FileText, Paperclip, Syringe, Pill } from "lucide-react";
import { mockMedicalRecords, mockPets, mockClients, speciesEmoji } from "@/lib/data";
import { cn, formatDate } from "@/lib/utils";

type MedicalRecord = typeof mockMedicalRecords[0] | null;

export default function HistoriaClinicaPage() {
    const [selectedPet, setSelectedPet] = useState(mockPets[0]);
    const [activeRecord, setActiveRecord] = useState<MedicalRecord>(mockMedicalRecords[0]);
    const [addingNew, setAddingNew] = useState(false);

    const petClient = mockClients.find((c) => c.id === selectedPet.clientId);
    const petRecords = mockMedicalRecords.filter((r) => r.petId === selectedPet.id);

    const handleSelectPet = (pet: typeof mockPets[0]) => {
        setSelectedPet(pet);
        // Correctly null-out record when pet has no records
        const firstRecord = mockMedicalRecords.find((r) => r.petId === pet.id) ?? null;
        setActiveRecord(firstRecord);
        setAddingNew(false);
    };

    return (
        <div className="flex gap-5 h-[calc(100vh-9rem)]">
            {/* Left panel: patient selector */}
            <div className="w-64 flex-shrink-0 flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-2.5 py-2 rounded-lg">
                        <Search size={13} className="text-slate-400" />
                        <input type="text" placeholder="Buscar paciente..." className="flex-1 bg-transparent text-xs text-slate-600 dark:text-slate-300 placeholder-slate-400 outline-none" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto py-1">
                    {mockPets.map((pet) => {
                        const client = mockClients.find((c) => c.id === pet.clientId);
                        return (
                            <button
                                key={pet.id}
                                onClick={() => handleSelectPet(pet)}
                                className={cn(
                                    "w-full text-left flex items-center gap-2.5 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors",
                                    selectedPet.id === pet.id && "bg-sky-50 dark:bg-sky-900/20"
                                )}
                            >
                                <span className="text-xl">{speciesEmoji[pet.species]}</span>
                                <div className="min-w-0">
                                    <p className={cn("text-sm font-semibold truncate", selectedPet.id === pet.id ? "text-sky-600 dark:text-sky-400" : "text-slate-800 dark:text-slate-200")}>{pet.name}</p>
                                    <p className="text-xs text-slate-400 truncate">{client?.name}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Center: record list */}
            <div className="w-56 flex-shrink-0 flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Historial</h3>
                    <button onClick={() => setAddingNew(true)} className="w-7 h-7 bg-sky-500 hover:bg-sky-600 rounded-lg flex items-center justify-center text-white">
                        <Plus size={14} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {petRecords.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs text-center px-4">
                            <FileText size={28} className="mb-2 opacity-40" />
                            Sin registros
                        </div>
                    ) : (
                        petRecords.map((record) => (
                            <button
                                key={record.id}
                                onClick={() => { setActiveRecord(record); setAddingNew(false); }}
                                className={cn(
                                    "w-full text-left px-4 py-3 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors",
                                    activeRecord?.id === record.id && "bg-sky-50 dark:bg-sky-900/20 border-l-2 border-sky-400"
                                )}
                            >
                                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{formatDate(record.date)}</p>
                                <p className="text-xs text-slate-400 mt-0.5 truncate">{record.reason}</p>
                                <p className="text-xs text-slate-300 dark:text-slate-500 mt-0.5">{record.vet}</p>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Right: record detail / form */}
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-sky-50 to-transparent dark:from-sky-900/10 dark:to-transparent">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl">
                            {speciesEmoji[selectedPet.species]}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{selectedPet.name}</h2>
                            <p className="text-xs text-slate-400">{selectedPet.breed} · {selectedPet.weight}kg · {selectedPet.sex === "M" ? "Macho" : "Hembra"} · {selectedPet.isNeutered ? "Castrado" : "Entero"}</p>
                            <p className="text-xs text-sky-500 dark:text-sky-400">Propietario: {petClient?.name} · {petClient?.phone}</p>
                        </div>
                    </div>
                    <button onClick={() => setAddingNew(true)} className="flex items-center gap-1.5 text-sm font-medium bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded-lg">
                        <Plus size={14} /> Nueva consulta
                    </button>
                </div>

                {addingNew ? (
                    <div className="flex-1 overflow-y-auto p-6">
                        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-5">Nueva consulta — {selectedPet.name}</h3>
                        <div className="space-y-5">
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { label: "Peso (kg)", placeholder: "0.0", type: "number", step: "0.1" },
                                    { label: "Temperatura (°C)", placeholder: "38.5", type: "number", step: "0.1" },
                                    { label: "Frec. Cardíaca", placeholder: "80", type: "number" },
                                ].map(({ label, placeholder, type, step }) => (
                                    <div key={label}>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
                                        <input type={type} step={step} placeholder={placeholder} className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-sky-500" />
                                    </div>
                                ))}
                            </div>
                            {[
                                { label: "Motivo de consulta", rows: 2 },
                                { label: "Anamnesis", rows: 2 },
                                { label: "Examen físico", rows: 3 },
                                { label: "Diagnóstico", rows: 2 },
                                { label: "Tratamiento", rows: 3 },
                                { label: "Observaciones", rows: 2 },
                            ].map(({ label, rows }) => (
                                <div key={label}>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
                                    <textarea rows={rows} placeholder={`${label}...`} className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-sky-500 resize-none" />
                                </div>
                            ))}
                            <div className="flex items-center gap-3 pt-2">
                                <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"><Paperclip size={14} /> Adjuntar</button>
                                <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"><Syringe size={14} /> Vacuna</button>
                                <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"><Pill size={14} /> Receta</button>
                                <div className="flex-1" />
                                <button onClick={() => setAddingNew(false)} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">Cancelar</button>
                                <button className="px-5 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg">Finalizar consulta</button>
                            </div>
                        </div>
                    </div>
                ) : activeRecord ? (
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">{activeRecord.reason}</h3>
                                <p className="text-xs text-slate-400 mt-0.5">{formatDate(activeRecord.date)} · {activeRecord.vet}</p>
                            </div>
                            <div className="flex items-center gap-3 text-xs">
                                {[
                                    { icon: "🏋️", value: `${activeRecord.weight}kg` },
                                    { icon: "🌡️", value: `${activeRecord.temp}°C` },
                                    { icon: "❤️", value: `${activeRecord.heartRate}bpm` },
                                ].map(({ icon, value }) => (
                                    <div key={value} className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg">
                                        <span className="text-slate-400">{icon}</span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-200">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: "Diagnóstico", value: activeRecord.diagnosis, color: "border-sky-400 bg-sky-50 dark:bg-sky-900/10" },
                                { label: "Tratamiento", value: activeRecord.treatment, color: "border-emerald-400 bg-emerald-50 dark:bg-emerald-900/10" },
                                { label: "Observaciones", value: activeRecord.notes, color: "border-slate-300 bg-slate-50 dark:bg-slate-800/50" },
                            ].map(({ label, value, color }) => (
                                <div key={label} className={cn("rounded-xl p-4 border-l-4", color)}>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{label}</p>
                                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2">
                        <FileText size={32} className="opacity-30" />
                        <p className="text-sm">Sin registros para este paciente</p>
                        <button onClick={() => setAddingNew(true)} className="text-xs text-sky-500 hover:text-sky-600 font-medium">+ Nueva consulta</button>
                    </div>
                )}
            </div>
        </div>
    );
}
