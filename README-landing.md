# Funes Project — Landing Page

Página de captura de waitlist para Funes Project. Objetivo: recolectar WhatsApp de lectores frecuentes interesados en entrevistas y acceso anticipado al MVP.

Stack: HTML + CSS + JS vanilla. Sin frameworks. Sin dependencias.

---

## Estructura del proyecto

```
/
├── index.html       — estructura y copy
├── styles.css       — estilos y tipografía
├── main.js          — lógica del formulario + conexión a Supabase
└── README.md
```

---

## Configuración de Supabase

Antes de correr el proyecto localmente o hacer deploy, reemplaza las credenciales en `main.js`.

Busca estas dos líneas al inicio del archivo:

```js
const SUPABASE_URL = 'REEMPLAZAR_CON_TU_PROJECT_URL'
const SUPABASE_KEY = 'REEMPLAZAR_CON_TU_PUBLISHABLE_KEY'
```

- **SUPABASE_URL** — tu Project URL. Formato: `https://[tu-project-id].supabase.co`
- **SUPABASE_KEY** — tu Publishable key. La encuentras en Supabase > Settings > API Keys

> ⚠️ Nunca reemplaces estas líneas con la Secret key. Solo la Publishable key va aquí.

---

## Correr localmente

No hay servidor ni dependencias que instalar. Abre `index.html` directamente en el browser.

Si prefieres un servidor local para evitar problemas con módulos JS:

```bash
npx serve .
```

Luego abre `http://localhost:3000` en el browser.

---

## Deploy

El proyecto se deploya como sitio estático. Recomendado: Vercel.

```bash
npm i -g vercel
vercel
```

Vercel detecta automáticamente que es un sitio estático y lo deploya sin configuración adicional.

Alternativa: arrastrar la carpeta del proyecto a [vercel.com/new](https://vercel.com/new) desde el browser.

---

## Base de datos

La landing escribe en una tabla `waitlist` en Supabase con esta estructura:

```sql
create table waitlist (
  id          uuid default gen_random_uuid() primary key,
  whatsapp    text not null unique,
  source      text default 'landing',
  created_at  timestamp with time zone default now()
);
```

RLS activo. Solo permite INSERT desde el browser. Los datos se consultan directamente desde el dashboard de Supabase.

---

## Especificación completa

El copy, la dirección visual, la paleta, la tipografía y las decisiones de diseño están documentadas en `LANDING.md`.

Antes de modificar cualquier texto o estructura, leer ese archivo primero.

---

*Funes Project — Hecho en Colombia.*
