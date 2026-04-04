"use client";

import { useState } from "react";
import { Building2, Users, Bell, CreditCard, Globe, Shield, Palette, ChevronRight, Save, Smartphone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
    { id: "negocio", label: "Mi negocio", icon: Building2 },
    { id: "usuarios", label: "Usuarios y roles", icon: Users },
    { id: "notificaciones", label: "Notificaciones", icon: Bell },
    { id: "facturacion", label: "Facturación fiscal", icon: CreditCard },
    { id: "integraciones", label: "Integraciones", icon: Globe },
    { id: "seguridad", label: "Seguridad", icon: Shield },
    { id: "apariencia", label: "Apariencia", icon: Palette },
];

const users = [
    { name: "Dr. Martín García", email: "admin@petcore.ar", role: "Administrador", avatar: "MG", active: true },
    { name: "Valeria López", email: "secretaria@petcore.ar", role: "Secretaria", avatar: "VL", active: true },
    { name: "Carlos Mostrador", email: "mostrador@petcore.ar", role: "Mostrador", avatar: "CM", active: true },
];

const roleColors: Record<string, string> = {
    "Administrador": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "Secretaria": "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
    "Mostrador": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

function InputField({ label, defaultValue, type = "text", placeholder }: { label: string; defaultValue?: string; type?: string; placeholder?: string }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">{label}</label>
            <input type={type} defaultValue={defaultValue} placeholder={placeholder} className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-sky-500" />
        </div>
    );
}

function ToggleRow({ label, sub, defaultOn = false }: { label: string; sub?: string; defaultOn?: boolean }) {
    const [on, setOn] = useState(defaultOn);
    return (
        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-b-0">
            <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{label}</p>
                {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
            </div>
            <button onClick={() => setOn(!on)} className={cn("w-11 h-6 rounded-full transition-colors flex items-center px-0.5", on ? "bg-sky-500" : "bg-slate-200 dark:bg-slate-700")}>
                <span className={cn("w-5 h-5 bg-white rounded-full shadow transition-transform", on ? "translate-x-5" : "translate-x-0")} />
            </button>
        </div>
    );
}

export default function ConfiguracionPage() {
    const [activeSection, setActiveSection] = useState("negocio");

    return (
        <div className="flex gap-5 min-h-[calc(100vh-9rem)]">
            <div className="w-56 flex-shrink-0">
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    {sections.map((s) => (
                        <button key={s.id} onClick={() => setActiveSection(s.id)}
                            className={cn("w-full flex items-center justify-between gap-2.5 px-4 py-3 text-sm font-medium border-b border-slate-100 dark:border-slate-800 last:border-b-0 transition-colors",
                                activeSection === s.id ? "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                            )}>
                            <div className="flex items-center gap-2.5"><s.icon size={16} />{s.label}</div>
                            <ChevronRight size={14} className="text-slate-300 dark:text-slate-600" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 min-w-0">
                {activeSection === "negocio" && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-5">Datos del negocio</h2>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <InputField label="Nombre del negocio" defaultValue="Clínica Veterinaria del Parque" />
                            <InputField label="Teléfono principal" defaultValue="11-4521-3890" />
                            <InputField label="Email de contacto" defaultValue="clinica@delparque.com.ar" />
                            <InputField label="WhatsApp Business" defaultValue="1145213890" />
                            <div className="col-span-2"><InputField label="Dirección" defaultValue="Av. Córdoba 4521, CABA, Argentina" /></div>
                            <InputField label="País" defaultValue="Argentina" />
                            <InputField label="Moneda" defaultValue="ARS — Peso Argentino" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Horarios de atención</label>
                            <div className="grid grid-cols-2 gap-3">
                                {["Lunes–Viernes", "Sábados", "Domingos"].map((d) => (
                                    <div key={d} className="flex items-center gap-2">
                                        <span className="text-xs text-slate-500 w-32">{d}</span>
                                        <input type="time" defaultValue="09:00" className="text-xs border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 outline-none" />
                                        <span className="text-xs text-slate-400">—</span>
                                        <input type="time" defaultValue={d === "Domingos" ? "13:00" : "19:00"} className="text-xs border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 outline-none" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium">
                            <Save size={15} /> Guardar cambios
                        </button>
                    </div>
                )}

                {activeSection === "usuarios" && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="text-base font-bold text-slate-900 dark:text-white">Usuarios del sistema</h2>
                            <button className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded-lg text-xs font-medium">+ Invitar usuario</button>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {users.map((u) => (
                                <div key={u.email} className="flex items-center gap-4 px-6 py-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{u.avatar}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{u.name}</p>
                                        <p className="text-xs text-slate-400">{u.email}</p>
                                    </div>
                                    <span className={cn("badge text-xs", roleColors[u.role] || "bg-slate-100 text-slate-500")}>{u.role}</span>
                                    <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />Activo
                                    </div>
                                    <button className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">Editar</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeSection === "notificaciones" && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-5">Configuración de notificaciones</h2>
                        <div className="mb-5">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5"><Smartphone size={12} /> WhatsApp</h3>
                            <ToggleRow label="Recordatorio de turno 24h antes" sub="Mensaje automático al propietario" defaultOn={true} />
                            <ToggleRow label="Confirmación/cancelación de turno" sub="El cliente puede responder SI o NO" defaultOn={true} />
                            <ToggleRow label="Recordatorio de vacunas próximas" sub="7 días antes del vencimiento" defaultOn={true} />
                            <ToggleRow label="Mensaje post-consulta" sub="24h después de la visita" defaultOn={false} />
                            <ToggleRow label="Cumpleaños de mascota" sub="Con cupón de descuento automático" defaultOn={true} />
                        </div>
                        <div className="mb-5">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5"><Mail size={12} /> Email</h3>
                            <ToggleRow label="Recordatorio de turno por email" defaultOn={true} />
                            <ToggleRow label="Resumen diario para el dueño" sub="Ventas, citas y alertas del día" defaultOn={true} />
                            <ToggleRow label="Alertas de stock bajo" defaultOn={true} />
                            <ToggleRow label="Factura electrónica por email" defaultOn={true} />
                        </div>
                        <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium">
                            <Save size={15} /> Guardar
                        </button>
                    </div>
                )}

                {(activeSection === "facturacion" || activeSection === "integraciones" || activeSection === "seguridad" || activeSection === "apariencia") && (
                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">{sections.find(s => s.id === activeSection)?.label}</h2>
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="text-5xl mb-3">🚧</div>
                            <p className="text-sm text-slate-400">Esta sección está disponible en el plan Pro</p>
                            <button className="mt-4 px-4 py-2 bg-sky-500 text-white text-sm rounded-lg font-medium hover:bg-sky-600">Actualizar plan →</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
