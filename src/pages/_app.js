import Head from 'next/head';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1'
        />
        <link
          href='/icons/icon-16x16.png'
          rel='icon'
          type='image/png'
          sizes='16x16'
        />
        <link
          href='/icons/icon-32x32.png'
          rel='icon'
          type='image/png'
          sizes='32x32'
        />
        <link
          href='/icons/icon-64x64.png'
          rel='icon'
          type='image/png'
          sizes='64x64'
        />

        {Component.title && (
          <>
            <title>{Component.title}</title>
            <meta property='description' content={Component.description} />
            <meta property='title' content={Component.title} />
            <meta property='og:title' content={Component.title} />
            <meta property='og:description' content={Component.description} />
          </>
        )}
        <meta property='theme-color' content='#3396d8' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}