import styled from '@emotion/styled';

import DetailOptionButton from './ProductWrapper/Component/DetailOptionButton';

import PALETTE from '../styles/palette';

const { basicWhite } = PALETTE;

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '35%',
  padding: '2rem',
  backgroundColor: basicWhite,
});

const StyledSelectOptionsWrapper = styled.div({

});

const StyledOptionWrapper = styled.div({
  paddingBottom: '1.5rem',
});

const StyledTitle = styled.h2({
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '.035em',
});

export default function ItemInfo({
  sizes,
  colors,
  details,
  selectedSize,
  onClickSize,
  evaluation: { starRating },
}) {
  return (
    <Wrapper>
      <StyledSelectOptionsWrapper>
        <StyledOptionWrapper>
          <StyledTitle>SIZE</StyledTitle>
          <DetailOptionButton
            name="size"
            options={sizes}
            selectedSize={selectedSize}
            onClickSize={onClickSize}
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
