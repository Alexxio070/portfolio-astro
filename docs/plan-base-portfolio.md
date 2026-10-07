# Plan de acción: base del portfolio (Rocket con estética Darkminimal)

Alcance: solo el diseño de la base. Quedan fuera los datos reales (antes fase 7) y la publicación (antes fase 8).
Cada fase es un prompt para pegar en Claude Code, dentro del repo `portfolio-astro`. Se hacen en orden y un commit por fase, salvo el orden de ejecución acordado: primero la 5, después la 4 y al final la 6.

Lo que se sabe y lo que no (al 2026-10-05):
- Verificado leyendo el código: Rocket usa Astro 7, Tailwind 4, tema de color con `html[data-theme]`, selector en `src/lib/themes.ts`, rutas de servidor solo en `/api/contact` y `/api/newsletter`. El header de Darkminimal está en un único archivo, `src/components/nav.astro`.
- No comprobado: que Rocket compile sin sus rutas de servidor, y cuántas piezas leen sus colores y formas de variables. Cada fase empieza por comprobarlo.

---

## Reglas comunes (pegar al principio de CADA fase)

```
Trabajas en mi repo portfolio-astro. Reglas, sin excepciones:
1. Antes de crear, borrar o ejecutar nada que cambie archivos, explícame cómo has entendido la fase y tu plan, y espera mi confirmación explícita.
2. No crees nada que no esté en la fase. Si algo no pedido aparece, bórralo.
3. Cambios mínimos. No refactorices ni renombres lo que la fase no menciona.
4. Verifica cada dato técnico (versión, API, comportamiento) leyendo el código o la documentación oficial, e indica qué has comprobado y qué no.
5. Da algo por hecho solo con la salida del comando que lo demuestra (build, lint, tests).
6. CSS: Tailwind 4 con las variables y tokens de Rocket. No añadas Sass.
7. Nada de secretos en código, commits ni logs.
8. Todo el trabajo va en la rama `pruebas`, nunca en `main`. Antes de empezar comprueba con `git branch --show-current` que estás en `pruebas`.
9. Commits: formato convencional, cortos, un commit por fase. Propón el mensaje y espera mi aprobación antes de hacer el commit. Autor: Alexxio <96728284+Alexxio070@users.noreply.github.com>. Sin trailers de Claude. No hagas push ni PR sin que te lo pida.
10. Código simple, sin comentarios que repitan lo que hace el código, sin emojis.
```

---

## Fase 1: traer Rocket al repo

Commit propuesto: `feat: base desde Astro Rocket`

```
Fase 1: sustituir la plantilla minimal actual por Astro Rocket (https://github.com/hansmartensdev/Astro-Rocket, licencia MIT).

Entendimiento: mi repo solo tiene la plantilla minimal de Astro y un commit. Quiero Rocket completo como base, que luego recortaremos en las fases siguientes.

Pasos a proponerme antes de ejecutar:
0. Rama: crear la rama `pruebas` desde `main` (`git switch -c pruebas`) y trabajar en ella todas las fases. No toques `main`. El push de la rama solo cuando yo lo pida.
1. Clonar Rocket en una carpeta temporal fuera del repo (no copiar su carpeta .git) y anotar el commit exacto.
2. Comprobar en su package.json el campo engines y la versión de Node que exige, y comparar con la de mi máquina (`node -v`).
3. Copiar su contenido a mi repo, conservando el LICENSE de Rocket y añadiendo una línea en el README indicando el origen y el commit.
4. Ejecutar `npm install` y `npm run build`. Informar del resultado tal cual, con errores si los hay.
5. Ejecutar `npm run dev` y confirmar que la portada responde.

Referencia visual (parte de esta fase):
6. Clonar también Darkminimal (https://github.com/Gothsec/dark-minimal, licencia MIT) como referencia de la estética que quiero lograr. Va en una carpeta hermana de mi repo, fuera de él (por ejemplo ../referencias/dark-minimal), sin su carpeta .git, y anota su commit exacto. No lo copies dentro de portfolio-astro, no lo añadas a package.json y no ejecutes npm install en él.
7. Es solo de lectura: lo usaremos en las fases 4, 5 y 6 para consultar colores, estructura de la página y el header. Dime cómo darle acceso a esa carpeta en las fases siguientes si hace falta.

Criterio de fin: build sin errores y portada en local en mi repo, y Darkminimal disponible fuera del repo como referencia. No cambies nada más.
```

---

## Fase 2: sitio estático, sin backend

Commit propuesto: `refactor: sitio estático sin rutas de servidor`

```
Fase 2: convertir el sitio en estático puro, sin backend ni base de datos.

Entendimiento: Rocket tiene dos rutas de servidor (/api/contact y /api/newsletter, con Resend) y adaptadores de despliegue. No quiero ningún backend.

Pasos a proponerme antes de ejecutar:
1. Listar todo lo que depende de esas rutas o del adaptador: archivos en src/pages/api, formularios que las llaman, variables de entorno (.env.example), dependencias (resend y adaptadores), configuración en astro.config.
2. Proponer qué se elimina y qué se sustituye. El contacto pasa a un enlace mailto con un correo de ejemplo (tu-correo@example.com), sin formulario.
3. Tras mi aprobación: eliminarlo, dejar output static en la configuración y quitar las dependencias sin uso.
4. Ejecutar `npm run build` y comprobar que el resultado es una carpeta de HTML estático sin funciones de servidor. Muestra la salida.

Criterio de fin: build sin errores, ninguna ruta con prerender false, ninguna variable de entorno obligatoria.
```

---

## Fase 3: recortar lo que no hace falta

Commit propuesto: `refactor: eliminar blog, servicios, i18n y páginas de demo`

```
Fase 3: recortar Rocket a lo imprescindible para un portfolio de una sola página.

Entendimiento: no necesito blog, servicios, newsletter, idiomas, búsqueda ni la página de componentes. Sí necesito conservar: hero, tarjetas de proyecto, selector de tema, efecto LetterGlitch y los tokens de estilo.

Pasos a proponerme antes de ejecutar:
1. Inventario: qué páginas, componentes, colecciones de contenido, utilidades y dependencias existen, y cuáles propones borrar y por qué.
2. Señalar dependencias cruzadas (por ejemplo, componentes que usan i18n o la búsqueda) y proponer cómo desacoplarlas con el menor cambio.
3. Aviso: Rocket tiene un test que comprueba que su registro de componentes tiene 44 entradas y otro que cruza los temas con archivos en disco. Dime qué tests habría que actualizar o quitar; no los borres para que pasen.
4. Tras mi aprobación: borrar por partes y ejecutar el build después de cada parte.

Criterio de fin: build sin errores, la portada sigue funcionando, el selector de tema sigue funcionando, y sin referencias rotas.
```

---

## Fase 4: header de Darkminimal

Commit propuesto: `feat: barra de navegación flotante con cápsula al hacer scroll`

```
Fase 4: portar el header de Darkminimal (archivo src/components/nav.astro de la copia de referencia clonada en la fase 1, o https://github.com/Gothsec/dark-minimal) a la página.

Entendimiento: debe copiarse tal cual su comportamiento, adaptado a Tailwind 4 y a los tokens de Rocket.

Comportamiento a reproducir (verificado en su código):
- Barra fija arriba, centrada, ancho inicial del 80%.
- Al bajar (scroll mayor que 0) añade la clase scrolling: fondo sólido, borde tenue y esquinas totalmente redondeadas.
- El ancho se reduce de forma progresiva hasta 528px, con suavizado (1 menos (1 menos p) elevado a 4, con p entre 0 y 1) y requestAnimationFrame. maxScroll es 1000.
- Enlaces #home, #projects, #contact con scroll suave.
- IntersectionObserver con umbral 0.6 que marca el enlace activo con un punto indicador.
- En menos de 768px: barra fija abajo, a todo el ancho, con esquinas redondeadas solo arriba, iconos sobre las etiquetas, y padding-bottom en el body para que no tape el contenido.

Pasos a proponerme antes de ejecutar:
1. Mapear sus variables (--background, --component-bg, --white-icon, --sec) a los tokens de Rocket. --component-bg no la encuentro definida en su Layout; dime qué has comprobado y propón un valor.
2. Comprobar si mi página usa ClientRouter. Si lo usa, adaptar el script a astro:page-load; si no, dejarlo simple.
3. Respetar prefers-reduced-motion en la animación del ancho.
4. Dar al enlace activo un indicador accesible (aria-current) además del punto.
5. Selector de temas dentro de la barra: en escritorio, `ThemeSelectorDropdown` y `ThemeModeDropdown` al final de la cápsula; en móvil, un icono en la barra inferior que abre hacia arriba un panel con las muestras de `ThemeSelector` y el interruptor claro/oscuro. Los desplegables de Rocket se abren hacia abajo (`top-full`), así que en móvil el panel se invierte (`bottom-full`). Con `aria-label`, `aria-expanded`, cierre con Escape o al tocar fuera, y sin animación con `prefers-reduced-motion`.
6. Tras mi aprobación: crear el componente, usarlo en la página y ejecutar el build.

Criterio de fin, comprobado en dev: a 1280px la barra empieza al 80% y se hace cápsula al hacer scroll; a 375px queda abajo como barra con el selector de temas abriéndose hacia arriba; los enlaces saltan a sus secciones y marcan la activa; sin errores en la consola.
```

---

## Fase 5: una sola página con secciones

Commit propuesto: `feat: portada de una sola página con secciones`

```
Fase 5: dejar la web como una única página con tres secciones (inicio, proyectos, contacto), como Darkminimal.

Entendimiento: todo vive en una página, con secciones que tienen id (home, projects, contact) y a las que se salta con anclas. El contenido es de ejemplo, sin mis datos reales todavía.

Pasos a proponerme antes de ejecutar:
1. Proponer la estructura: contenedor centrado de ancho máximo, secciones apiladas con separadores finos, y qué componentes de Rocket reutilizas en cada una (hero, tarjetas de proyecto, LetterGlitch en el hero).
2. Hero: titular grande a la izquierda y párrafo a la derecha en escritorio, apilados en móvil, botones de icono (GitHub, LinkedIn, correo) con enlaces de ejemplo.
3. Proyectos: rejilla de 1 a 2 columnas con cuatro tarjetas de ejemplo.
4. Contacto: texto y enlace mailto, sin formulario.
5. Eliminar la cabecera y el pie antiguos de la portada; la nueva barra llega en la fase 4.
6. Tras mi aprobación: implementarlo, ejecutar el build y revisar en dev a 375px y a 1280px.

Criterio de fin: una sola página, ids correctos en las secciones, sin enlaces rotos, responsive en móvil y escritorio.
```

---

## Fase 6: tema violeta propio dentro del selector de Rocket

Commit propuesto: `feat: tema violeta oscuro y fuente Montserrat`

```
Fase 6: añadir un tema propio al selector de temas de Rocket, con la estética de Darkminimal, sin quitar los que ya existen.

Entendimiento: Rocket define cada tema en src/styles/themes/*.css con html[data-theme="x"] y html.dark[data-theme="x"], lo importa en src/styles/tokens/colors.css y lo registra en src/lib/themes.ts. Quiero un tema nuevo con fondo casi negro (#101010), acento violeta (#a476ff) y texto claro (#dfdfdf), y la fuente Montserrat.

Pasos a proponerme antes de ejecutar:
1. Leer un tema existente (por ejemplo violet.css) y los tokens de superficie y texto, y explicarme qué variables define cada uno.
2. Proponer el archivo del tema nuevo, con un id claro (por ejemplo darkviolet). Convertir los colores a OKLCH como hace Rocket y mostrarme la tabla hex a oklch.
3. Proponer el registro en colors.css, themes.ts y la lista de permitidos de BaseLayout.astro, que el test de temas comprueba.
4. Fuente: proponer cómo añadir @fontsource-variable/montserrat y cambiarla en los tokens de tipografía, sin tocar los componentes.
5. Proponer si el tema nuevo debe ser el predeterminado y oscuro por defecto.
6. Tras mi aprobación: implementarlo, ejecutar el build y los tests de temas.

Criterio de fin: el tema aparece en el selector, se puede elegir y se mantiene al recargar, los otros temas siguen funcionando y los tests de temas pasan. Aviso: dime con claridad si algún componente tiene colores fijos que no respeten el tema.
```

---

## Después de esta base (fuera del plan, para más adelante)

- Selector de estilos (forma, borde, sombra), inspirado en el del bento, como segundo atributo `data-style`.
- Rescatar piezas del playground del bento, de una en una.
- Tus datos reales y la publicación.
