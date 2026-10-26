"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { R, Split, Wave, Count, Mag } from "./ui";
import { useRM, useSite } from "./motionctx";

const AREAS = ["Salud y bienestar", "Energía y ambiente", "Transformación digital", "Ciudad y territorio", "Educación e innovación", "Economía y sociedad"];

export function Marquee() {
  const rm = useRM();
  return (
    <div className="marq" aria-hidden="true">
      <motion.div animate={rm ? {} : { x: ["0%", "-50%"] }} transition={{ duration: 20, ease: "linear", repeat: Infinity }}>
        {[...AREAS, ...AREAS].map((a, i) => <span key={i}>{a}</span>)}
      </motion.div>
    </div>
  );
}

export function Reel() {
  const ref = useRef(null), { theme } = useSite();
  const near = useInView(ref, { margin: "400px 0px" });
  return (
    <section className="reel2" ref={ref} aria-label="Ciencia en movimiento">
      <div className="wrap rgrid2">
        <div className="rtxt">
          <R><span className="kick">Ciencia en movimiento</span></R>
          <Wave style={{ marginTop: 14 }}>Investigar es explorar</Wave>
          <R d={0.1}><p>Cada pregunta abre otra. Así avanzan los grupos de investigación de la CUC: entre laboratorios, datos y comunidades.</p></R>
        </div>
        <R className="rvid"><div className="vframe"><video key={theme} src={near ? (theme === "dark" ? "/videos/laboratorio-dark.mp4" : "/videos/laboratorio.mp4") : undefined} autoPlay muted loop playsInline aria-hidden="true" /></div></R>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="stats" id="cifras">
      <div className="wrap">
        <R><span className="kick">CUCiencia en cifras</span></R>
        <R><h2 className="still" style={{ fontSize: "clamp(2.4rem,6vw,5rem)", marginTop: 12 }}>Divulgación con impacto</h2></R>
        <div className="sgrid">
          {[[6, "Áreas de impacto"], [48, "Grupos de investigación"], [120, "Artículos publicados"], [85, "Autores y semilleros"]].map(([n, l], i) => (
            <R key={l} d={i * 0.1} className="sc"><Count n={n} /><span>{l}</span></R>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Newsletter({ onSubscribe }) {
  return (
    <section className="nl" id="boletin">
      <div className="wrap in">
        <div><img className="lg-l" src="/img/cuc-logo-red.png" alt="Universidad de la Costa" height="64" /><img className="lg-d" src="/img/cuc-logo-white.png" alt="Universidad de la Costa" height="64" /><R><span className="kick">Boletín CUCiencia</span></R><Split>La ciencia de la Costa, en tu correo</Split></div>
        <R><p>Un resumen mensual con los artículos más recientes de nuestros grupos de investigación.</p><Mag><button className="btn" onClick={onSubscribe}>Quiero suscribirme<i>→</i></button></Mag></R>
      </div>
    </section>
  );
}

function Controls() {
  const { mode, setMode, theme, setTheme } = useSite();
  return (
    <div className="ctl" role="group" aria-label="Preferencias de la página">
      <button aria-pressed={theme === "dark"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Modo {theme === "dark" ? "oscuro" : "claro"}</button>
      <button aria-pressed={mode === "reduced"} onClick={() => setMode(mode === "reduced" ? "full" : "reduced")}>Movimiento: {mode === "reduced" ? "reducido" : "completo"}</button>
    </div>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div><img src="/img/cuc-logo-white.png" alt="Universidad de la Costa" height="72" /><p>Vicerrectoría de Ciencia, Tecnología e Innovación<br />Universidad de la Costa<br />Calle 58 # 55-66, Barrio Modelo<br />Barranquilla, Colombia</p></div>
        <div><h4>Accesos directos</h4><ul><li><a href="#publicaciones">Publicaciones</a></li><li><a href="#cifras">Cifras</a></li><li><a href="#divulgacion">Divulgación</a></li><li><a href="#boletin">Boletín</a></li></ul></div>
        <div className="fn"><Controls /><p>Prototipo para revisión de diseño · contenido de ejemplo</p></div>
      </div>
    </footer>
  );
}
