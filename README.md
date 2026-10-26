# CUCiencia · prototipo de portada (Next.js 15 + Framer Motion)

    npm install
    npm run dev      # http://localhost:3000
    npm run build

Despliegue: sube la carpeta a GitHub e impórtala en Vercel (sin configuración extra; las fuentes de Google se descargan al compilar).

## Qué incluye
- Pantalla de carga (una vez por sesión), barra de progreso, menú que se oculta al bajar, aviso de suscripción arriba.
- Portada con video (versión clara y oscura) que arranca solo, botón de pausa, panel de vidrio y banda amarilla en movimiento.
- Paneles apilados al hacer scroll (el de abajo sube y tapa al de arriba).
- Destacado de la semana (1 grande + 2 pequeños) y "En foco".
- Repositorio científico: búsqueda, filtros por área, bloques alternados (1 grande + 2 pequeños), tarjetas con inclinación 3D y resumen al pasar el cursor, datos curiosos que invitan a suscribirse, "Ver más publicaciones".
- Subpágina del artículo (16:9): vista previa que se desvanece con botón "Seguir leyendo en [fuente]", autor (foto, nombre, ORCID, bio), fuente y DOI, citas en 6 formatos, BibTeX/RIS, banner Educosta y "Más en el repositorio".
- Podcast con reproductor (pausar, reanudar, ±10 s, progreso, volumen), videos y "CUCiencia en los medios" (citas de ejemplo).
- "Investigar es explorar" (letras que ondulan + video), cifras con contadores automáticos, boletín con ventana emergente.
- Modo claro/oscuro (menú y pie) y movimiento completo por defecto; el visitante puede reducirlo en el pie ("Movimiento: reducido").

## Dónde cambiar cosas
- Colores: variables al inicio de `app/globals.css`.
- Artículos, autores, ORCID, DOI y enlaces a Scopus/Web of Science/etc.: `components/data.js` (hoy son de ejemplo; el banner de Educosta aún no tiene enlace).
- Videos, audios e imágenes originales (se pueden reemplazar con el mismo nombre): `public/videos`, `public/audio`, `public/img` (ver `public/videos/LEEME.txt`).
- Logos: `public/img/cuc-*.png` (hechos de PNG; conviene usar los SVG oficiales).
