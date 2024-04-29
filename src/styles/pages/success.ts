import { styled } from "@stitches/react";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2rem',
  margin: '0 auto',
  height: 550,

  h1: {
    fontSize: '2xl',
    color: '$gray100',
  },

  p: {
    fontSize: 'xl',
    color: '$gray300',
    maxWidth: 590,
    textAlign: 'center',
    lineHeight: 1.4
  },

  a: {
    marginTop: '2rem',
    display: 'block',
    fontSize: 'lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    }
  }
});

  export const ProductsContainer = styled('div', {
    display: 'flex',
  })

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 140,
  height: 140,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 1000,
  padding: '0.25rem',
  marginRight: '-1.5rem',
  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25);',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }
});

export const SuccesContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem',
})