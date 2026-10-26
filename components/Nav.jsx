"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Mag, scrollDir } from "./ui";
import { useSite } from "./motionctx";

export default function Nav({ ready, onSubscribe }) {
  const [hidden, setHidden] = useState(false), [solid, setSolid] = useState(false), [notice, setNotice] = useState(true);
  const { theme, setTheme } = useSite();
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useEffect(() => { try { if (sessionStorage.getItem("nbar")) setNotice(false); } catch {} }, []);
  useEffect(() => {
    const f = () => { setSolid(scrollY > 30); setHidden(scrollDir.v === 1 && scrollY > 500); };
    f(); addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  const dark = theme === "dark";
  return (
    <>
      <motion.div className="progress" style={{ scaleX: bar }} aria-hidden="true" />
      <motion.nav className={solid ? "solid" : ""} initial={{ y: -90 }} animate={{ y: ready && !hidden ? 0 : -90 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
        {notice && <div className="nbar"><span>Un dato de ciencia de la Costa en tu correo, cada mes.</span><button className="lk" onClick={onSubscribe}>Suscribirme →</button><button className="nx" aria-label="Cerrar aviso" onClick={() => { setNotice(false); try { sessionStorage.setItem("nbar", "1"); } catch {} }}>✕</button></div>}
        <div className="wrap">
          <a className="logo" href="#top" aria-label="CUCiencia, Universidad de la Costa, inicio">
            <img className="lg-l" src="/img/cuc-logo-red.png" alt="" height="44" /><img className="lg-d" src="/img/cuc-logo-white.png" alt="" height="44" /><span className="sep" /><span className="wm">CUC<b>iencia</b></span>
          </a>
          <div className="links">
            <a href="#publicaciones">Publicaciones</a><a href="#cifras">Cifras</a><a href="#divulgacion">Divulgación</a>
            <button className="tg" onClick={() => setTheme(dark ? "light" : "dark")} aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"} aria-pressed={dark}>
              <motion.svg key={String(dark)} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" initial={{ rotate: -90, scale: 0.4, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} transition={{ duration: 0.35 }} aria-hidden="true">
                {dark ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></> : <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />}
              </motion.svg>
            </button>
            <Mag><button className="btn" onClick={onSubscribe}>Suscribirme<i>→</i></button></Mag>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
