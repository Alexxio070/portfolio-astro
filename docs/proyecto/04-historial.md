# 04 · Historial de cambios

Los 40 commits del repositorio, agrupados por etapas, con lo que hizo cada uno y por qué. Fechas de 2026, hora local.

**Cómo leerlo:**
- Las ramas son `main` (publicable) y `pruebas` (trabajo). Hoy `main` tiene un único commit con todos los archivos (un *squash*) y `pruebas` guarda la historia detallada. Por eso aquí aparecen commits que **no están en `main`**.
- Para ver cualquiera: `git show <hash>`.
- Para ver solo los títulos: `git log --oneline pruebas`.

## Resumen en una tabla

| Etapa | Fechas | Qué se consiguió |
|---|---|---|
| [0. Punto de partida](#0-punto-de-partida) | 4–5 oct | Plantilla mínima de Astro y una página provisional |
| [1. Traer Rocket y recortarlo](#1-traer-rocket-y-recortarlo) | 6 oct | Base real, estática, sin blog ni servicios |
| [2. Convertirlo en una sola página](#2-convertirlo-en-una-sola-página) | 6–7 oct | Portada única, sobre mí, español, barra flotante |
| [3. Limpieza de lo heredado](#3-limpieza-de-lo-heredado) | 6–7 oct | Fuera ejemplos, documentos y páginas huérfanas |
| [4. Contenido y animaciones del hero](#4-contenido-y-animaciones-del-hero) | 7 oct | Identidad, textos, Gmail, símbolos de programación |
| [5. Catálogo fuera y publicación en `main`](#5-catálogo-fuera-y-publicación-en-main) | 7 oct | De 200 a 86 archivos y squash a `main` |
| [6. Segunda vuelta: pulido](#6-segunda-vuelta-pulido) | 8 oct | Cursor, espiral y su sustitución por detalles sutiles |
| [7. Personalidad y limpieza final](#7-personalidad-y-limpieza-final) | 8 oct | Títulos como ruta de Linux, proyecto, tema, textos |
| [8. Detalles finales y panel lateral](#8-detalles-finales-y-panel-lateral) | 8–9 oct | Documentación, pequeños detalles, limpieza de configuración y diseño con panel fijo |

---

## 0. Punto de partida

| Hash | Fecha | Commit | Qué es |
|---|---|---|---|
| `9312020` | 4 oct 01:19 | feat: proyecto base de Astro con plantilla minimal | La plantilla vacía de Astro con la que se creó el repositorio |
| `03c7e05` | 5 oct 00:47 | pagina de WIP añadida | Una página provisional de "en construcción" |

Ambos fueron **sustituidos por completo** en la etapa siguiente. No dejan nada en el proyecto actual.

## 1. Traer Rocket y recortarlo

| Hash | Fecha | Commit | Qué hizo |
|---|---|---|---|
| `a7b6a06` | 6 oct 00:56 | feat: base desde Astro Rocket | Sustituye la plantilla mínima por **Astro Rocket** (MIT), copiada sin su historial desde el commit `040bd1a8…`. Conserva su `LICENSE`. Exige Node ≥ 22.12. Añade `referencias/` al `.gitignore` (para guardar en local la copia de Darkminimal) y el plan de fases. **424 archivos.** |
| `b796db5` | 6 oct 00:58 | refactor: sitio estático sin backend, despliegue ni formularios | Lo deja como estático puro: borra Docker, Netlify, Vercel, Cloudflare, `.github/`, las rutas `/api` y los formularios de contacto y newsletter. **Pasa de pnpm a npm.** Quita variables de entorno de Resend |
| `817f69b` | 6 oct 00:58 | refactor: eliminar blog, servicios y página sobre mí | Recorta a lo necesario para una página: fuera el blog completo y las páginas `about` y `services`. **De 89 páginas a 13.** Se conservan i18n, la página de componentes, la 404 y el selector de tema |
| `b9b84ac` | 6 oct 01:05 | Merge pull request #1 de `pruebas` | La única fusión por pull request. Subió esas tres etapas a `main` |

Aquí se fijaron las reglas de trabajo: **solo en `pruebas`, commits cortos y propuestos antes de hacerlos**.

## 2. Convertirlo en una sola página

| Hash | Fecha | Commit | Qué hizo |
|---|---|---|---|
| `fc8cd58` | 6 oct 10:35 | refactor: eliminar búsqueda, analítica y consentimiento | Quita la búsqueda (con su dependencia `pagefind`), el banner de cookies, la analítica y el mapa de Google |
| `f75790f` | 6 oct 12:19 | feat: portada de una sola página con secciones | **El cambio central.** La portada pasa a ser una página con `#home`, `#projects` y `#contact`. Conserva el aspecto y las animaciones de Rocket. Correo y redes con valores de ejemplo |
| `e7a1219` | 6 oct 13:41 | feat: añadida sección sobre mí y traducción al español | Aparece `#about` y se añade el **español** |
| `e4ef92c` | 6 oct 13:42 | feat: header flotante que cambia su apariencia al hacer scroll | La barra flotante: arranca al 80 % del ancho y se hace cápsula al hacer scroll. Abajo en móvil |

## 3. Limpieza de lo heredado

| Hash | Fecha | Commit | Qué hizo |
|---|---|---|---|
| `738720d` | 6 oct 23:46 | refactor: eliminar proyectos de ejemplo, AGENTS.md y registro de componentes | Fuera los 7 proyectos de ejemplo, `AGENTS.md` (la guía de Rocket para IA, que describía cosas que ya no existían) y `component-registry.json` (un catálogo que ningún código leía). **Se retira el test que comprobaba ese catálogo** porque ya no tenía sentido |
| `fc33f99` | 6 oct 23:52 | refactor: eliminar README de Rocket | Borra el README heredado, que documentaba el blog, Resend y Docker |
| `2df2f98` | 7 oct 00:22 | refactor: eliminar páginas de proyectos y contacto | Las rutas `/projects` y `/contact` ya no tenían enlaces desde la portada. Se borran con sus vistas, y la 404, el pie y la navegación apuntan a `/#projects` y `/#contact` |
| `43d61a6` | 7 oct 00:22 | fix: botones del header visibles sobre el hero | Los controles de tema, modo e idioma se perdían sobre el hero oscuro mientras la barra no tenía fondo. Reciben un borde, texto y tinte claros propios |
| `d2bb51c` | 7 oct 00:22 | feat: desplegables Hard skills y Soft skills en sobre mí | Renombra "My stack" a **Hard skills** y añade **Soft skills** (en español, "Habilidades técnicas" y "Habilidades blandas") |

## 4. Contenido y animaciones del hero

| Hash | Fecha | Commit | Qué hizo |
|---|---|---|---|
| `d3618b1` | 7 oct 13:17 | feat: título y párrafo del hero animados con scroll | El texto del hero se rompía en grupos de letras que se juntaban con el scroll. **Se retiró en el commit siguiente** (ver [decisiones](05-decisiones-y-descartes.md)) |
| `283293a` | 7 oct 22:45 | feat: fondo de símbolos de programación en el hero | Un campo de símbolos (`{ } ; =` …) que flotan y caen. El cursor los recoge y los suelta. Quita la animación del texto del commit anterior |
| `78b0ffd` | 7 oct 22:45 | feat: identidad y datos de contacto propios | Cambia el nombre, el autor y los enlaces de la plantilla por los de Alejandro Vizán: correo, GitHub, LinkedIn. Quita la dirección postal y la cuenta de X de ejemplo |
| `05f622d` | 7 oct 22:45 | feat: textos del portfolio en español e inglés | Escribe el contenido real: titular, presentación y los paneles de sobre mí (añade experiencia laboral y renombra certificaciones) |
| `ffb498b` | 7 oct 22:45 | feat: los botones de correo abren la ventana de Gmail | Sustituye `mailto:` (inútil sin programa de correo) por la ventana de redactar de Gmail, con asunto puesto |

## 5. Catálogo fuera y publicación en `main`

| Hash | Fecha | Commit | Qué hizo |
|---|---|---|---|
| `b955093` | 7 oct 23:26 | chore: apunta SITE_URL a alexxio.dev | El dominio provisional `example.com` viajaba en las URLs canónicas, el sitemap y las tarjetas. Pasa a `alexxio.dev` por defecto |
| `6fddc41` | 7 oct 23:26 | chore: borra los recursos de ejemplo de Rocket | Fuera el avatar de relleno, los 7 retratos y los 2 banners de demostración, y el script que los generaba |
| `1d6abaa` | 7 oct 23:26 | refactor: borra el catálogo de componentes y sus dependencias | Fuera la página `/components` y **114 archivos** que solo ella alcanzaba (los 60 gemelos en React, los patrones, la librería). Sin ningún `.tsx` se eliminan también **React** y seis dependencias |
| `c5c6f46` | 7 oct 23:34 | feat: portfolio personal de una sola página | **El squash a `main`.** Un solo commit con todos los archivos, sin arrastrar commits ni PRs. De 89 páginas a 2 y de 200 archivos de código a 86 |

## 6. Segunda vuelta: pulido

Solo en `pruebas`. Los dos primeros se hicieron en la sesión de asistencia; los dos siguientes (`166e6af` y `a6c311b`) se hicieron fuera de ella y llegaron con un `git pull`.

| Hash | Fecha | Commit | Qué hizo |
|---|---|---|---|
| `9eceae4` | 8 oct 13:52 | feat: cursor sin aro ni estela sobre el hero | Dentro del hero (`data-cursor-calm`) el cursor personalizado deja solo el punto, para que no compitan dos efectos |
| `7aba1e4` | 8 oct 13:53 | feat: espiral de símbolos alrededor del cursor en el hero | Una espiral de un brazo y tres vueltas que se forma donde el cursor se detiene. **Se sustituyó dos commits después** |
| `166e6af` | 8 oct 19:49 | refactor: quita el fondo de símbolos del hero y añade detalles sutiles | Fuera `ParticleField` (los símbolos y la espiral). Entran el **cursor de terminal** parpadeante, la **luz que sigue al cursor** sobre el nombre y las micro-interacciones |
| `a6c311b` | 8 oct 19:49 | style: bordes de 2px en el color del tema para botones, desplegables y contacto | Una sola variable de grosor y color, derivada del color del tema un paso más oscuro |

## 7. Personalidad y limpieza final

| Hash | Fecha | Commit | Qué hizo |
|---|---|---|---|
| `76076b3` | 8 oct 21:25 | refactor: quita la tira de logos y las etiquetas, y recompone contacto | Fuera la tira con el stack de la plantilla (Astro, React, Vercel…), las etiquetas sobre los títulos y la colección `stack`. El hero se centra en vertical; contacto gana altura y una tarjeta compacta |
| `a3efc0b` | 8 oct 21:25 | feat: títulos de sección que se escriben como una ruta de Linux | `~/alex/sobre-mi`: la ruta de la sección actual se escribe al llegar y se borra al pasar a otra |
| `b550e4a` | 8 oct 21:42 | feat: añade el portfolio como primer proyecto | Tarjeta del propio portfolio en español e inglés, con Tailwind 4, Astro 7, HTML y CSS. Sin enlace |
| `b78d6a8` | 8 oct 21:42 | refactor: elimina la opción de sistema del selector de tema | El modo "sistema" parecía no hacer nada. Queda un interruptor claro/oscuro; la primera visita sigue al sistema |
| `7f83505` | 8 oct 22:04 | fix: mejora de textos | Traducción al inglés más natural (*Cross-platform application developer*, *Higher Vocational Diploma*…) y corrección de incoherencias: el grado superior pasa a "en curso" (2025–2027) |
| `368538a` | 8 oct 22:17 | chore: elimina textos sin uso y actualiza el esquema de persona | Fuera **64 textos** sin uso en inglés y español, y la identidad de "Astro Rocket" del esquema de persona, que ahora usa tus datos y se activa en la portada |

## 8. Detalles finales y panel lateral

| Hash | Fecha | Commit | Qué hizo |
|---|---|---|---|
| `3dff1ca` | 8 oct 23:00 | docs: documentación del proyecto y guía de Astro | Esta documentación (`docs/proyecto/`) y la guía para trabajar con el proyecto (`docs/guia-astro/`). Mueve el plan original a `docs/proyecto/plan-original.md` |
| `d8bfb26` | 8 oct 23:14 | feat: título de pestaña vivo, saludo en la consola y humans.txt | El título de la pestaña sigue a la sección que se está viendo, un saludo en la consola del navegador para quien la abra, y `humans.txt` |
| `a4b80d5` | 8 oct 23:14 | style: barra de desplazamiento del color del tema y fundido claro/oscuro | La barra de desplazamiento toma el color del tema, y el cambio entre modo claro y oscuro se funde en vez de saltar |
| `8a933a1` | 9 oct 12:18 | chore: limpia los restos del blog y de la plantilla en la configuración | `package.json` con los datos del portfolio; fuera la configuración del blog y de los comentarios de `site.config.ts`, `lib/tags.ts` y `lib/content-validation.ts` con su test, y `lib/projects.ts` reducido a lo que usa la portada. **Quedan 76 tests** |
| `7ce0d33` | 9 oct 12:19 | feat: panel lateral fijo en pantallas anchas | A partir de 1280 px el hero pasa a ser un panel fijo a la izquierda y las secciones se desplazan a su derecha; la navegación se vuelve vertical. Por debajo de 1280 px no cambia nada. Corrige de paso el color de la barra de Safari, que pintaba de negro el fondo en modo claro |

## Cifras acumuladas

| Medida | Rocket al llegar (`a7b6a06`) | Hoy |
|---|---|---|
| Archivos en el commit base | 424 | — |
| Páginas generadas | 89 | 3 |
| Archivos de código (`.astro .ts .css`) en `src/` | ~200 | 82 |
| Tests | 103 (medidos en `738720d`) | 76 |
| Paquetes de React (integración y dependencias) | 7 | 0 |

## Qué NO está en `main`

`main` está en el commit `c5c6f46`. Todo lo de las etapas 6, 7 y 8 **solo está en `pruebas`** (32 commits por delante de `main`). Para publicarlo hay que repetir el *squash* de `pruebas` a `main` y subirlo, cuando decidas.
