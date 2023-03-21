import styled from '@emotion/styled';

import { useCallback } from 'react';

import { setColorById } from '../../utils';

import PALETTE from '../../styles/palette';
import PRODUCT_TAG from '../../styles/productTag';

const { basicWhite, paleWhite } = PALETTE;
const { productName, priceName } = PRODUCT_TAG;

const Wrapper = styled.div(({ hoverColor, title }) => ({
  position: 'relative',
  width: '256px',
  height: '267px',
  marginLeft: '3%',
  marginBottom: '3%',
  ...title === 'fake'
    ? { pointerEvents: 'none' }
    : {
      backgroundColor: paleWhite,
      cursor: 'pointer',
      '&:hover': {
        'h3, span': {
          backgroundColor: hoverColor,
          color: basicWhite,
        },
        '& img': {
          transform: 'scale(1.2)',
        },
      },
    },
}));

const StyledProductTag = styled.div(({ title }) => ({
  ...title === 'fake'
    ? { opacity: 0 }
    : {
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '20',
      overflow: 'hidden',
      paddingRight: '4rem',
      '& h3': {
        ...productName,
        display: 'inline',
        fontSize: '18px',
        transition: '0.5s',
        transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
      },
      '& span': {
        ...priceName,
        transition: '0.5s',
        transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
      },
    },
}));

const StyledImgBox = styled.div(({ title }) => ({
  ...title === 'fake'
    ? { opacity: 0 }
    : {
      overflow: 'hidden',
      '& img': {
        transition: '0.5s',
        width: '100%',
        height: '100%',
        backgroundColor: paleWhite,
      },
    },
}));

export default function ItemCard({
  product: {
    id, title, price, mainImage,
  },
  onClickItemList,
}) {
  const handleClick = useCallback(() => {
    const url = `/product/${id}`;

    onClickItemList(url);
  }, [onClickItemList]);

  return (
    <Wrapper
      title={title}
      onClick={handleClick}
      hoverColor={setColorById(id)}
    >
      <StyledProductTag title={title}>
        <h3>{title}</h3>
        <span>{price}</span>
      </StyledProductTag>
      <StyledImgBox title={title}>
        <img alt={title} src={mainImage} />
      </StyledImgBox>
    </Wrapper>
  );
}
