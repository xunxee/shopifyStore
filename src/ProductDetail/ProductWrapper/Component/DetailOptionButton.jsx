import styled from '@emotion/styled';

import PALETTE from '../../../styles/palette';

const { basicWhite }  = PALETTE;

const Wrapper = styled.div({
  padding: '1rem 0',
});

const StyledButton = styled.button({
  width: '48px',
  height: '48px',
  marginRight: '1rem',
  border: '1px solid #999',
  borderRadius: '50%',
  fontSize: '.875rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '.025em',
  backgroundColor: basicWhite,
  cursor: 'pointer',
});

export default function DetailOptionButton({ options }) {
  return (
    <Wrapper>
      {options.map((size) => (
        <StyledButton
          type="button"
          key={size}
        >
          {size}
        </StyledButton>
      ))}
    </Wrapper>
  );
}
