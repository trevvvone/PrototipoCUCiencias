"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ARTICLES, AREAS } from "./data";
import { R, Split, Tilt } from "./ui";
import { useRM } from "./motionctx";

const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const FACTS = [
  "la luz del Sol tarda unos 8 minutos en llegar a la Tierra?",
  "los pulpos tienen tres corazones y sangre azul?",
  "el ADN de dos personas cualquiera es idéntico en más del 99,9 %?",
  "un rayo calienta el aire a unos 30.000 °C, mucho más que la superficie del Sol?",
];

export function Card({ a, i = 0, size, onOpen }) {
  const media = a.img || a.video, big = size === "big";
  const hv = (e, on) => { const v = e.currentTarget.querySelector("video"); if (!v) return; if (on) v.play().catch(() => {}); else v.pause(); };
  const head = <span className="tagrow"><span className="tag">{a.area}</span><span className="tipo">{a.tipo}</span></span>;
  const meta = <span className="meta">{a.fecha} · {a.min} min · {a.fuente.n}</span>;
  return (
    <motion.div className="cell" initial={{ opacity: 0, y: 36, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}>
      <Tilt>
        <button className={`acard ${media ? "media" : "text"} ${size || ""}`} data-cursor="Leer" onClick={() => onOpen(a)} onMouseEnter={(e) => hv(e, true)} onMouseLeave={(e) => hv(e, false)} aria-label={`Leer: ${a.title}`}>
          {media ? (
            <span className="thumb">
              <span className="art" style={{ backgroundImage: `url(${a.img})` }} />
              {a.video && <video src={a.video} muted loop playsInline preload="none" aria-hidden="true" />}
              {a.video && <span className="badge">Video</span>}
              {big ? <span className="ov">{head}<span className="ttl">{a.title}</span><span className="dek">{a.resumen}</span>{meta}</span>
                : <span className="sum"><span>{a.resumen}</span><span className="pill">Ver vista previa →</span></span>}
            </span>
          ) : (
            <span className="tbox">
              <span className="resm">{a.resumen} {a.cuerpo[0]}</span>
              <span className="fade" /><span className="more">Ver más +</span>
            </span>
          )}
          {!(big && media) && <span className="txt">{head}<span className="ttl">{a.title}</span>{meta}</span>}
        </button>
      </Tilt>
    </motion.div>
  );
}

/* Datos curiosos visibles que invitan a suscribirse */
export function Fact({ onSubscribe }) {
  const rm = useRM(), [k, setK] = useState(0);
  useEffect(() => { if (rm) return; const t = setInterval(() => setK((x) => (x + 1) % FACTS.length), 6500); return () => clearInterval(t); }, [rm]);
  return (
    <div className="fact">
      <span className="spark" aria-hidden="true">✦</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p key={k} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}><b>¿Sabías que…</b> {FACTS[k]}</motion.p>
      </AnimatePresence>
      <button className="lk" onClick={onSubscribe}>Recibe más datos así →</button>
    </div>
  );
}

export default function Articles({ onOpen, onSubscribe, skip = [] }) {
  const [area, setArea] = useState("Todas"), [q, setQ] = useState(""), [n, setN] = useState(6);
  const list = useMemo(() => ARTICLES.filter((a) => !skip.includes(a.id) && (area === "Todas" || a.area === area) && norm(a.title + " " + a.resumen + " " + a.autor).includes(norm(q.trim()))), [area, q, skip]);
  const shown = list.slice(0, n), groups = [];
  for (let g = 0; g < shown.length; g += 3) groups.push(shown.slice(g, g + 3));
  return (
    <section className="arts" id="publicaciones">
      <div className="wrap">
        <R className="ah"><div><span className="kick">Repositorio científico</span><Split>Lo que investigamos</Split><p className="sub">Artículos científicos y de divulgación de la CUC, con enlace directo al original.</p></div>
          <div className="search"><label htmlFor="q">Buscar publicaciones</label><input id="q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Título, tema o autor" /></div>
        </R>
        <R><div className="chips" role="group" aria-label="Filtrar por área">
          {AREAS.map((a) => <button key={a} className="chip" aria-pressed={area === a} onClick={() => setArea(a)}>{a}</button>)}
        </div></R>
        <p className="count" role="status" aria-live="polite">{list.length} {list.length === 1 ? "publicación" : "publicaciones"}</p>
        {groups.map((g, gi) => (
          <div key={g[0].id + "-" + gi}>
            <div className={"mosaic" + (gi % 2 ? " rev" : "") + (g.length === 1 ? " solo" : g.length === 2 ? " duo" : "")}>
              {g.map((a, i) => <Card key={a.id} a={a} i={i} size={i === 0 ? "big" : "small"} onOpen={onOpen} />)}
            </div>
            {gi % 2 === 0 && gi < groups.length - 1 && <Fact onSubscribe={onSubscribe} />}
          </div>
        ))}
        {list.length > n && <div className="morew"><button className="btn ghost dark" onClick={() => setN(n + 6)}>Ver más publicaciones<i>↓</i></button></div>}
        {!list.length && <p className="empty">No encontramos resultados. <button className="lk" onClick={() => { setQ(""); setArea("Todas"); }}>Limpiar filtros</button></p>}
      </div>
    </section>
  );
}
