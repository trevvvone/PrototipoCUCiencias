"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";

/* Tema (claro/oscuro) y movimiento (completo/reducido). Por defecto: claro y movimiento completo. */
const Ctx = createContext({ mode: "full", theme: "light", setMode() {}, setTheme() {} });
export const useSite = () => useContext(Ctx);
export const useRM = () => useContext(Ctx).mode === "reduced";

export function SiteProvider({ children }) {
  const [mode, setM] = useState("full"), [theme, setT] = useState("light");
  useEffect(() => { setM(document.documentElement.dataset.motion || "full"); setT(document.documentElement.dataset.theme || "light"); }, []);
  const setMode = (v) => { setM(v); document.documentElement.dataset.motion = v; try { localStorage.setItem("motion", v); } catch {} };
  const setTheme = (v) => { setT(v); document.documentElement.dataset.theme = v; try { localStorage.setItem("theme", v); } catch {} };
  return <Ctx.Provider value={{ mode, theme, setMode, setTheme }}><MotionConfig reducedMotion={mode === "reduced" ? "always" : "never"}>{children}</MotionConfig></Ctx.Provider>;
}
