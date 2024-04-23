"use client"

import { BagContext } from "@/contexts/BagContext"
import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useContext, useState } from "react"
import Stripe from "stripe"

interface ProductProps {
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    description: string,
    defaultPriceId: string,
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

    const response = await axios.post('/api/checkout', {
      priceId: product.defaultPriceId
    })

    const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      // Conectar com uma ferramente de observabilidade (Datadog / Sentry)

      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignaite Shop</title>
      </Head>
      
       <ProductContainer>
    <ImageContainer>
      <Image src={product.imageUrl} alt="" width={520} height={520} />
    </ImageContainer>

    <ProductDetails>
      <h1>{product.name}</h1>
      <span>{product.price}</span>
      <p>{product.description}</p>

      <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
        Colocar na sacola
      </button>
    </ProductDetails>
   </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {params: {id: 'prod_Ptql2AlwPXndb7' }}
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params?.id;

  if (!productId) {
    // Trate o caso em que params é undefined
    return {
      notFound: true, // ou outra lógica adequada ao seu caso
    };
  }

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  if (!price || price.unit_amount === null) {
    // Trate o caso em que price ou price.unit_amount é null
    return {
      notFound: true, // ou outra lógica adequada ao seu caso
    };
  }

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}