import styled from '@emotion/styled';

import LIST_CATEGORIES_STYLE from '../../fixtures/listCategoriesStyle';

const Container = styled.div({
  width: '15%',
});

const { layout, items } = LIST_CATEGORIES_STYLE;

const Layout = styled.ul({
  ...layout,
});

const Item = styled.li({
  ...items,
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
