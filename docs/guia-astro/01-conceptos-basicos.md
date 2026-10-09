# 01 · Conceptos básicos de Astro

Lo mínimo que necesitas para moverte por este proyecto. No es un curso de Astro: es el vocabulario que usan los demás documentos.

## Qué es Astro, en una frase

Astro **construye páginas web a partir de archivos** y entrega HTML ya hecho, con la mínima cantidad posible de JavaScript. En este proyecto, el resultado de `npm run build` es una carpeta `dist/` con HTML, CSS y poco más, que se puede subir a cualquier alojamiento.

## Los archivos `.astro`

Casi todo lo visible está en archivos `.astro`. Tienen hasta cuatro zonas:

```astro
---
// 1. ZONA DE CÓDIGO (entre las dos líneas ---)
// Se ejecuta al CONSTRUIR la página, no en el navegador del visitante.
import Button from '@/components/ui/form/Button/Button.astro';
const { title } = Astro.props;        // datos que recibe del padre
const nombre = 'Alejandro';
---

<!-- 2. PLANTILLA (HTML con huecos para variables) -->
<h1 class="text-3xl font-bold">{title} de {nombre}</h1>
<Button href="/contacto">Escríbeme</Button>

<style>
  /* 3. ESTILOS: por defecto solo afectan a ESTE componente */
  h1 { color: red; }
</style>

<script>
  // 4. SCRIPT: este sí se ejecuta en el navegador del visitante
  document.querySelector('h1')?.addEventListener('click', () => alert('hola'));
</script>
```

**Regla de oro:** lo que está entre `---` ocurre **una vez, al compilar**; lo que está en `<script>` ocurre **en el navegador**, cada vez que alguien visita.

### Estilos: `scoped` y `is:global`

| Forma | Alcance |
|---|---|
| `<style>` | Solo afecta a los elementos de ese archivo. Astro añade un atributo único para aislarlo |
| `<style is:global>` | Afecta a **toda la página**. `HomeView.astro` lo usa para los estilos propios de la portada |

Si cambias un estilo y no pasa nada, comprueba cuál de las dos formas usa el archivo.

## Componentes, props y slots

Un archivo `.astro` es un componente. Se usa como si fuera una etiqueta HTML:

```astro
<Hero layout="split" size="xl" fullHeight>
  <h1 slot="title">Mi nombre</h1>
  <p slot="aside">Mi descripción</p>
</Hero>
```

| Concepto | Qué es | Ejemplo en el proyecto |
|---|---|---|
| **Prop** | Un dato que pasas al componente como atributo | `layout="split"`, `title={about.heading}` |
| **Slot** | Un hueco donde el padre mete contenido | `<h1 slot="title">` dentro de `Hero` |
| **Slot por defecto** | El hueco sin nombre (`<slot />`) | Todo lo que va entre las etiquetas de `LandingLayout` |

Los **props** se declaran en `interface Props` dentro de la zona de código, así que ahí puedes ver qué acepta cada componente. Por ejemplo, abre `src/components/hero/Hero.astro` y mira su `interface Props`.

## Páginas y rutas

Cada archivo de `src/pages/` **es una URL**. El nombre del archivo es la ruta:

| Archivo | URL |
|---|---|
| `src/pages/index.astro` | `/` |
| `src/pages/404.astro` | página de error |
| `src/pages/[locale]/index.astro` | `/en/`, `/fr/`… (el `[locale]` es un parámetro) |
| `src/pages/robots.txt.ts` | `/robots.txt` (un `.ts` puede generar un archivo en vez de una página) |

Las páginas con `[corchetes]` necesitan `getStaticPaths()`, que lista las URLs que debe generar.

## Layouts

Un **layout** es un componente "carcasa" que envuelve a la página: pone `<html>`, `<head>`, la barra de navegación, etc., y deja un `<slot />` donde va el contenido.

```
BaseLayout     → <html>, <head>, SEO, scripts de tema
  └ LandingLayout → + barra flotante            (la portada)
  └ PageLayout    → + cabecera y pie            (la 404)
```

Para cambiar algo que afecta a **todas** las páginas (por ejemplo, una etiqueta del `<head>`), el sitio es `BaseLayout.astro`.

## Colecciones de contenido

Para contenido repetitivo (aquí, los proyectos) Astro ofrece **colecciones**: una carpeta de archivos Markdown con un esquema que dice qué campos son obligatorios.

- **Datos:** `src/content/projects/es/portfolio.md` (el bloque entre `---` al inicio son los campos; lo de debajo sería el texto).
- **Esquema:** `src/content.config.ts`.
- **Lectura:** `getCollection('projects')` en el código (envuelto en `getVisibleProjects()` de `src/lib/projects.ts`).

Si falta un campo obligatorio o el tipo es incorrecto, **el build falla** y te dice en qué archivo.

## El alias `@/`

En los `import` verás `@/components/...`. `@/` significa `src/` (definido en `tsconfig.json`). Evita rutas como `../../../`.

## Tailwind CSS

Los estilos se escriben **como clases en el HTML**, en vez de en archivos CSS:

```html
<h2 class="font-display text-3xl font-bold text-foreground">
```

| Clase | Qué hace |
|---|---|
| `text-3xl` | Tamaño de texto |
| `font-bold` | Negrita |
| `text-foreground` | Color de texto (un "token" del tema, no un color fijo) |
| `md:flex` | `display: flex` **solo desde 768 px** de ancho |
| `dark:text-white` | Solo en modo oscuro |
| `hover:bg-secondary` | Solo al pasar el ratón |

Los colores no están fijos: salen de **variables CSS** (`--color-brand-500`, `--color-foreground`…) que cambian con el tema. Así, un componente cambia de color al elegir otro tema sin tocarlo.

Cuando hace falta algo que las clases no cubren, se escribe CSS normal en un `<style>`, usando esas mismas variables.

## Variantes con `class-variance-authority`

Los archivos `*.variants.ts` (por ejemplo `button.variants.ts`) definen **combinaciones de clases por opción**:

```ts
variant: { primary: '...', outline: '...', ghost: '...' },
size:    { sm: '...', md: '...', lg: '...' }
```

El componente (`Button.astro`) elige la clase según los props `variant` y `size`. Si quieres cambiar cómo se ve **todos** los botones de un tipo, edita su archivo `*.variants.ts`.

## Desarrollo y producción

| | `npm run dev` | `npm run build` + `npm run preview` |
|---|---|---|
| Para qué | Trabajar: se recarga solo al guardar | Ver el resultado real, tal como se publicará |
| Dónde | `http://localhost:4321` | `dist/` |
| Favicon y tarjeta para redes | **No se generan** | Sí |
| Errores de contenido (esquema) | Se ven en la consola | Rompen el build |

## Vocabulario del proyecto

| Término | Significado |
|---|---|
| **Hero** | La primera pantalla: nombre, subtítulo y botones |
| **Token** | Una variable de diseño (`--color-brand-500`, `--space-section-md`) |
| **Tema** | Una de las 8 paletas de color (`blue`, `violet`…) |
| **Modo** | Claro u oscuro. No es lo mismo que el tema |
| **Locale** | Idioma (`en`, `es`) |
| **`data-reveal`** | Atributo que hace que un elemento aparezca con animación al hacer scroll |
| **Squash** | Fusionar muchos commits en uno al llevarlos a `main` |
