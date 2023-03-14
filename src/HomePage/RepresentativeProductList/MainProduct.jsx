import styled from '@emotion/styled';

import { setColorById } from '../../utils';

const Wrapper = styled.div(({ backgroundColor }) => (
  {
    width: '65%',
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

export default function MainProduct(
  {
    productList: {
      id, title, price, mainImage,
    },
  },
) {
  return (
    <Wrapper backgroundColor={setColorById(id)}>
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
