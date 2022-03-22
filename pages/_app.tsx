import type { AppProps } from "next/app";
import { GeistProvider, CssBaseline } from "@geist-ui/core";

import "inter-ui/inter.css";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
}

export default MyApp;
