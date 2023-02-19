import styled from '@emotion/styled';

import DetailOptionButton from './ProductWrapper/Component/DetailOptionButton';

import PALETTE from '../styles/palette';

const { basicWhite } = PALETTE;

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '35%',
  padding: '1.5rem',
  backgroundColor: basicWhite,
});

const StyledSelectOptionsWrapper = styled.div({

});

const StyledOptionWrapper = styled.div({

});

const StyledTitle = styled.h2({
  letterSpacing: '.025em',
  textTransform: 'uppercase',
});

export default function ItemInfo({
  sizes,
  colors,
  details,
  evaluation: { starRating },
}) {
  return (
    <Wrapper>
      <StyledSelectOptionsWrapper>
        <StyledOptionWrapper>
          <StyledTitle>SIZE</StyledTitle>
          <DetailOptionButton
            sizes={sizes}
          />
        </StyledOptionWrapper>

        <StyledOptionWrapper>
          <StyledTitle>COLOR</StyledTitle>
          <div>{colors}</div>
        </StyledOptionWrapper>
      </StyledSelectOptionsWrapper>

      <div>{details}</div>
      <div>{starRating}</div>
    </Wrapper>
  );
}
