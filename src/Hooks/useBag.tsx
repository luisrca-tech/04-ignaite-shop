import { BagContext } from "@/contexts/BagContext";
import { useContext } from "react";

export function useBag() {
  return useContext(BagContext)
}