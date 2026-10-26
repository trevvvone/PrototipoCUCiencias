"use client";
import { R, Split } from "./ui";
import { Card } from "./Articles";

/* Destacado de la semana: un artículo grande y dos pequeños al lado (como Stanford Report) */
export default function Featured({ items, onOpen }) {
  const [big, ...small] = items;
  return (
    <section className="feat2" id="destacado">
      <div className="wrap">
        <R className="fh"><span className="kick">Destacado de la semana</span><Split>El artículo de la semana</Split><p className="sub">Lo más importante que publicó la comunidad científica de la CUC.</p></R>
        <div className="mosaic">
          <Card a={big} i={0} size="big" onOpen={onOpen} />
          {small.map((a, i) => <Card key={a.id} a={a} i={i + 1} size="small" onOpen={onOpen} />)}
        </div>
        <R><a className="foco" href="#publicaciones"><span className="kick">En foco · Año 2026</span><strong>Energía y clima del Caribe</strong><span>Todo lo que investigamos sobre cómo vivir con más sol, más humedad y más calor.</span><span className="pill2">Ver publicaciones →</span></a></R>
      </div>
    </section>
  );
}
