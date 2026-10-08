# 03 · Recetas paso a paso

Tareas completas, con los archivos y el código exactos. Después de **cada receta**, ejecuta:

```bash
npm run validate
```

(Equivale a lint → `astro check` → tests → build → verify. Ver [04](04-comandos-y-comprobaciones.md).)

## Índice

**Contenido:** [Añadir un proyecto](#añadir-un-proyecto) · [Tarjeta con enlace](#hacer-que-una-tarjeta-de-proyecto-sea-un-enlace) · [Panel en Sobre mí](#añadir-un-panel-a-sobre-mí) · [Datos de contacto](#cambiar-correo-o-enlaces-de-contacto) · [Botón de CV](#añadir-un-botón-de-descarga-del-cv) · [Foto](#añadir-una-foto-de-perfil)

**Estructura:** [Sección nueva](#añadir-una-sección-nueva) · [Quitar sección](#quitar-una-sección) · [Idioma nuevo](#añadir-un-idioma)

**Aspecto:** [Color por defecto](#cambiar-el-color-predeterminado) · [Tema nuevo](#añadir-un-tema-de-color) · [Tipografía](#cambiar-la-tipografía)

**Publicación:** [Dominio propio](#publicar-con-un-dominio-propio) · [Imagen para redes](#usar-mi-propia-imagen-para-compartir-en-redes) · [Favicon](#usar-mi-propio-favicon)

---

## Añadir un proyecto

Un proyecto son **dos archivos** (uno por idioma). Si solo creas uno, el otro idioma mostrará los proyectos del idioma por defecto.

1. Crea `src/content/projects/es/mi-proyecto.md`:

   ```md
   ---
   title: Mi proyecto
   description: "Una frase que explique qué es y qué problema resuelve."
   icon: smartphone
   tags: [Flutter, PostgreSQL]
   year: 2026
   order: 2
   placeholder: true
   locale: es
   ---
   ```

2. Crea `src/content/projects/en/mi-proyecto.md` con lo mismo traducido y `locale: en`.

3. Guarda. Aparece en la portada si ya está `npm run dev` corriendo.

### Reglas importantes

- **Las comillas en `description` son obligatorias si lleva dos puntos** (`:`), porque el bloque es YAML. Sin comillas, el build falla.
- **Solo `title` y `description` son obligatorios.** El resto es opcional.
- **`locale`** debe ser `es` o `en`. Si lo omites, se asume `en` (el idioma por defecto).
- **`placeholder: true`** hace que la tarjeta **no enlace a nada**. Es lo que debes poner mientras las páginas de detalle no existan (ver la receta siguiente). Si lo omites, la tarjeta enlazará a `/projects/mi-proyecto`, que **no existe** y daría un 404.
- Se muestran los **4 primeros**, ordenados por `order` (menor primero).

### Campos disponibles

| Campo | Tipo | Para qué |
|---|---|---|
| `title`, `description` | texto | **Obligatorios** |
| `icon` | texto | Nombre de un icono de [Lucide](https://lucide.dev/icons) (`smartphone`, `database`, `code-xml`…). Por defecto `layers` |
| `tags` | lista | Se muestran como `#etiqueta` |
| `year` | número | Se muestra arriba a la izquierda |
| `order` | número | Posición (por defecto 99) |
| `url`, `repo` | enlace | Hoy no se usan; ver la receta siguiente |
| `draft` | `true/false` | Oculto en producción, visible en `npm run dev` |
| `placeholder` | `true/false` | Tarjeta sin enlace |
| `locale` | `es` / `en` | Idioma |
| `featured`, `client`, `role`, `services`, `meta`, `image`, `imageAlt`, `gallery`, `toc` | varios | Existen en el esquema (`src/content.config.ts`) pero **la tarjeta actual no los pinta** |

Para un proyecto con **texto largo** debajo del bloque `---` (descripción extensa), hoy ese texto no se muestra en ningún sitio: la portada solo usa la tarjeta.

---

## Hacer que una tarjeta de proyecto sea un enlace

Hoy las tarjetas no enlazan. Para que lleven a tu repositorio o a una demo:

1. En el `.md` del proyecto, añade `url` y/o `repo`, y **quita `placeholder: true`**:

   ```md
   url: https://mi-demo.vercel.app
   repo: https://github.com/Alexxio070/mi-proyecto
   ```

2. En `src/components/projects/ProjectCard.astro`, calcula el destino y úsalo en lugar de la ruta de detalle. Busca el `<Card …>` y cambia `href`:

   ```astro
   ---
   // …después de `const { data } = project;`
   const link = data.url ?? data.repo;
   ---

   <Card
     variant="elevated"
     hover
     padding="none"
     href={link}
     target={link ? '_blank' : undefined}
     rel={link ? 'noopener noreferrer' : undefined}
     class="group flex flex-col"
     …
   ```

3. En el mismo archivo, la flecha ↗ solo debe verse si hay enlace. Cambia la condición `{!data.placeholder && (` por:

   ```astro
   {link && (
   ```

4. Si dejas de usar `getProjectUrl` en el archivo, borra su `import` para que ESLint no avise.

> `Card` (`src/components/ui/data-display/Card/Card.astro`) acepta `href`, `target` y `rel`, y se convierte en `<a>` cuando recibe `href`.

---

## Añadir un panel a "Sobre mí"

Los paneles son una **lista** dentro de los archivos de idioma. Añade un elemento **al final de la lista, en los dos idiomas** (mismo `icon`, mismo orden):

`src/i18n/es.json` → `pages.home.about.items`:

```json
{
  "icon": "languages",
  "title": "Idiomas",
  "points": ["Español: nativo", "Inglés: B2"]
}
```

`src/i18n/en.json`: lo mismo traducido (`"icon": "languages"`, `"title": "Languages"`, …).

- El `icon` es un nombre de [Lucide](https://lucide.dev/icons).
- Con **más de 6 paneles** la rejilla pasa de 2 a 3 columnas (`aboutColumns` en `HomeView.astro`). Si no quieres eso, edita esa línea.
- Para quitar un panel, bórralo **de los dos archivos**.

---

## Cambiar correo o enlaces de contacto

El correo y las redes están en **más de un sitio**. Hay que actualizarlos todos:

| Dónde | Qué | Se ve en |
|---|---|---|
| `src/config/site.config.ts` → `email` | Correo | Botón del hero, tarjeta de contacto, JSON-LD |
| `src/config/site.config.ts` → `socialLinks` | Enlaces de GitHub y LinkedIn | Botones del hero, JSON-LD |
| `src/config/nav.config.ts` → `footerNavItems` y `footerLinkGroups` | Las mismas direcciones, escritas **a mano** | El pie de la página 404 |

Se busca todo de una vez con:

```bash
grep -rn "tu-correo-antiguo" src
```

---

## Añadir un botón de descarga del CV

1. Copia el PDF a `public/` (por ejemplo `public/cv-alejandro-vizan.pdf`). Todo lo de `public/` se sirve en la raíz: quedará en `/cv-alejandro-vizan.pdf`.

2. En `src/components/pages/views/HomeView.astro`, dentro de `<Fragment slot="actions">`, tras el botón del correo, añade:

   ```astro
   <Button size="lg" variant="outline" href="/cv-alejandro-vizan.pdf" target="_blank" rel="noopener">
     <Icon name="file-text" size="md" />
     {hero.cv}
   </Button>
   ```

3. Añade el texto en los dos idiomas, dentro de `pages.home.hero`: `"cv": "Descargar CV"` (es) y `"cv": "Download CV"` (en). Un test exige que **no falte ninguna clave en un idioma**.

4. Si quieres un CV por idioma, usa dos archivos y elige según `locale`:

   ```astro
   href={locale === 'es' ? '/cv-es.pdf' : '/cv-en.pdf'}
   ```

> El botón del hero tiene los bordes de 2 px y la elevación al pasar el ratón porque cuelga de `.hero-actions`. Si el contenedor `<div class="hero-actions …">` lo contiene, los hereda.

---

## Añadir una foto de perfil

Hoy **no hay foto**. Si la añades, solo la usa el JSON-LD (datos para buscadores); no aparece en la página.

1. Copia la imagen a `public/` (por ejemplo `public/foto.jpg`).
2. En `src/config/site.config.ts`, añade dentro del objeto `siteConfig`:

   ```ts
   authorImage: '/foto.jpg',
   ```

Para **mostrarla en la página**, tendrías que añadir un `<img>` en `HomeView.astro` (por ejemplo en el panel "Quién soy" o junto al nombre).

---

## Añadir una sección nueva

Ejemplo: una sección "Idiomas" tras "Sobre mí", con anclas y menú.

**1. Textos** (en los **dos** idiomas), dentro de `pages.home`:

```json
"languages": {
  "heading": "Idiomas",
  "description": "Qué idiomas hablo."
}
```

Y en `nav.items`: `"languages": "Idiomas"`.

**2. La sección** en `src/components/pages/views/HomeView.astro`. En la cabecera (`---`) lee los textos:

```astro
const languages = tData<{ heading: string; description: string }>('pages.home.languages', locale)!;
```

Y en la plantilla, **en el orden en que quieras que salga** (copia el bloque de "Proyectos" como base):

```astro
<section id="languages" class="relative z-10 py-[var(--space-section-md)] bg-background border-t border-border">
  <div class="mx-auto max-w-6xl px-6 flex flex-col gap-8">
    <div class="flex flex-col gap-4" data-reveal>
      <SectionTitle title={languages.heading} class="font-display text-3xl md:text-4xl font-bold text-foreground" />
      <p class="text-lg text-foreground-muted max-w-2xl">{languages.description}</p>
    </div>
  </div>
</section>
```

El `id` es la ancla (`#languages`). `SectionTitle` ya hace el efecto de ruta (`~/alex/idiomas`), y `data-reveal` la animación de aparición.

**3. El menú**, en `src/config/nav.config.ts` → `homeNavItems`. Añade un elemento y **renumera `order`** para dejarlo en su posición:

```ts
{ label: 'Languages', href: '#languages', order: 2, labelKey: 'nav.items.languages' },
```

**4. El icono de móvil**, en `src/components/layout/FloatingNav.astro`, en el mapa `icons`:

```ts
'#languages': 'languages',
```

(Si no lo pones, usa un círculo.)

**5.** Comprueba: `npm run validate`. Mira en `npm run dev` que el efecto de ruta cambia al llegar a la sección y que el enlace del menú se marca como activo.

> Si la sección es corta, el efecto de ruta puede no activarse al final de la página (la última sección sí se activa siempre al llegar al pie). Si la sección queda con su contenido muy abajo, dale una altura mínima como la de contacto (`min-h-[80svh]`).

---

## Quitar una sección

Ejemplo: quitar "Proyectos".

1. `HomeView.astro`: borra su `<section id="projects">…</section>` y la parte de la cabecera que solo ella usa (`shownProjects`, la carga de proyectos y los `import` que queden sin usar: ESLint los marcará).
2. `src/config/nav.config.ts` → `homeNavItems`: borra su elemento.
3. `FloatingNav.astro` → `icons`: borra su entrada.
4. i18n: borra `pages.home.projects` y `nav.items.projects` **en los dos idiomas** (o déjalos: no molestan, pero quedan sin uso).
5. Si quitas la sección, los archivos de `src/content/projects/` y `ProjectCard.astro` quedan sin uso.

---

## Añadir un idioma

Ejemplo: francés (`fr`).

1. **Textos:** copia `src/i18n/en.json` a `src/i18n/fr.json` y traduce los valores. **No cambies las claves.** `src/i18n/index.ts` detecta el archivo solo.

2. **Activarlo** en `src/config/i18n.config.ts`:

   ```ts
   locales: ['en', 'es', 'fr'],
   ```

   `localeNames` ya incluye `fr: 'Français'`; para otro idioma, añádelo.

3. **El test de cobertura**, en `src/__tests__/i18n-coverage.test.ts`: importa el JSON y añádelo a la lista:

   ```ts
   import fr from '../i18n/fr.json';
   …
   const locales: Record<string, unknown> = { es, fr };
   ```

   Así, si en el futuro olvidas una clave en `fr.json`, el test lo dirá.

4. **Proyectos:** crea los `.md` en `src/content/projects/fr/` con `locale: fr`.

5. **Descripción del sitio:** `site.config.ts` tiene una única `description` (en inglés) que usan el JSON-LD y el manifiesto. No se traduce por idioma.

6. Se generará `/fr/`, y el selector de idioma lo mostrará.

> **Para quitar un idioma:** borra su `.json`, sácalo de `locales` y del test, y borra sus carpetas de proyectos.

---

## Cambiar el color predeterminado

Hoy el tema por defecto es `blue`. Para cambiarlo a otro (`violet`, por ejemplo), **hay que tocar tres sitios, y deben coincidir**:

1. `src/layouts/BaseLayout.astro`: en la etiqueta `<html …>`, `data-theme="violet"`.
2. `src/components/layout/ThemeSelector.astro`: `const DEFAULT_THEME = 'violet';`
3. `src/components/layout/ThemeSelectorDropdown.astro`: `const DEFAULT_THEME = 'violet';`

Además, el color de la barra del navegador del móvil y del favicon es independiente: `THEME_COLOR` en `src/config/branding.ts`. Y el degradado del hero usa la escala del tema activo, así que cambia solo.

> Un visitante que haya elegido color verá el suyo durante la visita (se guarda en `sessionStorage`); el predeterminado solo manda cuando entra por primera vez.

---

## Añadir un tema de color

Ejemplo: `rose`.

1. **El archivo del tema:** copia `src/styles/themes/blue.css` a `src/styles/themes/rose.css`. Cambia **todas** las apariciones de `blue` por `rose` (hay dos bloques: `html[data-theme="rose"]` y `html.dark[data-theme="rose"]`) y ajusta la escala `--brand-50` … `--brand-900`. Los valores están en [OKLCH](https://oklch.com): `oklch(luminosidad% croma matiz)`. Para el matiz del color, cambia el último número.

2. **Importarlo** en `src/styles/tokens/colors.css`, junto a los demás:

   ```css
   @import '../themes/rose.css';
   ```

3. **Registrarlo** en `src/lib/themes.ts`:

   ```ts
   { id: 'rose', name: 'Rose', color: 'oklch(62% 0.22 5)', showInSelector: true },
   ```

   (`color` es solo la muestra redonda del selector.)

4. **Permitirlo** en `src/layouts/BaseLayout.astro`, en la lista:

   ```js
   const COLOR_THEMES = ['emerald', 'teal', …, 'purple', 'rose'];
   ```

5. Ejecuta `npm run test:run`. `colour-themes.test.ts` comprueba que cada tema tiene archivo, que se aísla en su propio `data-theme` y que define toda la escala. Su primer test **fija el número de temas en 8** (`expect(COUNT).toBe(8)`): al añadir uno **fallará y es lo esperado**; cambia ese `8` por el nuevo total (9).

Para **quitar** un tema del selector sin borrar su archivo: `showInSelector: false` en `themes.ts`.

---

## Cambiar la tipografía

Hay tres fuentes autoalojadas (Fontsource): **Manrope** (texto), **Outfit** (títulos), **JetBrains Mono** (código y rutas).

1. Instala la nueva (por ejemplo Inter): `npm install @fontsource-variable/inter`.
2. En `src/styles/global.css`, sustituye el `@import '@fontsource-variable/manrope';` por el de la nueva.
3. En **cada** `src/styles/themes/*.css` (son 8) cambia la variable de la familia, por ejemplo `--theme-font-sans: 'Inter Variable', …`. Lo más rápido es buscar `Manrope` en la carpeta y reemplazar.
4. En `src/layouts/BaseLayout.astro` hay una **precarga** de Outfit y Manrope (`import … ?url`). Actualízala para la nueva fuente, o el navegador cargará la antigua además de la nueva.
5. En `src/styles/global.css`, justo debajo de los `@import`, hay dos reglas `@font-face` llamadas `Outfit Fallback` y `Manrope Fallback`: son una fuente de respaldo con medidas ajustadas para que la página no "salte" cuando llega la fuente real. Con otra fuente, **esos ajustes ya no son los correctos**: puedes borrarlas (y quitarlas de `--theme-font-*`) o recalcularlas.
6. Si desinstalas la anterior, `npm uninstall @fontsource-variable/manrope` y vuelve a ejecutar `npm run validate`.

Las clases `font-sans`, `font-display` y `font-mono` de los componentes leen esas variables, así que **no hace falta tocar ningún componente**.

---

## Publicar con un dominio propio

El sitio ya usa `https://alexxio.dev` por defecto. Con ese dominio, **no hay que cambiar el código**.

1. **Compra el dominio** y conéctalo al anfitrión (los registros DNS los indica él).
2. **Configura el anfitrión:**

   | Campo | Valor |
   |---|---|
   | Comando de build | `npm run build` |
   | Carpeta de salida | `dist` |
   | Versión de Node | 22 o superior (ver `.nvmrc`) |
   | Variable de entorno `SITE_URL` | `https://alexxio.dev` (solo necesaria si el dominio es otro) |

3. **Si el dominio es otro:** cambia `SITE_URL_FALLBACK` en `src/config/site-url.ts` **y** la variable `SITE_URL`. El build comprueba que la etiqueta canónica y el JSON-LD coinciden, y **falla** si no.

4. **Subir el código:** `git push origin pruebas` y, para publicar en `main`, un *squash*:

   ```bash
   git switch main
   git merge --squash pruebas
   git commit -m "feat: …"
   git push origin main
   git switch pruebas
   ```

5. **Comprueba tras publicar:** `https://alexxio.dev/sitemap-index.xml`, `/robots.txt`, `/llms.txt` y que al compartir el enlace aparece la tarjeta.

> El repositorio puede seguir siendo **privado**: los anfitriones leen repos privados con permiso. La web publicada es pública.

---

## Usar mi propia imagen para compartir en redes

Por defecto, el build **genera** `og/default.png` con tu nombre y tu rol. Para usar una imagen propia:

1. Crea una imagen **PNG o JPEG** de 1200×630 (los redes no leen SVG) en `public/` (por ejemplo `public/og.png`).
2. En `src/config/site.config.ts`: `ogImage: '/og.png',`

---

## Usar mi propio favicon

El favicon se genera: la **inicial de `SITE_NAME`** sobre el color `THEME_COLOR` (`src/config/branding.ts`). Para ponerle uno propio:

1. Elimina el plugin `favicon-assets()` de la lista `integrations` en `astro.config.mjs` (o déjalo y sobrescribe los archivos).
2. Pon tus archivos en `public/`: `favicon.svg`, `favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png`, `pwa-192x192.png` y `pwa-512x512.png`.

Si solo quieres otra inicial o color, basta cambiar `SITE_NAME` o `THEME_COLOR`.
