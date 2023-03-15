import styled from '@emotion/styled';

import MainProduct from './RepresentativeProductList/MainProduct';
import SecondaryProduct from './RepresentativeProductList/SecondaryProduct';

const Wrapper = styled.div({
  display: 'flex',
});

export default function RepresentativeProductList(
  { name, productList },
) {
  const [main, ...secondary] = productList;

  return (
    name === 'main'
      ? (
        <Wrapper>
          <MainProduct productList={main} />
          <SecondaryProduct productList={secondary} />
        </Wrapper>
      )
      : (
        <Wrapper>
          <SecondaryProduct productList={secondary} />
          <MainProduct productList={main} />
        </Wrapper>
      )
  );
}
