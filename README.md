# Funes Project — Landing Page

Página de captura de waitlist para Funes Project. Objetivo: recolectar datos de lectores frecuentes interesados en entrevistas y acceso anticipado al MVP.

Stack: HTML + CSS + JS vanilla. Vite como dev server y bundler.

**Requisitos:** Node.js 18 o superior.

---

## Estructura del proyecto

```
/
├── index.html           — estructura y copy
├── vite.config.js       — configuración de Vite
├── .env.local           — credenciales de Supabase (no subir al repo)
├── .env.example         — plantilla de variables de entorno
├── src/
│   ├── main.js          — lógica del formulario + conexión a Supabase
│   └── styles/
│       ├── main.css     — punto de entrada CSS (@imports)
│       ├── tokens.css   — design tokens (:root variables)
│       ├── reset.css    — reset, base y skip link
│       ├── nav.css
│       ├── animations.css
│       ├── button.css
│       ├── hero.css
│       ├── quote-break.css
│       ├── problema.css
│       ├── idea.css
│       ├── cierre.css
│       └── form.css
├── public/
│   ├── estatua-problema.png
│   ├── quotebreak-section.png
│   └── idea-bg.svg
└── README.md
```

---

## Configuración de Supabase

Crea un archivo `.env.local` en la raíz del proyecto con estas variables:

```
VITE_SUPABASE_URL=https://[tu-project-id].supabase.co
VITE_SUPABASE_KEY=tu-publishable-key
```

- **VITE_SUPABASE_URL** — tu Project URL. La encuentras en Supabase > Settings > API
- **VITE_SUPABASE_KEY** — tu Publishable key. La encuentras en Supabase > Settings > API Keys

> ⚠️ Nunca uses la Secret key aquí. Solo la Publishable key. El archivo `.env.local` está en `.gitignore` — no lo subas al repositorio.

---

## Correr localmente

```bash
npm install
npm run dev -- --host
```

Luego abre `http://localhost:5173` en el browser (o la URL que indique Vite en la terminal).

---

## Deploy

El proyecto se deploya como sitio estático con Vite. Recomendado: Vercel.

```bash
npm i -g vercel
vercel
```

Vercel detecta automáticamente la configuración de Vite y lo deploya sin configuración adicional.

Alternativa: arrastrar la carpeta del proyecto a [vercel.com/new](https://vercel.com/new) desde el browser.

---

## Base de datos

La landing escribe en una tabla `waitlist` en Supabase con esta estructura:

```sql
create table waitlist (
  id            uuid default gen_random_uuid() primary key,
  nombre        text not null,
  apellido      text not null,
  whatsapp      text not null unique,
  email         text not null unique,
  libros_al_año text,
  consentimiento boolean not null default false,
  source        text default 'landing',
  created_at    timestamp with time zone default now()
);
```

RLS activo. Antes de hacer el primer deploy, ejecuta esta policy en Supabase > SQL Editor para permitir inserts desde el browser:

```sql
create policy "insert_from_landing"
on waitlist for insert
to anon
with check (true);
```

Los datos se consultan directamente desde el dashboard de Supabase.

---

## Especificación completa

El copy, la dirección visual, la paleta, la tipografía y las decisiones de diseño están documentadas en `LANDING.md`.

Antes de modificar cualquier texto o estructura, leer ese archivo primero.

---

*Funes Project — Hecho en Colombia.*
