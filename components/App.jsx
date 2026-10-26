"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ARTICLES } from "./data";
import { SiteProvider, useRM } from "./motionctx";
import Preloader from "./Preloader";
import Nav from "./Nav";
import Hero from "./Hero";
import Articles from "./Articles";
import Featured from "./Featured";
import Media from "./Media";
import { Reader, NewsletterPopup } from "./Modals";
import { Marquee, Reel, Stats, Newsletter, Footer } from "./Sections";

/* Paneles apilados (como GTA VI): el de abajo sube y tapa al de arriba, que se encoge y se oscurece un poco */
function Stack({ items }) {
  const els = useRef([]), inner = useRef([]), rm = useRM();
  useEffect(() => {
    const setTops = () => els.current.forEach((el, i) => { if (el && i < items.length - 1) el.style.top = Math.min(0, window.innerHeight - el.offsetHeight) + "px"; });
    const onScroll = () => { const vh = window.innerHeight; inner.current.forEach((el, i) => { const nx = els.current[i + 1]; if (!el || !nx) return; const p = rm ? 0 : Math.min(1, Math.max(0, 1 - nx.getBoundingClientRect().top / vh)); el.style.transform = p ? `scale(${1 - 0.05 * p})` : ""; el.style.filter = p ? `brightness(${1 - (document.documentElement.dataset.theme === "dark" ? 0.26 : 0.06) * p})` : ""; }); };
    setTops(); onScroll();
    const ro = new ResizeObserver(() => { setTops(); onScroll(); });
    els.current.forEach((el) => el && ro.observe(el));
    addEventListener("resize", setTops); addEventListener("scroll", onScroll, { passive: true });
    return () => { ro.disconnect(); removeEventListener("resize", setTops); removeEventListener("scroll", onScroll); };
  }, [rm, items.length]);
  return items.map((c, i) => (
    <div key={i} ref={(e) => (els.current[i] = e)} className={"panel" + (i ? " r" : "") + (i === items.length - 1 ? " last" : "")} style={{ zIndex: i + 1 }}>
      <div ref={(e) => (inner.current[i] = e)} className="pin2">{c}</div>
    </div>
  ));
}

function Site() {
  const [ready, setReady] = useState(false), [reader, setReader] = useState(null), [pop, setPop] = useState(false);
  const readerRef = useRef(null);
  readerRef.current = reader;
  const closePop = () => { sessionStorage.setItem("nlSeen", "1"); setPop(false); };
  useEffect(() => {
    if (!ready || sessionStorage.getItem("nlSeen")) return;
    const t = setTimeout(() => { if (!readerRef.current) setPop(true); }, 18000);
    return () => clearTimeout(t);
  }, [ready]);
  const sub = () => setPop(true);
  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Nav ready={ready} onSubscribe={sub} />
      <main>
        <Stack items={[
          <><Hero ready={ready} featured={ARTICLES[0]} onOpen={setReader} /><Marquee /></>,
          <Featured items={ARTICLES.slice(0, 3)} onOpen={setReader} />,
          <Articles onOpen={setReader} onSubscribe={sub} skip={[1, 2, 3]} />,
          <Media />,
          <Reel />,
          <Stats />,
          <><Newsletter onSubscribe={sub} /><Footer /></>,
        ]} />
      </main>
      <AnimatePresence>{reader && <Reader key="r" a={reader} onClose={() => setReader(null)} onSubscribe={sub} onSwitch={setReader} />}</AnimatePresence>
      <AnimatePresence>{pop && <NewsletterPopup key="p" onClose={closePop} />}</AnimatePresence>
    </>
  );
}

export default function App() {
  return <SiteProvider><Site /></SiteProvider>;
}
