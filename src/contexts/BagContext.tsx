  import { createContext, ReactNode, useEffect, useState } from "react";

  export interface ProductsProps {
      id: string;
      name: string;
      imageUrl: string;
      price: string;
      defaultPriceId: string,
    }

  export interface ProductProps {
      product: {
        id: string,
        name: string,
        imageUrl: string,
        price: string,
        description: string,
        defaultPriceId: string,
        quantity: number,
      }
    }


  interface BagContextTypes {
    products?: ProductsProps[];
    product?: ProductsProps[];
    bag: ProductsProps[];
    addToCart: (product: ProductsProps) => void;
    setProducts: (products: ProductsProps[]) => void;
    setProduct: (product: ProductsProps[]) => void;
    removeFromCart: (product: ProductsProps) => void;
  }

  export const BagContext = createContext({} as BagContextTypes);

  interface BagContextProviderProps {
    children: ReactNode;
  }

  export function BagContextProvider({ children }: BagContextProviderProps) {
    const [productsList, setProductsList] = useState<ProductsProps[]>([]);
    const [productList, setProductList] = useState<ProductsProps[]>([]);
    const [bag, setBag] = useState<ProductsProps[]>([]);

    
    const setProducts = (products: ProductsProps[]) => {
      setProductsList(products);
    };

    const setProduct = (product: ProductsProps[]) => {
      setProductList(product)
    }
    
    const addToCart = (product: ProductsProps) => {
      setBag((prevBag) => [...prevBag, product]);
    };

    useEffect(() => {
      console.log(bag);
    }, [bag])
    

  const removeFromCart = (product: ProductsProps) => {
      setBag((prevBag) => prevBag.filter((item) => item.id !== product.id))
    }

    useEffect(() => {
      if (productsList) {
      const stateJSON = JSON.stringify(productsList)

      localStorage.setItem('@coffee-delivery:cart-state-1.0.0', stateJSON)
      }
    }, [productsList])

    return (
      <BagContext.Provider value={{ 
        addToCart, 
        removeFromCart,
        bag, 
        products: productsList, 
        setProducts,
        product: productList,
        setProduct,
        }}>
        {children}
      </BagContext.Provider>
    );
  }
