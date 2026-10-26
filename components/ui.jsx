"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRM } from "./motionctx";

export const scrollDir = { v: 1 };
if (typeof window !== "undefined") {
  let y = window.scrollY;
  window.addEventListener("scroll", () => { const n = window.scrollY; if (Math.abs(n - y) > 2) { scrollDir.v = n > y ? 1 : -1; y = n; } }, { passive: true });
}
const EASE = [0.2, 0.8, 0.2, 1];

export function R({ children, d = 0, className }) {
  const rm = useRM(), ref = useRef(null);
  const [s, setS] = useState({ on: false, dir: 1 });
  useEffect(() => {
    if (rm) return;
    const io = new IntersectionObserver(([e]) => setS({ on: e.isIntersecting, dir: scrollDir.v }), { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [rm]);
  if (rm) return <div className={className}>{children}</div>;
  return <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 40 }} animate={{ opacity: s.on ? 1 : 0, y: s.on ? 0 : s.dir * 40 }} transition={{ duration: 0.65, delay: s.on ? d : 0, ease: EASE }}>{children}</motion.div>;
}

/* Se observa el contenedor (no las palabras recortadas), así el título SIEMPRE aparece al llegar a la vista */
function useShown(ref) {
  const [shown, setShown] = useState(false);
  const inView = useInView(ref, { amount: 0.15 });
  useEffect(() => { if (inView) setShown(true); }, [inView]);
  return shown;
}

/* Título: aparece de una sola vez (sube, se enfoca y se muestra) */
export function Split({ children, tag: T = "h2", style }) {
  const rm = useRM(), ref = useRef(null), shown = useShown(ref);
  const on = rm || shown;
  return (
    <T ref={ref} className="split" style={style}>
      <motion.span style={{ display: "inline-block" }} initial={false} animate={on ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 28, filter: "blur(8px)" }} transition={{ duration: 0.6, ease: EASE }}>{children}</motion.span>
    </T>
  );
}

/* Título con letras que ondulan suavemente sin parar */
export function Wave({ children, tag: T = "h2", style }) {
  const rm = useRM(), ref = useRef(null), shown = useShown(ref);
  const on = rm || shown;
  return (
    <T ref={ref} className="wave" style={style} aria-label={children}>
      {children.split(" ").map((w, wi) => (
        <span key={wi} aria-hidden="true" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {[...w].map((ch, i) => (
            <motion.span key={i} style={{ display: "inline-block" }} initial={false} animate={on ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }} transition={{ duration: 0.45, delay: Math.min((wi * 5 + i) * 0.02, 0.5), ease: EASE }}>
              <motion.span style={{ display: "inline-block" }} animate={rm ? {} : { y: [0, -8, 0] }} transition={{ duration: 2.6, delay: (wi * 4 + i) * 0.09, repeat: Infinity, ease: "easeInOut" }}>{ch}</motion.span>
            </motion.span>
          ))}
          &nbsp;
        </span>
      ))}
    </T>
  );
}

/* Cuenta desde 0 de forma automática cada vez que la sección entra en pantalla (sin necesidad del cursor) */
export function Count({ n }) {
  const ref = useRef(null), v = useInView(ref, { amount: 0.5 }), rm = useRM();
  const [c, setC] = useState(0);
  useEffect(() => {
    if (!v) { setC(0); return; }
    if (rm) { setC(n); return; }
    let s, id;
    const f = (t) => { s ??= t; const p = Math.min(1, (t - s) / 1300); setC(Math.round(n * (1 - (1 - p) ** 3))); if (p < 1) id = requestAnimationFrame(f); };
    id = requestAnimationFrame(f);
    return () => cancelAnimationFrame(id);
  }, [v, n, rm]);
  return <b ref={ref}>{c}</b>;
}

export function Mag({ children }) {
  const x = useMotionValue(0), y = useMotionValue(0), rm = useRM();
  const sx = useSpring(x, { stiffness: 220, damping: 16 }), sy = useSpring(y, { stiffness: 220, damping: 16 });
  if (rm) return <span style={{ display: "inline-block" }}>{children}</span>;
  return (
    <motion.span style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.22); y.set((e.clientY - r.top - r.height / 2) * 0.3); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.span>
  );
}

/* Inclinación 3D que sigue al cursor + brillo + elevación */
export function Tilt({ children, max = 7 }) {
  const rm = useRM(), x = useMotionValue(0), y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 220, damping: 18 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 220, damping: 18 });
  if (rm) return <div>{children}</div>;
  return (
    <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }} whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height; x.set(px - 0.5); y.set(py - 0.5); e.currentTarget.style.setProperty("--gx", px * 100 + "%"); e.currentTarget.style.setProperty("--gy", py * 100 + "%"); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.div>
  );
}
