# Documentación del portfolio

Esta carpeta explica **qué es** el proyecto, **cómo se llegó a él** y **cómo se toca**. Está pensada para ti dentro de unos meses, cuando hayas olvidado dónde estaba cada cosa.

Estado descrito: **8 de octubre de 2026**, rama `pruebas`, commit `368538a`.

## Dos bloques

| Si quieres… | Lee |
|---|---|
| Entender qué es la web, cómo está organizada y por qué es así | [proyecto/](proyecto/) |
| Saber **qué archivo editar** para conseguir algo concreto | [guia-astro/](guia-astro/) |

### `proyecto/` — documentación del proyecto

| Archivo | Contenido |
|---|---|
| [01-resumen.md](proyecto/01-resumen.md) | Qué es, tecnologías, qué tiene y qué no |
| [02-estructura-del-codigo.md](proyecto/02-estructura-del-codigo.md) | Mapa de carpetas y archivos, con la función de cada uno |
| [03-como-funciona.md](proyecto/03-como-funciona.md) | Cómo se construye la página, el idioma, los temas, las animaciones, el SEO y el build |
| [04-historial.md](proyecto/04-historial.md) | Los 34 commits explicados por etapas |
| [05-decisiones-y-descartes.md](proyecto/05-decisiones-y-descartes.md) | Lo que se probó y se quitó, y por qué |
| [06-estado-y-pendientes.md](proyecto/06-estado-y-pendientes.md) | Qué falta, deuda conocida y límites |
| [plan-original.md](proyecto/plan-original.md) | El plan de fases del principio, conservado como referencia histórica |

### `guia-astro/` — guía práctica

| Archivo | Contenido |
|---|---|
| [01-conceptos-basicos.md](guia-astro/01-conceptos-basicos.md) | Lo mínimo de Astro para moverse por este proyecto |
| [02-que-archivo-editar.md](guia-astro/02-que-archivo-editar.md) | **La tabla principal:** "quiero X → edito Y" |
| [03-recetas.md](guia-astro/03-recetas.md) | Tareas completas paso a paso (añadir un proyecto, un idioma, una sección…) |
| [04-comandos-y-comprobaciones.md](guia-astro/04-comandos-y-comprobaciones.md) | Comandos de `npm`, tests y qué hacer antes de publicar |
| [05-problemas-frecuentes.md](guia-astro/05-problemas-frecuentes.md) | Síntomas habituales y su causa |

## Cómo usar esta documentación

- **Para cambiar algo:** ve directo a [02-que-archivo-editar.md](guia-astro/02-que-archivo-editar.md). Si la tarea tiene varios pasos, la tabla te remite a una receta de [03-recetas.md](guia-astro/03-recetas.md).
- **Para entender algo raro:** [03-como-funciona.md](proyecto/03-como-funciona.md) y [05-problemas-frecuentes.md](guia-astro/05-problemas-frecuentes.md).
- **Para saber por qué algo no está:** [05-decisiones-y-descartes.md](proyecto/05-decisiones-y-descartes.md).

## Convenciones de estos documentos

- Las rutas están escritas **desde la raíz del repositorio** (por ejemplo `src/i18n/es.json`).
- Todo lo que aquí se afirma sobre el código se comprobó leyéndolo. Donde algo **no** se verificó, está dicho con claridad.
- No hay secretos en el repositorio ni en esta documentación. El único valor de entorno que usa el sitio es `SITE_URL`, y no es secreto.
