"use client"

import { GlobalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";


import Modal from "@/components/ModalBag";

import { useBag } from "@/Hooks/useBag";
import { ShowModal } from "@/components/ShowModal";
import { BagContextProvider } from "@/contexts/BagContext";

GlobalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const renderSideBar = () => {
    return (
    <BagContextProvider>
      <ShowModal>
          <Component {...pageProps} />
      </ShowModal>
      </BagContextProvider>
    )
  }

  return (
    <BagContextProvider>
     {showModal && <Modal onClickCallback={() => setShowModal(false)} />}
     {renderSideBar()}
    </BagContextProvider>
  )
}