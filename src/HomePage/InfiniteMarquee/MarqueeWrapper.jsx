import styled from '@emotion/styled';

import { keyframes } from '@emotion/react';

import PALETTE from '../../styles/palette';

const { dark, basicWhite } = PALETTE;

export default function MarqueeWrapper(
  {
    name,
    productList,
  },
) {
  const cloneProductList = [...productList];

  const Wrapper = styled.div({
    display: 'flex',
    width: '100%',
    backgroundColor: name === 'main' ? dark : basicWhite,
  });

  const rollingLeft1 = keyframes`
    0% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(-100%);
    }
    50.01%{
        transform: translateX(100%);
    }
    100%{
        transform: translateX(0);
    }
  `;

  const rollingLeft2 = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-200%);
    }
  `;

  const StyledOriginWrapper = styled.div({
    display: 'flex',
    minWidth: '100%',
    animation: `${rollingLeft1} 65s linear 0s infinite normal none running`,
  });

  const StyledCloneWrapper = styled.div({
    display: 'flex',
    minWidth: '100%',
    animation: `${rollingLeft2} 65s linear 0s infinite normal none running`,
  });

  const StyledProductLayout = styled.a({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: 'auto',
    backgroundColor: name === 'main' ? dark : basicWhite,
    '& img': {
      display: 'block',
      width: '320px',
      height: '320px',
      backgroundColor: name === 'main' ? dark : basicWhite,
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
      color: name === 'main' ? dark : basicWhite,
      backgroundColor: name === 'main' ? basicWhite : dark,
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
