import { styled } from "@stitches/react";

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
  paddingBottom: '4rem',
})

type HeaderProps = {
  isSuccessPage: boolean,
}

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',

  variants: {
    isSuccessPage: {
      true: { justifyContent: 'center' },
      false: { justifyContent: 'space-between' },
    }
  }

})<HeaderProps>;

export const MenuButtonContainer = styled('div', {
  display: 'flex',
  background: '$gray900',

  variants: {
    isSuccessPage: {
      true: { display: 'none' },
      false: { display: 'flex' },
    }
  }

})<HeaderProps>;

export const CartButton = styled('button', {
    backgroundColor: '$gray800',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '6px',
});

export const ItemsLenghtSpan = styled('div', {
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
  maxWidth: '100vw',
  width: "40vw",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "$gray800",
  zIndex: 9999,
  position: "absolute",
  transition: "bottom 0.5s",
  right: '0',

   variants: {
    isShow: {
      true: { bottom: "0" }, 
      false: { bottom: "100vh"},
    },
    isSuccessPage: {
      true: { display: 'none' },
      false: { display: 'flex' }
    }
  },
})<SidebarContainerType>;

export const CloseContainer = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',

  button: {
    background: '$gray800',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    margin: '-1.2rem 0',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$green300',
  },
  
  }
});

export const SidebarContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '0 3rem'
})

export const SidebarHeader = styled('div', {
  strong: {
    fontSize: '1.25rem',
    color: '$gray100',
    lineHeight: '160%',
  }
})

export const ProductsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
})

export const ImageContainer = styled('div', {
  width: '100%',
  height: '5.9rem',
  maxWidth: '6.375rem',
  borderRadius: 8,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  }
})

export const Product = styled('div', {
  display: 'flex',
  gap: '1.25rem',
})

export const ProductContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  button: {
    marginTop: '1rem',
    textAlign: 'left',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',

    color: '$green500',
    fontSize: '1rem',
    fontWeight: 'bold',
  }
})

export const FooterContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

})

export const ItemsLenght = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  p: {
    color: '$gray400',
    fontSize: '1rem',
    lineHeight: '160%',
  },

  span: {
    color: '$gray400',
    fontSize: '1.125rem',
    fontWeight: 'regular',
    lineHeight: '160%',
  }
})

export const TotalShopping = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  strong: {
    fontSize: '1.125rem',
    color: '$gray100',
    fontWeight: 'bold',
    lineHeight: '160%',
  },

  span: {
    fontSize: '1.5rem',
    color: '$gray500',
    fontWeight: 'bold',
    lineHeight: '160%',
  }
})

export const FinalizeButton = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '1rem',

  button: {
  width: '100%',
  height: 64,

  borderRadius: 8,
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  
  background: '$green500',
  color: '$gray100',
  fontSize: '1rem',
  fontWeight: 'bold',
  lineHeight: '160%',
}
})