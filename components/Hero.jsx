"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRM, useSite } from "./motionctx";
import { Mag } from "./ui";

const WORDS = ["Ciencia", "que nace", "en la Costa"];

export default function Hero({ ready, featured, onOpen }) {
  const ref = useRef(null), vid = useRef(null), rm = useRM(), { theme } = useSite();
  const [playing, setPlaying] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const pad = useTransform(scrollYProgress, [0, 0.5], [16, 0]);
  const rad = useTransform(scrollYProgress, [0, 0.5], [28, 0]);
  const vy = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const toggle = () => { const v = vid.current; if (!v) return; if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); } };
  useEffect(() => { const v = vid.current; if (!v) return; if (rm) { v.pause(); setPlaying(false); } else { v.play().then(() => setPlaying(true)).catch(() => {}); } }, [rm, theme]);
  return (
    <header className="hero" id="top" ref={ref}>
      <motion.div className="hsec" style={{ paddingLeft: pad, paddingRight: pad, paddingBottom: pad }}>
        <motion.div className="hcard" style={{ borderRadius: rad }}>
          <motion.video key={theme} ref={vid} className="hvid" style={{ y: vy }} src={theme === "dark" ? "/videos/hero-dark.mp4" : "/videos/hero.mp4"} poster={theme === "dark" ? "/img/hero-dark.jpg" : "/img/hero.jpg"} autoPlay muted loop playsInline aria-hidden="true" />
          <div className="hin">
            <h1 aria-label="Ciencia que nace en la Costa">
              {WORDS.map((w, i) => (
                <span key={w}><motion.span initial={{ y: "115%" }} animate={{ y: ready ? 0 : "115%" }} transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}>{w}</motion.span></span>
              ))}
            </h1>
            <motion.div className="feat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }} transition={{ delay: 0.5, duration: 0.6 }}>
              <div>
                <span className="kick">Ahora en CUCiencia</span>
                <h2>{featured.title}</h2>
                <p>{featured.resumen}</p>
              </div>
              <div className="fbtns">
                <Mag><button className="btn" onClick={() => onOpen(featured)}>Leer artículo<i>→</i></button></Mag>
                <Mag><a className="btn ghost" href="#publicaciones">Ver publicaciones<i>↓</i></a></Mag>
              </div>
            </motion.div>
          </div>
          <button className="pp" onClick={toggle} aria-label={playing ? "Pausar video de fondo" : "Reproducir video de fondo"}>{playing ? "❚❚" : "▶"}</button>
        </motion.div>
      </motion.div>
    </header>
  );
}
