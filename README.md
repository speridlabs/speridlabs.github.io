# speridlabs.github.io

El linter se ejecuta automáticamente antes de hacer commit en la rama `master` `husky`

## 🏗 Despliegue y Arquitectura

El sitio se despliega automáticamente en **GitHub Pages** mediante una GitHub Action `./github/workflows/deploy-pages.yml` cada vez que se hace push a `master`.

### El problema de GitHub Pages + SPAs
GitHub Pages es un host estático. Por defecto, si usas `BrowserRouter` (urls bonitas tipo `/projects/algo`) y recargas la página, GitHub busca un archivo `/projects/algo/index.html` que no existe, devolviendo un **404**.

### La Solución (SSG Híbrido) 
Un Sistema híbrido: SPA y el SEO de un sitio estático.

El comando `pnpm build` ejecuta automáticamente un script post-build (`scripts/generate-routes.ts`).

**¿Qué hace este script?**

1.  **Generación de rutas estáticas (SEO):**
    Lee el archivo `src/data/projects.ts` y crea carpetas físicas reales en `dist/` para cada proyecto (ej: `dist/projects/neural-rendering-3d/index.html`).
    *   *Resultado:* Googlebot y los usuarios reciben un **200 OK** real al entrar directo.

2.  **Fallback SPA (`404.html`):**
    Copia `index.html` a `404.html`.
    *   *Resultado:* Si alguien entra a una ruta que no existe físicamente, GitHub sirve este archivo, React Router toma el control en el cliente y muestra nuestra página de "404 Not Found" personalizada manteniendo el layout.

3.  **Bypass de Jekyll (`.nojekyll`):**
    Genera un archivo vacío `.nojekyll`.
    *   *Motivo:* Evita que GitHub Pages ignore carpetas o archivos que empiezan por `_` (común en Vite) y desactiva el procesamiento innecesario de Jekyll.

### Estructura de Build

```text
dist/
├── index.html              # Home
├── 404.html                # Fallback para rutas desconocidas (Client-side routing)
├── .nojekyll               # Desactiva Jekyll
├── assets/                 # JS/CSS compilados
└── projects/
    ├── index.html          # /projects
    └── [slug]/
        └── index.html      # /projects/mi-paper (SEO Friendly)
```

## 📦 Añadir un nuevo Proyecto

1.  Abre `src/data/projects.ts`.
2.  Añade un objeto nuevo al array con el slug, título, abstract, bibtex, etc.
3.  Haz push a `master`.
4.  El script generará automáticamente la carpeta estática para esa nueva ruta durante el despliegue.
