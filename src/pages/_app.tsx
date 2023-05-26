import { Analytics } from "@vercel/analytics/react";
import Layout from "@/components/Layout";
import "@/assets/styles/css.scss";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";

export default function App(props: AppProps) {
  const router = useRouter();
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <Head>
        <title>secim.live</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta property="og:title" content="seçim.live" />
        <meta
          property="og:description"
          content="Seçim araçları aynı torbada!"
        />
        <meta
          property="og:image"
          content="https://www.secim.live/img/image-logo.png"
        />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colors: {
              redder: [
                "#FDE4E7",
                "#FABFC6",
                "#F79EA7",
                "#F57F8B",
                "#F36271",
                "#F1485A",
                "#EF3044",
                "#ED182E",
                "#DD1126",
                "#C91023",
              ],
            },
            primaryColor: "redder",
            colorScheme,
          }}
        >
          <Layout>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
