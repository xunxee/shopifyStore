import styled from '@emotion/styled';

import { setColorById } from '../../utils';

const Wrapper = styled.div(({ backgroundColor }) => (
  {
    width: '35%',
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
    <>
      <div>{JSON.stringify(productList)}</div>
      {productList.map(({
        id, title, price, mainImage,
      }) => (
        <Wrapper
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
        </Wrapper>
      ))}
    </>
  );
}
