import styled from '@emotion/styled';

import PALETTE from '../../styles/palette';

const { dark, basicWhite } = PALETTE;

export default function MarqueeWrapper({ productList }) {
  const Wrapper = styled.div({
    display: 'flex',
    minWidth: '100%',
  });

  const StyledProductLayout = styled.a({
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    overflow: 'hidden',
    '& img': {
      display: 'block',
      width: '320px',
      height: '320px',
      backgroundColor: dark,
    },
  });

  const StyledProductTag = styled.div({
    position: 'absolute',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 20,
    width: '100%',
    height: '100%',
    marginRight: '6rem',
    '& span': {
      display: 'inline-block',
      padding: '.75rem',
      fontSize: '1.25rem',
      lineHeight: '1.75rem',
      fontWeight: '700',
      backgroundColor: basicWhite,
      color: dark,
    },
  });

  return (
    <Wrapper>
      {productList.map(({
        id, title, mainImage,
      }) => (
        <StyledProductLayout
          key={id}
          href={`product/${id}`}
        >
          <StyledProductTag>
            <span>{title}</span>
          </StyledProductTag>
          <img src={mainImage} alt={title} />
        </StyledProductLayout>
      ))}
    </Wrapper>
  );
}
