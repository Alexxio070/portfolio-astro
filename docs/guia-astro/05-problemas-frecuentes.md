# 05 · Problemas frecuentes

Síntoma → causa → solución. Muchos de estos casos **ocurrieron de verdad** durante el desarrollo (el CSS antiguo, la sección de contacto vacía, el error de YAML, el commit con archivos de más); el resto son los fallos que las comprobaciones del proyecto están diseñadas para detectar.

## Índice

[Lo que ves](#lo-que-ves) · [El build y los tests](#el-build-y-los-tests) · [Textos e idiomas](#textos-e-idiomas) · [Proyectos](#proyectos) · [Estilos y animaciones](#estilos-y-animaciones) · [Git](#git)

---

## Lo que ves

### He cambiado un estilo y no se ve nada

**Causa más probable:** el servidor de desarrollo sirve **CSS antiguo**. Pasó varias veces tras editar archivos `.astro`: el HTML era el nuevo pero el navegador recibía la hoja de estilos anterior.

**Solución:**
1. Recarga sin caché: `Ctrl + Shift + R`.
2. Si sigue igual, **detén el servidor** (`Ctrl + C`) y vuelve a lanzar `npm run dev`.
3. Si aún no cambia, comprueba que no estás editando un `<style>` normal (solo afecta a ese componente) cuando querías uno `is:global`. Ver [01](01-conceptos-basicos.md).

### La sección de contacto aparece vacía al final de la página

**Causa:** la animación de aparición (`data-reveal`) solo se dispara cuando el elemento entra en el **85 % superior** de la pantalla. Si la sección es tan corta que su contenido queda por debajo de esa línea incluso con la página en el final, **nunca se revela**.

**Solución:** darle una altura mínima a la sección, como ya tiene contacto (`min-h-[80svh]` con el contenido centrado). Pasó al quitar las etiquetas de sección, que daban altura sin que nadie se diera cuenta.

### El favicon o la imagen para compartir no aparecen

**Causa:** en `npm run dev` **no se generan** (los plugins solo corren en el build).

**Solución:** `npm run build` y mira `dist/`, o `npm run preview`.

### La barra de navegación se pierde sobre el hero

**Causa:** los controles de la barra (color, modo, idioma) usan colores de borde oscuros en modo claro, que no se ven sobre el degradado oscuro del hero.

**Solución:** ya está resuelto en `FloatingNav.astro` (estilos para `#main-nav:not(.scrolling)`). Si añades un control nuevo a la barra, dale la clase correspondiente (`.ttg-trigger`, `.lang-trigger`) o añade su selector a esa regla.

### El botón de correo no abre mi programa de correo

**No es un fallo:** abre **Gmail** en una pestaña nueva a propósito (un `mailto:` no hace nada sin programa de correo configurado). La dirección está impresa en la tarjeta de contacto. Para cambiarlo, ver [02](02-que-archivo-editar.md#comportamiento).

### El efecto de ruta (`~/alex/…`) no se activa

- **Con "reducir movimiento"** activado en el sistema, la ruta aparece de golpe, sin escribirse (y las apariciones no se animan). Es lo previsto.
- **Sin JavaScript**, el título se queda en texto normal.
- **Una sección muy corta** puede no cruzar la línea de activación (40 % de la altura de pantalla). La última sección sí se activa siempre al llegar al pie.

### El color elegido se pierde al cerrar la pestaña

**No es un fallo:** el color se guarda en `sessionStorage` a propósito (por visita). El modo claro/oscuro sí es permanente. Para cambiarlo, ver [02](02-que-archivo-editar.md#comportamiento).

---

## El build y los tests

### `npm run build` falla con un error de YAML

```
YAMLException: … bad indentation of a mapping entry
```

**Causa:** un archivo de `src/content/projects/` tiene un valor con dos puntos (`:`) **sin comillas**. Ejemplo:

```md
description: Mi portfolio: una web estática          ← falla
description: "Mi portfolio: una web estática"        ← bien
```

**Solución:** pon el valor entre comillas.

### El build avisa: `SITE_URL is not set`

**Causa:** no está definida la variable. **No es un error:** se usa `https://alexxio.dev`. Si ese es tu dominio, ignóralo; si es otro, ver [la receta de publicación](03-recetas.md#publicar-con-un-dominio-propio).

### El build falla con `verify-site-url: … disagrees with itself about this site's address`

**Causa:** la dirección que usan las etiquetas canónicas (`astro.config.mjs`) y la del JSON-LD (`site.config.ts`) **no coinciden**. Suele pasar por poner `SITE_URL` en un `.env` que solo una de las dos lee.

**Solución:** define `SITE_URL` en el **entorno** del anfitrión, o cambia `SITE_URL_FALLBACK` en `src/config/site-url.ts`. Ver `scripts/site-url-agreement.mjs`.

### El test `i18n-coverage` falla

Dos causas posibles, y el mensaje te dice cuál:

| Mensaje | Causa | Solución |
|---|---|---|
| `es.json is missing keys` / `has keys en.json does not` | Añadiste o quitaste una clave en un idioma y no en el otro | Ponla en **los dos** archivos, con el mismo nombre |
| `no component hard-codes a string a screen reader would announce` | Escribiste un `aria-label`, `alt`, `title` o `placeholder` a mano en un componente | Mueve el texto a `en.json` y `es.json` y léelo con `t('…')` |

### El test de temas falla al añadir uno

**Causa:** `colour-themes.test.ts` fija el número de temas en **8**. **Solución:** cambia ese número (ver [la receta](03-recetas.md#añadir-un-tema-de-color)).

### El test de títulos falla: "does not include the site name"

**Causa:** un `meta.title` incluye tu nombre. La página ya lo añade (`Título — Nombre`), así que quedaría repetido. **Solución:** quita el nombre del título.

### Tras borrar un archivo, aparecen errores de importación

**Causa:** algo seguía importándolo. **Solución:** `grep -rn "NombreDelArchivo" src` para encontrar quién lo usa. Cuidado con las cargas masivas (`import.meta.glob`): leen carpetas enteras y pueden mantener "vivo" código que parece muerto.

### `astro check` avisa de `z.string().url()` obsoleto

Son sugerencias (*hints*) y no impiden nada. Vienen de `src/content.config.ts`.

---

## Textos e idiomas

### He cambiado un texto y en la otra página sigue el antiguo

**Causa:** cada idioma tiene su archivo. Editaste solo uno. Mira `/` (inglés) y `/es/` (español).

### Aparece una clave en lugar de un texto (`pages.home.foo.bar`)

**Causa:** esa clave no existe en el idioma ni en el de por defecto. **Solución:** añádela a `en.json` y a `es.json`. (Se devuelve la propia clave a propósito para que el fallo se vea.)

### El título de la pestaña repite mi nombre

**Causa:** el `meta.title` ya lleva tu nombre y la página lo añade otra vez. Un test lo evita; si pasa, quítalo del título.

---

## Proyectos

### Mi tarjeta de proyecto lleva a una página 404

**Causa:** el proyecto no tiene `placeholder: true` y la tarjeta enlaza a una página de detalle que **ya no existe**. **Solución:** añade `placeholder: true`, o configúrala con enlace (ver [la receta](03-recetas.md#hacer-que-una-tarjeta-de-proyecto-sea-un-enlace)).

### El proyecto no aparece en la página

Comprueba por orden:
1. **El idioma:** el campo `locale` debe ser `es` o `en`, y coincidir con la carpeta.
2. **`draft: true`:** se oculta en producción (`npm run build`), no en `dev`.
3. **El límite:** solo se muestran los **4 primeros**, ordenados por `order`.
4. **El esquema:** falta `title` o `description`. El build lo dice.

### La sección de proyectos sale con la tarjeta de otro idioma

**Causa:** el idioma no tiene proyectos propios y se usan los del idioma por defecto. Crea el `.md` del otro idioma.

---

## Estilos y animaciones

### Una clase de Tailwind no hace nada

- ¿La escribiste con **código dinámico** (`` `text-${color}-500` ``)? Tailwind no ve clases construidas en tiempo de ejecución. Escríbelas **completas**.
- ¿Choca con otra clase del mismo componente? Prueba `!` delante (`!text-xl`), aunque es el último recurso.
- ¿Está en un archivo que Tailwind no escanea? Todo lo de `src/` se escanea.

### Un color no cambia con el tema

**Causa:** el componente usa un color fijo (`text-blue-500`, `#0083fe`) en vez de un token (`text-brand-500`, `var(--color-brand-500)`). **Solución:** usa tokens.

### Un elemento nuevo no aparece con animación

**Causa:** falta el atributo `data-reveal`. Ver [02](02-que-archivo-editar.md#aspecto-del-hero-y-animaciones).

---

## Git

### Hice un commit en la rama equivocada (`main`)

Si **no has subido** nada:

```bash
git branch pruebas-rescate           # guarda tu trabajo en una rama nueva
git reset --hard origin/main         # ⚠ devuelve main a como está en GitHub
git switch pruebas-rescate           # y sigue ahí (o fusiónala en pruebas)
```

### `git commit` incluyó más archivos de los que quería

Antes de commitear, mira qué está preparado:

```bash
git diff --cached --name-status
```

Si ya lo hiciste y **no has subido**: `git reset --soft HEAD~1`, ajusta con `git reset <archivo>` y vuelve a commitear.

### Quiero ver cómo era un archivo hace tiempo

```bash
git log --oneline -- ruta/archivo        # commits que lo tocaron
git show <hash>:ruta/archivo             # su contenido en ese momento
```

### `git pull` dice que hay divergencia

Tu rama local y la de GitHub tienen commits distintos. **Antes de forzar nada**, mira ambos lados:

```bash
git fetch
git log --oneline pruebas..origin/pruebas     # lo que tiene GitHub y tú no
git log --oneline origin/pruebas..pruebas     # lo que tienes tú y GitHub no
```
