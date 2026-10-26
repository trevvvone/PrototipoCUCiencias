CUCiencia · prototipo de portada

Prototipo de la portada y de la página de artículo de CUCiencia, el sitio de divulgación científica de la Universidad de la Costa. Sirve para validar el diseño y la comunicación antes de construir el sitio real.

Demo: (pega aquí el enlace de Vercel)

Qué incluye
Portada con video (claro y oscuro), pantalla de carga, paneles que se apilan al hacer scroll y animaciones en todo el sitio.
Destacado de la semana y bloques de artículos (uno grande y dos pequeños), con búsqueda y filtros por área.
Página de artículo en 16:9: vista previa con enlace al original (repositorio institucional, Scopus, Web of Science, etc.), autor con ORCID, DOI y citas en 6 formatos (APA, MLA, Chicago, Vancouver, Harvard, ISO 690) con exportación BibTeX y RIS.
Podcast con reproductor (pausar, reanudar, ±10 s, progreso y volumen), videos y citas de prensa.
Ventana emergente para suscribirse al boletín.
Modo claro y oscuro. Movimiento completo por defecto; el visitante puede reducirlo en el pie de página.
Accesibilidad: foco visible, navegación con teclado, diálogos que se cierran con Esc y botón para pausar el video.
Tecnologías

Next.js 15 (App Router) · React 19 · Framer Motion · CSS propio (sin librerías de UI).

Cómo correrlo

Requiere Node.js 18.18 o superior.

bash
npm install
npm run dev     # http://localhost:3000
npm run build   # compilar para producción
Cómo publicarlo en Vercel
Sube el proyecto a GitHub (sin node_modules ni .next).
En vercel.com: Add New → Project, importa el repositorio y pulsa Deploy. No necesita configuración extra.
Estructura
app/          layout y estilos globales
components/   secciones, lector de artículos, reproductor, datos de ejemplo
public/       videos, audios, imágenes y logos
Cómo cambiar el contenido
Colores: variables al inicio de app/globals.css.
Artículos, autores, ORCID, DOI y enlaces a las bases científicas: components/data.js.
Videos, audios e imágenes: public/videos, public/audio y public/img (se reemplazan con el mismo nombre de archivo).
Importante

Es un prototipo con contenido de ejemplo: los textos, los 13 artículos, los autores y sus fotos, los ORCID, los DOI, las cifras, las citas de prensa y el audio del podcast son ficticios. Los enlaces a Scopus, Web of Science, ScienceDirect y Redalyc llevan a la página principal de cada plataforma.

Créditos
Diseño y desarrollo: David Mendoza (pasantía, Universidad de la Costa).
Videos, imágenes de tarjetas, avatares y audios: material original generado para el prototipo.
El nombre, el logo y la identidad visual de la Universidad de la Costa pertenecen a la institución.
