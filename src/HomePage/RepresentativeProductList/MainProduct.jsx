import styled from '@emotion/styled';

import { useCallback } from 'react';

import { setColorById } from '../../utils';

import PRODUCT_TAG from '../../styles/productTag';

const { productName, priceName } = PRODUCT_TAG;

const Wrapper = styled.div(({ backgroundColor }) => (
  {
    position: 'relative',
    width: '67%',
    backgroundColor,
    cursor: 'pointer',
    '&:hover': {
      '& img': {
        transform: 'scale(1.1)',
      },
    },
  }
));

const StyledProductTag = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 20,
  paddingRight: '4rem',
  '& h3': {
    ...productName,
    fontSize: '2rem',
    lineHeight: '2rem',
    boxDecorationBreak: 'clone',
  },
  '& span': {
    ...priceName,
    display: 'inline-block',
  },
});

const StyledImgBox = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& img': {
    maxWidth: '100%',
    maxHeight: '1080px',
    height: 'auto',
    transition: '0.5s',
    transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
    objectFit: 'cover',
  },
});

export default function MainProduct(
  {
    productList: {
      id, title, price, mainImage,
    },
    onClick,
  },
) {
  const handleClick = useCallback(() => {
    onClick(`product/${id}`);
  }, [onClick]);

  return (
    <Wrapper
      onClick={handleClick}
      backgroundColor={setColorById(id)}
    >
      <StyledProductTag title={title}>
        <h3>{title}</h3>
        <span>{price}</span>
      </StyledProductTag>
      <StyledImgBox>
        <img src={mainImage} alt={title} />
      </StyledImgBox>
    </Wrapper>
  );
}
