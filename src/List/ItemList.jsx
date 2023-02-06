import styled from '@emotion/styled';

import ItemCard from './component/ItemCard';

const Container = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginTop: '1.5rem',
  marginBottom: '5rem',
});

export default function ItemList({ productList }) {
  return (
    <Container>
      {productList.map((product) => (
        <ItemCard
          key={product.id}
          product={product}
        />
      ))}
    </Container>
  );
}
