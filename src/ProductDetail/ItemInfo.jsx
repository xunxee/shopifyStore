import styled from '@emotion/styled';

import PALETTE from '../styles/palette';

import DetailOptionButton from './ProductWrapper/Component/DetailOptionButton';
import Review from './ProductWrapper/ItemInfo/Review';
import AddCartButton from './ProductWrapper/ItemInfo/AddCartButton';

const { basicWhite } = PALETTE;

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '35%',
  padding: '2rem',
  backgroundColor: basicWhite,
});

const StyledSelectOptionsWrapper = styled.div({});

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

const StyledDetailText = styled.div({
  marginBottom: '1rem',
  fontSize: '1rem',
  lineHeight: '1.75rem',
  '& p': {
    marginBottom: '1rem',
  },
});

export default function ItemInfo({
  sizes,
  colors,
  details,
  selectedSize,
  onClickSize,
  selectedColor,
  onClickColor,
  evaluation,
}) {
  return (
    <Wrapper>
      <StyledSelectOptionsWrapper>
        <StyledOptionWrapper>
          <StyledTitle>SIZE</StyledTitle>
          <DetailOptionButton
            name="size"
            options={sizes}
            selectedOption={selectedSize}
            onClickOption={onClickSize}
          />
        </StyledOptionWrapper>

        <StyledOptionWrapper>
          <StyledTitle>COLOR</StyledTitle>
          <DetailOptionButton
            name="color"
            options={colors}
            selectedOption={selectedColor}
            onClickOption={onClickColor}
          />
        </StyledOptionWrapper>
      </StyledSelectOptionsWrapper>

      <StyledDetailText>
        <p>{details}</p>
      </StyledDetailText>

      <Review
        evaluation={evaluation}
      />

      <AddCartButton />
    </Wrapper>
  );
}
