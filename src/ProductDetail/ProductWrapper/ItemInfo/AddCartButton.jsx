import styled from '@emotion/styled';

import PALETTE from '../../../styles/palette';

const { dark, basicWhite } = PALETTE;

const StyledAddCartButton = styled.button({
  width: '100%',
  padding: '1.25rem 2.5rem',
  border: '0',
  fontSize: '.875rem',
  lineHeight: '1.5rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '.025em',
  color: basicWhite,
  backgroundColor: dark,
  cursor: 'pointer',
});

export default function AddCartButton() {
  return (
    <div>
      <StyledAddCartButton>
        ADD TO CART
      </StyledAddCartButton>
    </div>
  );
}
