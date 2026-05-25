import Head from "next/head";

import Header from "./Header";
import { Footer } from "./Footer";

interface Props {
  children: React.ReactNode;
  pagina?: string;
}

const Layout = ({
  children,
  pagina,
}: Props) => {

  const tituloPestaña =
    pagina
      ? `NALYK | ${pagina}`
      : "NALYK | Joyas waterproof";

  return (

    <div
      className="flex min-h-screen flex-col"
      id="scrollContent"
    >

      <Head>
        <title>{tituloPestaña}</title>

        <meta
          name="title"
          content="Nalyk | Joyas waterproof"
        />

        <meta
          name="description"
          content="Nalyk - Joyas waterproof de alta calidad. Diseños elegantes y resistentes al agua para el día a día. Encuentra tu accesorio perfecto en Lima, Perú."
        />

        <meta
          name="keywords"
          content="joyas waterproof, joyas acero inoxidable, accesorios mujer, joyas Perú, Nalyk"
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://nalyk.netlify.app/"
        />

        <meta
          property="og:title"
          content="Nalyk | Joyas waterproof"
        />

        <meta
          property="og:description"
          content="Nalyk - Joyas waterproof de alta calidad. Diseños elegantes y resistentes al agua para el día a día."
        />

        <meta
          property="og:image"
          content="https://nalyk.netlify.app/hero.png"
        />

        <meta
          property="twitter:card"
          content="summary_large_image"
        />

        <meta
          property="twitter:url"
          content="https://nalyk.netlify.app/"
        />

        <meta
          property="twitter:title"
          content="Nalyk | Joyas waterproof"
        />

        <meta
          name="twitter:description"
          content="Nalyk - Joyas waterproof de alta calidad."
        />

        <meta
          property="twitter:image"
          content="https://nalyk.netlify.app/hero.png"
        />

        <link
          rel="shortcut icon"
          href="/icon.svg"
        />

        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </Head>

      {/* HEADER */}
      <Header />

      {/* MAIN */}
      <main className="flex-1">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default Layout;