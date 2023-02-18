import styled from '@emotion/styled';

import DetailOptionButton from './ProductWrapper/Component/DetailOptionButton';

import PALETTE from '../styles/palette';

const { basicWhite } = PALETTE;

const Wrapper = styled.div({
  width: '35%',
  padding: '1.5rem',
  backgroundColor: basicWhite,
});

export default function ItemInfo({
  sizes,
  colors,
  details,
  evaluation: { starRating },
}) {
  return (
    <Wrapper>
      <DetailOptionButton
        sizes={sizes}
      />
      <div>{colors}</div>
      <div>{details}</div>
      <div>{starRating}</div>
    </Wrapper>
  );
}
