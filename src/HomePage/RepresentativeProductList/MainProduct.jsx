import styled from '@emotion/styled';

const Wrapper = styled.div({});

export default function MainProduct(
  { productList },
) {
  return (
    <Wrapper>
      <div>{JSON.stringify(productList)}</div>
    </Wrapper>
  );
}
