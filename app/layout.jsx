import { Red_Hat_Display, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sans = Red_Hat_Display({ subsets: ["latin"], weight: ["400", "500", "700", "900"], variable: "--sans" });
const serif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--serif" });

const INIT = `(function(){try{var d=document.documentElement;d.dataset.theme=localStorage.getItem("theme")||"light";d.dataset.motion=localStorage.getItem("motion")||"full"}catch(e){}})()`;

export const metadata = {
  title: "CUCiencia · Universidad de la Costa",
  description: "Divulgación científica de la Universidad de la Costa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: INIT }} /></head>
      <body>{children}</body>
    </html>
  );
}
