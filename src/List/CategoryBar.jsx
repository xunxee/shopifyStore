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

const Button = styled.button(({ underLine, name }) => ({
  ...button,
  textDecoration: underLine === name
    ? 'underLine' : 'none',
}));

export default function CategoryBar({
  category,
  product,
  onClickCategory,
  onClickProduct,
}) {
  const handleClickCategory = useCallback((
    { target: { name } },
  ) => {
    onClickCategory(name);
  }, [onClickCategory]);

  const handleClickProduct = useCallback((
    { target: { name } },
  ) => {
    onClickProduct(name);
  }, [onClickProduct]);

  return (
    <Container>
      <div>
        <Layout>
          All Categories
          {LIST_CATEGORIES.categories.map(({
            id, name, title,
          }) => (
            <Button
              type="button"
              key={id}
              name={name}
              underLine={category}
              onClick={handleClickCategory}
            >
              {title}
            </Button>
          ))}
        </Layout>
        <Layout>
          All Products
          {LIST_CATEGORIES.products.map(({
            id, name, title,
          }) => (
            <Button
              type="button"
              key={id}
              name={name}
              underLine={product}
              onClick={handleClickProduct}
            >
              {title}
            </Button>
          ))}
        </Layout>
      </div>
    </Container>
  );
}
