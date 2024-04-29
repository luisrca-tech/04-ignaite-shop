"use client"

import { GlobalStyles } from "@/styles/global";
import type { AppProps } from "next/app";
import { useState } from "react";

import Modal from "@/components/ModalBag";

import { ShowModal } from "@/components/ShowModal";
import { BagContextProvider, ProductsProps } from "@/contexts/BagContext";

GlobalStyles();

export default function App({ Component, pageProps, product, router }: AppProps & ProductsProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const renderSideBar = () => {
    return (
    <BagContextProvider>
      <ShowModal product={{product}} isSuccessPage={router.pathname === '/success'} >
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