import styled from '@emotion/styled';
import ItemCard from './component/ItemCard';

const Container = styled.div({
  flexGrow: 1,
  backgroundColor: '#ebd28b',
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
