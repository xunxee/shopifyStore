import styled from '@emotion/styled';

const Container = styled.div({
  width: '15%',
});

const Layout = styled.ul({
  marginTop: '2rem',
  fontSize: '20px',
  fontWeight: '700',
});

const Item = styled.li({
  marginTop: '1.5rem',
  fontSize: '17px',
  fontWeight: '500',
  cursor: 'pointer',
});

export default function CategoryBar() {
  return (
    <Container>
      <Layout>
        All Categories
        {[
          { id: 1, title: 'New Arrivals' },
          { id: 2, title: 'Featured' },
        ].map((item) => (
          <Item key={item.id}>{item.title}</Item>
        ))}
      </Layout>
      <Layout>
        All Products
        {[
          { id: 1, title: 'Beds' },
          { id: 2, title: 'Sofas' },
          { id: 3, title: 'Tables & desks' },
          { id: 4, title: 'Chairs' },
        ].map((item) => (
          <Item key={item.id}>{item.title}</Item>
        ))}
      </Layout>
    </Container>
  );
}
