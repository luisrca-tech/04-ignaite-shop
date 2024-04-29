  import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface ProductsProps {
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    description: string,
    defaultPriceId: string,
    quantity: number,
  }
}[]


interface BagContextTypes {
  products?: ProductsProps[];
  product?: ProductsProps[];
  bag: ProductsProps[];
  isCreatingCheckoutSession: boolean;
  addToCart: (product: ProductsProps) => void;
  setProducts: (products: ProductsProps[]) => void;
  setProduct: (product: ProductsProps[]) => void;
  removeFromCart: (product: ProductsProps) => void;
  handleBuyProduct: (product: ProductsProps) => void;
}

export const BagContext = createContext({} as BagContextTypes);

interface BagContextProviderProps {
  children: ReactNode;
}

export function BagContextProvider({ children }: BagContextProviderProps) {
  const [productsList, setProductsList] = useState<ProductsProps[]>([]);
  const [productList, setProductList] = useState<ProductsProps[]>([]);
  const [bag, setBag] = useState<ProductsProps[]>([]);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  const saveBagToLocalStorage = (bag: ProductsProps[]) => {
    localStorage.setItem('bag', JSON.stringify(bag));
  };

  const loadBagFromLocalStorage = () => {
    const savedBag = localStorage.getItem('bag');
    return savedBag ? JSON.parse(savedBag) : [];
  };

      
  const setProducts = (products: ProductsProps[]) => {
    setProductsList(products);
  };

  const setProduct = (product: ProductsProps[]) => {
    setProductList(product)
  }
    
      
  const addToCart = (product: ProductsProps) => {
    const productWithPriceId = {
      ...product,
      product: {
        ...product.product,
        defaultPriceId: product.product.defaultPriceId,
      }
    };
    setBag((prevBag) => [...prevBag, productWithPriceId]);
  };

  const removeFromCart = (product: ProductsProps) => {
    setBag((prevBag) => prevBag.filter((item) => item.product.id !== product.product.id))
  } 

  useEffect(() => {
  const savedBag = loadBagFromLocalStorage();
  setBag(savedBag);
  }, []);

  useEffect(() => {
    saveBagToLocalStorage(bag);
  }, [bag]);

    async function handleBuyProduct(product: ProductsProps) {
    try {
      setIsCreatingCheckoutSession(true);

      const priceIds = bag.map(item => item.product.defaultPriceId)

      const response = await axios.post('/api/checkout', {
        priceIds: priceIds,
        quantity: bag.length,
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);

      alert('Falha ao redirecionar ao checkout!')
    }
  }

      return (
        <BagContext.Provider value={{ 
          addToCart, 
          removeFromCart,
          bag, 
          products: productsList, 
          setProducts,
          product: productList,
          setProduct,
          handleBuyProduct,
          isCreatingCheckoutSession,
          }}>
          {children}
        </BagContext.Provider>
      );
    }
