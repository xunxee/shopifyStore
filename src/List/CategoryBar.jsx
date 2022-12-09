import { useCallback } from 'react';

import styled from '@emotion/styled';

import LIST_CATEGORIES_STYLE from '../../fixtures/listCategoriesStyle';
import LIST_CATEGORIES from '../../fixtures/listCategoriesCollection';

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
          {LIST_CATEGORIES.categories.map((item) => (
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
          {LIST_CATEGORIES.products.map((item) => (
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
