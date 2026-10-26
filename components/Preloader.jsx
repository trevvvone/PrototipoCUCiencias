"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRM } from "./motionctx";

/* Pantalla de entrada: logo + contador. Dura lo que tarda en cargar (mín. ~1 s, máx. 2,5 s) y solo una vez por sesión. */
export default function Preloader({ onDone }) {
  const rm = useRM();
  const [n, setN] = useState(0), [gone, setGone] = useState(false), [hide, setHide] = useState(false);
  useEffect(() => {
    if (rm || sessionStorage.getItem("pre")) { setHide(true); onDone(); return; }
    let loaded = document.readyState === "complete", id, to;
    const onl = () => { loaded = true; };
    addEventListener("load", onl);
    const t0 = performance.now();
    const tick = (t) => {
      const e = t - t0; let p = Math.min(100, e / 11);
      if (!loaded && p > 90) p = 90;
      if (e > 2500) p = 100;
      setN(Math.round(p));
      if (p < 100) id = requestAnimationFrame(tick);
      else to = setTimeout(() => { sessionStorage.setItem("pre", "1"); setGone(true); onDone(); }, 220);
    };
    id = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(id); clearTimeout(to); removeEventListener("load", onl); };
  }, []); // eslint-disable-line
  if (hide) return null;
  return (
    <motion.div className="pre" role="status" aria-label="Cargando CUCiencia" animate={gone ? { y: "-100%" } : { y: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} onAnimationComplete={() => gone && setHide(true)}>
      <motion.img src="/img/cuc-logo-white.png" alt="" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} />
      <div className="pcount" aria-hidden="true">{n}<small>%</small></div>
      <div className="pbar" aria-hidden="true"><i style={{ transform: `scaleX(${n / 100})` }} /></div>
    </motion.div>
  );
}
