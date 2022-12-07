import styled from '@emotion/styled';

import LIST_CATEGORIES_STYLE from '../../fixtures/listCategoriesStyle';

const { container, layout } = LIST_CATEGORIES_STYLE;

const Container = styled.div(container);

const Layout = styled.ul(layout);

export default function CategoryBar({ onClickCategories }) {
  function handleClick({ target: { name } }) {
    onClickCategories(name);
  }

  return (
    <Container>
      <div>
        <Layout>
          All Categories
          {[
            { id: 1, title: 'New Arrivals', name: 'new' },
            { id: 2, title: 'Featured', name: 'featured' },
          ].map((item) => (
            <button
              type="button"
              key={item.id}
              name={item.name}
              onClick={handleClick}
            >
              {item.title}
            </button>
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
