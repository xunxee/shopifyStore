import styled from '@emotion/styled';

import { useCallback } from 'react';

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

export default function RelevanceBar({
  sort,
  onClickSort,
}) {
  const handleClickSort = useCallback((
    { target: { name } },
  ) => {
    onClickSort(name);
  }, [sort]);

  return (
    <Container>
      <div>
        <Layout>
          Sort
          {LIST_CATEGORIES.sort.map((item) => (
            <Button
              type="button"
              key={item.id}
              name={item.name}
              underLine={sort === item.name
                ? 'underLine' : 'none'}
              onClick={handleClickSort}
            >
              {item.title}
            </Button>
          ))}
        </Layout>
        <Layout>
          Material
          {LIST_CATEGORIES.material.map((item) => (
            <Button
              type="button"
              key={item.id}
              name={item.name}
            >
              {item.title}
            </Button>
          ))}
        </Layout>
      </div>
    </Container>
  );
}
