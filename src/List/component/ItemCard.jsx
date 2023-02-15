import styled from '@emotion/styled';
import { useCallback } from 'react';

import PALETTE from '../../styles/palette';
import PRODUCT_TAG from '../../styles/productTag';

const { basicWhite, paleWhite, itemCardHoverList } = PALETTE;
const { productName, priceName } = PRODUCT_TAG;

const Layout = styled.div(({ hoverColor }) => ({
  position: 'relative',
  width: '256px',
  height: '267px',
  backgroundColor: paleWhite,
  cursor: 'pointer',
  marginLeft: '3%',
  marginBottom: '3%',
  '&:hover': {
    'h3, span': {
      backgroundColor: hoverColor,
      color: basicWhite,
    },
    '& img': {
      transform: 'scale(1.2)',
    },
  },
}));

const ProductTag = styled.div({
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
    lineHeight: '40px',
    transition: '0.5s',
    transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
    boxDecorationBreak: 'clone',
  },
  '& span': {
    ...priceName,
    display: 'inline-block',
    transition: '0.5s',
    transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
  },
});

const ImgBox = styled.div({
  overflow: 'hidden',
  '& img': {
    transition: '0.5s',
    width: '100%',
    height: '100%',
    backgroundColor: paleWhite,
  },
});

export default function ItemCard({
  product: { id, title, price, mainImage },
  onClickItemList,
}) {
  function makeHoverColor() {
    const number = id % 10;

    return itemCardHoverList[number];
  }

  const handleClick = useCallback(() => {
    const url = `/product/${id}`;

    onClickItemList(url);
  }, [onClickItemList]);

  return (
    <Layout hoverColor={makeHoverColor()} onClick={handleClick}>
      <ProductTag>
        <h3>{title}</h3>
        <span>{price}</span>
      </ProductTag>
      <ImgBox>
        <img alt={title} src={mainImage} />
      </ImgBox>
    </Layout>
  );
}
