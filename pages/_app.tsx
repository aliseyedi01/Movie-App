import ResponsiveAppBar from "@/component/Header/Header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Sigmar, Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  variable: "--font-ubuntu",
  weight: ["400", "500", "700"],
});

const sigmar = Sigmar({
  subsets: ["latin"],
  variable: "--font-sigmar",
  weight: ["400"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ResponsiveAppBar />
      <main className={`${ubuntu.variable} ${sigmar.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
