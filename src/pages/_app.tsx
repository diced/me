import BackButton from "@/components/BackButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ThemeProvider attribute="class">
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>

      {router.pathname !== "/" && <BackButton />}
      <ThemeSwitcher />
    </ThemeProvider>
  );
}
