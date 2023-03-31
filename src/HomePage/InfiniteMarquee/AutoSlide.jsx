import styled from '@emotion/styled';

import MarqueeWrapper from './MarqueeWrapper';

export default function AutoSlide(
  {
    productList,
    name,
  },
) {
  const Wrapper = styled.div({
    display: 'flex',
    width: '100%',
    overflow: 'hidden',
  });

  return (
    <Wrapper>
      <MarqueeWrapper
        name={name}
        productList={productList}
      />
    </Wrapper>
  );
}
