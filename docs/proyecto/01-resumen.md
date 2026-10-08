# 01 · Resumen del proyecto

## Qué es

El portfolio personal de **Alejandro Vizán**: una web de **una sola página**, **bilingüe** (inglés y español), **estática** y sin servidor, pensada para ponerla en el currículum y enseñarla a empresas, sobre todo consultoras de software.

- **Dominio previsto:** `alexxio.dev` (todavía sin comprar a fecha de esta documentación).
- **Repositorio:** `Alexxio070/portfolio-astro` (privado).
- **Ramas:** el trabajo vive en `pruebas`. `main` recibe una copia de los archivos (squash) solo cuando se decide publicar.

## Qué tiene

Una portada con cuatro bloques, a los que se salta con anclas:

| Bloque | Ancla | Contenido |
|---|---|---|
| Inicio | `#home` | Nombre, subtítulo con cursor de terminal parpadeante, botones de GitHub, LinkedIn y correo |
| Sobre mí | `#about` | Seis desplegables: quién soy, estudios, experiencia, habilidades técnicas, habilidades blandas, cursos y certificaciones |
| Proyectos | `#projects` | Tarjetas de proyectos (hoy una: el propio portfolio) |
| Contacto | `#contact` | Tarjeta con el correo y un botón que abre Gmail |

Además:

- **Barra de navegación flotante** que cambia de aspecto al hacer scroll.
- **Selector de color** (8 temas) y **selector claro/oscuro**.
- **Selector de idioma** inglés/español. El inglés está en `/` y el español en `/es/`.
- **Títulos de sección que se escriben como una ruta de Linux** (`~/alex/sobre-mi`) al llegar a ellos con el scroll.
- **Página 404** propia.
- Archivos de SEO generados: `sitemap`, `robots.txt`, `llms.txt`, `manifest`, favicon y tarjeta para compartir en redes (`og/default.png`), más datos estructurados (JSON-LD) de sitio y de persona.

## Qué no tiene (a propósito)

- **Sin backend, sin formularios, sin base de datos.** El contacto es un enlace a Gmail y la dirección impresa.
- **Sin blog, tienda, servicios, búsqueda, analítica ni aviso de cookies.**
- **Sin React.** Todo es Astro y TypeScript; la única JavaScript del navegador son pequeños `<script>` dentro de los propios componentes.
- **Sin cuentas ni datos personales de visitantes.** No guarda nada en servidor. En el navegador solo guarda dos preferencias del visitante (ver más abajo).

## Tecnologías

| Pieza | Versión / detalle |
|---|---|
| [Astro](https://astro.build) | 7.3.1, modo `output: 'static'` |
| [Tailwind CSS](https://tailwindcss.com) | 4.3 (con el plugin de Vite, sin Sass) |
| TypeScript | 5.7 |
| Contenido | Colecciones de contenido de Astro (`projects`) en Markdown/MDX |
| Iconos | `astro-icon` con los sets Lucide (interfaz) y Simple Icons (marcas) |
| Tipografías | Fontsource, autoalojadas: Manrope (texto), Outfit (títulos), JetBrains Mono (código y rutas) |
| Variantes de componentes | `class-variance-authority` y `tailwind-merge` |
| Imágenes generadas | `sharp` y `fontkit` (favicon y tarjeta para redes, al compilar) |
| Pruebas | Vitest |
| Calidad | ESLint, Prettier, `astro check` |
| Node | `>=22.12.0` (ver `.nvmrc`) |
| Gestor de paquetes | **npm** (`package-lock.json`) |

## De dónde viene

La base es **Astro Rocket** (licencia MIT, de Hans Martens), copiada tal cual desde su commit `040bd1a8f207706386fa5ffdfb74bf1c930376f7` y **sin su historial**. Se conserva su archivo `LICENSE`, como exige la licencia.

Rocket venía con un blog, tienda, formularios, 44 componentes de demostración y 89 páginas. Todo eso se fue eliminando hasta dejar lo que usa la portada. Las cifras de ese recorte:

| | Antes (Rocket) | Ahora |
|---|---|---|
| Páginas generadas | 89 | 3 (`/`, `/es/`, `404`) |
| Archivos de código en `src/` (`.astro`, `.ts`, `.css`) | ~200 | 84 |
| Librería de componentes `src/components/ui/` | decenas | 9 archivos |

> El historial completo, commit a commit, está en [04-historial.md](04-historial.md).

## Qué guarda en el navegador del visitante

| Dato | Dónde | Duración | Para qué |
|---|---|---|---|
| `theme` (`light` o `dark`) | `localStorage` | Permanente | Recordar el modo claro/oscuro elegido |
| `color-theme` | `sessionStorage` | Hasta cerrar la pestaña | Recordar el color elegido durante la visita |

Si nunca ha elegido modo, se usa el del sistema del visitante, una sola vez al cargar. No hay cookies ni rastreo.

## Reglas con las que se trabajó

Salen del plan original ([plan-original.md](plan-original.md)) y se mantuvieron durante todo el desarrollo:

- Todo el trabajo en la rama `pruebas`, nunca en `main`.
- Commits convencionales y cortos, con autor `Alexxio`, **sin firmas de herramientas** de terceros.
- Proponer el mensaje y esperar aprobación antes de cada commit; sin `push` ni PR sin petición expresa.
- Tailwind 4 con los tokens de Rocket; sin Sass.
- Nada de secretos en el código, los commits ni los registros.
