import { styled } from "@stitches/react";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
  paddingBottom: '4rem',
})

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
});

export const MenuButtonContainer = styled('div', {
  display: 'flex',
  background: '$gray900',
})

export const CartButton = styled('button', {
    backgroundColor: '$gray800',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '6px',
});

export const ItemsLenght = styled('div', {
  borderRadius: '1000px',
  background: '$green500',
  padding: '0.1rem 0.5rem',
  width: '24px',
  height: '24px',
  margin: '-0.2rem -1.1rem',

  span: {
    color: '$white',
    fontWeight: 'bold',
    fontSize: '0.875rem',
  }
})

type SidebarContainerType = {
  isShow: boolean;
};

export const SidebarContainer = styled("div", {
  padding: "1.5rem",
  display: "flex",
  maxWidth: '100vh',
  width: "40vw",
  flexDirection: "column",
  height: "100vh",
  backgroundColor: "$gray800",
  zIndex: 9999,
  position: "absolute",
  transition: "right 0.3s",
  right: '0',

   variants: {
    isShow: {
      true: { bottom: "0" }, 
      false: { bottom: "100vh"},
    },
  },
})<SidebarContainerType>;

export const CloseContainer = styled('div', {
  width: '100%',
  padding: '1.5rem 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',

  button: {
    background: '$gray800',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
  }
});

export const SidebarContent = styled('div', {
  
})