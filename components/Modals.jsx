"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ARTICLES } from "./data";
import { FMTS, cite, exportRef } from "./cite";

/* Atrapa el foco, cierra con Esc, bloquea el scroll y devuelve el foco al cerrar */
function useDialog(onClose) {
  const ref = useRef(null);
  useEffect(() => {
    const prev = document.activeElement, root = ref.current, ov = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const sel = 'button,a[href],input,video[controls]';
    (root.querySelector("[data-first]") || root.querySelector(sel))?.focus();
    const key = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") { const f = [...root.querySelectorAll(sel)]; const a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
    };
    addEventListener("keydown", key);
    return () => { removeEventListener("keydown", key); document.body.style.overflow = ov; prev?.focus?.(); };
  }, []); // eslint-disable-line
  return ref;
}

function CopyBtn({ ok, onClick, label }) {
  return (
    <button onClick={onClick} aria-label={label}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={ok ? "ok" : "cp"} style={{ display: "inline-block" }} initial={{ scale: 0.4, opacity: 0, rotate: -40 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ scale: 0.4, opacity: 0 }} transition={{ duration: 0.16 }}>{ok ? "✓" : "⧉"}</motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Reader({ a, onClose, onSubscribe, onSwitch }) {
  const ref = useDialog(onClose);
  const [fmt, setFmt] = useState("APA"), [copied, setCopied] = useState("");
  useEffect(() => { ref.current?.scrollTo({ top: 0, behavior: "smooth" }); setFmt("APA"); setCopied(""); }, [a.id]); // eslint-disable-line
  const text = cite(a, fmt);
  const copy = async (t, k) => { try { await navigator.clipboard.writeText(t); setCopied(k); setTimeout(() => setCopied(""), 1800); } catch {} };
  const save = (kind) => { const u = URL.createObjectURL(new Blob([exportRef(a, kind)], { type: "text/plain" })); const l = document.createElement("a"); l.href = u; l.download = `${a.apellido.split(",")[0].toLowerCase()}-${a.anio}.${kind}`; l.click(); URL.revokeObjectURL(u); };
  const related = [...ARTICLES.filter((b) => b.id !== a.id && b.area === a.area), ...ARTICLES.filter((b) => b.id !== a.id && b.area !== a.area)].slice(0, 3);
  return (
    <motion.div className="ovl center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.article ref={ref} className="reader wide" role="dialog" aria-modal="true" aria-labelledby="rt" onClick={(e) => e.stopPropagation()} initial={{ y: 50, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
        <button className="x" data-first onClick={onClose} aria-label="Cerrar artículo">✕</button>
        <nav className="rcrumb" aria-label="Ruta"><button className="lk" onClick={onClose}>← Repositorio científico</button><i>›</i><span>{a.title}</span></nav>
        <div className="rgrid" key={a.id}>
          <div className="rmain">
            <div className="rtop"><span className="tag">{a.area}</span><span className="tipo">{a.tipo}</span><time>{a.fecha}</time>{a.tags.map((t) => <span className="ch" key={t}>{t}</span>)}</div>
            <h2 id="rt">{a.title}</h2>
            {a.video ? <video className="rmedia" src={a.video} poster={a.img} controls muted loop playsInline /> : a.img ? <div className="rmedia" style={{ backgroundImage: `url(${a.img})` }} role="img" aria-label="" /> : null}
            {a.img && <p className="cap">{a.epigrafe}</p>}
            <p className="rlead">{a.resumen}</p>
            <div className="fadebox">{a.cuerpo.slice(0, 2).map((p, i) => <p key={i}>{p}</p>)}</div>
            <div className="pcta">
              <a className="btn big" href={a.fuente.u} target="_blank" rel="noopener noreferrer">Seguir leyendo en {a.fuente.n}<i>↗</i><span className="sr"> (abre en una pestaña nueva)</span></a>
              <ul className="inorig" aria-label="En el artículo original"><li>Metodología</li><li>Resultados</li><li>Referencias completas</li></ul>
            </div>
            <div className="rcta"><span>¿Te gustó? Recibe lo nuevo cada mes.</span><button className="btn" onClick={() => { onClose(); setTimeout(onSubscribe, 400); }}>Suscribirme<i>→</i></button></div>
          </div>
          <aside className="rside" aria-label="Detalles del artículo científico">
            <section className="author">
              <img src={a.foto} alt="" width="96" height="96" />
              <div><small>Autor · foto de ejemplo</small><h3>{a.investigador}</h3><a className="orcid" href={`https://orcid.org/${a.orcid}`} target="_blank" rel="noopener noreferrer" aria-label={`ORCID de ${a.investigador} (abre en una pestaña nueva)`}><b>iD</b>{a.orcid}</a><p>{a.bio}</p></div>
            </section>
            <section className="scard">
              <h3>Artículo científico completo</h3>
              <p>Esta es una versión de divulgación. El original, con metodología y referencias, está disponible en:</p>
              <div className="src"><small>Disponible en</small><strong>{a.fuente.n}</strong><span>{a.fuente.d}</span></div>
              <small className="lab">DOI</small>
              <div className="doi"><code>{a.doi}</code><CopyBtn ok={copied === "doi"} onClick={() => copy(a.doi, "doi")} label="Copiar DOI" /></div>
              <a className="btn full" href={a.fuente.u} target="_blank" rel="noopener noreferrer">{a.fuente.b}<i>↗</i><span className="sr"> (abre en una pestaña nueva)</span></a>
            </section>
            <section>
              <h3 className="sh">Citar este artículo</h3>
              <div className="tabs" role="tablist" aria-label="Formato de cita">{FMTS.map((f) => <button key={f} role="tab" aria-selected={fmt === f} onClick={() => setFmt(f)}><span className="tl">{f}</span>{fmt === f && <motion.span layoutId="tp" className="tp" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}</button>)}</div>
              <div className="cbox" role="tabpanel"><AnimatePresence mode="wait" initial={false}><motion.code key={a.id + fmt} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }}>{text}</motion.code></AnimatePresence><CopyBtn ok={copied === "cita"} onClick={() => copy(text, "cita")} label="Copiar cita" /></div>
              <p className="exp" role="status">{copied ? "Copiado al portapapeles" : <>Exportar: <button className="lk" onClick={() => save("bib")}>BibTeX</button> · <button className="lk" onClick={() => save("ris")}>RIS</button> (Mendeley, EndNote, Zotero)</>}</p>
            </section>
            <div className="edu"><img src="/img/educosta.jpg" alt="¡Descubre EDUCOSTA! Conoce nuestra Editorial Universitaria de la Costa." /></div>
            <section>
              <h3 className="sh">Más en el repositorio</h3>
              <ul className="rel">{related.map((b) => <li key={b.id}><button onClick={() => onSwitch(b)}><span className="kick">{b.area}</span><strong>{b.title}</strong></button></li>)}</ul>
            </section>
          </aside>
        </div>
      </motion.article>
    </motion.div>
  );
}

export function NewsletterPopup({ onClose }) {
  const ref = useDialog(onClose);
  const [st, setSt] = useState({ ok: false, err: "" });
  const submit = (e) => {
    e.preventDefault();
    const v = new FormData(e.currentTarget).get("email").toString().trim();
    if (!/^\S+@\S+\.\S+$/.test(v)) return setSt({ ok: false, err: "Escribe un correo válido, por ejemplo nombre@correo.com." });
    setSt({ ok: true, err: "" }); // demostración: aquí iría la llamada al servicio de boletín
  };
  return (
    <motion.div className="ovl center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div ref={ref} className="pop" role="dialog" aria-modal="true" aria-labelledby="pt" onClick={(e) => e.stopPropagation()} initial={{ y: 60, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}>
        <button className="x" onClick={onClose} aria-label="Cerrar">✕</button>
        <div className="pside"><img src="/img/cuc-icon-white.png" alt="" /></div>
        <div className="pmain">
          {st.ok ? (
            <div className="done" role="status">
              <motion.svg viewBox="0 0 52 52" width="64" height="64" aria-hidden="true"><motion.circle cx="26" cy="26" r="23" fill="none" stroke="#9d1512" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} /><motion.path d="M15 27l8 8 14-16" fill="none" stroke="#9d1512" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.4 }} /></motion.svg>
              <h2 id="pt">¡Gracias por suscribirte!</h2><p>Esto es una demostración: aún no se guarda ningún correo.</p>
              <button className="btn" data-first onClick={onClose}>Seguir leyendo<i>→</i></button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <span className="kick">Boletín CUCiencia</span>
              <h2 id="pt">La ciencia de la Costa, en tu correo</h2>
              <p>Un resumen al mes con los artículos más recientes. Sin spam y puedes salirte cuando quieras.</p>
              <label htmlFor="pe">Correo electrónico</label>
              <input id="pe" name="email" type="email" data-first placeholder="nombre@correo.com" autoComplete="email" aria-describedby="pm" required />
              <p id="pm" className="err" role="alert">{st.err}</p>
              <div className="prow"><button className="btn" type="submit">Suscribirme<i>→</i></button><button type="button" className="lk" onClick={onClose}>Ahora no</button></div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
