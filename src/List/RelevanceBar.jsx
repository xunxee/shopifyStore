import styled from '@emotion/styled';

import LIST_CATEGORIES_STYLE from '../../fixtures/listCategoriesStyle';

const { container, layout } = LIST_CATEGORIES_STYLE;

const Container = styled.div(container);

const Layout = styled.ul(layout);

export default function RelevanceBar() {
  return (
    <Container>
      <div>
        <Layout>
          Sort
          {[
            {
              id: 1,
              title: 'Trending',
              name: 'trending',
            },
            {
              id: 2,
              title: 'Latest arrivals',
              name: 'latestArrivals',
            },
            {
              id: 3,
              title: 'Price: Low to high',
              name: 'lowToHigh',
            },
            {
              id: 4,
              title: 'Price: High to low',
              name: 'highToLow',
            },
          ].map((item) => (
            <button
              type="button"
              key={item.id}
              name={item.id}
            >
              {item.title}
            </button>
          ))}
        </Layout>
        <Layout>
          Material
          {[
            { id: 1, title: 'Fabric', name: 'fabric' },
            { id: 2, title: 'Wood', name: 'wood' },
            { id: 3, title: 'Metal', name: 'metal' },
            { id: 4, title: 'Glass', name: 'glass' },
          ].map((item) => (
            <button
              type="button"
              key={item.id}
              name={item.name}
            >
              {item.title}
            </button>
          ))}
        </Layout>
      </div>
    </Container>
  );
}
