"use client"

import { GlobalStyles } from "@/styles/global";
import type { AppProps } from "next/app";

import { useState } from "react";
import Modal from "@/components/ModalBag";

import Image from "next/image";
import { CloseContainer, Container, HeaderContainer, ItemsLenght, CartButton, MenuButtonContainer, SidebarContainer, SidebarContent } from "@/styles/pages/app";
import { IoCloseSharp } from "react-icons/io5";

import LogoImg from '../assets/logo.svg'
import BagHeader from '../assets/Bag.svg'
import CloseIcon from '../assets/CloseIcon.svg'
import Link from "next/link";

GlobalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleMenu = () => {
    setShowModal((current) => !current);
  };

  const renderSideBar = () => {
    return (
      <>
        <SidebarContainer isShow={showModal} >
          <CloseContainer>
            <button onClick={() => setShowModal(false)}>
              <Image src={CloseIcon} alt=""/>
            </button>
          </CloseContainer>
        </SidebarContainer>
    <Container>
      <HeaderContainer>
        <Link href='/'>
          <Image src={LogoImg} width={126.56} height={52} alt=""/>
        </Link>
        <MenuButtonContainer>
          <CartButton onClick={handleMenu}>
          <Image src={BagHeader} alt="" width={56} height={56} />
          </CartButton>
          <ItemsLenght>
          <span>0</span>
         </ItemsLenght>
        </MenuButtonContainer>
      </HeaderContainer>
      <Component {...pageProps} />
    </Container>
      </>
    )
  }

  return (
    <>
     {showModal && <Modal onClickCallback={() => setShowModal(false)} />}
     {renderSideBar()}
    </>
  )
}
