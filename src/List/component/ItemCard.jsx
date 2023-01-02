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
  marginTop: '1rem',
  backgroundColor: paleWhite,
  ': hover': {
    '& h3, span': {
      backgroundColor: hoverColor,
      color: basicWhite,
    },
  },
}));

const TitleBox = styled.div({
  position: 'absolute',
  top: '0',
  left: '0',
  paddingRight: '4rem',
  '& h3': {
    display: 'inline',
    padding: '1rem 1.5rem',
    fontSize: '18px',
    lineHeight: '40px',
    fontWeight: '700',
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
    letterSpacing: '.35px',
    backgroundColor: basicWhite,
  },
});

export default function ItemCard(
  {
    product: {
      id, title, price, img,
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
      <div>
        <img alt={title} src={img} width="200px" />
      </div>
    </Layout>
  );
}
