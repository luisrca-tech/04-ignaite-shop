import { useContext, useEffect, useState } from "react";
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

import { BagContext, BagContextProvider, ProductProps } from "@/contexts/BagContext";
import { useBag } from "@/Hooks/useBag";

interface ModalProps {
  children: any
}

export function ShowModal({ children }: ModalProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { bag, orders } = useBag();
  const [ProductsInBag, setProductsInBag] = useState<ProductProps[]>(orders);

  useEffect(() => {
    const updatedProductsInBag = bag?.map((item) => {
      const productInfo = orders.find((product) => product.id === item.id);

      if (!productInfo) {
        throw new Error('Invalid Product.');
      }

      return {
        ...productInfo,
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl
      };
    });

    setProductsInBag(updatedProductsInBag || []);
    console.log(bag, orders);
  }, [bag, orders]);
  
  const handleMenu = () => {
    setShowModal((current) => !current);
  };

  return (
    <BagContextProvider>
      <SidebarContainer isShow={showModal} >
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
            {bag.map((item) => (
              <Product key={item.id}>
                <ImageContainer>
                  <Image src={item.imageUrl} alt="" width={94} height={94} />
                </ImageContainer>
                <ProductContent>
                  <span>{item.name}</span>
                  <strong>{item.price}</strong>
                  <button>Remover</button>
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
                3 itens
              </span>
            </ItemsLenght>
            <TotalShopping>
              <strong>
                Valor total
              </strong>
              <span>
                R$ 270,00
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
              <span>0</span>
            </ItemsLenghtSpan>
          </MenuButtonContainer>
        </HeaderContainer>
        {children}
      </Container>
    </BagContextProvider>
  );
}
