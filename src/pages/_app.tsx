import BackButton from "@/components/BackButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>dicedtomato</title>

        <meta name="title" content="dicedtomato" />
        <meta name="description" content="hi" />
        <meta property="theme-color" content="#000000" />

        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>

      <Script
        async
        src="https://analytics_.diced.sh/script.js"
        data-website-id="1a4199c1-e18c-4d22-91f4-a6e41fef4dfa"
      />

      <ThemeProvider attribute="class">
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>

        {router.pathname !== "/" && <BackButton />}
        <ThemeSwitcher />
      </ThemeProvider>
    </>
  );
}
