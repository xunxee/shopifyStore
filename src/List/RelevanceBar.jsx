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
  material,
  onClickSort,
  onClickMaterial,
}) {
  const handleClickSort = useCallback((
    { target: { name } },
  ) => {
    onClickSort(name);
  }, [sort]);

  const handleClickMaterial = useCallback((
    { target: { name } },
  ) => {
    onClickMaterial(name);
  }, [material]);

  return (
    <Container>
      <div>
        <Layout>
          Sort
          {LIST_CATEGORIES.sort.map(({
            id, name, title,
          }) => (
            <Button
              type="button"
              key={id}
              name={name}
              underLine={sort === name
                ? 'underLine' : 'none'}
              onClick={handleClickSort}
            >
              {title}
            </Button>
          ))}
        </Layout>
        <Layout>
          Material
          {LIST_CATEGORIES.material.map(({
            id, name, title,
          }) => (
            <Button
              type="button"
              key={id}
              name={name}
              underLine={material === name
                ? 'underLine' : 'none'}
              onClick={handleClickMaterial}
            >
              {title}
            </Button>
          ))}
        </Layout>
      </div>
    </Container>
  );
}
