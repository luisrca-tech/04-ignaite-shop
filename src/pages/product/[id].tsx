"use client"

import { useBag } from "@/Hooks/useBag"
import { ProductsProps } from "@/contexts/BagContext"
import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Stripe from "stripe"

export default function Product({ product }: ProductsProps) {
  const {bag, addToCart } = useBag()
  

  function handleAddToCart(product: ProductsProps) {
    const isProductInBag = bag.some((item) => item.product.id === product.product.id);

    if (!isProductInBag) {
      const productWitchPriceId = {
        ...product,
        defaultPriceId: product.product.defaultPriceId
      };

      addToCart(productWitchPriceId)
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
        <span>{ new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(parseFloat(product.price))}</span>
        <p>{product.description}</p>

        <button onClick={() => handleAddToCart({product})}>
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
    return {
      notFound: true, 
    };
  }

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;

  if (!price || price.unit_amount === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: (price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}