# PetCore — Gestión Veterinaria y Pet Shop

SaaS demo para clínicas veterinarias y pet shops de Latinoamérica.

## Stack

- **Next.js 16** · App Router
- **React 19** · TypeScript
- **Tailwind CSS v4**
- **Recharts** · Lucide React

## Usuarios de demo

| Rol | Email | Contraseña | Accesos |
|-----|-------|------------|---------|
| Administrador | admin@petcore.ar | admin123 | Todo |
| Secretaria | secretaria@petcore.ar | sec123 | Todo menos Reportes y Campañas |
| Mostrador | mostrador@petcore.ar | mos123 | Agenda, POS, Caja, Inventario |

## Setup local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) — redirige a `/login` si no hay sesión.

## Deploy en Vercel

1. Push a GitHub
2. Importar repo en [vercel.com](https://vercel.com)
3. Framework: Next.js (autodetectado)
4. Deploy — sin variables de entorno requeridas (demo con datos mock)

## Estructura

```
app/
  login/          ← Página de login pública
  (app)/          ← Layout protegido (AppShell)
    dashboard/
    agenda/
    pos/
    ...
components/       ← AppShell, Sidebar (role-aware), Topbar
context/          ← AuthContext (cookies)
lib/
  auth.ts         ← Roles, permisos, usuarios mock
  data.ts         ← Datos demo
  utils.ts        ← Helpers
middleware.ts     ← Protección de rutas por rol
```
