import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { GeistProvider, CssBaseline } from "@geist-ui/core";

import "inter-ui/inter.css";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </RecoilRoot>
  );
}

export default MyApp;
