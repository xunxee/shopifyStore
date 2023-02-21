import styled from '@emotion/styled';

import { useCallback } from 'react';

import PALETTE from '../../../styles/palette';

const { basicWhite } = PALETTE;

const Wrapper = styled.div({
  padding: '1rem 0',
});

const StyledButton = styled.button((
  { selectedSize, name },
) => ({
  width: '48px',
  height: '48px',
  marginRight: '1rem',
  border: selectedSize === name
    ? '2px solid #000'
    : '2px solid #999',
  borderRadius: '50%',
  fontSize: '.875rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '.025em',
  backgroundColor: basicWhite,
  cursor: 'pointer',
  '&:nth-of-type(1)': {
    borderColor: selectedSize === null || selectedSize === name
      ? '#000'
      : '#999',
  },
}));

export default function DetailOptionButton({
  options,
  selectedSize,
  onClickSize,
}) {
  const handleClick = useCallback(({ target: { name } }) => {
    onClickSize(name);
  }, [onClickSize]);

  return (
    <Wrapper>
      {options.map((size) => (
        <StyledButton
          type="button"
          key={size}
          name={size}
          selectedSize={selectedSize}
          onClick={handleClick}
        >
          {size}
        </StyledButton>
      ))}
    </Wrapper>
  );
}
