"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { 
  CartButton,
  CloseContainer, 
  Container, 
  FinalizeButton, 
  FooterContainer, 
  HeaderContainer, 
  ImageContainer, 
  ItemsLenght, 
  ItemsLenghtSpan, 
  MenuButtonContainer, 
  Product, 
  ProductContent, 
  ProductsContainer, 
  SidebarContainer, 
  SidebarContent, 
  SidebarHeader, 
  TotalShopping, 
} from "./styles";

import LogoImg from '../../assets/logo.svg'
import BagHeader from '../../assets/Bag.svg'
import CloseIcon from '../../assets/CloseIcon.svg'

import { useBag } from "@/Hooks/useBag";
import { ProductsProps } from "@/contexts/BagContext";

interface ModalProps {
  children: any
}

export function ShowModal({ children }: ModalProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { bag, removeFromCart, product } = useBag();

  const productsInBag = bag?.map((item) => {
    const productInfo = bag.find((product) => product.id === item.id);

    if (!productInfo) {
      throw new Error('Invalid Product')
    }

    return {
      ...productInfo,
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
    }
  });

  function handleRemoveFromCart(product: ProductsProps) {
    const isProductToRemove = bag.filter((item) => item.id !== product.id);

    if (isProductToRemove) {
      removeFromCart(product)
    }
  }

  const totalProductsPrice = productsInBag.reduce((total, currentProduct) => {
    return total + parseFloat(currentProduct.price);
  }, 0);

  const handleMenu = () => {
    setShowModal((current) => !current);
  };

  return (
    <>
      <SidebarContainer isShow={showModal}>
        <CloseContainer>
          <button onClick={() => setShowModal(false)}>
            <Image src={CloseIcon} alt=""/>
          </button>
        </CloseContainer>
        <SidebarContent>
          <SidebarHeader>
            <strong>
              Sacola de compras
            </strong>
          </SidebarHeader>
          <ProductsContainer>
            {productsInBag.map((product) => (
              <Product key={product.id}>
                <ImageContainer>
                  <Image src={product.imageUrl} alt="" width={94} height={94} />
                </ImageContainer>
                <ProductContent>
                  <span>{product.name}</span>
                  <strong>
                    {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                    }).format(parseFloat(product.price))}
                  </strong>
                  <button 
                   onClick={() => handleRemoveFromCart(product)}
                  >
                    Remover
                  </button>
                </ProductContent>
              </Product>
            ))}
          </ProductsContainer>
          <FooterContainer>
            <ItemsLenght>
              <p>
                Quantidade
              </p>
              <span>
                {bag.length} itens
              </span>
            </ItemsLenght>
            <TotalShopping>
              <strong>
                Valor total
              </strong>
              <span> 
                {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
                }).format(totalProductsPrice)}
              </span>
            </TotalShopping>
            <FinalizeButton>
              <button>
                Finalizar Compra
              </button>
            </FinalizeButton>
          </FooterContainer>
        </SidebarContent>
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
            <ItemsLenghtSpan>
              <span>{bag.length}</span>
            </ItemsLenghtSpan>
          </MenuButtonContainer>
        </HeaderContainer>
        {children}
      </Container>
    </>
  );
}
