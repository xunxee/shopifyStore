import styled from '@emotion/styled';

import MainProduct from './RepresentativeProductList/MainProduct';
import SecondaryProduct from './RepresentativeProductList/SecondaryProduct';

const Wrapper = styled.div({
  display: 'flex',
  maxHeight: '1080px',
});

export default function RepresentativeProductList(
  { name, productList, onClick },
) {
  const [main, ...secondary] = productList;

  return (
    name === 'main'
      ? (
        <Wrapper>
          <MainProduct
            productList={main}
            onClick={onClick}
          />
          <SecondaryProduct
            productList={secondary}
            onClick={onClick}
          />
        </Wrapper>
      )
      : (
        <Wrapper>
          <SecondaryProduct
            productList={secondary}
            onClick={onClick}
          />
          <MainProduct
            productList={main}
            onClick={onClick}
          />
        </Wrapper>
      )
  );
}
