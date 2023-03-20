import styled from '@emotion/styled';

import { setColorById } from '../../utils';

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
    padding: '1rem 1.5rem',
    fontSize: '32px',
    fontWeight: '700',
    letterSpacing: '.4px',
    backgroundColor: '#FFF',
    boxDecorationBreak: 'clone',
  },
});

const StyledProductPrice = styled.div({
  display: 'inline-block',
  padding: '.5rem 1.5rem 1rem',
  fontSize: '.875rem',
  fontWeight: '600',
  letterSpacing: '.025em',
  lineHeight: '20px',
  backgroundColor: '#FFF',
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
