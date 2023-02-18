import styled from '@emotion/styled';

import DetailOptionButton from './ProductWrapper/Component/DetailOptionButton';

const Layout = styled.div({
  width: '35%',
  backgroundColor: 'orange',
});

export default function ItemInfo({
  sizes,
  colors,
  details,
  evaluation: { starRating },
}) {
  return (
    <Layout>
      <DetailOptionButton
        sizes={sizes}
      />
      <div>{sizes}</div>
      <div>{colors}</div>
      <div>{details}</div>
      <div>{starRating}</div>
    </Layout>
  );
}
