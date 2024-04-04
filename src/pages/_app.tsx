import { GlobalStyles } from "@/styles/global";
import type { AppProps } from "next/app";

import LogoImg from '../assets/logo.svg'
import Image from "next/image";
import { Container, Header } from "@/styles/pages/app";

GlobalStyles();

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Header>
        <Image src={LogoImg} alt=""/>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
