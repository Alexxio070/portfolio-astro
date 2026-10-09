# 06 · Estado y pendientes

Foto del proyecto a **9 de octubre de 2026** (rama `pruebas`, tras el barrido de limpieza general), con lo que falta, lo que se sabe que está a medias y los límites conocidos.

## Estado de las comprobaciones

| Comprobación | Resultado |
|---|---|
| `npm run build` | Correcto, 3 páginas |
| `npm run test:run` | 63 tests en verde |
| `npm run check` (`astro check`) | 0 errores, 0 avisos, 0 sugerencias |
| `npm run lint` | 0 errores, 2 avisos de `console` en `scripts/verify-build.mjs` (heredados, intencionados) |
| `npm run verify` | "output looks good" |

| `npm run format:check` | **Falla en 52 archivos de `src/`**, y fallaba antes de empezar: la plantilla alineaba columnas a mano (sobre todo en los CSS de temas) y Prettier las reformaría. No forma parte de `validate`. **No ejecutes `npm run format` sin revisar el resultado** |

## Pendiente antes de publicar

El despliegue está **preparado** (`wrangler.jsonc`, `npm run deploy:check` y `npm run deploy`, validados con `--dry-run`). Falta lo que depende de ti y de tu cuenta de Cloudflare:

| Tarea | Detalle |
|---|---|
| **Iniciar sesión en Cloudflare** | `npx wrangler@4 login`, una sola vez. Hoy no hay sesión en esta máquina |
| **Primer despliegue** | `npm run deploy`. Da una dirección `…workers.dev` para ver el resultado real |
| **Comprar el dominio `alexxio.dev`** | Y dejar su DNS en Cloudflare para poder usarlo como *custom domain* del Worker |
| **Conectar el dominio al Worker** | En el panel de Cloudflare o con `routes` en `wrangler.jsonc` (ver [la receta](../guia-astro/03-recetas.md#publicar-con-un-dominio-propio)) |
| **Definir `SITE_URL` si el dominio es otro** | El código usa `https://alexxio.dev` por defecto: si el dominio es ese **no hay que cambiar nada en el código** |
| **Subir `pruebas` a `main`** | `main` está en `c5c6f46`, muy por detrás de `pruebas`. Se hace con un *squash* para no arrastrar historial ni PRs |
| **Revisar que las URLs de `llms.txt`, sitemap y tarjeta de redes usan el dominio final** | Se comprueba tras publicar: `https://alexxio.dev/sitemap-index.xml`, `/robots.txt`, `/llms.txt` |

## Contenido por completar

| Qué | Dónde | Nota |
|---|---|---|
| Más proyectos | `src/content/projects/{es,en}/` | Hoy hay uno (el portfolio). Ver [la receta](../guia-astro/03-recetas.md#añadir-un-proyecto) |
| Enlace en las tarjetas de proyecto | `url:` o `repo:` en el `.md` del proyecto | La tarjeta actual no enlaza a nada porque aún no hay dirección pública. Al añadir `url:` o `repo:` se convierte en enlace sin tocar código. Ver [la receta](../guia-astro/03-recetas.md#hacer-que-una-tarjeta-de-proyecto-sea-un-enlace) |
| Fechas del grado superior | `src/i18n/*.json` → `pages.home.about.items[1]` | Figura "2025–2027". Si se completa antes, actualizar. Los textos dicen que la formación está en curso |
| Experiencia laboral | idem, `items[2]` | "Málaga Inclusiva — Intern (April – July 2026)" |

## Deuda técnica conocida

Cosas que **funcionan** pero que son restos del proceso de recorte. Ninguna es urgente.

### Código que solo mantienen vivo sus tests

| Código | Test que lo mantiene | Situación |
|---|---|---|
| `resolveLocale` e `isValidLocale` en `src/i18n/index.ts` | `i18n.test.ts` | Pequeñas funciones genéricas del sistema de idiomas; ninguna página las llama |

Para limpiarlas hay que borrar **el test y la función a la vez** y comprobar `build`, `check` y tests después.

### Opciones de componentes que la portada no usa

Son funciones de la plantilla, completas y probadas, pero apagadas:

- **`Hero.astro`:** `showGrid`, `showGlow`, `showBlob`, `showHeroHalo`, `bottomFade` y `showScrollIndicator` (con `HeroGrid.astro` y `HeroBeam.astro`).
- **`Header.astro`, `Footer.astro`, `PageLayout.astro` y `lib/footer.ts`:** unas 2 000 líneas que solo usa la página 404, con muchas opciones sin usar. Si la 404 usara la barra flotante en lugar de cabecera y pie, todo ese conjunto podría eliminarse.

### Atribución a la plantilla

| Dónde | Qué | Comentario |
|---|---|---|
| `src/styles/global.css` | Una línea de cabecera: "derived from Astro Rocket, MIT-licensed" | Atribución; se conserva a propósito |
| `LICENSE` | Copyright de Hans Martens | Es la licencia MIT de Rocket y se conserva a propósito |

### Tests que usan un idioma de ejemplo

`i18n.test.ts` y `nav-i18n.test.ts` usan un idioma holandés ficticio (`nl`) para probar rutas con prefijo. Es solo un dato de prueba.

### Avisos benignos en la salida del build

- `Failed to load icons from "src/icons"`: `astro-icon` busca una carpeta de iconos propios que no existe. Se puede ignorar o crear la carpeta vacía.
- `SITE_URL is not set`: ver más arriba; no afecta a nada mientras el dominio sea `alexxio.dev`.

## Límites y comportamientos a tener en cuenta

| Tema | Detalle |
|---|---|
| **Descripción del sitio en un solo idioma** | `site.config.ts` tiene una única `description` (en inglés). La usan el JSON-LD (`WebSite`), el manifiesto y la tarjeta para redes, **también en `/es/`**. Las etiquetas `<title>` y `<meta description>` de cada página sí vienen de los archivos de idioma |
| **La imagen para compartir en redes es una sola, en inglés** | `og/default.png` se dibuja con el título y la descripción de la portada en inglés y la comparten las dos versiones. Las páginas `noindex` (la 404) no se usan para dibujarla |
| **La 404 publicada es la genérica de Cloudflare** | `wrangler.jsonc` no activa `not_found_handling`, así que `404.html` se genera pero no se sirve. Se activa con una línea (ver la receta de publicación) cuando se trabaje la 404 propia |
| **La 404 solo tiene una versión** | Es una única página, que se genera una vez en el idioma por defecto (inglés) |
| **El color del tema no se recuerda entre visitas** | Se guarda en `sessionStorage` (hasta cerrar la pestaña). El modo claro/oscuro sí es permanente |
| **El diseño cambia a partir de 1280 px** | Desde ese ancho el hero es un panel fijo a la izquierda (nombre, presentación, enlaces y navegación en vertical) y las secciones se desplazan a su derecha. Por debajo es una sola columna, con la barra flotante. El panel tiene hueco libre entre la presentación y la navegación en pantallas altas |
| **El cursor personalizado deja estela fuera del hero** | En el hero solo se ve el punto. Se puede desactivar del todo con `effects.cursorTrail: false` en `site.config.ts` |
| **`npm run dev` no genera favicon ni tarjeta para redes** | Solo existen tras `npm run build` |
| **El servidor de desarrollo puede servir estilos antiguos** tras editar un archivo | Ver [problemas frecuentes](../guia-astro/05-problemas-frecuentes.md) |
| **El enlace de LinkedIn** puede pedir iniciar sesión | El enlace es correcto (`linkedin.com/in/alex-vizan/`); el perfil probablemente no es público |
| **Seguridad del contenido** | El sitio no tiene entradas de usuario ni servidor: no hay inyección ni datos que proteger. Lo único "expuesto" es el correo, que ya aparece impreso en la página y en el JSON-LD |

## Ideas aparcadas

Cosas que se propusieron y se dejaron para más adelante, si la portada resulta demasiado sobria (la rejilla de puntos con luz de cursor se implementó después, en pantallas anchas):

- **Degradado de fondo que "respira"** (dos o tres manchas de color del tema, muy difuminadas).
- **Un panel "Lo que leo"** en "Sobre mí" con tres o cuatro libros y un icono de libro que se abre al desplegarlo. Se propuso como único toque personal discreto y **no se implementó**; para una consultora pesa más tener proyectos que mostrar.
- **Tema y tipografía propios** (el plan original los llamaba "Fase 4"): se abandonó, pero el sistema de temas permite añadirlo.

## Resumen de una línea

El sitio está **completo y verificado**; para publicarlo falta **iniciar sesión en Cloudflare, comprar el dominio**, subir `pruebas` a `main` y conectar el dominio al Worker.
