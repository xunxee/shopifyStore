import styled from '@emotion/styled';

import PALETTE from '../../styles/Palette';

const {
  basicWhite,
  paleWhite,
  itemCardHoverList,
} = PALETTE;

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

const TitleBox = styled.div({
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '20',
  overflow: 'hidden',
  paddingRight: '4rem',
  '& h3': {
    display: 'inline',
    padding: '1rem 1.5rem',
    fontSize: '18px',
    lineHeight: '40px',
    fontWeight: '700',
    transition: '0.5s',
    transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
    letterSpacing: '.4px',
    backgroundColor: basicWhite,
    boxDecorationBreak: 'clone',
  },
  '& span': {
    display: 'inline-block',
    padding: '.5rem 1.5rem 1rem',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '600',
    transition: '0.5s',
    transitionTimingFunction: 'cubic-bezier(.4, 0, .2, 1)',
    letterSpacing: '.35px',
    backgroundColor: basicWhite,
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

export default function ItemCard(
  {
    product: {
      id, title, price, mainImage,
    },
  },
) {
  function makeHoverColor() {
    const number = id % 10;

    return itemCardHoverList[number];
  }

  return (
    <Layout
      hoverColor={makeHoverColor()}
    >
      <TitleBox>
        <h3>
          {title}
        </h3>
        <span>{price}</span>
      </TitleBox>
      <ImgBox>
        <img alt={title} src={mainImage} />
      </ImgBox>
    </Layout>
  );
}
