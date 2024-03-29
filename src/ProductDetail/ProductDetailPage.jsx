import styled from '@emotion/styled';

// TODO: Back-end와의 통신 준비중
// import { useParams } from 'react-router-dom';

import ProductDetailContainer from './ProductDetailContainer';

const Wrapper = styled.div({
  minHeight: 'calc(100vh - 110px)',
});

export default function ProductDetailPage() {
  return (
    <Wrapper>
      <ProductDetailContainer />
    </Wrapper>
  );
}
