import styled from '@emotion/styled';

import { setColorById } from '../../utils';

const Wrapper = styled.div({
  width: '35%',
});

const StyledProductItem = styled.div(({ backgroundColor }) => (
  {
    backgroundColor,
  }
));

const StyledProductTag = styled.div({});

const StyledImgBox = styled.div({
  '& img': {
    maxWidth: '100%',
    height: 'auto',
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
