import { useCallback } from 'react';

import styled from '@emotion/styled';

import LIST_CATEGORIES_STYLE from '../../fixtures/listCategoriesStyle';

const {
  container,
  layout,
  button,
} = LIST_CATEGORIES_STYLE;

const Container = styled.div(container);

const Layout = styled.ul(layout);

const Button = styled.button(({ underLine }) => ({
  ...button,
  textDecoration: `${underLine}`,
}));

export default function CategoryBar({
  categories,
  products,
  onClickCategories,
  onClickProducts,
}) {
  const handleClickCategories = useCallback((
    { target: { name } },
  ) => {
    onClickCategories(name);
  }, [categories]);

  const handleClickProducts = useCallback((
    { target: { name } },
  ) => {
    onClickProducts(name);
  }, [products]);

  return (
    <Container>
      <div>
        <Layout>
          All Categories
          {[
            { id: 1, title: 'New Arrivals', name: 'new' },
            { id: 2, title: 'Featured', name: 'featured' },
          ].map((item) => (
            <Button
              type="button"
              key={item.id}
              name={item.name}
              underLine={categories === item.name
                ? 'underLine' : 'none'}
              onClick={handleClickCategories}
            >
              {item.title}
            </Button>
          ))}
        </Layout>
        <Layout>
          All Products
          {[
            { id: 1, title: 'Beds', name: 'beds' },
            { id: 2, title: 'Sofas', name: 'sofas' },
            { id: 3, title: 'Tables & desks', name: 'tables' },
            { id: 4, title: 'Chairs', name: 'chairs' },
          ].map((item) => (
            <Button
              type="button"
              key={item.id}
              name={item.name}
              underLine={products === item.name
                ? 'underLine' : 'none'}
              onClick={handleClickProducts}
            >
              {item.title}
            </Button>
          ))}
        </Layout>
      </div>
    </Container>
  );
}
