# LANDING.md — Funes Project
> Documento de especificación para construir la landing page desde Cursor usando Claude Code.
> Nombre provisional: **Funes Project** — reemplazar en todo el documento cuando se confirme el nombre definitivo.

---

## Objetivo de la página

Capturar el WhatsApp de lectores frecuentes interesados en ser entrevistados y eventualmente probar el MVP.

**Un solo CTA. Una sola acción.** No hay nada más que hacer en esta página que dejar el WhatsApp.

---

## Audiencia

Lectores frecuentes de no ficción, 30–45 años, Colombia / LATAM.
Empresarios, fundadores, profesionales independientes.
Han intentado Notion, Readwise, libretas. Los abandonaron.
Saben que tienen un problema. No han encontrado la solución correcta.

No son usuarios técnicos. No conocen el término "PKM".
El lenguaje de la página **nunca usa** "PKM", "knowledge management", ni jerga de productividad.

---

## Dirección estética

**Norte visual:** Portadas de Alianza Editorial.
Tipografía como elemento visual dominante. Fondo crema. Sin decoración superflua.
Si hay imagen, es un objeto con significado — no ilustración, no ícono, no mockup de app.
El peso visual lo carga la tipografía, no los gráficos.

**Norte de copy:** Revolut + Liquid Death en español.
Directo, irreverente, con actitud. Sin adjetivos innecesarios. Sin jerga de productividad.
Cada frase gana su lugar o se elimina. El humor aparece solo cuando es verdadero — nunca forzado.

**Tono:** Inteligente con personalidad. Osado sin ser grosero. Cercano sin ser informal.
Habla de tú. Usa referencias hiperlocales de LATAM cuando refuercen el punto (WhatsApp, pendientes infinitos).
Evitar expresiones que no viajen a México o España.

**Regla tipográfica de voz:** No usar guion largo (—) en el copy. No es convención natural en español escrito para LATAM.

**Lo que esta página NO es:**
- Una landing de SaaS con gradientes morados y mockups flotantes
- Una página con 6 secciones de features y bullets con íconos
- Algo que parezca hecho con una plantilla de Webflow

---

## Paleta y tipografía

**Colores:**
```
--color-bg:        #F5F2ED    /* crema cálido, papel */
--color-text:      #1A1A18    /* negro casi puro */
--color-accent:    #1A1A18    /* mismo negro — el acento es tipográfico, no de color */
--color-muted:     #7A7A72    /* gris para texto secundario */
--color-border:    #D9D5CE    /* líneas sutiles */
--color-input-bg:  #FFFFFF    /* blanco puro solo para el campo de WhatsApp */
```

**Tipografía:**
- Display / headlines: `Playfair Display` — serif con personalidad editorial, peso black o bold
- Body / UI: `DM Sans` — sans-serif limpia, legible, moderna sin ser genérica
- Fallback stack: `Georgia, serif` para display; `system-ui, sans-serif` para body

**Escala tipográfica:**
```
--text-hero:    clamp(3.5rem, 8vw, 7rem)     /* headline principal */
--text-xl:      clamp(1.5rem, 3vw, 2.25rem)  /* subheadline */
--text-lg:      1.25rem
--text-base:    1rem
--text-sm:      0.875rem
--text-xs:      0.75rem
```

---

## Estructura de la página

La página tiene **4 secciones**. Sin navegación superior. Sin footer elaborado.

```
1. HERO          — El problema en una línea. CTA principal.
2. EL PROBLEMA   — Cita grande + contexto + tres momentos concretos donde el sistema falla.
3. LA IDEA       — Headline central + soporte + tres frases de enganche.
4. CIERRE        — Tres preguntas + CTA + quién lo construye.
```

---

## Sección 1 — HERO

**Función:** Que el lector se reconozca en la primera línea. Si no se reconoce, se va.

**Layout:** Centrado. Mucho espacio en blanco. El headline ocupa el 70% del viewport.

### Copy

**Headline:**
> ¿Lees?\
> O todo se queda en el libro.

*Nota de diseño: dos líneas, tamaños distintos. "¿Lees?" en display grande. La segunda línea mismo peso pero visualmente subordinada — el golpe llega después del silencio.*

**Subheadline:**
> Aprópiate de lo que lees. Conviértelo en conocimiento que puedes usar.

**CTA principal:**
> `Quiero leer de verdad`

**Microcopy bajo el CTA:**
> Funes Project está en construcción. Ayúdanos a darle forma.

---

## Sección 2 — EL PROBLEMA

**Función:** Abrir con una cita que valida la frustración. Luego nombrar los tres momentos de quiebre con precisión y actitud. El lector los completa solo.

**Layout:** Cita grande como epígrafe visual, seguida del copy introductorio y los tres bloques en columna (mobile) o fila (desktop). Sin íconos. Solo número + texto.

### Copy

**Cita grande (epígrafe — tipografía display, peso visual dominante):**
> Leer tiene que ser más que subrayar, hacer notas al margen, doblar las páginas (regar un poco de café en ellas) y tomar apuntes.

*Nota de diseño: esta cita abre la sección como un golpe editorial. Fuente display, tamaño grande, sin comillas decorativas. Estilo Alianza.*

**Copy introductorio:**
> Todos queremos leer más, todos queremos leer mejor y todos hemos escuchado los mismos consejos: crea un registro, parafrasea lo que lees, relee tus apuntes, construye un commonplace book.
>
> Claro. Si solo te dedicaras a leer, vivieras en el siglo XIX y no tuvieras que trabajar, ser mamá, papá, hij@, tener la casa limpia, estudiar, etc., etc.

**Bloque 01:**
> **01 — Es difícil conectar**\
> Estás leyendo y encuentras una idea. Quieres conectarla con algo que leíste hace tiempo en otro libro. No encuentras el libro, no encuentras la página, la conexión se pierde para siempre.

**Bloque 02:**
> **02 — El registro es infinito**\
> Lees algo nuevo. Encuentras la frase más impactante de tu vida. La guardas, la marcas, la anotas y la olvidas junto con tu lista de 847 pendientes.

**Bloque 03:**
> **03 — Recuperar ideas da pereza**\
> Necesitas una cita, la que leíste y es perfecta. Pero se refundió en la reading list de Chrome, o tu Notion, una libreta o un chat contigo mism@ de WhatsApp.

---

## Sección 3 — LA IDEA

**Función:** Headline central que nombra el problema con actitud. Soporte que explica el mecanismo. Tres frases de enganche que consolidan la propuesta de valor.

**Layout:** Una columna. Headline en display grande. Idea soporte en texto secundario debajo, menor peso visual. Frases de enganche como lista limpia, sin íconos ni bullets decorativos.

### Copy

**Headline (display grande):**
> Salva a tus ideas de caer en un agujero negro de apuntes.

**Idea soporte (peso visual secundario, debajo del headline):**
> Funes Project no guarda lo que lees, construye lo que sabes.

**Frases de enganche:**
> Lee con propósito\
> Construye un cuerpo de conocimiento vivo\
> Vuelve a tus ideas, están aquí.

*Nota de diseño: las tres frases van en tipografía display, una por línea, con espacio generoso entre ellas. Sin bullets, sin numeración, sin íconos. El peso tipográfico hace el trabajo.*

---

## Sección 4 — CIERRE

**Función:** Tres preguntas que activan el reconocimiento. CTA con el contexto de quién construye esto. Humanizar sin perder el tono.

**Layout:** Fondo ligeramente más oscuro (`#EDE9E3`) para separar visualmente. Preguntas en tipografía display. CTA centrado. Microcopy y línea de cierre en texto pequeño debajo.

### Copy

**Encabezado — tres preguntas en escalera:**
> ¿Leíste "el mejor libro de tu vida" y no recuerdas las ideas más importantes?\
> ¿Recomendaste un libro y cuando te preguntaron por qué no tenías ni @#!$% de cómo responder?\
> ¿Tienes libretas de apuntes olvidadas en algún cajón del escritorio que nunca volviste a abrir?

*Las tres preguntas van de menor a mayor vergüenza. No cambiar el orden.*

**Subencabezado:**
> Si esto te es familiar, tu experiencia nos ayudará a construir la nuestra.

**Microcopy:**
> Queremos tu conocimiento para construir algo cool que perfectamente podrías hacer tú, pero lo estamos haciendo nosotros.

**CTA secundario:**
> `Déjanos tu WhatsApp`

**Línea de cierre:**
> Hecho en Colombia por alguien con 847 pendientes.

---

## Formulario

**Campo único.** Solo WhatsApp. Sin nombre, sin email, sin checkbox de términos en la primera interacción.

**Label / intro (encima del campo):**
> Déjanos hablar contigo para escarbar tu mente

**Campo:**
```
Placeholder:  +57 300 000 0000
```

*Nota: si la audiencia inicial va más allá de Colombia, cambiar placeholder a "Tu número con código de país".*

**Microcopy bajo el campo:**
> Te retribuiremos con una solución a tus lecturas vacías.

**CTA button:**
> `Quiero participar`

**Estado de éxito (después de enviar):**
> ¡Listo! Te contactaremos esta semana.\
> Mientras tanto, seguro que conoces a otro lector en problemas...

**Estado de error:**
> No se guardó. Intenta de nuevo.

*(Nunca culpar al usuario. Nunca usar "¡Ups!" — rompe el tono.)*

---

## Comportamiento e interacciones

**Animaciones:** Mínimas. Solo fade-in suave al hacer scroll. Sin parallax, sin efectos elaborados.
**Mobile-first:** El 80% de los visitantes llegan desde celular (audiencia LATAM).
**Performance:** Sin librerías de animación pesadas. CSS puro o mínimo JS.
**Sin cookies banner:** No hay tracking de terceros en esta versión. Solo el formulario.

---

## Stack técnico recomendado

```
HTML / CSS / JS vanilla    → suficiente para esta página
o
Next.js + Tailwind         → si se quiere reutilizar componentes en el MVP futuro
```

**Para capturar WhatsApps:**
- **Supabase** — tabla `waitlist` con campos `whatsapp` + `source` + `created_at`
- Recomendado: Supabase desde el inicio — consistencia con el stack del MVP

---

## Esquema de base de datos (Supabase)

```sql
create table waitlist (
  id          uuid default gen_random_uuid() primary key,
  whatsapp    text not null unique,
  source      text default 'landing',   -- trackear origen: bookclub, direct, etc.
  created_at  timestamp with time zone default now()
);
```

---

## Prompt de referencia para Claude Code en Cursor

Pegar esto al inicio de la sesión en Cursor:

```
Estoy construyendo la landing page de Funes Project, un producto para lectores frecuentes en LATAM.

Objetivo: capturar el WhatsApp de lectores interesados en ser entrevistados y probar el MVP.

Dirección visual: minimalismo editorial inspirado en portadas de Alianza Editorial.
Tipografía dominante (Playfair Display para display, DM Sans para body).
Fondo crema (#F5F2ED), texto negro (#1A1A18). Sin decoración superflua.

Estructura: 4 secciones — Hero, El Problema, La Idea, Cierre.
Un solo CTA: dejar el WhatsApp. Un solo campo en el formulario.

El copy está definido en LANDING.md. Úsalo textualmente — no lo reescribas ni lo mejores.
El formulario conecta a Supabase, tabla `waitlist`, campo `whatsapp`.

Empieza por el componente Hero. Mobile-first. Sin librerías de animación pesadas.
```

---

## Lo que este documento NO define (decisiones abiertas)

- Nombre definitivo del producto — reemplazar "Funes Project" cuando se confirme
- Fotografía o imagen para la sección 3 — opcional, la tipografía sola funciona
- Dominio y hosting — definir antes del lanzamiento
- Analytics — PostHog recomendado para consistencia con el stack del MVP
- Versión en inglés — segunda fase, después de validar con audiencia hispanohablante
- Placeholder del formulario — ajustar si la audiencia inicial va más allá de Colombia
