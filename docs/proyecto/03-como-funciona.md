# 03 · Cómo funciona

Explicación de los mecanismos del sitio. Cada apartado indica en qué archivos vive, para que puedas ir a leer el código real.

## Índice

1. [De la URL a la página](#de-la-url-a-la-página)
2. [Idiomas](#idiomas)
3. [Contenido y proyectos](#contenido-y-proyectos)
4. [Temas: color y modo claro/oscuro](#temas-color-y-modo-clarooscuro)
5. [La portada, sección por sección](#la-portada-sección-por-sección)
6. [Animaciones](#animaciones)
7. [Navegación](#navegación)
8. [SEO y datos para buscadores](#seo-y-datos-para-buscadores)
9. [El build y lo que genera](#el-build-y-lo-que-genera)
10. [Accesibilidad y movimiento reducido](#accesibilidad-y-movimiento-reducido)

---

## De la URL a la página

El sitio es **estático**: al ejecutar `npm run build`, Astro genera los HTML en `dist/` y no hace falta ningún servidor. Las tres páginas son:

| URL | Archivo que la define | Resultado |
|---|---|---|
| `/` | `src/pages/index.astro` | `dist/index.html` |
| `/en/` | `src/pages/[locale]/index.astro` | `dist/en/index.html` |
| error | `src/pages/404.astro` | `dist/404.html` |

Las dos portadas hacen **lo mismo**: renderizan `HomeView.astro` pasándole el idioma. Toda la portada vive en ese único componente. `[locale]/index.astro` genera una página por cada idioma secundario que haya en `i18n.config.ts`, con `getStaticPaths()`.

```
index.astro  ─ HomeView(locale = 'en') ─┐
[locale]     ─ HomeView(locale = 'es') ─┴→ LandingLayout → BaseLayout → HTML final
```

## Idiomas

**Configuración:** `src/config/i18n.config.ts` — activa (`enabled: true`), idioma por defecto `es`, idiomas `['es', 'en']`.

**Rutas:** el español va en la raíz (`/`) y el inglés bajo prefijo (`/en/`).

**Textos:** viven en `src/i18n/en.json` y `src/i18n/es.json`. Se leen con la función `t('ruta.de.la.clave', idioma)`, o con `tData()` cuando el valor es una lista o un objeto (por ejemplo, los paneles de "Sobre mí"). Si una clave no existe en un idioma, se usa la del idioma por defecto; si no existe en ninguno, se devuelve la propia clave (así se nota el fallo).

**Textos de la portada:** todo lo que ves en la portada sale de `pages.home.*`:

```
pages.home
├── meta          → título y descripción de la pestaña / buscadores
├── hero          → nombre (2 líneas), subtítulo, etiqueta del correo
├── about         → heading + items[] (icono, título, puntos)
├── projects      → heading + lead
└── contact       → heading, description, cta, subject (asunto del correo)
```

**Cargar idiomas:** `src/i18n/index.ts` carga con `import.meta.glob` **cualquier** `*.json` de la carpeta. Para que el idioma se sirva hay que listarlo además en `i18n.config.ts`.

**El selector de idioma** (`LanguageSwitcher.astro`) son enlaces normales a "la misma página en otro idioma", sin JavaScript más allá de abrir y cerrar el desplegable.

**Un test lo vigila:** `i18n-coverage.test.ts` falla si `es.json` tiene una clave de más o de menos respecto a `en.json`, o si algún componente escribe a mano un texto que un lector de pantalla leería (`aria-label`, `alt`, `title`, `placeholder`).

## Contenido y proyectos

Las tarjetas de proyecto salen de la **colección de contenido** `projects`:

- **Archivos:** `src/content/projects/en/*.md` y `src/content/projects/es/*.md`.
- **Esquema:** `src/content.config.ts`. Campos: `title` y `description` (obligatorios), `icon`, `tags`, `year`, `order`, `draft`, `url`, `repo` y `locale`.
- **Carga:** `HomeView.astro` pide los proyectos del idioma con `getVisibleProjects(locale)` (`src/lib/projects.ts`). Si ese idioma no tiene ninguno, usa los del idioma por defecto. Los ordena por `order` y **muestra los 4 primeros**.
- **Borradores:** un proyecto con `draft: true` se oculta en el build de producción, pero se ve en `npm run dev`.

- **Enlace de la tarjeta:** `ProjectCard` enlaza a `url` y, si no hay, a `repo`, en una pestaña nueva y con una flecha ↗. Un proyecto sin ninguno de los dos es una **tarjeta plana**, sin enlace, sin flecha y sin el efecto de elevación al pasar el ratón. No hay páginas de detalle de proyecto, así que no existe ninguna ruta a la que enlazar por defecto.

## Temas: color y modo claro/oscuro

Son **dos ejes independientes**.

### Color (8 temas)

- **Registro:** `src/lib/themes.ts` (`purple, violet, indigo, blue, sky, cyan, teal, emerald`). El predeterminado es **`blue`**.
- **Definición:** un archivo por tema en `src/styles/themes/<id>.css`. Cada uno define la escala `--brand-50 … --brand-900`, las superficies y las tipografías (`--theme-font-*`), en dos bloques: `html[data-theme="blue"]` (claro) y `html.dark[data-theme="blue"]` (oscuro).
- **Activación:** el atributo `data-theme` en `<html>`. Lo escribe el selector (`ThemeSelector*.astro`), que **guarda la elección en `sessionStorage`**: se recuerda durante la visita y se olvida al cerrar la pestaña. En `BaseLayout.astro` hay además una lista de temas permitidos (`COLOR_THEMES`) que debe coincidir con `themes.ts`.
- **Uso en el código:** los componentes no usan colores fijos sino `--color-brand-500`, `text-brand-600`, etc. (Tailwind los lee de esas variables), así que cambian solos con el tema.

### Modo claro / oscuro

- **Interruptor:** `ThemeToggle.astro` alterna entre `light` y `dark`.
- **Primera visita:** un script de `BaseLayout.astro` se ejecuta **antes de pintar** (para que no parpadee) y decide el modo: si el visitante ya eligió, usa su elección (`localStorage.theme`); si no, el del sistema (`prefers-color-scheme`), **solo al cargar**.
- **Qué escribe:** `data-theme-mode="light|dark"` y la clase `dark` en `<html>`.
- **Valores heredados:** si un visitante tenía guardado `system` (de cuando existía esa opción), se trata como "sin elección".

> El hero tiene un degradado **oscuro en los dos modos**. Por eso los controles de la barra tienen estilos propios mientras estás sobre él (ver [Navegación](#navegación)).

## La portada, sección por sección

Todo está en `src/components/pages/views/HomeView.astro`, de arriba abajo:

| Bloque | Qué hace |
|---|---|
| Cabecera del archivo (`---`) | Carga proyectos, textos (`tData`), redes sociales y construye el enlace de Gmail |
| `<LandingLayout …>` | Pasa título, descripción y `includePersonSchema` |
| `<div class="home-split">` y `<div class="home-content">` | Dos envoltorios: el primero contiene el hero y el segundo las tres secciones. Solo importan desde 1280 px (ver abajo); por debajo no hacen nada |
| `<Hero id="home">` | Titular en dos líneas (`.hero-name`), botones (`.hero-actions`), subtítulo con cursor (`.hero-caret`) |
| `<section id="about">` | Seis `<details name="about-panels">`: `name` hace que al abrir uno se cierre el anterior |
| `<section id="projects">` | `SectionTitle` + frase + tarjetas |
| `<section id="contact">` | `SectionTitle` + texto + tarjeta con correo y botón |
| `<style is:global>` | Estilos propios de la portada (cursor de terminal, bordes de 2 px, transiciones…) |
| `<script>` (dos) | La luz que sigue al cursor sobre el nombre del hero y, desde 1280 px, sobre la rejilla de puntos |
| `<script is:inline>` | El saludo de la consola del navegador (ver Animaciones y detalles) |

**El correo:** el botón no usa `mailto:` (que no hace nada si no hay un programa de correo configurado). Construye un enlace a la **ventana de redactar de Gmail** (`mail.google.com/mail/?view=cm&fs=1&to=…&su=…`), con la dirección y el asunto ya puestos (`pages.home.contact.subject`). Se abre en pestaña nueva. La dirección sigue impresa en la tarjeta para quien no use Gmail.

**La altura de las secciones:** "Sobre mí" y "Proyectos" miden lo que mide su contenido. **Contacto** tiene `min-h-[80svh]` (70svh en el diseño de panel lateral) y centra su contenido: sin eso, al final de la página su tarjeta quedaba demasiado abajo para activar la animación de aparición y se veía vacía.

### El panel lateral (desde 1280 px)

Con `@media (min-width: 1280px)` cambia el diseño, todo en el CSS de `HomeView.astro` y `FloatingNav.astro`:

- `.home-split` pasa a ser una **rejilla de dos columnas**: a la izquierda el hero (`clamp(380px, 28vw, 540px)`), a la derecha las secciones.
- El hero queda **fijo** (`position: sticky`, alto de pantalla) mostrando nombre, presentación y botones. Sus dos columnas internas se reordenan con `display: contents` para que salga en ese orden.
- La **barra flotante** deja de ser una cápsula arriba y se convierte en una **lista vertical** al pie del panel (sin el enlace "Inicio", que ya es el propio panel), con los selectores de tema, modo e idioma debajo; sus desplegables se abren hacia arriba.
- Las secciones pierden su fondo propio y se centran en su columna sobre una **rejilla de puntos** (`.home-content::before` y `::after`). Los puntos cercanos al cursor se iluminan con el color del tema; un script suaviza ese movimiento. Con "reducir movimiento" queda solo la textura fija.
- El bloque de contacto se **apila** (título y texto, luego la tarjeta) porque el título es una ruta que no se parte en líneas y no cabe junto a la tarjeta. Esto también ocurre en tabletas en vertical: el cambio de dos columnas a una está ahora en 1024 px (`lg:`) y no en 768 px.
- El ajuste del color de la barra del navegador en iPhone ignora las secciones que no ocupan casi todo el ancho de la pantalla, como este panel.

## Animaciones

Todas respetan `prefers-reduced-motion` (ver [Accesibilidad](#accesibilidad-y-movimiento-reducido)).

| Animación | Dónde | Cómo funciona |
|---|---|---|
| **Aparición al hacer scroll** | Atributo `data-reveal` en cualquier elemento | `BaseLayout.astro` tiene un `IntersectionObserver` que añade la clase `is-visible`; el CSS (`global.css`) hace la transición. `data-reveal-delay="1…4"` escalona. |
| **Entrada del hero** | `.animate-hero-stagger` (en `Hero.astro`) | Los hijos del hero entran en cascada, cada 90 ms |
| **Cursor de terminal** | `.hero-caret` (`HomeView`) | Un bloque azul que parpadea tras la última palabra del subtítulo. La última palabra va en un `<span>` con `whitespace-nowrap` para que el bloque nunca quede solo en otra línea |
| **Luz sobre el nombre** | `.hero-name` (`HomeView`) | Un degradado radial recortado a las letras (`background-clip: text`) sigue al cursor con suavizado; el `<script>` de la portada calcula la posición |
| **Títulos como ruta de Linux** | `SectionTitle.astro` | Ver abajo |
| **Desplegables suaves** | `.about-panel` (`HomeView`) | `::details-content` con `interpolate-size`; en navegadores que no lo soportan, se abren de golpe |
| **Botones que se elevan** | `.hero-actions > a` | `translate` de −3 px y sombra de color al pasar el ratón |
| **Cursor personalizado** | `CursorTrail.astro` | Punto, aro y estela. **En el hero solo queda el punto**: el hero lleva `data-cursor-calm` |
| **Rejilla de puntos con luz** | `.home-content` (`HomeView`, solo desde 1280 px) | Puntos tenues detrás de las secciones; los cercanos al cursor se iluminan con el color del tema. Solo con ratón o lápiz |
| **Fundido claro/oscuro** | `ThemeToggle.astro` | Usa `document.startViewTransition` si el navegador lo tiene: el cambio es un fundido de toda la página. Sin soporte o con "reducir movimiento", cambia de golpe |

### Otros detalles pequeños

| Detalle | Dónde | Qué hace |
|---|---|---|
| **Título de la pestaña vivo** | Script de `SectionTitle.astro` | Mientras una sección es la actual, la pestaña dice `~/alex/<sección> — <nombre>`; sobre la primera sección vuelve al título de la página. Solo cambia la pestaña en vivo: el `<title>` del HTML, que leen los buscadores, no se toca |
| **Saludo en la consola** | `<script is:inline>` de `HomeView.astro` | Escribe en la consola del navegador una línea con tu nombre y tu correo, en el idioma de la página. El texto está en `pages.home.console.greeting` |
| **Barra de desplazamiento** | `global.css` (`html { scrollbar-color … }`) | Usa el color del tema, también en Firefox. Los estilos `-webkit-` cubren versiones de Safari anteriores |
| **`humans.txt`** | `src/pages/humans.txt.ts` y `<link rel="author">` en `BaseLayout` | Créditos del sitio, generados con los datos de `site.config.ts` |

### Los títulos como ruta de Linux

`SectionTitle.astro` pinta dos capas en la misma celda: el título normal (lo que leen los lectores de pantalla y los buscadores) y una capa decorativa con la ruta (`~/alex/sobre-mi`), oculta con `clip-path`.

Un script decide **qué sección es la actual**: la que cruza una línea situada al **40 % de la altura de la pantalla**. Solo esa muestra su ruta, que se "escribe" de izquierda a derecha; al pasar a otra, se borra y vuelve el título normal. Si la página llega al final, la última sección cuenta como actual aunque sea demasiado corta para cruzar la línea.

La ruta (`slug`) se calcula del propio título: quita tildes, pasa a minúsculas y cambia espacios por guiones, así que sigue al idioma (`Sobre mí` → `sobre-mi`, `About me` → `about-me`). El prefijo `~/alex/` es una propiedad del componente.

## Navegación

`FloatingNav.astro`:

- **Escritorio (768–1279 px):** barra fija arriba, centrada, al **80 %** del ancho. Al hacer scroll se convierte en una **cápsula** que se estrecha de forma progresiva hasta **528 px** (`MIN_WIDTH`), a lo largo de **1000 px** de scroll (`MAX_SCROLL`).
- **Móvil (< 768 px):** barra fija **abajo** con iconos sobre las etiquetas, y un botón "Tema" que abre un panel hacia arriba con el selector de color, el de modo y el de idioma.
- **Pantallas anchas (desde 1280 px):** lista vertical al pie del panel lateral; ver [El panel lateral](#el-panel-lateral-desde-1280-px).
- **Enlace activo:** marcado con un punto y `aria-current`, calculado con `IntersectionObserver`.
- **Enlaces:** salen de `homeNavItems` en `nav.config.ts` (`#home`, `#about`, `#projects`, `#contact`); los iconos de móvil, del mapa `icons` en la propia `FloatingNav`.
- **Sobre el hero:** mientras la barra no tiene fondo (sin scroll), los botones de tema, modo e idioma usan un borde, texto y tinte claros propios, porque los colores normales son oscuros en modo claro y se perdían sobre el hero oscuro.

## SEO y datos para buscadores

- **`SEO.astro`:** escribe `<title>` (con el formato `Título — Nombre del sitio`), descripción, URL canónica, etiquetas Open Graph y Twitter, y las alternativas por idioma (`hreflang`, con la misma barra final que la URL canónica y omitidas en páginas `noindex` como la 404). Por eso **los textos `meta.title` no deben incluir tu nombre**: un test lo comprueba.
- **JSON-LD (datos estructurados):** `schema.ts` genera dos tipos. La portada emite **`WebSite`** (siempre) y **`Person`** (porque `HomeView` pasa `includePersonSchema`), con tu nombre, rol, correo y enlaces a GitHub y LinkedIn.
- **Archivos generados:** `sitemap-index.xml` y `sitemap-0.xml` (integración de Astro), `robots.txt`, `llms.txt` (mapa del sitio para modelos de lenguaje), `humans.txt` y `manifest.webmanifest`.
- **La dirección del sitio** se lee de dos sitios a la vez (`astro.config.mjs` y `site.config.ts`, ver [`site-url.ts`](../../src/config/site-url.ts)); el build comprueba que **coincidan** y avisa si falta `SITE_URL`.

## El build y lo que genera

`npm run build` = `astro build`. Además de los HTML, `astro.config.mjs` define **cuatro plugins propios** que se enganchan al build:

| Plugin | Cuándo | Qué hace |
|---|---|---|
| `site-url-check` | Al empezar | Avisa en el registro si `SITE_URL` no está definida (se usa el valor por defecto `https://alexxio.dev`) |
| `favicon-assets` | Al terminar | Genera `favicon.svg`, `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png` y los iconos del manifiesto (192 y 512). Usa la **inicial** de `SITE_NAME` y `THEME_COLOR` de `branding.ts` |
| `og-cards` | Al terminar | Genera `og/default.png`, la imagen que sale al compartir el enlace en redes. Toma el título y la descripción de la portada en español (la página más cercana a la raíz); ignora las páginas `noindex`, para que la 404 no dé su texto a la imagen |
| `verify-site-url` | Al terminar | Falla si la dirección de las etiquetas canónicas y la del JSON-LD no coinciden |

> En `npm run dev` **no se generan** el favicon ni las tarjetas, porque los plugins solo corren en el build.

Después, `npm run verify` (`scripts/verify-build.mjs`) comprueba que el resultado sirve: páginas con contenido real, imágenes generadas con la firma correcta y tarjetas presentes.

**Comprobación completa:** `npm run validate` encadena lint → `astro check` → tests → build → verify.

## Accesibilidad y movimiento reducido

- **`prefers-reduced-motion`:** el cursor parpadeante no parpadea, la luz sobre el nombre no se activa, los títulos pasan a ruta sin escribirse, los desplegables se abren sin deslizar, el cursor personalizado desaparece y las apariciones al hacer scroll no se animan.
- **Móvil y pantallas táctiles:** el cursor personalizado y la luz sobre el nombre solo reaccionan con ratón o lápiz, no con el dedo.
- **Teclado y lectores:** los títulos de sección conservan su texto normal; las capas decorativas llevan `aria-hidden`; el enlace activo lleva `aria-current`; hay un enlace "Saltar al contenido" en `BaseLayout`.
- **Textos de interfaz** (etiquetas de botones, `aria-label`, etc.) salen siempre de los archivos de idioma, y un test lo vigila.
