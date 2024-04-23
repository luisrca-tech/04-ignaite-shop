import { createContext, ReactNode, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Stripe from "stripe";

export interface ProductProps {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description?: string | null;
  defaultPriceId?: string;
  notFound?: boolean; // Opcional, pois alguns produtos podem não ser encontrados
}

interface BagContextTypes {
  products?: ProductProps[]; // Agora é opcional, pois pode estar vazio inicialmente
  bag: ProductProps[];
  orders: ProductProps[];
  addToCart: (product: ProductProps) => void;
  setProducts: (products: ProductProps[]) => void;
}

export const BagContext = createContext({} as BagContextTypes);

interface BagContextProviderProps {
  children: ReactNode;
}

export function BagContextProvider({ children }: BagContextProviderProps) {
  const [productsList, setProductsList] = useState<ProductProps[]>([]);
  const [orders, setOrders] = useState(productsList)
  const [bag, setBag] = useState(orders);
  
  const setProducts = (products: ProductProps[]) => {
    setProductsList(products);
  };
   
   const addToCart = (product: ProductProps) => {
    setBag((prevBag) => [...prevBag, product]);
    setOrders((prevOrder) => [...prevOrder, product])
  };

  useEffect(() => {
    console.log(bag, orders);
  }, [bag, orders])

  return (
    <BagContext.Provider value={{ 
      addToCart, 
      bag, 
      orders,
      products: productsList, 
      setProducts, 
      }}>
      {children}
    </BagContext.Provider>
  );
}
