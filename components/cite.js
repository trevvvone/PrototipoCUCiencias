export const FMTS = ["APA", "MLA", "Chicago", "Vancouver", "Harvard", "ISO 690"];

export function cite(a, f) {
  const [ap, no] = a.apellido.split(", "), ini = no[0] + ".", y = a.anio, t = a.title, j = a.fuente.n, doi = `https://doi.org/${a.doi}`;
  switch (f) {
    case "MLA": return `${ap}, ${no}. “${t}.” ${j}, ${y}, ${doi}.`;
    case "Chicago": return `${ap}, ${no}. ${y}. “${t}.” ${j}. ${doi}.`;
    case "Vancouver": return `${ap} ${ini} ${t}. ${j}. ${y}. doi:${a.doi}`;
    case "Harvard": return `${ap}, ${ini} (${y}) ‘${t}’, ${j}. Disponible en: ${doi}.`;
    case "ISO 690": return `${ap.toUpperCase()}, ${no}. ${t}. ${j}, ${y}. DOI ${a.doi}.`;
    default: return `${ap}, ${ini} (${y}). ${t}. ${j}. ${doi}`;
  }
}

export function exportRef(a, kind) {
  const key = a.apellido.split(",")[0].toLowerCase() + a.anio;
  if (kind === "bib") return `@article{${key},\n  author = {${a.apellido}},\n  title = {${a.title}},\n  journal = {${a.fuente.n}},\n  year = {${a.anio}},\n  doi = {${a.doi}}\n}\n`;
  return `TY  - JOUR\nAU  - ${a.apellido}\nTI  - ${a.title}\nJO  - ${a.fuente.n}\nPY  - ${a.anio}\nDO  - ${a.doi}\nER  - \n`;
}
