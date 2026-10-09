# 05 · Decisiones y descartes

Lo que se decidió, lo que se probó y se quitó, y **por qué**. Sirve para no volver a recorrer el mismo camino y para saber qué ideas ya se han descartado.

## Decisiones de diseño que siguen vigentes

| Decisión | Razón |
|---|---|
| **Una sola página con anclas**, no varias páginas | Es lo que necesita un portfolio de este tamaño y se navega rápido. Se eliminaron `/projects` y `/contact` cuando dejaron de tener enlaces |
| **Estática, sin backend** | Más barata, rápida y segura. No hay formularios que mantener ni datos de visitantes |
| **Conservar el sistema de idiomas** de Rocket | Para tener español e inglés. Es la única funcionalidad "grande" de la plantilla que se mantuvo |
| **Sin React** | Tras borrar la librería no quedó ningún componente que lo usara |
| **Hero oscuro en los dos modos** | Es una decisión de estilo heredada de Rocket. La barra flotante tiene estilos propios sobre él |
| **Tono sobrio y profesional** | El destino es una consultora de software. La personalidad va en detalles pequeños, no en efectos grandes |
| **El enlace de correo abre Gmail**, no `mailto:` | `mailto:` no hace nada si no hay programa de correo configurado |
| **La tarjeta de proyecto no enlaza** | Las páginas de detalle se eliminaron y el repositorio es privado |
| **Selector de modo claro/oscuro, sin "sistema"** | La opción "sistema" parecía no hacer nada. La primera visita sigue al sistema y, en cuanto se elige, manda la elección |
| **Se conserva el `LICENSE` de Rocket** | La licencia MIT lo exige |

## Lo que se probó y se quitó

### Tema violeta propio y tipografía Montserrat (Fase 4 del plan)

**Qué era:** un tema oscuro con fondo casi negro, acento violeta (`#a476ff`) y texto claro, inspirado en Darkminimal, más la fuente Montserrat.
**Qué pasó:** se **abandonó antes de empezar** ("no cambiar nada, se queda así"). Se conserva el tema azul de Rocket y su selector de ocho colores.
**Dónde queda rastro:** el plan original, [plan-original.md](plan-original.md).

### Animación del texto del hero con el scroll (`d3618b1`)

**Qué era:** el titular y el párrafo se rompían en grupos de dos o tres letras repartidas por el banner que se juntaban al hacer scroll.
**Por qué se quitó:** al añadir el fondo de símbolos, dos animaciones a la vez saturaban. Se retiró en `283293a`, el commit siguiente.

### Fondo de símbolos de programación con espiral (`283293a`, `7aba1e4`)

El fondo del hero fue evolucionando hasta una de las partes más elaboradas del proyecto. Estas fueron las iteraciones y lo que se descartó en cada una:

1. **Punto de partida:** puntos flotantes unidos por líneas que se rompían al pasar el ratón.
2. **Variante de temática "dev" con red de commits tipo Git:** se probó y se **descartó por completo** ("no me convence, volvamos a los puntos flotantes"). Además, la temática de red se veía más propia de un perfil de sistemas (ASIR) que de desarrollo.
3. **Señales que viajaban del cursor a los nodos:** daban **sensación de videojuego de naves**, "como si disparara desde el cursor". Se suavizó y se descartó.
4. **Cursor como recolector** (inspirado en la animación de una página de lanzamiento de OpenAI): el cursor recoge un grupo de partículas, las retiene un segundo y las suelta, con una pausa antes de poder recogerlas de nuevo. Funcionó y gustó.
5. **Símbolos de programación** (`{ } ( ) ; = …`) en lugar de puntos, un poco más grandes.
6. **Espiral** (`7aba1e4`, hecha fuera de la sesión de asistencia): donde el cursor se detiene, se forma una espiral de tres vueltas con los símbolos recogidos.

**Por qué se retiró todo (`166e6af`):** al valorar la página en conjunto, se concluyó que era **demasiado vistoso** para un portfolio dirigido a una consultora y que su efecto principal obligaba al visitante a "hacer algo raro" (esperar con el ratón quieto). La idea final fue: *"que entres y pienses 'es un buen detalle', sin tener que hacer nada"*.

**Qué lo sustituyó:** un cursor de terminal parpadeando en el subtítulo, una luz que sigue al cursor sobre el nombre y micro-interacciones en botones, desplegables y tarjetas.

**Cómo recuperarlo:** el código completo está en el historial. `git show 7aba1e4:src/components/effects/ParticleField.astro` imprime la última versión (979 líneas).

### Otras ideas que se descartaron antes de implementarse

| Idea | Por qué no |
|---|---|
| Rejilla de puntos con luz que sigue al cursor, y degradado que "respira" | Se propusieron como alternativas más sobrias al fondo de símbolos. La rejilla de puntos **se implementó después**, solo en pantallas de 1280 px o más; el degradado sigue sin hacerse |
| Selector de estilos (forma, borde, sombra) tipo "bento" | Del plan original, "para más adelante" |
| Botón de descarga del CV | No se incluye (descartado o resuelto fuera del código) |
| Foto de perfil | No se incluye. El avatar de relleno de la plantilla se borró con los recursos de ejemplo |
| Enlace de LinkedIn que pedía iniciar sesión | El enlace es correcto; el perfil probablemente no es público. Se dejó como está |

## Lo que se eliminó de Rocket, y por qué

| Eliminado | Razón |
|---|---|
| Blog completo, RSS, autores, preguntas frecuentes | No hay blog |
| Servicios y página "sobre mí" separada | Se integraron en la portada |
| Búsqueda (Pagefind), analítica, banner de cookies, mapa de Google | No se usan |
| Formularios de contacto y newsletter, y la dependencia de Resend | Sin backend |
| Docker, Netlify, Vercel, Cloudflare, GitHub Actions | El despliegue se decide aparte |
| pnpm | Se pasó a npm |
| Proyectos de ejemplo, avatares y banners de demostración | Eran de Rocket |
| `AGENTS.md`, `component-registry.json`, README, CHANGELOG, SECURITY | Describían piezas que ya no existen |
| Página `/components` y 114 archivos que solo ella usaba | Era un catálogo para ver componentes; se quería "dejar el catálogo" un tiempo, pero al final se decidió quitarlo todo y que solo queden las piezas usadas |
| React y sus paquetes | Ningún componente lo usaba ya |
| La tira de logos del hero | Mostraba el stack de la plantilla (Astro, React, Vercel…), no el propio |
| Las etiquetas encima de cada título ("Conóceme"…) | Eran genéricas de plantilla |
| 64 textos de traducción sin uso | Restos de las páginas eliminadas |

## Cómo se decidió qué borrar

Para las limpiezas grandes se hizo un **recorrido de dependencias** (qué archivos son alcanzables desde las páginas, la configuración y los tests) y se borró lo que no lo era, comprobando después `build`, tests y `astro check`.

**Una lección de ese proceso:** el primer recorrido dio 33 archivos muertos y era **falso**: un patrón de carga masiva (`import.meta.glob`) en `src/i18n/index.ts` hacía parecer alcanzable casi todo el proyecto. Corregido el método, salieron 114. Si repites algo parecido, trata los `glob` con cuidado.

**Regla que se mantuvo con los tests:** al borrar código no se borraron tests *solo para que pasaran*. Se borraron los que probaban código eliminado (blog, registro de componentes, rutas de proyecto) y se **adaptaron** los demás a claves o rutas que siguen existiendo.
