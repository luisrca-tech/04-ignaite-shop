import { GlobalStyles } from "@/styles/global";
import type { AppProps } from "next/app";

GlobalStyles();

export default function App({ Component, pageProps }: AppProps) {

  return <Component {...pageProps} />;
}
