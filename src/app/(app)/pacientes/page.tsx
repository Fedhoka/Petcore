"use client";

import { useState } from "react";
import { Plus, Search, Syringe, Clock, ChevronRight } from "lucide-react";
import { mockPets, mockClients, speciesEmoji, speciesLabel } from "@/lib/data";
import { cn, calculateAge } from "@/lib/utils";

export default function PacientesPage() {
    const [search, setSearch] = useState("");
    const [speciesFilter, setSpeciesFilter] = useState<string | null>(null);

    const filtered = mockPets.filter((p) => {
        const client = mockClients.find((c) => c.id === p.clientId);
        const matchSearch =
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            client?.name.toLowerCase().includes(search.toLowerCase()) ||
            p.breed.toLowerCase().includes(search.toLowerCase());
        const matchSpecies = speciesFilter ? p.species === speciesFilter : true;
        return matchSearch && matchSpecies;
    });

    const daysUntil = (dateStr: string) => {
        const d = new Date(dateStr);
        const now = new Date();
        return Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-sm text-slate-500 dark:text-slate-400">{mockPets.length} pacientes registrados</p>
                <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium self-start">
                    <Plus size={15} /> Nueva mascota
                </button>
            </div>

            {/* Species filter cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["dog", "cat", "rabbit", "bird"].map((sp) => {
                    const count = mockPets.filter((p) => p.species === sp).length;
                    return (
                        <button
                            key={sp}
                            onClick={() => setSpeciesFilter(speciesFilter === sp ? null : sp)}
                            className={cn(
                                "bg-white dark:bg-slate-900 rounded-xl p-4 border text-left transition-all",
                                speciesFilter === sp
                                    ? "border-sky-400 dark:border-sky-500 ring-1 ring-sky-400"
                                    : "border-slate-200 dark:border-slate-800 hover:border-sky-300"
                            )}
                        >
                            <p className="text-2xl mb-1">{speciesEmoji[sp]}</p>
                            <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{count}</p>
                            <p className="text-xs text-slate-400">{speciesLabel[sp]}s</p>
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2">
                <Search size={16} className="text-slate-400" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nombre, propietario o raza..."
                    className="flex-1 text-sm bg-transparent text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((pet) => {
                    const client = mockClients.find((c) => c.id === pet.clientId);
                    const vaccDays = daysUntil(pet.nextVaccine);
                    const dewDays = daysUntil(pet.nextDeworming);

                    return (
                        <div key={pet.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 card-hover cursor-pointer">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl">
                                        {speciesEmoji[pet.species] || "🐾"}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">{pet.name}</h3>
                                        <p className="text-xs text-slate-400">{pet.breed}</p>
                                    </div>
                                </div>
                                <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 rounded-full">
                                    {pet.sex === "M" ? "♂" : "♀"} · {pet.isNeutered ? "Castrado" : "Entero"}
                                </span>
                            </div>

                            <div className="space-y-2 mb-4">
                                {[
                                    { label: "Propietario", value: client?.name },
                                    { label: "Edad", value: calculateAge(pet.birthDate) },
                                    { label: "Peso", value: `${pet.weight} kg` },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex items-center justify-between text-sm">
                                        <span className="text-slate-400">{label}</span>
                                        <span className="font-medium text-slate-700 dark:text-slate-200">{value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2">
                                {[
                                    { icon: Syringe, label: "Próxima vacuna", days: vaccDays },
                                    { icon: Clock, label: "Desparasitación", days: dewDays },
                                ].map(({ icon: Icon, label, days }) => (
                                    <div key={label} className={cn(
                                        "flex items-center justify-between text-xs rounded-lg px-2.5 py-1.5",
                                        days <= 7 ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                                            : days <= 30 ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                                                : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                    )}>
                                        <div className="flex items-center gap-1.5">
                                            <Icon size={12} />{label}
                                        </div>
                                        <span className="font-semibold">{days <= 0 ? "VENCIDA" : `${days}d`}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="mt-3 w-full flex items-center justify-center gap-1 text-xs text-sky-500 hover:text-sky-600 font-medium py-1">
                                Ver historia clínica <ChevronRight size={13} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
