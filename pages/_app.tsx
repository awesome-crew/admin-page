import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { GeistProvider, CssBaseline } from "@geist-ui/core";

import "inter-ui/inter.css";
import "@/styles/globals.css";

import { Seo } from "@/components/atoms";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GeistProvider>
        <CssBaseline />
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link
            rel="shortcut icon"
            type="image/png"
            href="/favicon.png"
            key="favicon"
          />
        </Head>
        <Seo />
        <Component {...pageProps} />
      </GeistProvider>
    </RecoilRoot>
  );
}

export default MyApp;
