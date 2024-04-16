import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
  customerName: string,
  product: {
    name: string,
    imageUrl: string
  }
}

export default function Success({ customerName, product } : SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignaite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer>
        <Image src={product.imageUrl} alt="" width={120} height={110}/>
      </ImageContainer>
      <p>
        Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
      </p>

      <Link href="/">
        Voltar ao catálogo
      </Link>

    </SuccessContainer>
    </>
  )
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

    // Verifica se session.customer_details é null
    const customerName = session.customer_details ? session.customer_details.name : 'Cliente';

    // Verifica se session.line_items é null
    const product = session.line_items ? session.line_items.data[0].price.product as Stripe.Product : null;

    // Verifica se product é null antes de acessar suas propriedades
    const productName = product ? product.name : 'Produto';
    const productImageUrl = product && product.images && product.images.length > 0 ? product.images[0] : '';

    return {
      props: {
        customerName,
        product: {
          name: productName,
          imageUrl: productImageUrl,
        },
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

