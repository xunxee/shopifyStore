import styled from '@emotion/styled';

import { useCallback } from 'react';

import { setColorById } from '../../utils';

import PRODUCT_TAG from '../../styles/productTag';

const { productName, priceName } = PRODUCT_TAG;

const Wrapper = styled.div({
  width: '33%',
  cursor: 'pointer',
});

const StyledProductItem = styled.div(({ backgroundColor }) => (
  {
    position: 'relative',
    backgroundColor,
    width: '100%',
    height: '50%',
    '&:hover': {
      '& img': {
        transform: 'scale(1.1)',
      },
    },
  }
));

const StyledProductTag = styled.div({
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '20',
  overflow: 'hidden',
  paddingRight: '4rem',
});

const StyledProductTitle = styled.h3({
  fontSize: '2rem',
  lineHeight: '2.1em',
  '& span': {
    ...productName,
    fontSize: '32px',
  },
});

const StyledProductPrice = styled.div({
  ...priceName,
});

const StyledImgBox = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    transition: '0.5s',
    transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
    objectFit: 'cover',
  },
});

export default function SecondaryProduct(
  {
    productList,
    onClick,
  },
) {
  const handleClick = useCallback((id) => {
    onClick(`product/${id}`);
  }, [onClick]);

  return (
    <Wrapper>
      {productList.map(({
        id, title, price, mainImage,
      }) => (
        <StyledProductItem
          key={id}
          backgroundColor={setColorById(id)}
          onClick={() => handleClick(id)}
        >
          <StyledProductTag>
            <StyledProductTitle>
              <span>{title}</span>
            </StyledProductTitle>
            <StyledProductPrice>{price}</StyledProductPrice>
          </StyledProductTag>
          <StyledImgBox>
            <img src={mainImage} alt={title} />
          </StyledImgBox>
        </StyledProductItem>
      ))}
    </Wrapper>
  );
}
