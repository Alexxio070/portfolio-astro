# 02 · Estructura del código

Mapa de lo que hay en el repositorio y para qué sirve cada cosa. Si buscas **qué tocar para conseguir algo**, ve a [la guía](../guia-astro/02-que-archivo-editar.md); esta página es el mapa.

## La raíz

| Elemento | Qué es |
|---|---|
| `astro.config.mjs` | Configuración de Astro: modo estático, `site`, idiomas, integraciones y cuatro pequeños "plugins de build" propios (ver [03](03-como-funciona.md#el-build-y-lo-que-genera)) |
| `package.json`, `package-lock.json` | Dependencias y scripts (`npm run …`) |
| `tsconfig.json` | TypeScript. Define el alias `@/` → `src/` |
| `vitest.config.ts` | Configuración de los tests |
| `eslint.config.js`, `.prettierrc`, `.prettierignore` | Reglas de estilo y calidad |
| `.env.example` | Plantilla de variables de entorno. Solo contiene `SITE_URL` |
| `.nvmrc` | Versión de Node recomendada |
| `LICENSE` | Licencia MIT de Astro Rocket. **No se borra:** la licencia obliga a conservarla |
| `public/` | Archivos que se copian tal cual al raíz del sitio. Hoy no hay ninguno: la carpeta se crea cuando hace falta (por ejemplo, para un PDF de CV) |
| `scripts/` | Comprobaciones que se ejecutan tras el build |
| `docs/` | Esta documentación |
| `src/` | Todo el código del sitio |

### Carpetas que existen en tu ordenador pero no en el repositorio

Están en `.gitignore` y **no se suben nunca**:

| Carpeta | Para qué |
|---|---|
| `node_modules/` | Dependencias instaladas |
| `dist/` | Resultado del build (la web ya compilada) |
| `.astro/` | Caché y tipos generados por Astro |
| `referencias/` | Copia local de Darkminimal (otro portfolio) usada como referencia visual. ESLint y Prettier la ignoran |
| `.claude/` | Configuración local de la herramienta de asistencia (permisos, no forma parte del sitio) |

## `src/`

```
src/
├── pages/            ← qué URLs existen
├── layouts/          ← la "carcasa" HTML de cada página
├── components/       ← las piezas visuales
├── config/           ← datos del sitio, idiomas, navegación
├── i18n/             ← textos en cada idioma + la función t()
├── content/          ← contenido en Markdown (proyectos)
├── content.config.ts ← esquema de ese contenido
├── lib/              ← utilidades de código
├── styles/           ← CSS global, colores, temas, tipografía
├── __tests__/        ← tests
└── test/stubs/       ← apoyo para los tests
```

### `src/pages/` — las URLs

| Archivo | URL | Función |
|---|---|---|
| `index.astro` | `/` | La portada en el idioma por defecto (inglés). Solo pinta `HomeView` |
| `[locale]/index.astro` | `/es/` | La misma portada en cada idioma secundario. Genera una página por idioma |
| `404.astro` | página de error | Usa `PageLayout` (con cabecera y pie) |
| `llms.txt.ts` | `/llms.txt` | Resumen del sitio en texto plano para modelos de lenguaje: páginas por idioma, secciones, perfiles y correo |
| `humans.txt.ts` | `/humans.txt` | Créditos: quién hizo el sitio y con qué. Se genera con los datos de `site.config.ts` |
| `robots.txt.ts` | `/robots.txt` | Reglas para rastreadores |
| `manifest.webmanifest.ts` | `/manifest.webmanifest` | Manifiesto de aplicación web |

### `src/layouts/` — la carcasa

| Archivo | Para qué |
|---|---|
| `BaseLayout.astro` | **La base de todo.** Escribe `<html>`, el `<head>` (SEO, fuentes, JSON-LD), el script que decide el tema claro/oscuro antes de pintar, el script de las animaciones de aparición al hacer scroll y el botón de volver arriba |
| `LandingLayout.astro` | Envuelve a `BaseLayout` y añade la barra flotante. Lo usa la portada. No tiene pie |
| `PageLayout.astro` | Envuelve a `BaseLayout` y añade cabecera y pie. Solo lo usa la 404 |

### `src/components/`

| Carpeta | Contenido |
|---|---|
| `pages/views/HomeView.astro` | **La portada entera.** Hero, Sobre mí, Proyectos, Contacto, y sus estilos y scripts propios |
| `pages/SectionTitle.astro` | El título de sección que se escribe como ruta de Linux |
| `hero/` | `Hero.astro` (el contenedor del hero con sus opciones), `hero.variants.ts` (clases por tamaño) y `index.ts` |
| `layout/FloatingNav.astro` | La barra flotante (escritorio arriba, móvil abajo) |
| `layout/ThemeToggle.astro` | El interruptor claro/oscuro |
| `layout/ThemeSelector.astro` y `ThemeSelectorDropdown.astro` | El selector de color (versión del panel móvil y versión desplegable de escritorio) |
| `layout/LanguageSwitcher.astro` | El selector de idioma |
| `layout/Header.astro`, `Footer.astro` (+ `header.variants.ts`, `footer.variants.ts`) | Cabecera y pie. **Solo los usa la 404** |
| `effects/CursorTrail.astro` | El punto, el aro y la estela que siguen al cursor |
| `effects/HeroGrid.astro`, `HeroBeam.astro` | Decoración de fondo que usa `Hero.astro` |
| `projects/ProjectCard.astro` | La tarjeta de un proyecto |
| `seo/SEO.astro`, `seo/JsonLd.astro` | Etiquetas `<meta>` y bloques de datos estructurados |
| `ui/…` | Los 9 archivos de interfaz que se usan: `Button`, `Card`, `Badge`, `Icon`, `Logo` (+ sus archivos de variantes) y `accordion.variants.ts` |

> `ui/overlay/Accordion/accordion.variants.ts` solo aporta estilos: los desplegables de "Sobre mí" son `<details>` nativos, no un componente.

### `src/config/` — los datos del sitio

| Archivo | Qué decide |
|---|---|
| `site.config.ts` | Nombre, descripción, etiqueta (`tagline`), correo, autor, redes sociales, efectos. **El panel de control principal** |
| `branding.ts` | `SITE_NAME` (y la inicial del favicon) y `THEME_COLOR` (color de la barra del navegador). Está aparte porque `astro.config.mjs` lo necesita antes de que exista el resto |
| `site-url.ts` | El dominio por defecto (`https://alexxio.dev`). Por la misma razón que `branding.ts` |
| `i18n.config.ts` | Idiomas activos, idioma por defecto y nombres de idioma |
| `nav.config.ts` | Enlaces de la barra, del pie y de la 404 |

### `src/i18n/` — los textos

| Archivo | Para qué |
|---|---|
| `en.json`, `es.json` | Todos los textos de interfaz, uno por idioma. **`en.json` es el canónico**: `es.json` debe tener exactamente las mismas claves |
| `index.ts` | La función `t('clave', idioma)` y utilidades de rutas por idioma. Carga solo cualquier `.json` que haya en la carpeta |

### `src/content/` y `content.config.ts`

`src/content/projects/{en,es}/*.md` son los proyectos. `content.config.ts` define la colección `projects` y qué campos admite cada proyecto (ver [la receta para añadir uno](../guia-astro/03-recetas.md#añadir-un-proyecto)).

### `src/lib/` — utilidades

| Archivo | Para qué |
|---|---|
| `themes.ts` | Lista de los 8 temas de color y su color de muestra |
| `projects.ts` | Cargar los proyectos de un idioma, ordenados, y ocultar los borradores en producción |
| `schema.ts` | Genera los datos estructurados JSON-LD: de sitio y de persona |
| `utils.ts`, `cn.ts` | Utilidades: enlaces externos, iconos de redes sociales y combinador de clases CSS |
| `footer.ts` | Construye los grupos de enlaces del pie (solo se muestra en la 404) |
| `focus-trap.ts` | Mantiene el foco dentro de un panel abierto (accesibilidad) |
| `favicon/`, `og/` | Generan el favicon y la tarjeta para redes al compilar |

### `src/styles/` — el CSS

| Archivo | Para qué |
|---|---|
| `global.css` | Punto de entrada: importa Tailwind, los tokens y las fuentes. Contiene las animaciones de aparición, el degradado del hero y estilos de botones |
| `tokens/colors.css` | Importa los 8 temas y define los colores semánticos |
| `tokens/primitives.css` | Escalas de color base (grises, etc.) |
| `tokens/typography.css`, `spacing.css` | Tamaños de texto y espaciados |
| `themes/<color>.css` | Un archivo por tema: la escala `--brand-50 … 900` y las superficies, en modo claro y oscuro |

### `scripts/`

| Archivo | Para qué |
|---|---|
| `verify-build.mjs` | Comprueba que el build produjo un sitio utilizable (páginas, imágenes generadas, tarjetas) |
| `site-url-agreement.mjs` | Comprueba que la dirección del sitio coincide en las etiquetas canónicas y en el JSON-LD |

## Cómo se conectan las piezas

Si quieres borrar o cambiar algo, esta es la cadena de dependencias (comprobada leyendo los `import` de cada archivo):

```
pages/index.astro ─────────┐
pages/[locale]/index.astro ┴→ HomeView.astro
                                ├→ LandingLayout → BaseLayout ┬→ SEO, JsonLd
                                │                             └→ CursorTrail
                                │                 └→ FloatingNav ┬→ ThemeToggle
                                │                                ├→ ThemeSelector, ThemeSelectorDropdown
                                │                                ├→ LanguageSwitcher
                                │                                └→ Icon
                                ├→ Hero → HeroGrid, HeroBeam
                                ├→ SectionTitle
                                ├→ ProjectCard → Card, Icon
                                └→ Button, Card, Icon

pages/404.astro → PageLayout → BaseLayout
                             ├→ Header → Logo, Button, Icon, ThemeToggle, ThemeSelector, ThemeSelectorDropdown, LanguageSwitcher
                             └→ Footer → Logo, Icon
```

La carpeta `src/components/` tiene 29 archivos en total, contando los de variantes (`*.variants.ts`) y los `index.ts`.
