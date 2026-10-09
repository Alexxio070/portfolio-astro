# 04 · Comandos y comprobaciones

## Primera vez en un ordenador nuevo

```bash
git clone https://github.com/Alexxio070/portfolio-astro.git
cd portfolio-astro
git switch pruebas        # el trabajo vive en esta rama
node --version            # debe ser 22.12 o superior (ver .nvmrc)
npm install
npm run dev               # abre http://localhost:4321
```

> Si tienes `nvm`: `nvm use` lee `.nvmrc` y cambia a la versión correcta.

## Comandos de `npm`

Los scripts están en `package.json`.

| Comando | Qué hace | Cuándo |
|---|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática en `http://localhost:4321` | Mientras trabajas |
| `npm run build` | Genera el sitio en `dist/` | Antes de publicar |
| `npm run preview` | Sirve `dist/` tal como se publicará | Para ver el resultado final |
| `npm run verify` | Comprueba que lo que hay en `dist/` es un sitio utilizable | Tras `build` |
| `npm run check` | `astro check`: errores de tipos y de plantillas | Antes de commitear |
| `npm run lint` | ESLint: errores de código | Antes de commitear |
| `npm run lint:fix` | ESLint, arreglando lo que puede | Si `lint` se queja de estilo |
| `npm run format` | Prettier: reescribe el formato de todos los archivos | Con cuidado: toca muchos archivos |
| `npm run format:check` | Prettier: solo comprueba | Para ver qué cambiaría |
| `npm test` | Tests en modo "vigilancia" (se repiten al guardar) | Mientras trabajas |
| `npm run test:run` | Tests una sola vez | Para comprobar |
| `npm run deploy:check` | Construye y simula el despliegue en Cloudflare **sin subir nada** | Para comprobar `wrangler.jsonc` |
| **`npm run deploy`** | **Valida todo y, solo si pasa, publica `dist/` en Cloudflare** | Para publicar (requiere `npx wrangler@4 login` una vez) |
| **`npm run validate`** | **Todo lo anterior encadenado:** lint → check → tests → build → verify | **Antes de cada commit importante y antes de publicar** |

## Qué comprueba `npm run validate`

| Paso | Qué detecta |
|---|---|
| `lint` | Variables sin usar, imports muertos, errores de código |
| `check` | Props mal escritos, tipos incorrectos, plantillas rotas |
| `test:run` | Que los 63 tests sigan pasando (ver abajo) |
| `build` | Que el sitio compila, que el contenido cumple su esquema y que la dirección canónica coincide con el JSON-LD |
| `verify` | Que hay HTML con contenido real, imágenes generadas válidas y tarjeta para redes |

**Una salida correcta** termina con `verify-build: output looks good` y sin errores. Las 2 advertencias de `console` en `scripts/verify-build.mjs` son normales.

## Los tests

Hay 6 archivos en `src/__tests__/` (63 tests). Qué protege cada uno:

| Archivo | Protege |
|---|---|
| `i18n.test.ts` | La función `t()` y que **los títulos no repitan tu nombre** (la página ya lo añade) |
| `i18n-coverage.test.ts` | Que **ningún componente escriba textos de interfaz a mano** y que **cada idioma tenga las mismas claves** que `en.json` |
| `nav-i18n.test.ts` | Que los enlaces del menú se resuelvan bien por idioma (con y sin prefijo) |
| `colour-themes.test.ts` | Que los 8 temas tengan archivo, se aíslen en su `data-theme` y definan la escala completa |
| `bar-color.test.ts` | Que el color de la barra del navegador en móvil coincida con el final del degradado del hero |
| `site-url-agreement.test.ts` | La lectura de la dirección del sitio en las páginas generadas |

> **Si un test falla tras borrar código:** no lo borres sin más. Pregúntate si el test comprobaba algo que ya no existe (entonces se borra **con** el código) o si comprobaba algo que sigue existiendo (entonces se adapta). Esa fue la regla durante todo el proyecto.

## Flujo de trabajo con Git

**Ramas**
- `pruebas`: donde se trabaja. Todo cambio va aquí.
- `main`: lo publicable. Solo recibe un *squash* de `pruebas` cuando decides publicar.

```bash
git branch --show-current       # antes de empezar: debe decir "pruebas"
git status                      # qué has cambiado
git diff                        # los cambios, línea a línea
git add -A src docs             # preparar archivos concretos
git commit                      # (se abre el editor para escribir el mensaje)
git push origin pruebas         # subir (solo cuando quieras)
git log --oneline               # historial resumido
```

**Mensajes de commit:** formato convencional y cortos.

| Prefijo | Para |
|---|---|
| `feat:` | Algo nuevo |
| `fix:` | Un arreglo |
| `refactor:` | Reorganizar o quitar sin cambiar lo que se ve |
| `style:` | Solo aspecto |
| `chore:` | Mantenimiento (dependencias, limpieza) |
| `docs:` | Documentación |

**Publicar en `main` sin arrastrar el historial** (un solo commit):

```bash
git switch main
git merge --squash pruebas      # trae los archivos, sin commits
git commit -m "feat: …"
git push origin main
git switch pruebas
```

**Deshacer sin perder trabajo**

| Quiero… | Comando |
|---|---|
| Ver un archivo como estaba en un commit | `git show <hash>:ruta/archivo` |
| Deshacer un commit **no subido** pero conservar los cambios | `git reset --soft HEAD~1` |
| Descartar los cambios de un archivo sin commitear | `git restore ruta/archivo` (⚠ **irreversible**) |
| Recuperar un commit "perdido" | `git reflog` y luego `git switch -c rescate <hash>` |

## Lista de comprobación antes de publicar

- [ ] Estás en `pruebas` y `git status` está limpio.
- [ ] `npm run validate` termina bien.
- [ ] `npm run preview` y revisas **la portada en español (`/`) y en inglés (`/en/`)**.
- [ ] Revisas a **375 px de ancho** (móvil) y a **1280 px** (escritorio): el menú, el hero, los desplegables y el contacto.
- [ ] Pruebas el **selector de color** y el **interruptor claro/oscuro**.
- [ ] El botón de **correo** abre Gmail con el asunto puesto.
- [ ] Los enlaces de **GitHub** y **LinkedIn** abren los perfiles correctos.
- [ ] Al **final de la página**, el bloque de contacto es visible (no queda en blanco).
- [ ] No hay **secretos** en el repositorio: `git grep -nEi "api[_-]?key|secret|password"` no devuelve nada preocupante (los "tokens" de diseño del CSS no cuentan).
- [ ] `npm run deploy:check` termina bien, y hay sesión de Cloudflare (`npx wrangler@4 whoami`).
- [ ] `SITE_URL` definida en el entorno donde compilas si el dominio no es `alexxio.dev`.
- [ ] Tras publicar, comprueba `/sitemap-index.xml`, `/robots.txt` y `/llms.txt` en el dominio real.

## Variables de entorno

Solo se usa una obligatoria en la práctica, y no es secreta.

| Variable | Para qué | Dónde |
|---|---|---|
| `SITE_URL` | Dominio del sitio (URLs canónicas, sitemap, tarjetas). Por defecto `https://alexxio.dev` | El entorno donde se compila (tu máquina o el panel de Cloudflare); o un archivo `.env` local (ver `.env.example`) |
| `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` | Etiquetas de verificación de propiedad. Opcionales | El entorno donde se compila |

> **El archivo `.env` está en `.gitignore` y no se sube.** No pongas nunca secretos en el código ni en los commits.
