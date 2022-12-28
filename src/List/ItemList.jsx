import styled from '@emotion/styled';

import ItemCard from './component/ItemCard';

const Container = styled.div(({ length }) => ({
  '@media (max-width: 1152px)': {
    height: `${(length / 2) * 256 + ((length / 2) * 25)}px`,
  },
  display: 'flex',
  flexWrap: 'wrap',
  flexGrow: 1,
  justifyContent: 'space-evenly',
  alignContent: 'space-between',
  height: `${(length / 3) * 256 + ((length / 3) * 40)}px`,
}));

export default function ItemList({ productList }) {
  return (
    <Container
      length={productList.length}
    >
      {productList.map((product) => (
        <ItemCard
          key={product.id}
          product={product}
        />
      ))}
    </Container>
  );
}
