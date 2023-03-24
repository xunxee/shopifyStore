import styled from '@emotion/styled';

import PALETTE from '../../styles/palette';

const { dark, basicWhite } = PALETTE;

export default function MarqueeWrapper({ productList }) {
  const cloneProductList = [...productList];

  const Wrapper = styled.div({
    display: 'flex',
    width: '100%',
  });

  const StyledOriginWrapper = styled.div({
    display: 'flex',
    minWidth: '100%',
  });

  const StyledCloneWrapper = styled.div({
    display: 'flex',
    minWidth: '100%',
  });

  const StyledProductLayout = styled.a({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: 'auto',
    backgroundColor: dark,
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
    zIndex: 20,
    width: '100%',
    height: '100%',
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
      <StyledOriginWrapper>
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
      </StyledOriginWrapper>
      <StyledCloneWrapper>
        {cloneProductList.map(({
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
      </StyledCloneWrapper>
    </Wrapper>
  );
}
