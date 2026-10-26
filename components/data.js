// Contenido de ejemplo (reemplazar por los textos reales de CUCiencia)
export const AREAS = ["Todas", "Salud", "Energía", "Digital", "Territorio", "Educación"];
const P = (t) => [t, "El equipo combinó trabajo de campo, análisis de datos y validación con la comunidad para llegar a resultados que se puedan aplicar en la región.", "En los próximos meses se ampliará la muestra y se compartirán los datos abiertos para que otros grupos puedan replicar el estudio."];
const BASE = [
  { id: 1, area: "Energía", title: "Paneles solares frente a la humedad del Caribe", resumen: "Un modelo que mejora el rendimiento de los paneles en zonas de alta humedad y calor.", cuerpo: P("Medir cómo el clima caribeño afecta la producción de energía solar es el primer paso para diseñar sistemas más eficientes."), autor: "Grupo GENERGÍA", fecha: "12 oct 2026", min: 6, img: "/img/pub-1.jpg" },
  { id: 2, area: "Salud", title: "Biomarcadores para el diagnóstico temprano", resumen: "Nuevas señales biológicas que podrían adelantar el diagnóstico de enfermedades comunes.", cuerpo: P("Detectar a tiempo cambia el pronóstico. Por eso el grupo busca marcadores accesibles y de bajo costo."), autor: "Grupo de Salud Pública", fecha: "9 oct 2026", min: 5, img: "/img/pub-2.jpg" },
  { id: 3, area: "Digital", title: "Inteligencia artificial para leer el oleaje", resumen: "Una red neuronal aprende a anticipar el comportamiento del mar frente a Barranquilla.", cuerpo: P("Con años de datos del litoral, el modelo predice el oleaje con horas de anticipación."), autor: "Grupo de Sistemas", fecha: "6 oct 2026", min: 7, img: "/img/pub-3.jpg", video: "/videos/laboratorio.mp4" },
  { id: 4, area: "Territorio", title: "Ciudades más frescas: lo que dicen los termómetros del barrio", resumen: "Mediciones barrio a barrio muestran dónde el calor urbano golpea más fuerte.", cuerpo: P("Árboles, sombra y materiales: pequeñas decisiones de diseño que bajan la temperatura de la calle."), autor: "Grupo de Arquitectura", fecha: "2 oct 2026", min: 4, img: "/img/pub-4.jpg" },
  { id: 5, area: "Educación", title: "Aprender matemáticas con datos del barrio", resumen: "Estudiantes de colegio analizan información real de su entorno para entender estadística.", cuerpo: P("Cuando los números hablan de la propia calle, las matemáticas dejan de ser abstractas."), autor: "Grupo de Educación", fecha: "28 sep 2026", min: 5, img: "/img/pub-5.jpg" },
  { id: 6, area: "Salud", title: "Qué cuentan los datos de salud pública del Atlántico", resumen: "Una lectura clara de las cifras de la región: tendencias, brechas y oportunidades de prevención.", cuerpo: P("Los datos abiertos permiten ver patrones que antes pasaban desapercibidos en los informes."), autor: "Grupo de Salud Pública", fecha: "24 sep 2026", min: 6 },
  { id: 7, area: "Energía", title: "Cuánta energía ahorra una universidad al medir mejor", resumen: "Sensores y tableros de consumo ayudan a descubrir dónde se pierde energía dentro del campus.", cuerpo: P("Medir es el primer paso para ahorrar: el campus se convirtió en laboratorio vivo."), autor: "Grupo GENERGÍA", fecha: "20 sep 2026", min: 5 },
  { id: 8, area: "Digital", title: "Semilleros: la primera experiencia de investigar", resumen: "Jóvenes de pregrado cuentan cómo es formular una pregunta propia y buscar la respuesta.", cuerpo: P("Los semilleros son la puerta de entrada a la investigación para cientos de estudiantes."), autor: "Vicerrectoría de CTI", fecha: "15 sep 2026", min: 4 },
  { id: 9, area: "Energía", title: "Biocombustibles a partir de residuos de coco", resumen: "Convertir la cáscara que sobra en energía: un proceso de bajo costo probado en el laboratorio.", cuerpo: P("Cada año se desechan toneladas de residuos agrícolas en el Caribe; este proyecto los trata como materia prima."), autor: "Grupo de Energía y Ambiente", fecha: "10 sep 2026", min: 6, img: "/img/pub-6.jpg" },
  { id: 10, area: "Salud", title: "Dormir bien y rendir mejor: lo que midieron en estudiantes", resumen: "Un estudio con jóvenes de pregrado relaciona las horas de sueño con la atención en clase.", cuerpo: P("Los hábitos de sueño pesan más de lo que se cree en el rendimiento académico."), autor: "Grupo de Psicología", fecha: "5 sep 2026", min: 5 },
  { id: 11, area: "Digital", title: "Ciberseguridad para pequeñas empresas de la región", resumen: "Una guía práctica para proteger datos y pagos sin necesidad de un equipo de expertos.", cuerpo: P("Las pequeñas empresas son blanco frecuente de ataques; unas pocas prácticas reducen el riesgo de forma notable."), autor: "Grupo de Sistemas", fecha: "1 sep 2026", min: 7, img: "/img/pub-7.jpg" },
  { id: 12, area: "Educación", title: "Un podcast científico hecho por estudiantes de colegio", resumen: "Cómo contar una investigación en cinco minutos de audio: la experiencia de un aula del Atlántico.", cuerpo: P("Explicar la ciencia con voz propia obliga a entenderla de verdad."), autor: "Grupo de Educación", fecha: "28 ago 2026", min: 4, img: "/img/pub-8.jpg" },
  { id: 13, area: "Territorio", title: "Mapas colaborativos para cuidar el manglar", resumen: "Vecinos y científicos dibujan juntos el estado del manglar para decidir cómo protegerlo.", cuerpo: P("Cuando la comunidad participa en el mapa, la información llega a lugares que los satélites no ven."), autor: "Grupo de Ingeniería Civil", fecha: "22 ago 2026", min: 6 },
];

// Datos de ejemplo. Los enlaces a bases de datos apuntan a la página principal de cada plataforma; ORCID y DOI son ficticios.
const SRC = [
  { n: "Revista Científica de Ejemplo", d: "Vol. 18, Núm. 1 · 2026", b: "Ver artículo completo", u: "#" },
  { n: "Repositorio institucional CUC", d: "Universidad de la Costa", b: "Ver en el repositorio", u: "https://repositorio.cuc.edu.co/" },
  { n: "Scopus", d: "Base de datos científica", b: "Ver en Scopus", u: "https://www.scopus.com/" },
  { n: "Web of Science", d: "Base de datos científica", b: "Ver en Web of Science", u: "https://www.webofscience.com/" },
  { n: "ScienceDirect", d: "Base de datos científica", b: "Ver en ScienceDirect", u: "https://www.sciencedirect.com/" },
  { n: "Redalyc", d: "Red de revistas científicas", b: "Ver en Redalyc", u: "https://www.redalyc.org/" },
];
const INV = [
  ["Dra. Laura Quintero", "Quintero, Laura", "Investigadora en salud pública. Estudia cómo los datos del territorio ayudan a prevenir enfermedades en el Caribe."],
  ["Dr. Andrés Pacheco", "Pacheco, Andrés", "Ingeniero energético. Diseña sistemas solares para climas cálidos y húmedos."],
  ["Dra. Marta Villalobos", "Villalobos, Marta", "Científica de datos. Usa inteligencia artificial para entender el mar y el clima."],
  ["Dr. Camilo Ardila", "Ardila, Camilo", "Arquitecto e investigador urbano. Mide el calor de los barrios para diseñar ciudades más frescas."],
  ["Dra. Sofía Barrios", "Barrios, Sofía", "Docente investigadora en educación. Lleva datos reales del entorno a las clases de matemáticas."],
  ["Dr. Julián Mercado", "Mercado, Julián", "Ingeniero civil. Trabaja con comunidades en mapas colaborativos del territorio."],
  ["Dra. Natalia Rosales", "Rosales, Natalia", "Psicóloga investigadora. Estudia hábitos y bienestar en jóvenes universitarios."],
];
const TAGS = { Salud: ["Salud pública", "Prevención"], Energía: ["Energía", "Sostenibilidad"], Digital: ["Datos", "Inteligencia artificial"], Territorio: ["Ciudad", "Clima"], Educación: ["Educación", "Juventud"] };
const TIPOS = ["Investigación", "Entrevista", "Noticia", "Perfil", "Opinión"];
export const ARTICLES = BASE.map((a, i) => ({
  ...a, tipo: a.video ? "Video" : TIPOS[i % 5],
  investigador: INV[i % 7][0], apellido: INV[i % 7][1], bio: INV[i % 7][2], foto: `/img/autor-${(i % 7) + 1}.jpg`,
  orcid: `0000-0000-0000-${String(i + 1).padStart(4, "0")}`,
  fuente: SRC[i % 6], doi: `10.0000/ejemplo.2026.${String(i + 1).padStart(3, "0")}`,
  tags: TAGS[a.area], anio: 2026, epigrafe: "Imagen de ejemplo generada para el prototipo.",
}));
