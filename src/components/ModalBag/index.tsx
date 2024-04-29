"use client";

import { Container } from "./styles";
import { ReactNode, useEffect } from "react";

type ModalProps = {
  onClickCallback?: () => void;
};

export default function Modal({ onClickCallback }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return <Container onClick={onClickCallback}></Container>;
}
