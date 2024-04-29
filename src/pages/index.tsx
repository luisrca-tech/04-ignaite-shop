import { CartButton, HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";
import Head from "next/head";

import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe";
import Link from "next/link";

import BagCarrosel from '../assets/BagCarrosel.svg'
import { useBag } from "@/Hooks/useBag";
import { ProductsProps } from "@/contexts/BagContext";
import { useEffect } from "react";

export interface ProductWithProductProps {
  products: ProductsProps[];
}

export default function Home({ products }: ProductWithProductProps) {
  const { setProducts, addToCart, bag } = useBag();

  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  function handleAddToCart(product: ProductsProps) {
    const isProductInBag = bag.some((item) => item.product.id === product.product.id);

    if (!isProductInBag) {
      addToCart(product);
    }
  }

  return (
    <>
      <Head>
        <title>Home | Ignaite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product key={product.product.id} className="keen-slider__slide">
            <Link href={`/product/${product.product.id}`} prefetch={false}>
              <Image src={product.product.imageUrl} width={520} height={480} alt="" />
            </Link>
            <footer>
              <div>
                <strong>{product.product.name}</strong>
                <span> 
                  {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                  }).format(parseFloat(product.product.price))}
                </span>
              </div>
              <CartButton onClick={(e) => handleAddToCart(product)}>
                <Image src={BagCarrosel} alt="" width={56} height={56} />
              </CartButton>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map((product) => {

    const price = product.default_price as Stripe.Price
    if (!price || price.unit_amount === null) {
      return {
        notFound: true,
      };
    }

    return {
      product: {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: (price.unit_amount / 100),
      defaultPriceId: price.id,
      }
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  }
}