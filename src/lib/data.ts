// Mock data for PetCore demo

export const mockClients = [
    { id: "1", name: "María García", email: "maria@example.com", phone: "11-4521-3890", whatsapp: "1145213890", pets: 2, lastVisit: "2026-03-15", totalSpent: 185000, points: 320, tags: ["vip", "frecuente"] },
    { id: "2", name: "Carlos Rodríguez", email: "carlos@example.com", phone: "11-3345-9012", whatsapp: "1133459012", pets: 1, lastVisit: "2026-03-10", totalSpent: 95000, points: 150, tags: ["frecuente"] },
    { id: "3", name: "Lucía Martínez", email: "lucia@example.com", phone: "11-2234-7891", whatsapp: "1122347891", pets: 3, lastVisit: "2026-03-18", totalSpent: 340000, points: 580, tags: ["vip"] },
    { id: "4", name: "Andrés Fernández", email: "andres@example.com", phone: "11-5567-2341", whatsapp: "1155672341", pets: 1, lastVisit: "2026-02-28", totalSpent: 45000, points: 75, tags: [] },
    { id: "5", name: "Valentina López", email: "vale@example.com", phone: "11-6678-1234", whatsapp: "1166781234", pets: 2, lastVisit: "2026-03-20", totalSpent: 220000, points: 410, tags: ["vip", "frecuente"] },
];

export const mockPets = [
    { id: "1", clientId: "1", name: "Luna", species: "dog", breed: "Labrador Retriever", color: "Amarillo", birthDate: "2022-06-15", sex: "F", isNeutered: true, weight: 28.5, microchip: "985112345678901", photo: "🐕", nextVaccine: "2026-04-01", nextDeworming: "2026-04-15" },
    { id: "2", clientId: "1", name: "Mochi", species: "cat", breed: "Persa", color: "Blanco", birthDate: "2021-03-20", sex: "M", isNeutered: true, weight: 4.2, microchip: "985112345678902", photo: "🐈", nextVaccine: "2026-05-10", nextDeworming: "2026-04-05" },
    { id: "3", clientId: "2", name: "Max", species: "dog", breed: "Golden Retriever", color: "Dorado", birthDate: "2020-11-08", sex: "M", isNeutered: false, weight: 32.0, microchip: "985112345678903", photo: "🐕", nextVaccine: "2026-03-25", nextDeworming: "2026-05-01" },
    { id: "4", clientId: "3", name: "Tobi", species: "dog", breed: "Beagle", color: "Tricolor", birthDate: "2023-01-14", sex: "M", isNeutered: true, weight: 10.8, microchip: "985112345678904", photo: "🐕", nextVaccine: "2026-06-01", nextDeworming: "2026-04-20" },
    { id: "5", clientId: "3", name: "Nala", species: "cat", breed: "Común europeo", color: "Atigrada", birthDate: "2022-08-30", sex: "F", isNeutered: true, weight: 3.8, microchip: "985112345678905", photo: "🐈", nextVaccine: "2026-05-20", nextDeworming: "2026-04-10" },
    { id: "6", clientId: "5", name: "Rocky", species: "dog", breed: "Bulldog Francés", color: "Atigrado", birthDate: "2021-05-22", sex: "M", isNeutered: true, weight: 12.5, microchip: "985112345678906", photo: "🐕", nextVaccine: "2026-04-12", nextDeworming: "2026-04-25" },
];

export const mockAppointments = [
    { id: "1", clientId: "1", petId: "1", petName: "Luna", clientName: "María García", vetName: "Dr. García", service: "Vacunación anual", startAt: "2026-03-21T09:00:00", endAt: "2026-03-21T09:30:00", status: "confirmed", color: "#0ea5e9" },
    { id: "2", clientId: "2", petId: "3", petName: "Max", clientName: "Carlos Rodríguez", vetName: "Dr. García", service: "Control general", startAt: "2026-03-21T10:00:00", endAt: "2026-03-21T10:30:00", status: "in_progress", color: "#f59e0b" },
    { id: "3", clientId: "3", petId: "4", petName: "Tobi", clientName: "Lucía Martínez", vetName: "Dra. Pérez", service: "Cirugía menor", startAt: "2026-03-21T11:00:00", endAt: "2026-03-21T12:00:00", status: "scheduled", color: "#8b5cf6" },
    { id: "4", clientId: "5", petId: "6", petName: "Rocky", clientName: "Valentina López", vetName: "Dr. García", service: "Desparasitación", startAt: "2026-03-21T14:00:00", endAt: "2026-03-21T14:30:00", status: "scheduled", color: "#10b981" },
    { id: "5", clientId: "1", petId: "2", petName: "Mochi", clientName: "María García", vetName: "Dra. Pérez", service: "Consulta dermatológica", startAt: "2026-03-21T15:30:00", endAt: "2026-03-21T16:00:00", status: "scheduled", color: "#ef4444" },
    { id: "6", clientId: "4", petId: null, petName: "Rex", clientName: "Andrés Fernández", vetName: "Dr. García", service: "Consulta general", startAt: "2026-03-22T09:30:00", endAt: "2026-03-22T10:00:00", status: "scheduled", color: "#0ea5e9" },
];

export const mockMedicalRecords = [
    { id: "1", petId: "1", petName: "Luna", date: "2026-03-15", vet: "Dr. García", reason: "Control general + vacunación", diagnosis: "Animal en excelente estado de salud", treatment: "Vacuna antirrábica aplicada. Desparasitación interna con Milbemax. Se recomienda dieta Royal Canin Medium Adult.", weight: 28.5, temp: 38.2, heartRate: 88, notes: "Propietaria reporta buen apetito y actividad normal. Pelo brillante, mucosas rosadas, linfonódulos normales." },
    { id: "2", petId: "3", petName: "Max", date: "2026-03-10", vet: "Dr. García", reason: "Vómitos recurrentes", diagnosis: "Gastroenteritis aguda leve", treatment: "Ayuno 12h, dieta blanda 5 días. Metronidazol 250mg/12h x 5 días. Probioticos FortiFlora.", weight: 32.0, temp: 38.8, heartRate: 92, notes: "Propietario reporta 3 episodios de vómito en las últimas 24h. Heces normales. Sin fiebre." },
    { id: "3", petId: "1", petName: "Luna", date: "2026-02-20", vet: "Dra. Pérez", reason: "Revisión piel y oídos", diagnosis: "Otitis externa leve, dermatitis atópica en zona abdominal", treatment: "Aurex 10 gotas/12h x 10 días. Shampoo Douxo Calm 2 veces/semana. Revisar en 2 semanas.", weight: 27.8, temp: 38.1, heartRate: 86, notes: "Prurito moderado. Eritema en zona inguinal. Otoscopio: cera marrón abundante, membrana timpánica íntegra." },
];

export const mockProducts = [
    { id: "1", name: "Royal Canin Medium Adult 15kg", category: "Alimentos", barcode: "3182550708487", price: 18500, cost: 12000, stock: 8, minStock: 5, unit: "bolsa", isActive: true },
    { id: "2", name: "Bravecto Perro 25-40kg", category: "Antiparasitarios", barcode: "5413738009818", price: 12500, cost: 7800, stock: 0, minStock: 5, unit: "comprimido", isActive: true },
    { id: "3", name: "Frontline Plus Perro G/3 pip", category: "Antiparasitarios", barcode: "3661103000020", price: 4800, cost: 2900, stock: 3, minStock: 5, unit: "pipeta", isActive: true },
    { id: "4", name: "Milbemax Perro pequeño", category: "Antiparasitarios", barcode: "7502009450012", price: 2200, cost: 1300, stock: 15, minStock: 10, unit: "comprimido", isActive: true },
    { id: "5", name: "Pedigree Adulto Razas Med 21kg", category: "Alimentos", barcode: "5000077059073", price: 15800, cost: 9500, stock: 12, minStock: 8, unit: "bolsa", isActive: true },
    { id: "6", name: "Iams Cat Adult Salmon 1.5kg", category: "Alimentos", barcode: "8710255163186", price: 4200, cost: 2600, stock: 6, minStock: 5, unit: "bolsa", isActive: true },
    { id: "7", name: "Consulta General", category: "Servicios", barcode: "", price: 5500, cost: 0, stock: 999, minStock: 0, unit: "servicio", isActive: true },
    { id: "8", name: "Vacunación + consulta", category: "Servicios", barcode: "", price: 7500, cost: 0, stock: 999, minStock: 0, unit: "servicio", isActive: true },
    { id: "9", name: "Baño y corte perro mediano", category: "Servicios", barcode: "", price: 6800, cost: 0, stock: 999, minStock: 0, unit: "servicio", isActive: true },
    { id: "10", name: "Hill's Science Diet Adult 7.5kg", category: "Alimentos", barcode: "052742725566", price: 12300, cost: 7800, stock: 2, minStock: 4, unit: "bolsa", isActive: true },
];

export const mockSales = [
    { id: "1", date: "2026-03-21T09:45:00", client: "María García", items: 3, total: 35500, method: "card_debit", status: "completed" },
    { id: "2", date: "2026-03-21T11:30:00", client: "Carlos Rodríguez", items: 1, total: 12500, method: "mercadopago", status: "completed" },
    { id: "3", date: "2026-03-21T12:15:00", client: "Sin cliente", items: 2, total: 23300, method: "cash", status: "completed" },
    { id: "4", date: "2026-03-21T14:00:00", client: "Lucía Martínez", items: 4, total: 52000, method: "card_credit", status: "completed" },
    { id: "5", date: "2026-03-20T16:30:00", client: "Valentina López", items: 2, total: 18700, method: "cash", status: "completed" },
];

export const mockDashboardStats = {
    todaySales: 145200,
    todaySalesChange: 12.4,
    todayAppointments: 12,
    todayAppointmentsTotal: 15,
    todayPatients: 11,
    cashBalance: 89400,
    monthRevenue: 892000,
    monthRevenueGoal: 1200000,
    pendingInvoices: 3,
    lowStockCount: 3,
    expiredVaccinesCount: 4,
    birthdaysToday: 1,
};

export const mockSalesChart = [
    { day: "Lun", ventas: 98000, servicios: 45000 },
    { day: "Mar", ventas: 125000, servicios: 62000 },
    { day: "Mié", ventas: 87000, servicios: 38000 },
    { day: "Jue", ventas: 145000, servicios: 71000 },
    { day: "Vie", ventas: 178000, servicios: 89000 },
    { day: "Sáb", ventas: 210000, servicios: 95000 },
    { day: "Dom", ventas: 49000, servicios: 22000 },
];

export const mockTopProducts = [
    { name: "Royal Canin Med 15kg", sales: 34, revenue: 629000 },
    { name: "Bravecto 25-40kg", sales: 28, revenue: 350000 },
    { name: "Consulta General", sales: 89, revenue: 489500 },
    { name: "Vacunación + consulta", sales: 45, revenue: 337500 },
    { name: "Frontline Plus G", sales: 67, revenue: 321600 },
];

export const mockVaccinationAlerts = [
    { petName: "Max", clientName: "Carlos Rodríguez", vaccine: "Antirrábica", dueDate: "2026-03-25", phone: "1133459012", daysLeft: 4 },
    { petName: "Luna", clientName: "María García", vaccine: "Óctuple canina", dueDate: "2026-04-01", phone: "1145213890", daysLeft: 11 },
    { petName: "Rocky", clientName: "Valentina López", vaccine: "Antirrábica", dueDate: "2026-04-12", phone: "1166781234", daysLeft: 22 },
    { petName: "Nala", clientName: "Lucía Martínez", vaccine: "Triple felina", dueDate: "2026-05-20", phone: "1122347891", daysLeft: 60 },
];

export const statusColors: Record<string, string> = {
    scheduled: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    confirmed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    in_progress: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    completed: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    no_show: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export const statusLabels: Record<string, string> = {
    scheduled: "Programado",
    confirmed: "Confirmado",
    in_progress: "En atención",
    completed: "Completado",
    cancelled: "Cancelado",
    no_show: "No se presentó",
};

export const speciesEmoji: Record<string, string> = {
    dog: "🐕",
    cat: "🐈",
    rabbit: "🐇",
    bird: "🦜",
    other: "🐾",
};

export const speciesLabel: Record<string, string> = {
    dog: "Perro",
    cat: "Gato",
    rabbit: "Conejo",
    bird: "Ave",
    other: "Otro",
};
