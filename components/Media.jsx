"use client";
import { useEffect, useRef, useState } from "react";
import { R, Split } from "./ui";

const PRESS = [["Medir cómo se calienta cada barrio nos permite diseñar calles más frescas.", "Dr. Camilo Ardila", "Medio de ejemplo 1"], ["Con datos abiertos, la salud pública deja de ser una cifra y se vuelve una decisión.", "Dra. Laura Quintero", "Medio de ejemplo 2"], ["El sol del Caribe es una ventaja si sabemos cómo cuidar los paneles de la humedad.", "Dr. Andrés Pacheco", "Medio de ejemplo 3"]];
const EPS = [["Ciencia en la Costa #12: ¿por qué el calor urbano golpea tanto?", "Territorio", "/audio/ep1.mp3"], ["Ciencia en la Costa #11: dormir bien y rendir mejor", "Salud", "/audio/ep2.mp3"], ["Ciencia en la Costa #10: paneles solares y humedad", "Energía", "/audio/ep3.mp3"]];
const fmt = (s) => (!isFinite(s) ? "0:00" : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`);

export default function Media() {
  const au = useRef(null), vr = useRef(null);
  const [cur, setCur] = useState(-1), [playing, setPlaying] = useState(false), [t, setT] = useState(0), [dur, setDur] = useState(0), [vol, setVol] = useState(0.8), [vp, setVp] = useState(false);
  useEffect(() => { if (au.current) au.current.volume = vol; }, [vol]);
  const pick = (i) => { const a = au.current; if (cur === i) { if (a.paused) a.play(); else a.pause(); return; } setCur(i); a.src = EPS[i][2]; a.currentTime = 0; a.play().catch(() => {}); };
  const toggle = () => { const a = au.current; if (cur < 0) return pick(0); if (a.paused) a.play(); else a.pause(); };
  const skip = (d) => { const a = au.current; if (!a || cur < 0) return; a.currentTime = Math.max(0, Math.min(a.duration || 0, a.currentTime + d)); };
  const toggleV = () => { const v = vr.current; if (!v) return; if (v.paused) { v.play(); setVp(true); } else { v.pause(); setVp(false); } };
  return (
    <section className="media" id="multimedia">
      <div className="wrap">
        <R className="mh"><span className="kick">Multimedia · contenido de ejemplo</span><Split>Podcast y videos</Split><p className="sub">Escucha y mira la ciencia de la Costa.</p></R>
        <div className="mgrid">
          <R className="pod">
            <h3>Podcast</h3>
            <ul>
              {EPS.map(([title, g], i) => {
                const on = cur === i && playing;
                return (
                  <li className="ep" key={title}>
                    <button className="pl" onClick={() => pick(i)} aria-pressed={on} aria-label={(on ? "Pausar" : "Reproducir") + ": " + title}>{on ? <span className="eq" aria-hidden="true"><i /><i /><i /><i /></span> : <span aria-hidden="true">▶</span>}</button>
                    <div><strong>{title}</strong><small>{g} · audio de ejemplo (tono generado)</small></div>
                  </li>
                );
              })}
            </ul>
            <div className="player" role="group" aria-label="Reproductor de podcast">
              <div className="pnow"><small>{cur < 0 ? "Elige un episodio" : playing ? "Reproduciendo" : "En pausa"}</small><strong>{cur < 0 ? "—" : EPS[cur][0]}</strong></div>
              <div className="pbtns">
                <button onClick={() => skip(-10)} aria-label="Retroceder 10 segundos" disabled={cur < 0}>−10 s</button>
                <button className="pp2" onClick={toggle} aria-label={playing ? "Pausar" : cur < 0 ? "Reproducir el primer episodio" : "Reanudar"}>{playing ? "Pausar" : cur < 0 ? "Reproducir" : "Reanudar"}</button>
                <button onClick={() => skip(10)} aria-label="Adelantar 10 segundos" disabled={cur < 0}>+10 s</button>
              </div>
              <div className="seek"><span>{fmt(t)}</span><input type="range" min="0" max={dur || 0} step="0.1" value={t} onChange={(e) => { au.current.currentTime = +e.target.value; setT(+e.target.value); }} aria-label="Progreso del episodio" aria-valuetext={`${fmt(t)} de ${fmt(dur)}`} disabled={cur < 0} /><span>{fmt(dur)}</span></div>
              <div className="vol">
                <button onClick={() => setVol(vol ? 0 : 0.8)} aria-label={vol ? "Silenciar" : "Activar sonido"}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z" />{vol ? <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" /> : <path d="m16 9 5 6m0-6-5 6" />}</svg>
                </button>
                <input type="range" min="0" max="1" step="0.05" value={vol} onChange={(e) => setVol(+e.target.value)} aria-label="Volumen" /><span>{Math.round(vol * 100)} %</span>
              </div>
              <audio ref={au} preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDur(e.currentTarget.duration)} />
            </div>
          </R>
          <R className="vids">
            <h3>Videos</h3>
            <div className="vgrid">
              <button className="vc v1" onClick={toggleV} aria-label="Reproducir o pausar video de ejemplo">
                <span className="art" style={{ backgroundImage: "url(/img/pub-3.jpg)" }} /><video ref={vr} src="/videos/laboratorio.mp4" muted loop playsInline preload="none" />
                <span className="play" aria-hidden="true">{vp ? "❚❚" : "▶"}</span><span className="vt">Así se ve el ADN en movimiento</span>
              </button>
              <button className="vc" aria-label="Video de ejemplo: un día en el laboratorio"><span className="art" style={{ backgroundImage: "url(/img/pub-2.jpg)" }} /><span className="play" aria-hidden="true">▶</span><span className="vt">Un día en el laboratorio</span></button>
              <button className="vc" aria-label="Video de ejemplo: semilleros en acción"><span className="art" style={{ backgroundImage: "url(/img/pub-5.jpg)" }} /><span className="play" aria-hidden="true">▶</span><span className="vt">Semilleros en acción</span></button>
            </div>
          </R>
        </div>
        <R className="press">
          <h3>CUCiencia en los medios <small>· citas de ejemplo</small></h3>
          <div className="pgrid">{PRESS.map(([q, w, m]) => <figure className="pq" key={w}><blockquote>“{q}”</blockquote><figcaption><b>{w}</b><span>{m} ↗</span></figcaption></figure>)}</div>
        </R>
      </div>
    </section>
  );
}
