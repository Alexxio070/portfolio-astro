# 02 · ¿Qué archivo edito para conseguir X?

La tabla de consulta rápida. Busca lo que quieres lograr y ve al archivo.

**Cómo leerla**
- Las rutas parten de la raíz del repositorio.
- **`i18n`** significa que hay que hacer el cambio **en los dos idiomas**: `src/i18n/es.json` y `src/i18n/en.json` (deben tener las mismas claves; un test lo comprueba).
- La notación `pages.home.hero.description` es la **ruta dentro del JSON**: abre el archivo, busca `pages` → `home` → `hero` → `description`.
- Si el cambio necesita varios pasos, la última columna remite a una [receta](03-recetas.md).

## Índice

[Textos](#textos) · [Datos personales](#datos-personales-y-del-sitio) · [Proyectos](#proyectos) · [Colores y temas](#colores-y-temas) · [Tipografía y tamaños](#tipografía-y-tamaños) · [Aspecto del hero y animaciones](#aspecto-del-hero-y-animaciones) · [Estructura de la página](#estructura-de-la-página-y-navegación) · [Comportamiento](#comportamiento) · [SEO y publicación](#seo-y-publicación) · [Idiomas](#idiomas) · [Calidad y pruebas](#calidad-y-pruebas)

---

## Textos

| Quiero cambiar… | Edito | Receta |
|---|---|---|
| Mi nombre en el hero (las dos líneas) | i18n → `pages.home.hero.titleLine1` y `titleLine2` | |
| El subtítulo del hero | i18n → `pages.home.hero.description` | |
| El título de la pestaña del navegador | i18n → `pages.home.meta.title` (**sin tu nombre**: la página lo añade sola) | |
| La descripción para buscadores | i18n → `pages.home.meta.description` | |
| El texto de "Sobre mí" (título) | i18n → `pages.home.about.heading` | |
| El contenido de un panel de "Sobre mí" | i18n → `pages.home.about.items[n]` → `title` y `points` | |
| El **icono** de un panel | i18n → `pages.home.about.items[n].icon` (nombre de [Lucide](https://lucide.dev/icons)). Hay que ponerlo igual en ambos idiomas | |
| Añadir o quitar un panel de "Sobre mí" | i18n → lista `pages.home.about.items` | [Panel nuevo](03-recetas.md#añadir-un-panel-a-sobre-mí) |
| El título y la frase de "Proyectos" | i18n → `pages.home.projects.heading` y `lead` | |
| El texto de "Contacto" | i18n → `pages.home.contact.heading` y `description` | |
| El texto del botón de correo | i18n → `pages.home.contact.cta` | |
| El **asunto** del correo que abre Gmail | i18n → `pages.home.contact.subject` | |
| El nombre del botón de correo del hero para lectores de pantalla | i18n → `pages.home.hero.email` | |
| Las etiquetas del menú (Inicio, Sobre mí…) | i18n → `nav.items.home`, `about`, `projects`, `contact` | |
| El texto del selector de modo ("Tema: Claro") | i18n → `common.themeMode`, `common.themeModeTitle` y `theme.light` / `theme.dark` | |
| Los textos de la página 404 | i18n → `errors.*` | |
| El pie de la 404 (`Got questions?`, enlaces) | i18n → `footer.*` **y** `src/config/nav.config.ts` (`footerLinkGroups`, `footerNavItems`) | |

> **Regla:** nunca escribas un texto de interfaz directamente en un componente (`aria-label`, `alt`, `title`…). El test `i18n-coverage` falla si lo haces.

## Datos personales y del sitio

| Quiero cambiar… | Edito | Receta |
|---|---|---|
| Mi correo | `src/config/site.config.ts` → `email` **y** `src/config/nav.config.ts` (el `mailto:` del pie de la 404) | [Cambiar datos de contacto](03-recetas.md#cambiar-correo-o-enlaces-de-contacto) |
| Mis enlaces de GitHub / LinkedIn | `src/config/site.config.ts` → `socialLinks` **y** `src/config/nav.config.ts` (`footerNavItems`, `footerLinkGroups`) | idem |
| El nombre del sitio (el de la pestaña y el de la inicial del favicon) | `src/config/branding.ts` → `SITE_NAME` | |
| El nombre del autor (JSON-LD) | `src/config/site.config.ts` → `author` | |
| Mi rol en una frase (tarjeta para redes, JSON-LD) | `src/config/site.config.ts` → `tagline` | |
| La descripción general del sitio (JSON-LD, manifiesto) | `src/config/site.config.ts` → `description` | |
| Color de la barra del navegador y del favicon | `src/config/branding.ts` → `THEME_COLOR` | |
| Mi foto (para los datos de persona) | `src/config/site.config.ts` → `authorImage` (ruta dentro de `public/`) | [Foto](03-recetas.md#añadir-una-foto-de-perfil) |
| El dominio | `src/config/site-url.ts` y la variable `SITE_URL` del anfitrión | [Publicar](03-recetas.md#publicar-con-un-dominio-propio) |

## Proyectos

| Quiero… | Edito | Receta |
|---|---|---|
| Añadir un proyecto | Un archivo `.md` nuevo en `src/content/projects/es/` y otro en `src/content/projects/en/` | [Añadir un proyecto](03-recetas.md#añadir-un-proyecto) |
| Cambiar un proyecto existente | Su `.md` (el título, `description`, `tags`, `year`, `icon`, `order`…) | |
| Quitar un proyecto | Borrar su `.md` (o `draft: true` para ocultarlo en producción) | |
| Ordenar los proyectos | Campo `order` de cada `.md` (menor = antes) | |
| Que una tarjeta lleve a mi repositorio o a una demo | Solo el `.md` del proyecto: `url:` (o `repo:`). No hay que tocar código | [Tarjeta con enlace](03-recetas.md#hacer-que-una-tarjeta-de-proyecto-sea-un-enlace) |
| Mostrar más (o menos) de 4 proyectos | `src/components/pages/views/HomeView.astro` → `.slice(0, 4)` | |
| Cambiar las columnas de la rejilla | `HomeView.astro` → la clase `md:grid-cols-2` del contenedor de tarjetas | |
| Cambiar el nivel de título de las tarjetas | `ProjectCard.astro` → su `<h3>` (cuelga del `<h2>` de la sección) | |
| Cambiar el aspecto de la tarjeta | `src/components/projects/ProjectCard.astro` (estructura) y `src/components/ui/data-display/Card/card.variants.ts` (marco) | |
| Cambiar qué campos puede tener un proyecto | `src/content.config.ts` (hoy: `title`, `description`, `icon`, `url`, `repo`, `tags`, `order`, `year`, `draft`, `locale`) | |

## Colores y temas

| Quiero… | Edito | Receta |
|---|---|---|
| Cambiar el color predeterminado | `src/layouts/BaseLayout.astro` (`<html … data-theme="blue">`) **y** `DEFAULT_THEME` en `ThemeSelector.astro` y `ThemeSelectorDropdown.astro` (los tres deben coincidir) | [Color por defecto](03-recetas.md#cambiar-el-color-predeterminado) |
| Ajustar los tonos de un tema | `src/styles/themes/<id>.css` → escala `--brand-50 … --brand-900` | |
| Añadir un tema de color nuevo | `themes/<id>.css` + `tokens/colors.css` + `src/lib/themes.ts` + `BaseLayout.astro` (`COLOR_THEMES`) | [Tema nuevo](03-recetas.md#añadir-un-tema-de-color) |
| Quitar un color del selector (sin borrarlo) | `src/lib/themes.ts` → `showInSelector: false` | |
| Cambiar el modo (claro/oscuro) de partida | `src/layouts/BaseLayout.astro` → el script "Theme bootstrap" | |
| Los colores del texto, fondo y bordes (modo claro) | `src/styles/themes/<id>.css` → bloque `html[data-theme="<id>"]` | |
| Los colores del texto, fondo y bordes (modo oscuro) | `src/styles/themes/<id>.css` → bloque `html.dark[data-theme="<id>"]` | |
| El degradado del hero | `src/styles/global.css` → `.hero-dark-gradient` | |
| El color y grosor de los bordes de botones, desplegables y tarjeta de contacto | `src/components/pages/views/HomeView.astro` → variables `--edge-width`, `--edge`, `--edge-hover` | |

## Tipografía y tamaños

| Quiero… | Edito | Receta |
|---|---|---|
| Cambiar las fuentes | `src/styles/global.css` (imports de Fontsource), `--theme-font-*` en cada `src/styles/themes/*.css` y la precarga en `BaseLayout.astro` | [Fuentes](03-recetas.md#cambiar-la-tipografía) |
| El tamaño del texto en general | `src/styles/tokens/typography.css` | |
| El tamaño de mi nombre en el hero | `HomeView.astro` → las clases del `<h1 slot="title">` (`lg:!text-7xl`…) | |
| El espacio entre secciones | `src/styles/tokens/spacing.css` → `--space-section-md` (y la clase `py-[var(--space-section-md)]` de cada `<section>`) | |
| El ancho máximo del contenido | `HomeView.astro` → `max-w-6xl` | |

## Aspecto del hero y animaciones

| Quiero… | Edito | Receta |
|---|---|---|
| Cambiar el cursor parpadeante del subtítulo | `HomeView.astro` → `.hero-caret` (tamaño, color, velocidad en `@keyframes hero-caret-blink`) | |
| Quitar el cursor parpadeante | `HomeView.astro` → borrar el `<span class="hero-caret">` | |
| Cambiar o quitar la luz que sigue al cursor sobre el nombre | `HomeView.astro` → `.hero-name` (CSS) y el `<script>` del final. Para quitarla, borrar ambos y la clase `hero-name` del `<h1>` | |
| Hacer los botones del hero más o menos "saltarines" | `HomeView.astro` → `.hero-actions > a:hover` | |
| Quitar el cursor personalizado de todo el sitio | `src/config/site.config.ts` → `effects.cursorTrail: false` | |
| Cambiar el cursor personalizado | `src/components/effects/CursorTrail.astro` | |
| Hacer que el cursor personalizado también deje estela en el hero | `HomeView.astro` → quitar `data-cursor-calm` del `<Hero>` | |
| Mostrar la rejilla, el resplandor o las manchas de fondo del hero | `HomeView.astro` → props del `<Hero>`: `showGrid`, `showGlow`, `showBlob` y `showHeroHalo` (este último activa `HeroGrid` y `HeroBeam`). Hoy están **todos apagados** (valor por defecto) | |
| Cambiar la altura del hero | `HomeView.astro` → `<Hero … fullHeight size="xl">` | |
| Ajustar la animación de aparición al hacer scroll | `src/styles/global.css` → `[data-reveal]` | |
| Hacer que un elemento nuevo aparezca con animación | Ponerle el atributo `data-reveal` (y `data-reveal-delay="1"`…`"4"` para escalonar) | |
| Cambiar cómo se escriben los títulos de sección | `src/components/pages/SectionTitle.astro` | |
| Cambiar o quitar el título de pestaña que sigue a la sección (`~/alex/…`) | `SectionTitle.astro` → el bloque `document.title = …` del script | |
| Cambiar o quitar el saludo de la consola del navegador | `HomeView.astro` → el `<script is:inline>` del final, y el texto en i18n → `pages.home.console.greeting` | |
| Quitar el fundido al cambiar de claro a oscuro | `src/components/layout/ThemeToggle.astro` → la llamada a `startViewTransition` | |
| Cambiar el color de la barra de desplazamiento | `src/styles/global.css` → `html { scrollbar-color … }` y las reglas `::-webkit-scrollbar` | |
| Cambiar el prefijo `~/alex/` de los títulos | `SectionTitle.astro` → `prefix = '~/alex/'` | |
| Quitar el efecto de ruta de los títulos | `HomeView.astro` → sustituir `<SectionTitle title={…} class="…" />` por un `<h2 class="…">{…}</h2>` | |
| Desactivar la animación de apertura de los desplegables | `HomeView.astro` → `.about-panel::details-content` | |

## Estructura de la página y navegación

| Quiero… | Edito | Receta |
|---|---|---|
| Añadir una sección nueva | `HomeView.astro` + `nav.config.ts` (`homeNavItems`) + `FloatingNav.astro` (`icons`) + i18n | [Sección nueva](03-recetas.md#añadir-una-sección-nueva) |
| Quitar una sección | `HomeView.astro` (su `<section>`), `homeNavItems`, `FloatingNav.astro` (`icons`) y sus textos i18n | [Quitar sección](03-recetas.md#quitar-una-sección) |
| Cambiar el orden de las secciones | El orden de los `<section>` en `HomeView.astro` **y** el campo `order` en `homeNavItems` | |
| Añadir, quitar o renombrar un enlace del menú | `src/config/nav.config.ts` → `homeNavItems` (+ `icons` de `FloatingNav.astro` para el móvil) | |
| Cambiar el icono de un enlace en móvil | `FloatingNav.astro` → el mapa `icons` | |
| Cambiar el ancho a partir del cual aparece el panel lateral (1280 px) | `HomeView.astro` → `@media (min-width: 1280px)` (y el mismo valor en `FloatingNav.astro` y en el script de la rejilla) | |
| Cambiar el aspecto del panel lateral fijo | `HomeView.astro` → `.home-split` y reglas siguientes del bloque `@media (min-width: 1280px)` | |
| Cambiar o quitar la rejilla de puntos con luz de cursor | `HomeView.astro` → `.home-content::before` / `::after` y el segundo `<script>` | |
| Cambiar el ancho de la barra al hacer scroll | `FloatingNav.astro` → `MIN_WIDTH` (528) y `MAX_SCROLL` (1000), y la clase `md:w-[80%]` | |
| Cambiar la altura de una sección | La clase del `<section>` en `HomeView.astro` (por ejemplo `min-h-[80svh]` en contacto) | |
| Cambiar el número de columnas de los paneles de "Sobre mí" | `HomeView.astro` → `aboutColumns` (más de 6 paneles abre una tercera columna) | |
| Que los paneles de "Sobre mí" puedan abrirse a la vez | `HomeView.astro` → quitar `name="about-panels"` de los `<details>` | |
| Cambiar la página 404 | `src/pages/404.astro` y la sección `errors` de i18n | |
| Cambiar la cabecera o el pie (solo se ven en la 404) | `src/components/layout/Header.astro` y `Footer.astro` | |
| Cambiar el logotipo (cuadrado con la inicial) | `src/components/ui/marketing/Logo/Logo.astro` | |

## Comportamiento

| Quiero… | Edito | Receta |
|---|---|---|
| Que el botón de correo abra otra cosa (p. ej. `mailto:`) | `HomeView.astro` → la constante `mailto` de la cabecera | |
| Añadir un botón de descarga del CV | `HomeView.astro` → `<Fragment slot="actions">`, y el PDF en `public/` | [CV](03-recetas.md#añadir-un-botón-de-descarga-del-cv) |
| Añadir otro botón de red social en el hero | `HomeView.astro` → `slot="actions"`; `socialLinks` filtra las redes que salen (`github`, `linkedin`) | |
| Cambiar qué redes salen en los botones del hero | `HomeView.astro` → `['github', 'linkedin']` en `socialLinks` | |
| Cambiar los iconos de los botones | `src/components/ui/primitives/Icon/Icon.astro` (mapa de nombres de marca) | |
| Cambiar el aspecto de todos los botones | `src/components/ui/form/Button/button.variants.ts` | |
| Cambiar el aspecto de todas las tarjetas | `src/components/ui/data-display/Card/card.variants.ts` | |
| Cambiar el comportamiento del selector de color | `ThemeSelector.astro` / `ThemeSelectorDropdown.astro` | |
| Cambiar el interruptor claro/oscuro | `src/components/layout/ThemeToggle.astro` | |
| Que el color elegido se recuerde entre visitas | `ThemeSelector*.astro` → cambiar `sessionStorage` por `localStorage` (en los dos) y el `sessionStorage` equivalente de `BaseLayout.astro` | |

## SEO y publicación

| Quiero… | Edito | Receta |
|---|---|---|
| Cambiar las etiquetas `<meta>` (título, Open Graph, Twitter) | `src/components/seo/SEO.astro` | |
| Activar o desactivar los datos estructurados de persona | `HomeView.astro` → prop `includePersonSchema` de `<LandingLayout>` | |
| Cambiar qué dice el JSON-LD | `src/lib/schema.ts` | |
| Cambiar la imagen que sale al compartir el enlace | `src/config/site.config.ts` → `ogImage`. Por defecto se **genera** en el build; para usar la tuya, ponla en `public/` y apunta ahí | [Imagen para redes](03-recetas.md#usar-mi-propia-imagen-para-compartir-en-redes) |
| Cambiar el favicon | Se genera con la inicial de `SITE_NAME` y `THEME_COLOR`. Para uno propio, ver la receta | [Favicon](03-recetas.md#usar-mi-propio-favicon) |
| Cambiar las reglas de `robots.txt` | `src/pages/robots.txt.ts` | |
| Cambiar el contenido de `llms.txt` | `src/pages/llms.txt.ts` | |
| Cambiar el contenido de `humans.txt` | `src/pages/humans.txt.ts` (usa los datos de `site.config.ts`) | |
| Cambiar el manifiesto (nombre al instalar la web como app) | `src/pages/manifest.webmanifest.ts` | |
| Verificar la propiedad del sitio en Google o Bing | Variables de entorno `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` en el anfitrión | |
| Definir el dominio al publicar | Variable `SITE_URL` en el anfitrión (`.env.example` muestra el formato) | [Publicar](03-recetas.md#publicar-con-un-dominio-propio) |

## Idiomas

| Quiero… | Edito | Receta |
|---|---|---|
| Añadir un idioma | `src/i18n/<código>.json`, `src/config/i18n.config.ts`, `src/__tests__/i18n-coverage.test.ts` y los proyectos | [Idioma nuevo](03-recetas.md#añadir-un-idioma) |
| Cambiar el idioma por defecto | `src/config/i18n.config.ts` → `defaultLocale` (y el nuevo idioma pasa a vivir en `/`) | |
| Quitar el selector de idioma | `i18n.config.ts` → dejar una sola entrada en `locales` | |
| Cambiar el nombre con el que aparece un idioma | `i18n.config.ts` → `localeNames` | |

## Calidad y pruebas

| Quiero… | Edito / ejecuto | Receta |
|---|---|---|
| Comprobar que todo está bien | `npm run validate` | [Comandos](04-comandos-y-comprobaciones.md) |
| Añadir un test | Un archivo `*.test.ts` en `src/__tests__/` | |
| Cambiar las reglas de estilo | `eslint.config.js`, `.prettierrc` | |
| Cambiar la versión de Node recomendada | `.nvmrc` y `engines` en `package.json` | |
