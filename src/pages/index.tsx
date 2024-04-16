import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";
import Head from "next/head";

import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";
import {useKeenSlider} from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe";
import Link from "next/link";

interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
  }[]
}

export default function Home({products}: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignaite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
      <Link  key={product.id}  href={`/product/${product.id}`} prefetch={false}  >
        <Product className="keen-slider__slide">
          <Image src={product.imageUrl} width={520} height={480} alt="" />
          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Product>
      </Link>
         )
      })}
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
    // Trate o caso em que price ou price.unit_amount é null
    return {
      notFound: true, // ou outra lógica adequada ao seu caso
    };
  }

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100),
    }
  })
  
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  }
}