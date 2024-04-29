import { stripe } from "@/lib/stripe";
import { ImageContainer, ProductsContainer, SuccesContent, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[];
}

export default function Success({ customerName, products }: SuccessProps) {

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignaite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ProductsContainer>
          {products.map((product, index) => (
            <ImageContainer key={index}>
              <Image src={product.imageUrl} alt="" width={140} height={140} />
            </ImageContainer>
          ))}
        </ProductsContainer>

        <SuccesContent>
        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {products.length} camisetas já
          está a caminho da sua casa.
        </p>
        </SuccesContent>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };
  }

  const sessionId = String(query.session_id);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product', 'customer_details'],
    });

    const customerName = session.customer_details ? session.customer_details.name : 'Cliente';

    const lineItems = session.line_items && session.line_items.data;

    const products = lineItems?.map(item => {
      const product = item.price?.product as Stripe.Product;
      return {
        name: product.name,
        imageUrl: product.images && product.images.length > 0 ? product.images[0] : '',
      };
    });

    return {
      props: {
        customerName,
        products,
      },
    };
  } catch (error) {
    console.error('Erro ao recuperar a sessão de checkout:', error);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};
