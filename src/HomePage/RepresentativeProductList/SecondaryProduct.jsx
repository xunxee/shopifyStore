import styled from '@emotion/styled';

import { setColorById } from '../../utils';

import PRODUCT_TAG from '../../styles/productTag';

const { productName, priceName } = PRODUCT_TAG;

const Wrapper = styled.div({
  width: '30%',
  cursor: 'pointer',
});

const StyledProductItem = styled.div(({ backgroundColor }) => (
  {
    position: 'relative',
    backgroundColor,
    width: '100%',
    height: '50%',
  }
));

const StyledProductTag = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 0,
  paddingRight: '4rem',
  overflow: 'hidden',
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
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export default function SecondaryProduct(
  { productList },
) {
  return (
    <Wrapper>
      {productList.map(({
        id, title, price, mainImage,
      }) => (
        <StyledProductItem
          key={id}
          backgroundColor={setColorById(id)}
        >
          <StyledProductTag>
            <h3>{title}</h3>
            <span>{price}</span>
          </StyledProductTag>
          <StyledImgBox>
            <img src={mainImage} alt={title} />
          </StyledImgBox>
        </StyledProductItem>
      ))}
    </Wrapper>
  );
}
