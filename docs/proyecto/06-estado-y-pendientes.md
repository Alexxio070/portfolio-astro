# 06 · Estado y pendientes

Foto del proyecto a **9 de octubre de 2026** (rama `pruebas`, commit `7ce0d33`), con lo que falta, lo que se sabe que está a medias y los límites conocidos.

## Estado de las comprobaciones

| Comprobación | Resultado |
|---|---|
| `npm run build` | Correcto, 3 páginas |
| `npm run test:run` | 76 tests en verde |
| `npm run check` (`astro check`) | 0 errores, 0 avisos, 2 sugerencias |
| `npm run lint` | 0 errores, 2 avisos de `console` en `scripts/verify-build.mjs` (heredados, intencionados) |
| `npm run verify` | "output looks good" |

> Las sugerencias de `astro check` son avisos de obsolescencia (por ejemplo, de `z.string().url()` en `src/content.config.ts`). No afectan al funcionamiento.

## Pendiente antes de publicar

| Tarea | Detalle |
|---|---|
| **Comprar el dominio `alexxio.dev`** | Es lo único que falta para publicar. El anfitrión (hosting) ya está decidido |
| **Definir `SITE_URL` en el anfitrión** | El código ya usa `https://alexxio.dev` por defecto, así que si el dominio es ese **no hay que cambiar nada en el código**. La variable solo es necesaria para anular el valor (por ejemplo, en una vista previa con otra dirección). Sin ella, el build avisa pero funciona |
| **Apuntar el dominio al anfitrión** | Registros DNS que indique el propio anfitrión |
| **Subir `pruebas` a `main`** | `main` está en `c5c6f46`, por detrás de `pruebas` (32 commits al redactar esto). Se hace con un *squash* para no arrastrar historial ni PRs |
| **Revisar que las URLs de `llms.txt`, sitemap y tarjeta de redes usan el dominio final** | Se comprueba tras publicar: `https://alexxio.dev/sitemap-index.xml`, `/robots.txt`, `/llms.txt` |

## Contenido por completar

| Qué | Dónde | Nota |
|---|---|---|
| Más proyectos | `src/content/projects/{es,en}/` | Hoy hay uno (el portfolio). Ver [la receta](../guia-astro/03-recetas.md#añadir-un-proyecto) |
| Enlace en las tarjetas de proyecto | `src/components/projects/ProjectCard.astro` | Hoy las tarjetas no enlazan a nada. Ver [la receta](../guia-astro/03-recetas.md#hacer-que-una-tarjeta-de-proyecto-sea-un-enlace) |
| Fechas del grado superior | `src/i18n/*.json` → `pages.home.about.items[1]` | Figura "2025–2027". Si se completa antes, actualizar. Los textos dicen que la formación está en curso |
| Experiencia laboral | idem, `items[2]` | "Málaga Inclusiva — Intern (April – July 2026)" |

## Deuda técnica conocida

Cosas que **funcionan** pero que son restos del proceso de recorte. Ninguna es urgente.

### Datos de Rocket que siguen en archivos de configuración

| Dónde | Qué | Comentario |
|---|---|---|
| `src/config/nav.config.ts` | Claves y comentarios que mencionan el blog | Cosméticos |
| `src/styles/**/*.css` | Cabeceras de comentario "Astro Rocket Theme…" | Son atribución; se pueden dejar |
| `LICENSE` | Copyright de Hans Martens | Es la licencia MIT de Rocket y se conserva a propósito |

Ya no quedan restos del blog en `site.config.ts` ni en `BaseLayout.astro`, y `package.json` lleva el nombre, la descripción, el autor y el repositorio del portfolio.

### Tests que usan un idioma de ejemplo

| Archivo | Situación |
|---|---|
| `src/__tests__/` con idiomas `nl` de ejemplo | `i18n.test.ts`, `nav-i18n.test.ts` y `format-date.test.ts` usan un idioma holandés ficticio para probar rutas con prefijo |

### Avisos benignos en la salida del build

- `Failed to load icons from "src/icons"`: `astro-icon` busca una carpeta de iconos propios que no existe. Se puede ignorar o crear la carpeta vacía.
- `SITE_URL is not set`: ver más arriba; no afecta a nada mientras el dominio sea `alexxio.dev`.

## Límites y comportamientos a tener en cuenta

| Tema | Detalle |
|---|---|
| **Descripción del sitio en un solo idioma** | `site.config.ts` tiene una única `description` (en inglés). La usan el JSON-LD (`WebSite`), el manifiesto y la tarjeta para redes, **también en `/es/`**. Las etiquetas `<title>` y `<meta description>` de cada página sí vienen de los archivos de idioma |
| **La 404 solo tiene una versión** | Es una única página, que se genera una vez en el idioma por defecto (inglés) |
| **El color del tema no se recuerda entre visitas** | Se guarda en `sessionStorage` (hasta cerrar la pestaña). El modo claro/oscuro sí es permanente |
| **El diseño cambia a partir de 1280 px** | Desde ese ancho el hero es un panel fijo a la izquierda (nombre, presentación, enlaces y navegación en vertical) y las secciones se desplazan a su derecha. Por debajo es una sola columna, con la barra flotante. El panel tiene hueco libre entre la presentación y la navegación en pantallas altas |
| **El cursor personalizado deja estela fuera del hero** | En el hero solo se ve el punto. Se puede desactivar del todo con `effects.cursorTrail: false` en `site.config.ts` |
| **`npm run dev` no genera favicon ni tarjeta para redes** | Solo existen tras `npm run build` |
| **El servidor de desarrollo puede servir estilos antiguos** tras editar un archivo | Ver [problemas frecuentes](../guia-astro/05-problemas-frecuentes.md) |
| **El enlace de LinkedIn** puede pedir iniciar sesión | El enlace es correcto (`linkedin.com/in/alex-vizan/`); el perfil probablemente no es público |
| **Seguridad del contenido** | El sitio no tiene entradas de usuario ni servidor: no hay inyección ni datos que proteger. Lo único "expuesto" es el correo, que ya aparece impreso en la página y en el JSON-LD |

## Ideas aparcadas

Cosas que se propusieron y se dejaron para más adelante, si el hero resulta demasiado sobrio:

- **Rejilla de puntos con luz que sigue al cursor.** Ya existe `HeroGrid.astro` en el proyecto como base.
- **Degradado de fondo que "respira"** (dos o tres manchas de color del tema, muy difuminadas).
- **Un panel "Lo que leo"** en "Sobre mí" con tres o cuatro libros y un icono de libro que se abre al desplegarlo. Se propuso como único toque personal discreto y **no se implementó**; para una consultora pesa más tener proyectos que mostrar.
- **Tema y tipografía propios** (el plan original los llamaba "Fase 4"): se abandonó, pero el sistema de temas permite añadirlo.

## Resumen de una línea

El sitio está **completo y verificado**; para publicarlo solo falta **comprar el dominio**, subir `pruebas` a `main` y apuntar el dominio al anfitrión.
