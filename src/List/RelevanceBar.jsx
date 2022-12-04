import styled from '@emotion/styled';

import LIST_CATEGORIES_STYLE from '../../fixtures/listCategoriesStyle';

const { container, layout, items } = LIST_CATEGORIES_STYLE;

const Container = styled.div({
  ...container,
});

const Layout = styled.ul({
  ...layout,
});

const Item = styled.li({
  ...items,
});

export default function RelevanceBar() {
  return (
    <Container>
      <div>
        <Layout>
          Sort
          {[
            { id: 1, title: 'Trending' },
            { id: 2, title: 'Latest arrivals' },
            { id: 3, title: 'Price: Low to high' },
            { id: 4, title: 'Price: High to low' },
          ].map((item) => (
            <Item key={item.id}>{item.title}</Item>
          ))}
        </Layout>
        <Layout>
          Material
          {[
            { id: 1, title: 'Fabric' },
            { id: 2, title: 'Wood' },
            { id: 3, title: 'Metal' },
            { id: 4, title: 'Glass' },
          ].map((item) => (
            <Item key={item.id}>{item.title}</Item>
          ))}
        </Layout>
      </div>
    </Container>
  );
}
